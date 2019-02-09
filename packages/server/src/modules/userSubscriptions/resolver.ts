import { Resolver, Query, Mutation, Authorized, Arg } from "type-graphql";
import { ObjectId } from "mongodb";
import { validSubscriptionSchema } from "@homeaider/common";

import { UserSubscriptionModel } from "./../../models/UserSubscription";
import { UserSubscription } from "../../types/objects/UserSubscription";

import { UserSubscriptionResponse } from "./response";
import { UserSubscriptionInput } from "./input";

import { formatYupError } from "../../utils/formatYupError";

@Resolver(UserSubscription)
export class UserSubscriptionResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => UserSubscriptionResponse, { nullable: true })
  async createUserSubscription(
    @Arg("input") userSubscriptionInput: UserSubscriptionInput
  ): Promise<UserSubscriptionResponse | null> {
    try {
      await validSubscriptionSchema.validate(userSubscriptionInput, {
        abortEarly: false,
      });
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = userSubscriptionInput;

    const subscriptionAlreadyExists = await UserSubscriptionModel.findOne(
      { name },
      "_id",
      {
        lean: true,
      }
    ).exec();

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

    const subscription = new UserSubscriptionModel(userSubscriptionInput);

    await subscription.save();

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => UserSubscriptionResponse, { nullable: true })
  async updateUserSubscription(
    @Arg("userSubscriptionId") userSubscriptionId: ObjectId,
    @Arg("input") userSubscriptionInput: UserSubscriptionInput
  ): Promise<UserSubscriptionResponse | null> {
    try {
      await validSubscriptionSchema.validate(userSubscriptionInput, {
        abortEarly: false,
      });
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = userSubscriptionInput;

    const subscriptionAlreadyExists = await UserSubscriptionModel.findOne(
      { name, _id: { $ne: userSubscriptionId } },
      "_id",
      {
        lean: true,
      }
    ).exec();

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

    await UserSubscriptionModel.updateOne(
      { _id: userSubscriptionId },
      { ...userSubscriptionInput }
    );

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => UserSubscriptionResponse, { nullable: true })
  async deleteUserSubscription(
    @Arg("userSubscriptionId") userSubscriptionId: ObjectId
  ): Promise<UserSubscriptionResponse | null> {
    try {
      await UserSubscriptionModel.deleteOne({ _id: userSubscriptionId });
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
    const userSubscriptions = await UserSubscriptionModel.find({})
      .lean()
      .exec();

    return userSubscriptions;
  }
}
