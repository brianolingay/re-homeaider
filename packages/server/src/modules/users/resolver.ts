import { RoleModel } from "./../../models/Role";
import { Resolver, Query, Ctx, Mutation, Authorized, Arg } from "type-graphql";
import * as argon from "argon2";
import { validUserSchema, loginSchema } from "@homeaider/common";

import { UserModel } from "./../../models/User";
import { User } from "../../types/objects/User";
import { MyContext } from "../../types/Context";

import { LoginInput } from "./login/createInput";
import { LoginResponse } from "./login/createResponse";
import { invalidLogin } from "./login/constants";

import { RegisterResponse } from "./register/createResponse";
import { RegisterInput } from "./register/createInput";
import { duplicateEmail } from "./register/constants";

import { SubscriptionModel } from "./../../models/Subscription";

import { formatYupError } from "../../utils/formatYupError";

const errorResponse = [
  {
    path: "email",
    message: invalidLogin,
  },
];

@Resolver(User)
export class UserResolver {
  constructor() {}

  @Mutation(() => RegisterResponse, { nullable: true })
  async register(
    @Arg("input") registerInput: RegisterInput
  ): Promise<RegisterResponse | null> {
    try {
      await validUserSchema.validate(registerInput, { abortEarly: false });
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const subscription = await SubscriptionModel.findOne({ amount: 0 }).exec();
    // const services = Service.find();

    const { email, password, roleId } = registerInput;

    const role = await RoleModel.findOne({ _id: roleId }).exec();

    const userAlreadyExists = await UserModel.findOne({ email }, "_id", {
      lean: true,
    }).exec();

    if (userAlreadyExists) {
      return {
        errors: [
          {
            path: "email",
            message: duplicateEmail,
          },
        ],
      };
    }

    const user = new UserModel({
      ...registerInput,
      password: await argon.hash(password),
      subscription,
      role,
    });

    await user.save();

    return null;
  }

  @Mutation(() => LoginResponse, { nullable: true })
  async login(
    @Arg("input") loginInput: LoginInput,
    @Ctx()
    ctx: MyContext
  ): Promise<LoginResponse> {
    try {
      await loginSchema.validate(loginInput, { abortEarly: false });
    } catch (err) {
      return { errors: formatYupError(err), user: null };
    }

    const { email, password } = loginInput;
    const user = await UserModel.findOne({ email })
      .lean()
      .exec();

    if (!user) {
      return { errors: errorResponse, user: null };
    }

    const valid = await argon.verify(user.password, password);

    if (!valid) {
      return { errors: errorResponse, user: null };
    }

    ctx.req.session!.userId = user._id;

    return { errors: [], user };
  }

  @Authorized()
  @Mutation(() => Boolean)
  async logout(
    @Ctx()
    ctx: MyContext
  ) {
    return await new Promise(res =>
      ctx.req.session!.destroy(err => {
        console.log(err);
        res(!err);
      })
    );
  }

  @Query(() => User, { nullable: true })
  async me(
    @Ctx()
    ctx: MyContext
  ): Promise<User | null> {
    const { userId } = ctx.req.session!;
    if (!userId) {
      return null;
    }

    const user = await UserModel.findById(userId)
      .lean()
      .exec();

    return user ? user : null;
  }
}
