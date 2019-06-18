import { meQuery } from "../graphql/auth/queries/me";
import { MeQuery } from "../components/apollo-components";
import { NextContextWithApollo } from "../types/NextContextWithApollo";

export default async ({ apolloClient }: NextContextWithApollo) => {
  const { data: loggedInUser } = await apolloClient.query<MeQuery>({
    query: meQuery,
  });

  return loggedInUser ? { loggedInUser } : {};
};
