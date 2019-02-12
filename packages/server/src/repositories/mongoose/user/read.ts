import { ObjectId } from "mongodb";
import { RoleModel } from "./../../../models/Role";
import { UserModel } from "../../../models/User";

export const me = async (userId: ObjectId) => {
  const user = await UserModel.findOne({ _id: userId }, "-password")
    .populate("role")
    .lean()
    .exec();

  return user ? user : null;
};

export const allAdminExceptMe = async (userId: ObjectId) => {
  const role = await RoleModel.findOne({ name: "admin" }, "_id")
    .lean()
    .exec();

  const users = await UserModel.find({ _id: { $ne: userId }, role: role._id })
    .populate("role")
    .lean()
    .exec();

  return users;
};

export const providersByService = async (serviceId: ObjectId) => {
  const users = await UserModel.find({ services: serviceId })
    .populate("services")
    .lean()
    .exec();

  return users;
};
