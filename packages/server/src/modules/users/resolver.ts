import { Resolver, Query, Ctx, Mutation, Authorized, Arg } from "type-graphql";
import { getMongoRepository } from "typeorm";
import * as argon from "argon2";
import { validUserSchema, loginSchema } from "@homeaider/common";

import { User } from "../../entity/User";
import { MyContext } from "../../types/Context";

import { LoginInput } from "./login/createInput";
import { LoginResponse } from "./login/createResponse";
import { invalidLogin } from "./login/constants";

import { RegisterResponse } from "./register/createResponse";
import { RegisterInput } from "./register/createInput";
import { duplicateEmail } from "./register/constants";

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

    // const subscription = Subscription.findOne({ amount: 0 }, "_id");
    // const services = Service.find();

    const { email, firstName, lastName, mobile, password } = registerInput;

    // const roleV = Role.findOne({ _id: role });

    const repo = getMongoRepository(User);

    const userAlreadyExists = await repo.findOne({ email });

    if (userAlreadyExists) {
      console.log(userAlreadyExists);
      return {
        errors: [
          {
            path: "email",
            message: duplicateEmail,
          },
        ],
      };
    }

    const user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.mobile = mobile;
    user.password = await argon.hash(password);

    const newUser = await repo.save(user);

    console.log(newUser);

    return null;
  }

  @Mutation(() => LoginResponse, { nullable: true })
  async login(
    @Arg("input") loginInput: LoginInput,
    @Ctx()
    ctx: MyContext
  ): Promise<LoginResponse | null> {
    try {
      await loginSchema.validate(loginInput, { abortEarly: false });
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { email, password } = loginInput;

    const repo = getMongoRepository(User);
    const user = await repo.findOne({ email });

    if (!user) {
      return { errors: errorResponse };
    }

    const valid = await argon.verify(user.password, password);

    if (!valid) {
      return { errors: errorResponse };
    }

    console.log(user);
    ctx.req.session!.userId = user.id;

    return null;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async logout(
    @Ctx()
    ctx: MyContext
  ) {
    return new Promise(res =>
      ctx.req.session!.destroy(err => {
        console.log(err);
        res(!!err);
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
    console.log(userId);
    const user = new User();
    user.id = userId;
    const repo = getMongoRepository(User);
    const newUser = await repo.findOne(user);
    console.log(newUser);
    return newUser ? newUser : null;
  }
}
