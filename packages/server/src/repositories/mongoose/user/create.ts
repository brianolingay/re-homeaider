import { UserInput } from "../../../modules/users/createInput";
import { createOrRegister } from "./shared";

export const create = async (userInput: UserInput) => {
  return await createOrRegister("admin", userInput);
};
