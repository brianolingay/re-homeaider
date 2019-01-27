import { UserModel } from "../../../models/User";

export const me = async (userId: string) => {
  const user = await UserModel.findById(userId)
    .populate("role")
    .lean()
    .exec();

  return user ? user : null;
};

export const allExceptMe = async (userId: string) => {
  const users = await UserModel.find({ _id: { $ne: userId } })
    .populate("role")
    .lean()
    .exec();

  return users;
};
