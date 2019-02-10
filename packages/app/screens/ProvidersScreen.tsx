import * as React from "react";
import {
  ProvidersByServiceComponent,
  UserInfoFragment,
} from "../components/apollo-components";
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
  List,
  ListItem,
  Text,
  Card,
  CardItem,
} from "native-base";

type Props = {
  navigation: any;
};

interface State {
  provider: UserInfoFragment | null;
}

export class ProvidersScreen extends React.PureComponent<Props, State> {
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

  static state = {
    provider: null,
  };

  render() {
    const { navigation } = this.props;
    const type = navigation.getParam("type");
    const serviceId = navigation.getParam("serviceId");
    return (
      <ProvidersByServiceComponent variables={serviceId}>
        {({ data: { providersByService } }) => {
          return (
            <Container>
              <Content>
                {!this.state.provider ? (
                  <List>
                    {providersByService.map(item => (
                      <ListItem
                        key={`provider-${item._id}`}
                        onPress={() => this.setState({ provider: item })}
                      >
                        <Body>
                          <Text>
                            {item.firstName} {item.lastName}
                          </Text>
                          <Text note>Email: {item.email}</Text>
                        </Body>
                        <Right>
                          <Text>Proceed</Text>
                        </Right>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Card>
                    <CardItem header>
                      <Body>
                        <Text>
                          {this.state.provider.firstName}{" "}
                          {this.state.provider.lastName}
                        </Text>
                        <Text note>Email: {this.state.provider.email}</Text>
                      </Body>
                    </CardItem>
                    <CardItem cardBody>
                      <Card transparent>
                        <CardItem>
                          <Body>
                            <Text>
                              {this.state.provider.address}
                              {", "}
                              {this.state.provider.city}
                              {", "}
                              {this.state.provider.country}
                            </Text>
                            <Text note>Address</Text>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text>{this.state.provider.mobile}</Text>
                            <Text note>Mobile</Text>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text>{this.state.provider.phone}</Text>
                            <Text note>Phone</Text>
                          </Body>
                        </CardItem>
                      </Card>
                    </CardItem>
                    <CardItem footer>
                      <Button
                        iconLeft
                        danger
                        onPress={() => this.setState({ provider: null })}
                      >
                        <Icon type="Entypo" name="block" color="#ffffff" />
                        <Text>Cancel</Text>
                      </Button>
                      <Button
                        iconLeft
                        primary
                        onPress={() =>
                          navigation.navigate("CreateRequest", {
                            type,
                            serviceId,
                            providerId: this.state.provider._id,
                          })
                        }
                      >
                        <Icon type="FontAwesome" name="check" />
                        <Text>Proceed</Text>
                      </Button>
                    </CardItem>
                  </Card>
                )}
              </Content>
            </Container>
          );
        }}
      </ProvidersByServiceComponent>
    );
  }
}
