import { ObjectId } from "mongodb";
import { Resolver, Query, Ctx, Mutation, Authorized, Arg } from "type-graphql";
import { User } from "../../types/objects/User";
import { MyContext } from "../../types/Context";

import { UserRepository } from "../../repositories/mongoose/user";

import { LoginInput } from "./login/createInput";
import { LoginResponse } from "./login/createResponse";

import { RegisterInput } from "./register/createInput";
import { UserResponse } from "./createResponse";
import { CreateUserInput } from "./createInput";
import { UpdateUserInput } from "./updateInput";

@Resolver(User)
export class UserResolver {
  constructor() {}

  @Mutation(() => UserResponse, { nullable: true })
  async register(
    @Arg("role") role: String,
    @Arg("input") registerInput: RegisterInput
  ): Promise<UserResponse> {
    return await UserRepository.register(role, registerInput);
  }

  @Mutation(() => LoginResponse, { nullable: true })
  async login(
    @Arg("isAdmin") isAdmin: Boolean,
    @Arg("input") loginInput: LoginInput,
    @Ctx()
    ctx: MyContext
  ): Promise<LoginResponse> {
    return await UserRepository.login(ctx, isAdmin, loginInput);
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

    return await UserRepository.me(userId);
  }

  @Query(() => [User], { nullable: true })
  async users(
    @Ctx()
    ctx: MyContext
  ): Promise<User[]> {
    const { userId } = ctx.req.session!;

    return await UserRepository.allExceptMe(userId);
  }

  @Mutation(() => UserResponse, { nullable: true })
  async createUser(
    @Arg("input") userInput: CreateUserInput
  ): Promise<UserResponse> {
    return await UserRepository.create(userInput);
  }

  @Mutation(() => UserResponse, { nullable: true })
  async updateUser(
    @Arg("userId") userId: ObjectId,
    @Arg("input") userInput: UpdateUserInput
  ): Promise<UserResponse> {
    return await UserRepository.update(userId, userInput);
  }
}
