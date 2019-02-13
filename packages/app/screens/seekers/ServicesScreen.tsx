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
import { AppLoading } from "expo";

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
    const categoryId = navigation.getParam("categoryId") as any;
    console.log(categoryId);

    return (
      <FindServicesByCategoryComponent variables={{ categoryId }}>
        {({ data: { findServicesByCategory }, loading }) => {
          if (loading) {
            return <AppLoading />;
          }
          return (
            <Container>
              <Content>
                <List>
                  {findServicesByCategory.map(item => (
                    <ListItem
                      key={`service-${item._id}`}
                      onPress={() => {
                        const screen =
                          type === "Book" ? "CreateRequest" : "Providers";
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
