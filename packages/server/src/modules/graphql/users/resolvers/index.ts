import { UserQuery } from "./Query";
import { UserMutation } from "./Mutation";

export const resolvers = {
  Query: {
    ...UserQuery,
  },
  Mutation: {
    ...UserMutation,
  },
};
