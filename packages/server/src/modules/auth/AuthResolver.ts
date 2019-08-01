import { loginSchema } from "@homeaider/common";
import * as bcrypt from "bcryptjs";
import { MyContext } from "../../types/Context";
import { formatYupError } from "../../utils/formatYupError";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import createOrRegister from "../createOrRegister";
import UserDBA from "../users/UserDBA";
import { User } from "../users/UserObject";
import { invalidLogin } from "./constants";
import { LoginInput } from "./inputs/Login";
import { RegisterInput } from "./inputs/Register";
import { LoginResponse } from "./responses/Login";
import { FormSubmitResponse } from "../FormSubmitResponse";
import { userSessionIdPrefix } from "../../constants";
import { removeAllUsersSessions } from "../../utils/removeAllUsersSessions";

const errorResponse = [
  {
    path: "email",
    message: invalidLogin,
  },
];

const loginResponse = { errors: [], sessionId: undefined, userId: null };

@Resolver(User)
export class AuthResolver {
  constructor() {}

  @Mutation(() => FormSubmitResponse, { nullable: true })
  async register(
    @Arg("role") role: String,
    @Arg("input") registerInput: RegisterInput
  ): Promise<FormSubmitResponse> {
    return await createOrRegister(role, registerInput);
  }

  @Mutation(() => LoginResponse, { nullable: true })
  async login(
    @Arg("input") loginInput: LoginInput,
    @Ctx() ctx: MyContext
  ): Promise<LoginResponse> {
    try {
      await loginSchema.validate(loginInput, { abortEarly: false });
    } catch (err) {
      return {
        ...loginResponse,
        errors: formatYupError(err),
      };
    }

    const { email, password } = loginInput;
    const user = await UserDBA.findUserWithDetailsBy({ email });

    if (!user) {
      return { ...loginResponse, errors: errorResponse };
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return { ...loginResponse, errors: errorResponse };
    }

    // login sucessful
    ctx.session.userId = user._id;
    if (ctx.req.sessionID) {
      await ctx.redis.lpush(
        `${userSessionIdPrefix}${user._id.toString()}`,
        ctx.req.sessionID
      );
    }

    return { ...loginResponse, sessionId: ctx.req.sessionID, userId: user._id };
  }

  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext) {
    const { userId } = ctx.session;
    if (userId) {
      removeAllUsersSessions(userId, ctx.redis);
      ctx.session.destroy(err => {
        if (err) {
          console.log(err);
        }
      });
      ctx.res.clearCookie("qid");
      return true;
    }

    return false;
  }
}
