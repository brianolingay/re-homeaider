import { Resolver, Query, Mutation, Authorized, Arg } from "type-graphql";
import { ObjectId } from "mongodb";
import { validSubscriptionSchema } from "@homeaider/common";

import { SubscriptionModel } from "./../../models/Subscription";
import { Subscription } from "../../types/objects/Subscription";

import { SubscriptionResponse } from "./response";
import { SubscriptionInput } from "./input";

import { formatYupError } from "../../utils/formatYupError";

@Resolver(Subscription)
export class SubscriptionResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => SubscriptionResponse, { nullable: true })
  async createSubscription(
    @Arg("input") subscriptionInput: SubscriptionInput
  ): Promise<SubscriptionResponse | null> {
    try {
      await validSubscriptionSchema.validate(subscriptionInput, {
        abortEarly: false,
      });
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = subscriptionInput;

    const subscriptionAlreadyExists = await SubscriptionModel.findOne(
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

    const subscription = new SubscriptionModel(subscriptionInput);

    await subscription.save();

    return null;
  }

  @Authorized()
  @Mutation(() => SubscriptionResponse, { nullable: true })
  async updateSubscription(
    @Arg("subscriptionId") subscriptionId: ObjectId,
    @Arg("input") subscriptionInput: SubscriptionInput
  ): Promise<SubscriptionResponse | null> {
    try {
      await validSubscriptionSchema.validate(subscriptionInput, {
        abortEarly: false,
      });
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = subscriptionInput;

    const subscriptionAlreadyExists = await SubscriptionModel.findOne(
      { name, _id: { $ne: subscriptionId } },
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

    await SubscriptionModel.updateOne(
      { _id: subscriptionId },
      { ...subscriptionInput }
    );

    return null;
  }

  @Authorized()
  @Mutation(() => SubscriptionResponse, { nullable: true })
  async deleteSubscription(
    @Arg("subscriptionId") subscriptionId: ObjectId
  ): Promise<SubscriptionResponse | null> {
    try {
      await SubscriptionModel.deleteOne({ _id: subscriptionId });
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
  @Query(() => [Subscription], { nullable: true })
  async subscriptions(): Promise<Subscription[]> {
    const subscriptions = await SubscriptionModel.find({})
      .lean()
      .exec();

    return subscriptions;
  }
}
