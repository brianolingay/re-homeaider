import * as React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

class ScreenComponent extends React.Component {
  static navigationOptions = {
    title: "Links",
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
         * content, we just wanted to provide you with some helpful links */}
        <Text>Link 1</Text>
        <Text>Link 2</Text>
        <Text>Link 3</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
  },
});

export const LinksScreen = ScreenComponent;
