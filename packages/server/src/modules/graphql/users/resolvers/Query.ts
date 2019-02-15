import { QueryMutationMap } from "../../../../types/graphql-utils";
import { UserRepository } from "../../../../repositories/mongoose/user";

export const UserQuery: QueryMutationMap = {
  async me(_, __, { user }) {
    if (user) {
      return null;
    }

    return await UserRepository.me(user!._id);
  },

  async allAdminExceptMe(_, __, { user }) {
    const { _id } = user;

    return await UserRepository.allAdminExceptMe(_id);
  },
};
