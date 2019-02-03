import * as React from "react";
import { Text } from "react-native";

class MonoTextComponent extends React.Component<{ style: any }> {
  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: "space-mono" }]}
      />
    );
  }
}

export const MonoText = MonoTextComponent;
