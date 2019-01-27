import { RoleModel } from "./../../../models/Role";
import { UserModel } from "../../../models/User";

export const me = async (userId: string) => {
  const user = await UserModel.findById(userId)
    .populate("role")
    .lean()
    .exec();

  return user ? user : null;
};

export const allAdminExceptMe = async (userId: string) => {
  const role = await RoleModel.findOne({ name: "admin" }, "_id")
    .lean()
    .exec();

  const users = await UserModel.find({ _id: { $ne: userId }, role: role._id })
    .populate("role")
    .lean()
    .exec();

  return users;
};
