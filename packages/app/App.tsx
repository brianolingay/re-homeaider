import * as React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage,
} from "react-native";
// @ts-ignore
import { AppLoading, Asset, Font, Icon } from "expo";
import { ApolloProvider } from "react-apollo";
import { AppNavigator } from "./navigation/AppNavigator";

import initApollo from "./lib/init-apollo";
import { NormalizedCacheObject, ApolloClient } from "apollo-boost";
import { meQuery } from "./graphql/user/queries/me";
import { MeQuery } from "./components/apollo-components";

const host =
  Platform.OS === "ios" ? "http://localhost:4000" : "192.168.254.102:4000";

const SERVER_LINK_OPTIONS = {
  uri: `http://${host}/graphql`,
  credentials: "include",
};

const wsUrl = `ws://${host}/subscriptions`;

export default class App extends React.Component<any> {
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

    // Extract query data from the Apollo's store
    const apolloState = apollo.cache.extract();

    return {
      ...ctx,
      me,
      apolloState,
    };
  }

  apolloClient: ApolloClient<NormalizedCacheObject>;

  state = {
    isLoadingComplete: false,
  };

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
    const { skipLoadingScreen, ...otherProps } = this.props;
    if (!this.state.isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <ApolloProvider client={this.apolloClient}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <AppNavigator {...otherProps} />
          </ApolloProvider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png"),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
