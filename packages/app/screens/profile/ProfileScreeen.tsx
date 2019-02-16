import * as React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Title,
  Right,
  Text,
  H1
} from "native-base";

const styles = StyleSheet.create({
  listHows: {
    paddingLeft: 5,
  },
});

export default class ProfileScreen extends React.PureComponent<{
  navigation: any;
}> {
  static navigationOptions = {
    header: (
      <Header>
        <Left />
        <Body />
        <Right />
      </Header>
    ),
  };

  render() {
    return (
      <Container>
        <Content padder>
          <H1 style={{ textAlign: "center" }}>Profile</H1>
          <Text style={styles.listHows}>
            Profile content here
          </Text>
        </Content>
      </Container>
    );
  }
}
