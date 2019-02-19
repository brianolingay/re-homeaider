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
import {
  UserInfoFragment,
  MeComponent,
} from "../../components/apollo-components";
import { AvailableHiring } from "../../components/providers/AvailableHiring";
import { DrawerActions } from "react-navigation";
import { AppLoading } from "expo";

type Props = {
  me: UserInfoFragment;
  navigation: any;
};

export class HiringScreen extends React.PureComponent<Props> {
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
          <Title>Hirings</Title>
        </Body>
        <Right />
      </Header>
    ),
  });
  render() {
    return (
      <Container>
        <Content padder>
          <MeComponent>
            {({ data: { me }, loading }) => {
              if (loading) {
                return <AppLoading />;
              }

              return (
                <AvailableHiring
                  me={me}
                  navigation={this.props.navigation}
                  type="Hiring"
                />
              );
            }}
          </MeComponent>
        </Content>
      </Container>
    );
  }
}
