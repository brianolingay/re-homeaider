import * as argon from "argon2";
import { validUserSchema } from "@homeaider/common";
import { formatYupError } from "./../../../utils/formatYupError";
import { UserModel } from "./../../../models/User";
import { RoleModel } from "./../../../models/Role";
import { SubscriptionModel } from "./../../../models/Subscription";
import { duplicateEmail } from "./../../../modules/users/register/constants";

export const createOrRegister = async (role: String, input: any) => {
  try {
    await validUserSchema.validate(input, { abortEarly: false });
  } catch (err) {
    return { errors: formatYupError(err) };
  }

  const subscription = await SubscriptionModel.findOne({ amount: 0 }).exec();
  // const services = Service.find();

  const { email, password } = input;

  const roleData = await RoleModel.findOne({ name: role }, "_id")
    .lean()
    .exec();

  const userAlreadyExists = await UserModel.findOne({ email }, "_id", {
    lean: true,
  }).exec();

  if (userAlreadyExists) {
    return {
      errors: [
        {
          path: "email",
          message: duplicateEmail,
        },
      ],
    };
  }

  const user = new UserModel({
    ...input,
    password: await argon.hash(password),
    subscription,
    role: roleData._id,
  });

  await user.save();

  return { errors: [] };
};
