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
import { UserInfoFragment } from "../../components/apollo-components";
import { AvailableHiring } from "../../components/providers/AvailableHiring";

type Props = {
  me: UserInfoFragment;
  navigation: any;
};

export class HiringScreen extends React.PureComponent<Props> {
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
            <Title>Hiring</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <AvailableHiring {...this.props} type="Hiring" />
        </Content>
      </Container>
    );
  }
}
