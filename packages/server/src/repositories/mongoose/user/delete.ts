import { ObjectId } from "mongodb";
import { UserModel } from "./../../../models/User";

export const deleteUser = async (userId: ObjectId) => {
  try {
    await UserModel.deleteOne({ _id: userId });
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

  return { errors: [] };
};
