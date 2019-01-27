import { CreateUserInput } from "../../../modules/users/createInput";
import { createOrRegister } from "./shared";

export const create = async (userInput: CreateUserInput) => {
  return await createOrRegister("admin", userInput);
};
