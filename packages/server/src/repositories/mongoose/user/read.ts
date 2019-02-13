import { ObjectId } from "mongodb";
import { UserModel } from "../../../models/User";

export const me = async (userId: ObjectId) => {
  const user = await UserModel.findOne({ _id: userId }, "-password")
    .populate("role")
    .populate({
      path: "services",
      populate: { path: "category" },
    })
    .lean()
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

export const providersByService = async (serviceId: ObjectId) => {
  const users = await UserModel.find({ services: serviceId })
    .populate("role")
    .populate({
      path: "services",
      populate: { path: "category" },
    })
    .lean()
    .exec();

  return users;
};
