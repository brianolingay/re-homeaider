import * as React from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import {
  Button,
  Container,
  Content,
  H1,
  H2,
  Text,
  H3,
  Header,
  Left,
  Body,
  Title,
  Right,
} from "native-base";
import { UserInfoFragment } from "../components/apollo-components";

const styles = StyleSheet.create({
  listHows: {
    paddingLeft: 5,
  },
});

export class LandingScreen extends React.PureComponent<{
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
          <H1 style={{ textAlign: "center" }}>Homeaider</H1>
          <H2
            style={{ textAlign: "center" }}
          >{`Marketplace For Home Services & Freelancers`}</H2>
          <H1 style={{ marginTop: 5 }}>How it works</H1>
          <Text style={styles.listHows}>
            1. Seekers request(Book) any services available.
          </Text>
          <Text style={styles.listHows}>
            2. Seekers pick favorite or hire provider.
          </Text>
          <Text style={styles.listHows}>
            3. Providers can accept/ignore/reject seekers request.
          </Text>
          <Text style={styles.listHows}>
            4. Job request or receival will be limited depending on user
            subscription.
          </Text>
          <Button
            block
            primary
            style={{ marginTop: 5 }}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text>Login</Text>
          </Button>
          <H3 style={{ textAlign: "center", marginTop: 5 }}>OR</H3>
          <Button
            block
            primary
            style={{ marginTop: 5 }}
            onPress={() =>
              this.props.navigation.navigate("Register", {
                role: "service_seeker",
              })
            }
          >
            <Text>Register as Seeker</Text>
          </Button>
          <Button
            block
            primary
            style={{ marginTop: 5 }}
            onPress={() =>
              this.props.navigation.navigate("Register", {
                role: "provider",
              })
            }
          >
            <Text>Register as Provider</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
