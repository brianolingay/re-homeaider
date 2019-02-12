import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloReducerConfig,
} from "apollo-boost";
import { createHttpLink, HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import fetch from "isomorphic-unfetch";
import { isBrowser } from "./isBrowser";
import { Tokens } from "./authTokenStore";

const apolloMap: { [key: string]: ApolloClient<NormalizedCacheObject> } = {};

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

function create(
  linkOptions: HttpLink.Options,
  initialState: any,
  { getTokens }: { getTokens: () => Promise<Tokens> },
  cacheConfig: ApolloReducerConfig = {}
) {
  const httpLink = createHttpLink(linkOptions);

  const authLink = setContext(async (_, { headers }) => {
    const tokens = await getTokens();
    return {
      headers: {
        ...headers,
        ["x-token"]: tokens.token,
        ["x-refresh_token"]: tokens.refreshToken,
      },
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(cacheConfig).restore(initialState || {}),
  });
}

export default function initApollo(
  linkOptions: HttpLink.Options,
  initialState: any,
  options: { getTokens: () => Promise<Tokens> },
  cacheConfig: ApolloReducerConfig = {}
) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(linkOptions, initialState, options, cacheConfig);
  }

  // Reuse client on the client-side
  if (!apolloMap[linkOptions.uri as string]) {
    apolloMap[linkOptions.uri as string] = create(
      linkOptions,
      initialState,
      options,
      cacheConfig
    );
  }

  return apolloMap[linkOptions.uri as string];
}
