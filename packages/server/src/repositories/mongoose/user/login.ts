import * as bcrypt from "bcryptjs";
import { loginSchema } from "@homeaider/common";

import { formatYupError } from "./../../../utils/formatYupError";
import { UserModel } from "./../../../models/User";
import { LoginInput } from "./../../../modules/users/login/createInput";
import { invalidLogin } from "./../../../modules/users/login/constants";
import { createToken } from "../../../utils/jwtAuth";

const errorResponse = [
  {
    path: "email",
    message: invalidLogin,
  },
];

export const login = async (isAdmin: Boolean, loginInput: LoginInput) => {
  try {
    await loginSchema.validate(loginInput, { abortEarly: false });
  } catch (err) {
    return { errors: formatYupError(err), user: null, tokens: null };
  }

  const { email, password } = loginInput;
  const user = await UserModel.findOne({ email })
    .populate("role")
    .populate({
      path: "services",
      populate: { path: "category" },
    })
    .lean()
    .exec();

  if (!user) {
    return { errors: errorResponse, user: null, tokens: null };
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return { errors: errorResponse, user: null, tokens: null };
  }

  if (isAdmin) {
    if (user.role.name !== "admin") {
      return { errors: errorResponse, user: null, tokens: null };
    }
  }

  const tokens = await createToken(user);

  return { errors: [], user, tokens };
};
