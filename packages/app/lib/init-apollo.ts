import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloReducerConfig,
} from "apollo-boost";
import { createHttpLink, HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const apolloMap: { [key: string]: ApolloClient<NormalizedCacheObject> } = {};

function create(
  linkOptions: HttpLink.Options,
  ws: string,
  initialState: any,
  { getToken }: { getToken: () => Promise<string> },
  cacheConfig: ApolloReducerConfig = {}
) {
  const httpLink = createHttpLink(linkOptions);

  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: ws,
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: async () => {
        const userId = await getToken();

        return userId;
      },
    },
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    link: split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query) as any;
        return kind === "OperationDefinition" && operation === "subscription";
      },
      wsLink,
      httpLink
    ),
    cache: new InMemoryCache(cacheConfig).restore(initialState || {}),
  });
}

export default function initApollo(
  linkOptions: HttpLink.Options,
  ws: string,
  initialState: any,
  options: { getToken: () => Promise<string> },
  cacheConfig: ApolloReducerConfig = {}
) {
  // Reuse client on the client-side
  if (!apolloMap[linkOptions.uri as string]) {
    apolloMap[linkOptions.uri as string] = create(
      linkOptions,
      ws,
      initialState,
      options,
      cacheConfig
    );
  }

  return apolloMap[linkOptions.uri as string];
}
