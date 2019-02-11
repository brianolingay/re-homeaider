import { MyContext } from "./../../../types/Context";
import * as bcrypt from "bcryptjs";
import { loginSchema } from "@homeaider/common";

import { formatYupError } from "./../../../utils/formatYupError";
import { UserModel } from "./../../../models/User";
import { LoginInput } from "./../../../modules/users/login/createInput";
import { invalidLogin } from "./../../../modules/users/login/constants";

const errorResponse = [
  {
    path: "email",
    message: invalidLogin,
  },
];

export const login = async (
  ctx: MyContext,
  isAdmin: Boolean,
  loginInput: LoginInput
) => {
  try {
    await loginSchema.validate(loginInput, { abortEarly: false });
  } catch (err) {
    return { errors: formatYupError(err), user: null };
  }

  const { email, password } = loginInput;
  const user = await UserModel.findOne({ email })
    .populate("role")
    .lean()
    .exec();

  if (!user) {
    return { errors: errorResponse, user: null };
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return { errors: errorResponse, user: null };
  }

  if (isAdmin) {
    if (user.role.name !== "admin") {
      return { errors: errorResponse, user: null };
    }
  }

  ctx.req.session!.userId = user._id;

  return { errors: [], user };
};
