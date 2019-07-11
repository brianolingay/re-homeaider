import { validSubscriptionSchema } from "@homeaider/common";
import { ObjectId } from "mongodb";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { formatYupError } from "../../utils/formatYupError";
import { FormSubmitResponse } from "../FormSubmitResponse";
import UserSubscriptionDBA from "./UserSubscriptionDBA";
import { UserSubscriptionInput } from "./UserSubscriptionInput";
import { UserSubscription } from "./UserSubscriptionObject";

@Resolver(UserSubscription)
export class UserSubscriptionResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async createUserSubscription(
    @Arg("input") userSubscriptionInput: UserSubscriptionInput
  ): Promise<FormSubmitResponse | null> {
    try {
      await validSubscriptionSchema.validate(userSubscriptionInput, {
        abortEarly: false,
      });
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = userSubscriptionInput;

    const subscriptionAlreadyExists = await UserSubscriptionDBA.doExists({
      name,
    });

    if (subscriptionAlreadyExists) {
      return {
        errors: [
          {
            path: "name",
            message: "Name is already being used!",
          },
        ],
      };
    }

    try {
      await UserSubscriptionDBA.create(userSubscriptionInput);
    } catch (error) {
      throw error;
    }

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async updateUserSubscription(
    @Arg("userSubscriptionId") userSubscriptionId: ObjectId,
    @Arg("input") userSubscriptionInput: UserSubscriptionInput
  ): Promise<FormSubmitResponse | null> {
    try {
      await validSubscriptionSchema.validate(userSubscriptionInput, {
        abortEarly: false,
      });
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = userSubscriptionInput;

    const subscriptionAlreadyExists = await UserSubscriptionDBA.doExists({
      name,
      _id: { $ne: userSubscriptionId },
    });

    if (subscriptionAlreadyExists) {
      return {
        errors: [
          {
            path: "name",
            message: "Name is already being used!",
          },
        ],
      };
    }

    try {
      await UserSubscriptionDBA.update(
        { _id: userSubscriptionId },
        { ...userSubscriptionInput }
      );
    } catch (error) {
      throw error;
    }

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async deleteUserSubscription(
    @Arg("userSubscriptionId") userSubscriptionId: ObjectId
  ): Promise<FormSubmitResponse | null> {
    try {
      await UserSubscriptionDBA.delete({ _id: userSubscriptionId });
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

    return null;
  }

  @Authorized()
  @Query(() => [UserSubscription], { nullable: true })
  async userSubscriptions(): Promise<UserSubscription[]> {
    const userSubscriptions = await UserSubscriptionDBA.findAll();

    return userSubscriptions;
  }
}
