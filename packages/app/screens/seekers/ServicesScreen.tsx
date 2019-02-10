import * as React from "react";
import { FindServicesByCategoryComponent } from "../../components/apollo-components";
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Container,
  Content,
  ListItem,
  List,
  Text,
} from "native-base";

type Props = {
  navigation: any;
};

export class ServicesScreen extends React.PureComponent<Props> {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Services</Title>
        </Body>
        <Right />
      </Header>
    ),
  });
  render() {
    const { navigation } = this.props;
    const type = navigation.getParam("type");
    const categoryId = navigation.getParam("categoryId");

    return (
      <FindServicesByCategoryComponent variables={categoryId}>
        {({ data: { findServicesByCategory } }) => {
          return (
            <Container>
              <Content>
                <List>
                  {findServicesByCategory.map(item => (
                    <ListItem
                      key={`service-${item._id}`}
                      onPress={() => {
                        const screen =
                          type === "Booking" ? "CreateRequest" : "Providers";
                        navigation.navigate(screen, {
                          type,
                          serviceId: item._id,
                        });
                      }}
                    >
                      <Body>
                        <Text>{item.name}</Text>
                        <Text note>
                          Total Available Services: {item.totalUsers}
                        </Text>
                      </Body>
                      <Right>
                        <Text>Proceed</Text>
                      </Right>
                    </ListItem>
                  ))}
                </List>
              </Content>
            </Container>
          );
        }}
      </FindServicesByCategoryComponent>
    );
  }
}
