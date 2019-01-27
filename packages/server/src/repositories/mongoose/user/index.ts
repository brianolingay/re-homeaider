import { create } from "./create";
import { login } from "./login";
import { me, allExceptMe } from "./read";
import { register } from "./register";
import { update } from "./update";

export const UserRepository = {
  allExceptMe,
  create,
  login,
  me,
  register,
  update,
};
