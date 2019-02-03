import * as React from "react";
import { Icon } from "expo";

import { Colors } from "../constants/Colors";

class TabBarIconComponent extends React.Component<{
  name: string;
  focused: boolean;
}> {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={
          this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
        }
      />
    );
  }
}

export const TabBarIcon = TabBarIconComponent;
