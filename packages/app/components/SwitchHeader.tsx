import * as React from "react";
import { Platform } from "react-native";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";

const padding = Platform.OS === "ios" ? 0 : 20;

const SwitchHeader = ({ navigation, title }) => (
  <Header style={{ paddingTop: padding, paddingBottom: padding / 1.5 }}>
    <Left>
      <Button transparent onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" />
      </Button>
    </Left>
    <Body>
      <Title>{title}</Title>
    </Body>
    <Right />
  </Header>
);

export default SwitchHeader;
