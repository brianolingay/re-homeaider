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

export class BookScreen extends React.PureComponent<Props> {
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
          <AvailableCategories
            type="Book"
            navigation={this.props.navigation}
          />
        </Content>
      </Container>
    );
  }
}
