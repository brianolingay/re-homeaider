import { validUpdateUserSchema } from "@homeaider/common";
import * as bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../../types/Context";
import { formatYupError } from "../../utils/formatYupError";
import createOrRegister from "../createOrRegister";
import { FormSubmitResponse } from "../FormSubmitResponse";
import { UserInput } from "./UserInput";
import UserDBA from "./UserDBA";
import { User } from "./UserObject";

@Resolver(User)
export class UserResolver {
  constructor() {}

  @Query(() => User, { nullable: true })
  async me(
    @Ctx()
    ctx: MyContext
  ): Promise<User | null> {
    if (!ctx.user) {
      return null;
    }
    return await UserDBA.findUserWithDetailsBy(ctx.user._id);
  }

  @Authorized()
  @Query(() => [User], { nullable: true })
  async allAdminExceptCurrentUser(
    @Ctx()
    ctx: MyContext
  ): Promise<User[]> {
    const { _id } = ctx.user;

    return await UserDBA.findAllAdminExceptCurrentUser(_id);
  }

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async createUser(
    @Arg("input") userInput: UserInput
  ): Promise<FormSubmitResponse> {
    const role = "admin";
    return await createOrRegister(role, userInput);
  }

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async updateUser(
    @Arg("userId") userId: ObjectId,
    @Arg("input") userInput: UserInput
  ): Promise<FormSubmitResponse> {
    try {
      await validUpdateUserSchema.validate(userInput, { abortEarly: false });
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { password, ...newUserInput } = userInput;

    let newUserInput2 = newUserInput;

    if (password) {
      newUserInput2 = {
        ...newUserInput,
        password: await bcrypt.hash(password, bcrypt.genSaltSync(10)),
      } as any;
    }

    try {
      await UserDBA.updateUser({ _id: userId }, { ...newUserInput2 });
    } catch (error) {
      throw error;
    }

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async deleteUser(
    @Arg("userId") userId: ObjectId
  ): Promise<FormSubmitResponse> {
    try {
      await UserDBA.deleteUser({ _id: userId });
    } catch {
      return {
        errors: [
          {
            path: "subscription",
            message: "Something went wrong!",
          },
        ],
      };
    }

    return { errors: [] };
  }
}
