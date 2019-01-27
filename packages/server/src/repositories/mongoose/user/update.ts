import { ObjectId } from "mongodb";
import { validUpdateUserSchema } from "@homeaider/common";
import { formatYupError } from "./../../../utils/formatYupError";
import { UserModel } from "./../../../models/User";
import { UpdateUserInput } from "./../../../modules/users/updateInput";

export const update = async (userId: ObjectId, userInput: UpdateUserInput) => {
  try {
    await validUpdateUserSchema.validate(userInput, { abortEarly: false });
  } catch (err) {
    return { errors: formatYupError(err) };
  }

  await UserModel.updateOne({ _id: userId }, { ...userInput });

  return { errors: [] };
};
