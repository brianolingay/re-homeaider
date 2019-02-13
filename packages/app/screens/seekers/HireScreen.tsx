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
import { DrawerActions } from "react-navigation";

type Props = {
  navigation: any;
};

export class HireScreen extends React.PureComponent<Props> {
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
          <Title>Hire</Title>
        </Body>
        <Right />
      </Header>
    ),
  });

  render() {
    return (
      <Container>
        <Content padder>
          <AvailableCategories type="Hire" navigation={this.props.navigation} />
        </Content>
      </Container>
    );
  }
}
