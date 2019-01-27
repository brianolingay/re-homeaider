
import { RegisterInput } from "../../../modules/users/register/createInput";
import { createOrRegister } from "./shared";

export const register = async (role: String, registerInput: RegisterInput) => {
  return await createOrRegister(role, registerInput)
};
