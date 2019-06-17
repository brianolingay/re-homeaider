import { validUserSchema, validUpdateUserSchema } from "@homeaider/common";
import * as bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { RoleModel } from "../../models/Role";
import { UserModel } from "../../models/User";
import { UserSubscriptionModel } from "../../models/UserSubscription";
import { formatYupError } from "../../utils/formatYupError";
import { duplicateEmail } from "./constants";
import { UserInput } from "./UserInput";

export const createUser = async (role: String, input: any) => {
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

export const updateUser = async (userId: ObjectId, userInput: UserInput) => {
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

export const findUserBy = async (
  condition: any,
  populate: [] = [],
  hidden: string = "password"
) => {
  let user = await UserModel.findOne(condition, `-${hidden}`);

  populate.forEach(element => {
    user = user!.populate(element);
  });

  user = user!.lean().exec();

  return user ? user : null;
};
