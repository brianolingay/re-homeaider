import { validUserSchema } from "@homeaider/common";
import * as bcrypt from "bcryptjs";
import { formatYupError } from "../utils/formatYupError";
import { RegisterInput } from "./auth/inputs/Register";
import { duplicateEmail } from "./users/constants";
import UserDBA from "./users/UserDBA";
import { UserInput } from "./users/UserInput";
import RoleDBA from "./roles/RoleDBA";
import UserSubscriptionDBA from "./userSubscriptions/UserSubscriptionDBA";

export default async (role: String, input: UserInput | RegisterInput) => {
  try {
    await validUserSchema.validate({ ...input, role }, { abortEarly: false });
  } catch (err) {
    return { errors: formatYupError(err) };
  }

  const subscription = await UserSubscriptionDBA.get({
    amount: 0,
  });
  // const services = Service.find();

  const { email, password } = input;

  const roleData = await RoleDBA.doExists({ name: role });

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

  const userAlreadyExists = await UserDBA.doExists({ email });

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

  try {
    await UserDBA.create({
      ...input,
      password: await bcrypt.hash(password, bcrypt.genSaltSync(10)),
      subscription,
      role: roleData._id,
    });
  } catch (error) {
    throw error;
  }

  return { errors: [] };
};
