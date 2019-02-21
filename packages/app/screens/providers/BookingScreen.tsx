import * as React from "react";
import { Container, Content } from "native-base";

import { AvailableBookings } from "../../components/providers/AvailableBookings";
import { MeComponent } from "../../components/apollo-components";
import { AppLoading } from "expo";
import DrawerHeader from "../../components/DrawerHeader";

type Props = {
  navigation: any;
};

export class BookingScreen extends React.PureComponent<Props> {
  static navigationOptions = {
    header: null,
  };
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <DrawerHeader navigation={navigation} title="Booking" />
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
