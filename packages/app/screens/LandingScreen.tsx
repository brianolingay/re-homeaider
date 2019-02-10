import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, Container, Content, H1, H2, Text, H3 } from "native-base";

const styles = StyleSheet.create({
  listHows: {
    paddingLeft: 5,
  },
});

export class LandingScreen extends React.PureComponent<{ navigation: any }> {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container>
        <Content padder>
          <H1>HomeAider</H1>
          <H2>{`Marketplace For Home Services & Freelancers`}</H2>
          <H1>How it works</H1>
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
            onPress={() => this.props.navigation.navigate("Login")}
          >
            Login
          </Button>
          <H3 style={{ textAlign: "center" }}>OR</H3>
          <Button
            block
            primary
            onPress={() =>
              this.props.navigation.navigate("Register", {
                role: "service_seeker",
              })
            }
          >
            Register as Seeker
          </Button>
          <Button
            block
            primary
            onPress={() =>
              this.props.navigation.navigate("Register", {
                role: "provider",
              })
            }
          >
            Register as Provider
          </Button>
        </Content>
      </Container>
    );
  }
}
