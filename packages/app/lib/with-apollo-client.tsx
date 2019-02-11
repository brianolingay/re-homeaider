import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";

import initApollo from "./init-apollo";
import { NormalizedCacheObject, ApolloClient } from "apollo-boost";
import { meQuery } from "../graphql/user/queries/me";
import { MeQuery } from "../components/apollo-components";

const host = "https://homeaider-server.herokuapp.com";

const SERVER_LINK_OPTIONS = {
  uri: `http://${host}/graphql`,
  credentials: "include",
};

const wsUrl = `ws://${host}/subscriptions`;

export default (App: any) => {
  return class WithData extends React.Component {
    static displayName = `WithData(${App.displayName})`;
    static propTypes = {
      apolloState: PropTypes.object.isRequired,
    };

    static async getInitialProps(ctx: any) {
      const apollo = initApollo(
        SERVER_LINK_OPTIONS,
        wsUrl,
        {},
        {
          getToken: async () => await AsyncStorage.getItem("userId"),
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
      this.apolloClient = initApollo(
        SERVER_LINK_OPTIONS,
        wsUrl,
        props.apolloState,
        {
          getToken: async () => await AsyncStorage.getItem("userId"),
        }
      );
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
