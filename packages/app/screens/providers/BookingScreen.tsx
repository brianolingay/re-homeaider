import * as React from "react";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Content,
} from "native-base";
import { AvailableBookings } from "../../components/providers/AvailableBookings";
import { meQuery } from "../../graphql/user/queries/me";
import { DrawerActions } from "react-navigation";

type Props = {
  user: any;
  navigation: any;
};

export class BookingScreen extends React.PureComponent<Props> {
  static async getInitialProps({ apolloClient, navigation }: any) {
    const { data: user } = await apolloClient.query({
      query: meQuery,
    });

    if (user && user.me) {
      const {
        role: { name },
        services,
      } = user.me;
      navigation.navigate(
        services.lenght
          ? "Profile"
          : name === "service_seeker"
          ? "Seekers"
          : "Providers"
      );
    }

    return {
      navigation,
      user,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          >
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Bookings</Title>
        </Body>
        <Right />
      </Header>
    ),
  });

  render() {
    return (
      <Container>
        <Content padder>
          <AvailableBookings {...this.props} type="Booking" />
        </Content>
      </Container>
    );
  }
}
