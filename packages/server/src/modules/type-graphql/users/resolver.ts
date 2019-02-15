import { ObjectId } from "mongodb";
import { Resolver, Query, Ctx, Mutation, Authorized, Arg } from "type-graphql";
import { User } from "../../../types/objects/User";
import { MyContext } from "../../../types/Context";

import { UserRepository } from "../../../repositories/mongoose/user";

import { LoginInput } from "./login/createInput";
import { LoginResponse } from "./login/createResponse";

import { RegisterInput } from "./register/createInput";
import { UserResponse } from "./createResponse";
import { UserInput } from "./createInput";

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
    @Arg("input") loginInput: LoginInput
  ): Promise<LoginResponse> {
    return await UserRepository.login(isAdmin, loginInput);
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
    if (!ctx.user) {
      return null;
    }

    console.log(ctx.user);
    return await UserRepository.me(ctx.user._id);
  }

  @Authorized()
  @Query(() => [User], { nullable: true })
  async allAdminExceptMe(
    @Ctx()
    ctx: MyContext
  ): Promise<User[]> {
    const { _id } = ctx.user;

    return await UserRepository.allAdminExceptMe(_id);
  }

  @Authorized()
  @Query(() => [User], { nullable: true })
  async providersByService(
    @Arg("serviceId") serviceId: ObjectId
  ): Promise<User[]> {
    const users = await UserRepository.providersByService(serviceId);
    return users;
  }

  @Authorized()
  @Mutation(() => UserResponse, { nullable: true })
  async createUser(@Arg("input") userInput: UserInput): Promise<UserResponse> {
    return await UserRepository.create(userInput);
  }

  @Authorized()
  @Mutation(() => UserResponse, { nullable: true })
  async updateUser(
    @Arg("userId") userId: ObjectId,
    @Arg("input") userInput: UserInput
  ): Promise<UserResponse> {
    return await UserRepository.update(userId, userInput);
  }

  @Authorized()
  @Mutation(() => UserResponse, { nullable: true })
  async deleteUser(@Arg("userId") userId: ObjectId): Promise<UserResponse> {
    return await UserRepository.deleteUser(userId);
  }
}
