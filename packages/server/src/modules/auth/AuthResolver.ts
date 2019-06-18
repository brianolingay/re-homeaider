import { loginSchema } from "@homeaider/common";
import * as bcrypt from "bcryptjs";
import { MyContext } from "server/src/types/Context";
import { formatYupError } from "../../utils/formatYupError";
import { createToken } from "../../utils/jwtAuth";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import createOrRegister from "../createOrRegister";
import { UserResponse } from "../users/responses/User";
import UserDBA from "../users/UserDBA";
import { User } from "../users/UserObject";
import { invalidLogin } from "./constants";
import { LoginInput } from "./inputs/Login";
import { RegisterInput } from "./inputs/Register";
import { LoginResponse } from "./responses/Login";

const errorResponse = [
  {
    path: "email",
    message: invalidLogin,
  },
];

@Resolver(User)
export class UserResolver {
  constructor() {}

  @Mutation(() => UserResponse, { nullable: true })
  async register(
    @Arg("role") role: String,
    @Arg("input") registerInput: RegisterInput
  ): Promise<UserResponse> {
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
      return { errors: formatYupError(err), user: null };
    }

    console.log(loginInput);
    const { email, password } = loginInput;
    const user = await UserDBA.findUserWithDetailsBy({ email });

    if (!user) {
      return { errors: errorResponse, user: null };
    }

    const valid = await bcrypt.compare(password, user.password);

    console.log(valid);

    if (!valid) {
      return { errors: errorResponse, user: null };
    }

    // if (isAdmin) {
    //   if (user.role.name !== "admin") {
    //     return { errors: errorResponse, user: null };
    //   }
    // }

    const tokens = await createToken(user);

    ctx.res.cookie("refresh-token", tokens.refreshToken);
    ctx.res.cookie("access-token", tokens.accessToken);

    return { errors: [], user };
  }

  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext) {
    ctx.res.clearCookie("refresh-token");
    ctx.res.clearCookie("access-token");

    return true;
  }
}
