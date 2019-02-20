import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloReducerConfig,
  from,
} from "apollo-boost";
import { createHttpLink, HttpLink } from "apollo-link-http";
import { split, ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { NativeTokens, nativeAuthTokenStorage } from "./nativeAuthTokenStorage";
import { onError } from "apollo-link-error";

const apolloMap: { [key: string]: ApolloClient<NormalizedCacheObject> } = {};

function create(
  linkOptions: HttpLink.Options,
  ws: string,
  initialState: any,
  { getTokens }: { getTokens: () => Promise<NativeTokens> },
  cacheConfig: ApolloReducerConfig = {}
) {
  const httpLink = createHttpLink(linkOptions);

  const authLink = setContext(async (_, { headers }) => {
    const tokens = await getTokens();

    if (tokens.token && tokens.refreshToken) {
      return {
        headers: {
          ...headers,
          ["x-token"]: tokens.token,
          ["x-refresh_token"]: tokens.refreshToken,
        },
      };
    }

    return {
      ...headers,
    };
  });

  const afterwareLink = new ApolloLink((operation, forward) =>
    forward(operation).map(response => {
      const {
        response: { headers },
      } = operation.getContext();
      if (headers) {
        const token = headers.get("x-token");
        const refreshToken = headers.get("x-refresh-token");

        if (token && refreshToken) {
          nativeAuthTokenStorage.setTokens({ token, refreshToken });
        }
      }

      return response;
    })
  );

  const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: ws,
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: async () => {
        const tokens = await getTokens();

        return tokens;
      },
    },
  });

  const httpLinkWithMiddleware = from([
    errorLink,
    afterwareLink,
    authLink,
    httpLink,
  ]);

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    link: split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query) as any;
        return kind === "OperationDefinition" && operation === "subscription";
      },
      wsLink,
      httpLinkWithMiddleware
    ),
    cache: new InMemoryCache(cacheConfig).restore(initialState || {}),
  });
}

export default function initApollo(
  linkOptions: HttpLink.Options,
  ws: string,
  initialState: any,
  options: { getTokens: () => Promise<NativeTokens> },
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
