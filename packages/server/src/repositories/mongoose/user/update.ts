import { ObjectId } from "mongodb";
import * as bcrypt from "bcryptjs";
import { validUpdateUserSchema } from "@homeaider/common";
import { formatYupError } from "./../../../utils/formatYupError";
import { UserModel } from "./../../../models/User";
import { UserInput } from "./../../../modules/users/createInput";

export const update = async (userId: ObjectId, userInput: UserInput) => {
  try {
    await validUpdateUserSchema.validate(userInput, { abortEarly: false });
  } catch (err) {
    return { errors: formatYupError(err) };
  }

  const { password, ...newUserInput } = userInput;

  let newUserInput2 = newUserInput;

  if (password) {
    newUserInput2 = {
      ...newUserInput,
      password: await bcrypt.hash(password, bcrypt.genSaltSync(10)),
    } as any;
  }

  await UserModel.updateOne({ _id: userId }, { ...newUserInput2 });

  return { errors: [] };
};
