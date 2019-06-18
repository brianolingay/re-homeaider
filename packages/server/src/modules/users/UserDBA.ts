import { ObjectId } from "mongodb";
import { UserModel, UserInterface } from "../../models/User";

const createUser = async (input: any) => {
  const user = new UserModel(input);

  return await user.save();
};

const deleteUser = async (condition: any) => {
  return await UserModel.deleteOne(condition);
};

const updateUser = async (condition: any, input: any) => {
  return await UserModel.updateOne(condition, input);
};

const checkUserExistsBy = async (condition: any, columns: string = "_id") => {
  const exists = await UserModel.findOne(condition, columns, {
    lean: true,
  }).exec();

  return exists;
};

const findUserWithDetailsBy = async (
  condition: any
): Promise<UserInterface | null> => {
  const user = await UserModel.findOne(condition)
    //.populate("userSubscription")
    .populate("role")
    .populate({
      path: "providerServices",
      populate: {
        path: "service",
        populate: { path: "category" },
      },
    })
    .lean()
    .exec();

  return user;
};

const findAllAdminExceptCurrentUser = async (
  userId: ObjectId
): Promise<[UserInterface]> => {
  const users = await UserModel.find({ _id: { $ne: userId } })
    //.populate("userSubscription")
    .populate("role")
    .populate({
      path: "providerServices",
      populate: {
        path: "service",
        populate: { path: "category" },
      },
    })
    .lean()
    .exec();

  return users;
};

export default {
  checkUserExistsBy,
  createUser,
  deleteUser,
  findAllAdminExceptCurrentUser,
  findUserWithDetailsBy,
  updateUser,
};
