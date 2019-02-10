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
import { UserInfoFragment } from "../../components/apollo-components";

type Props = {
  me: UserInfoFragment;
  navigation: any;
};

export class BookingScreen extends React.PureComponent<Props> {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Booking</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <AvailableBookings {...this.props} type="Booking" />
        </Content>
      </Container>
    );
  }
}
