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
import { DrawerActions } from "react-navigation";
import { MeComponent } from "../../components/apollo-components";
import { AppLoading } from "expo";

type Props = {
  navigation: any;
};

export class BookingScreen extends React.PureComponent<Props> {
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
    const { navigation } = this.props;
    return (
      <Container>
        <Content padder>
          <MeComponent>
            {({ loading, data: { me } }) => {
              if (loading) {
                return <AppLoading />;
              }

              return (
                <AvailableBookings
                  user={me}
                  navigation={navigation}
                  type="Booking"
                />
              );
            }}
          </MeComponent>
        </Content>
      </Container>
    );
  }
}
