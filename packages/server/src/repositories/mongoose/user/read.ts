import { ObjectId } from "mongodb";
import { UserModel } from "../../../models/User";

export const me = async (userId: ObjectId) => {
  const user = await UserModel.findOne({ _id: userId }, "-password")
    .populate("userSubscription")
    .populate("role")
    .populate({
      path: "providerService",
      populate: {
        path: "services",
        populate: { path: "category" },
      },
    })
    .exec();

  return user ? user : null;
};

export const allAdminExceptMe = async (userId: ObjectId) => {
  const users = await UserModel.find({ _id: { $ne: userId } })
    .populate("role")
    .lean()
    .exec();

  return users;
};
