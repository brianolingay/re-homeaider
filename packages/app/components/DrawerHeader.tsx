import * as React from "react";
import { DrawerActions } from "react-navigation";
import { Platform } from "react-native";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";

const padding = Platform.OS === "ios" ? 0 : 20;

const DrawerHeader = ({ navigation, title }) => (
  <Header style={{ paddingTop: padding, paddingBottom: padding / 1.5 }}>
    <Left>
      <Button
        transparent
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Icon name="menu" />
      </Button>
    </Left>
    <Body>
      <Title>{title}</Title>
    </Body>
    <Right />
  </Header>
);

export default DrawerHeader;
