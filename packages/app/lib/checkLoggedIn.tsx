import { meQuery } from "../graphql/user/queries/me";
import { ContextWithApollo } from "../types/ContextWithApollo";
import { MeQuery } from "../components/apollo-components";

export default async ({ apolloClient }: ContextWithApollo) => {
  const { data: loggedInUser } = await apolloClient.query<MeQuery>({
    query: meQuery,
  });

  return loggedInUser ? { loggedInUser } : {};
};
