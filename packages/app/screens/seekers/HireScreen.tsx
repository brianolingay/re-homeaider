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
import { AvailableCategories } from "../../components/seekers/AvaialbleCategories";

type Props = {
  navigation: any;
};

export class HireScreen extends React.PureComponent<Props> {
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
          <AvailableCategories type="Hire" navigation={this.props.navigation} />
        </Content>
      </Container>
    );
  }
}
