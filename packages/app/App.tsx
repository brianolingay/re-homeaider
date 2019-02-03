import * as React from "react";
import { Platform, StatusBar, StyleSheet, View, Text } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import { ApolloProvider } from "react-apollo";
import { AppNavigator } from "./navigation/AppNavigator";
import { ContextWithApollo } from "./types/ContextWithApollo";
import withApolloClient from "./lib/with-apollo-client";

type Props = {
  skipLoadingScreen: any;
};

export interface DefaultAppIProps {
  pageProps: any;
}

class App extends React.Component<
  Props & DefaultAppIProps & ContextWithApollo,
  { isLoadingComplete: boolean }
> {
  static getInitialProps(context: any) {
    return { context };
  }
}

class NativeApp extends App {
  state = {
    isLoadingComplete: false,
  };

  render() {
    const { skipLoadingScreen, pageProps, apolloClient } = this.props;
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
          <ApolloProvider client={apolloClient}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <AppNavigator {...pageProps} />
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

export default withApolloClient(NativeApp);
