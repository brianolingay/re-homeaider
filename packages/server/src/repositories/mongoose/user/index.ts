import { create } from "./create";
import { deleteUser } from "./delete";
import { login } from "./login";
import { me, allAdminExceptMe, providersByService } from "./read";
import { register } from "./register";
import { update } from "./update";

export const UserRepository = {
  allAdminExceptMe,
  create,
  deleteUser,
  login,
  me,
  providersByService,
  register,
  update,
};
