import * as React from "react";
import { Text } from "react-native";

class ScreenComponent extends React.Component {
  static navigationOptions = {
    title: "app.json",
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <Text>Settings</Text>;
  }
}

export const SettingsScreen = ScreenComponent;
