import { MeQuery } from "../components/apollo-components";
import { meQuery } from "../graphql/user/queries/me";
import { NextContextWithApollo } from "../types/NextContextWithApollo";

export default async ({ apolloClient }: NextContextWithApollo) => {
  const { data: loggedInUser } = await apolloClient.query<MeQuery>({
    query: meQuery,
  });

  return loggedInUser;
};
