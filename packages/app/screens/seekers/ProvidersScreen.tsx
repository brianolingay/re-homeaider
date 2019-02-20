import * as React from "react";
import { ProvidersByServiceComponent } from "../../components/apollo-components";
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
import { AppLoading } from "expo";

type Props = {
  navigation: any;
};

export class ProvidersScreen extends React.PureComponent<Props> {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Providers</Title>
        </Body>
        <Right />
      </Header>
    ),
  });

  state = {
    provider: null,
  };

  render() {
    const { navigation } = this.props;
    const type = navigation.getParam("type");
    const serviceId = navigation.getParam("serviceId");
    return (
      <ProvidersByServiceComponent variables={{ serviceId }}>
        {({ data: { providersByService }, loading }) => {
          if (loading) {
            return <AppLoading />;
          }

          console.log(this.state.provider);

          return (
            <Container>
              <Content>
                {!this.state.provider ? (
                  <List>
                    {providersByService.map(item => (
                      <ListItem
                        key={`provider-${item._id}`}
                        onPress={() => {
                          // this.setState({ provider: item });
                          navigation.navigate("CreateRequest", {
                            type,
                            serviceId,
                            providerId: item._id,
                          });
                        }}
                      >
                        <Body>
                          <Text>
                            {item.user.firstName} {item.user.lastName}
                          </Text>
                          <Text note>Email: {item.user.email}</Text>
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
                        {this.state.provider.address &&
                        this.state.provider.city &&
                        this.state.provider.country ? (
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
                        ) : (
                          <CardItem>
                            <Body>
                              <Text>N/A</Text>
                              <Text note>Address</Text>
                            </Body>
                          </CardItem>
                        )}
                        <CardItem>
                          <Body>
                            <Text>{this.state.provider.mobile || `N/A`}</Text>
                            <Text note>Mobile</Text>
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
                            <Text>{this.state.provider.phone || `N/A`}</Text>
                            <Text note>Phone</Text>
                          </Body>
                        </CardItem>
                      </Card>
                    </CardItem>
                    <CardItem footer>
                      <Body
                        style={{ flex: 1, justifyContent: "space-between" }}
                      >
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
                      </Body>
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
