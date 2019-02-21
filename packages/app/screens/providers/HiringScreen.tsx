import * as React from "react";
import { Container, Content } from "native-base";
import {
  UserInfoFragment,
  MeComponent,
} from "../../components/apollo-components";
import { AvailableHiring } from "../../components/providers/AvailableHiring";
import { AppLoading } from "expo";
import DrawerHeader from "../../components/DrawerHeader";

type Props = {
  me: UserInfoFragment;
  navigation: any;
};

export class HiringScreen extends React.PureComponent<Props> {
  static navigationOptions = {
    header: null,
  };
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <DrawerHeader navigation={navigation} title="Hiring" />
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
