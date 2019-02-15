import { QueryMutationMap } from "../../../../types/graphql-utils";
import { UserRepository } from "../../../../repositories/mongoose/user";

export const UserMutation: QueryMutationMap = {
  async register(_, { role, registerInput }) {
    return await UserRepository.register(role, registerInput);
  },

  async login(_, { isAdmin, loginInput }) {
    return await UserRepository.login(isAdmin, loginInput);
  },
};
