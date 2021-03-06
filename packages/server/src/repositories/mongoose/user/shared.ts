import * as bcrypt from "bcryptjs";
import { validUserSchema } from "@homeaider/common";
import { formatYupError } from "./../../../utils/formatYupError";
import { UserModel } from "./../../../models/User";
import { RoleModel } from "./../../../models/Role";
import { UserSubscriptionModel } from "./../../../models/UserSubscription";
import { duplicateEmail } from "./../../../modules/users/register/constants";

export const createOrRegister = async (role: String, input: any) => {
  try {
    await validUserSchema.validate({ ...input, role }, { abortEarly: false });
  } catch (err) {
    return { errors: formatYupError(err) };
  }

  const subscription = await UserSubscriptionModel.findOne({
    amount: 0,
  }).exec();
  // const services = Service.find();

  const { email, password } = input;

  const roleData = await RoleModel.findOne({ name: role }, "_id")
    .lean()
    .exec();

  if (!roleData) {
    return {
      errors: [
        {
          path: "email",
          message: "This role is not yet available",
        },
      ],
    };
  }

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
    password: await bcrypt.hash(password, bcrypt.genSaltSync(10)),
    subscription,
    role: roleData._id,
  });

  await user.save();

  return { errors: [] };
};
