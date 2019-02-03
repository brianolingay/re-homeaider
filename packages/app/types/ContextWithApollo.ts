import { NextContext } from "next";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";

export interface ContextWithApollo {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}
