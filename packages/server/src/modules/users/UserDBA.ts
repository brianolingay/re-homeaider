import { ObjectId } from "mongodb";
import { UserModel, UserInterface } from "../../models/User";
import { DBRepository } from "../DBRepo";

const dba = DBRepository(UserModel);

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
  createUser: dba.create,
  deleteUser: dba.delete,
  updateUser: dba.update,
  checkUserExistsBy: dba.doExists,
  findAllAdminExceptCurrentUser,
  findUserWithDetailsBy,
};
