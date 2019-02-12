import React from "react";
import PropTypes from "prop-types";
import { getDataFromTree } from "react-apollo";
import Head from "next/head";

import initApollo from "./init-apollo";
import { isBrowser } from "./isBrowser";
import { NormalizedCacheObject, ApolloClient } from "apollo-boost";
import { meQuery } from "../graphql/user/queries/me";
import { MeQuery } from "../components/apollo-components";
import { authTokenStore } from "./authTokenStore";

//const url = "https://homeaider-server.herokuapp.com"
const url = "http://localhost:4000";

const SERVER_LINK_OPTIONS = {
  uri: `${url}/graphql`,
  credentials: "include",
};

export default (App: any) => {
  return class WithData extends React.Component {
    static displayName = `WithData(${App.displayName})`;
    static propTypes = {
      apolloState: PropTypes.object.isRequired,
    };

    static async getInitialProps(ctx: any) {
      const {
        Component,
        router,
        ctx: { req, res },
      } = ctx;
      const apollo = initApollo(
        SERVER_LINK_OPTIONS,
        {},
        {
          getTokens: async () => {
            const token = req.headers["x-token"];
            const refreshToken = req.headers["x-refresh-token"];
            return { token, refreshToken };
          },
        }
      );

      const {
        data: { me },
      } = await apollo.query<MeQuery>({
        query: meQuery,
      });

      ctx.ctx.apolloClient = apollo;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      if (!isBrowser) {
        // Run all graphql queries in the component tree
        // and extract the resulting data
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error("Error while running `getDataFromTree`", error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo's store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        me,
        apolloState,
      };
    }

    apolloClient: ApolloClient<NormalizedCacheObject>;

    constructor(props: any) {
      super(props);
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient = initApollo(SERVER_LINK_OPTIONS, props.apolloState, {
        getTokens: authTokenStore.getTokens,
      });
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
