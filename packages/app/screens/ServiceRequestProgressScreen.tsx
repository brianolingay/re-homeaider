import * as React from "react";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  H1,
  H2,
  Header,
  Left,
  Right,
  Button,
} from "native-base";
import {
  UserInfoFragment,
  ViewServiceRequestComponent,
} from "../components/apollo-components";
import { MapViewContainer } from "../components/MapViewContainer";
import { UpdateServiceRequestProcessContainer } from "../components/UpdateServiceResquestContainer";
import { serviceRequestProgressSubscription } from "../graphql/serviceRequest/subscriptions/serviceRequestProgress";
import { AppLoading } from "expo";

type Props = {
  me: UserInfoFragment;
  navigation: any;
};

export class ServiceRequestProcessScreen extends React.PureComponent<Props> {
  static navigationOptions = ({ navigation }) => {
    const type = navigation.getParam("type");
    return {
      header: (
        <Header>
          <Left />
          <Body>
            <Text>{`${type} Progress`}</Text>
          </Body>
          <Right />
        </Header>
      ),
    };
  };

  state = {
    amount: 0,
    rating: 0,
    shouldReSubscribe: true,
  };

  unsubscribe: (() => void) | undefined;

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { navigation, me } = this.props;
    const serviceRequestId = navigation.getParam("serviceRequestId");

    return (
      <ViewServiceRequestComponent variables={{ serviceRequestId }}>
        {({ data: { viewServiceRequest }, loading, subscribeToMore }) => {
          if (loading) {
            return <AppLoading />;
          }

          this.unsubscribe = subscribeToMore({
            document: serviceRequestProgressSubscription,
            variables: { serviceRequestId },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) {
                return prev;
              }

              return {
                ...prev,
                viewServiceRequest: {
                  ...prev.viewServiceRequest,
                  ...(subscriptionData.data as any).serviceRequestProgress
                    .serviceRequest,
                },
              };
            },
          });

          return (
            <Container>
              <Content>
                <Card transparent>
                  <CardItem>
                    <Body>
                      <H1 style={{ textAlign: "center" }}>
                        {viewServiceRequest.service.category.name}
                      </H1>
                      <Text note style={{ textAlign: "center" }}>
                        Category
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <H2 style={{ textAlign: "center" }}>
                        {viewServiceRequest.service.name}
                      </H2>
                      <Text note style={{ textAlign: "center" }}>
                        Service
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem cardBody>
                    <MapViewContainer
                      latitude={viewServiceRequest.coordinates[0]}
                      longitude={viewServiceRequest.coordinates[1]}
                      coordinates={
                        viewServiceRequest.provider
                          ? [
                              viewServiceRequest.coordinates,
                              viewServiceRequest.provider.coordinates,
                            ]
                          : [viewServiceRequest.coordinates, []]
                      }
                    />
                  </CardItem>
                </Card>
                {me.role.name === "provider" ? (
                  <Card>
                    <CardItem>
                      <Body>
                        <H2 style={{ textAlign: "center" }}>Account Info</H2>
                      </Body>
                    </CardItem>
                    <CardItem cardBody>
                      <Card transparent>
                        <CardItem>
                          <Body>
                            <Text>
                              {viewServiceRequest.serviceSeeker.firstName}{" "}
                              {viewServiceRequest.serviceSeeker.lastName}
                            </Text>
                            <Text note>Seeker Name</Text>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text>
                              {viewServiceRequest.serviceSeeker.email}
                            </Text>
                            <Text note>Seeker Email</Text>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text>
                              {viewServiceRequest.serviceSeeker.mobile}
                            </Text>
                            <Text note>Mobile</Text>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text>
                              {viewServiceRequest.serviceSeeker.phone}
                            </Text>
                            <Text note>Phone</Text>
                          </Body>
                        </CardItem>
                      </Card>
                    </CardItem>
                  </Card>
                ) : (
                  <Card>
                    <CardItem>
                      <Body>
                        <H2 style={{ textAlign: "center" }}>Account Info</H2>
                      </Body>
                    </CardItem>
                    <CardItem cardBody>
                      <Card transparent>
                        <CardItem>
                          <Body>
                            <Text>
                              {viewServiceRequest.provider.firstName}{" "}
                              {viewServiceRequest.provider.lastName}
                            </Text>
                            <Text note>Seeker Name</Text>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text>{viewServiceRequest.provider.email}</Text>
                            <Text note>Seeker Email</Text>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text>{viewServiceRequest.provider.mobile}</Text>
                            <Text note>Mobile</Text>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text>{viewServiceRequest.provider.phone}</Text>
                            <Text note>Phone</Text>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text>
                              {viewServiceRequest.provider.address}
                              {", "}
                              {viewServiceRequest.provider.city}
                              {", "}
                              {viewServiceRequest.provider.country}
                            </Text>
                            <Text note>Address</Text>
                          </Body>
                        </CardItem>
                      </Card>
                    </CardItem>
                  </Card>
                )}
                <Card>
                  <CardItem>
                    <Body>
                      <H2>Updates</H2>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>
                        {viewServiceRequest.arrivedAt
                          ? viewServiceRequest.arrivedAt
                          : "N/A"}
                      </Text>
                      <Text note>Arrived At</Text>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>
                        {viewServiceRequest.startedAt
                          ? viewServiceRequest.startedAt
                          : "N/A"}
                      </Text>
                      <Text note>Started At</Text>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>
                        {viewServiceRequest.completedAt
                          ? viewServiceRequest.completedAt
                          : "N/A"}
                      </Text>
                      <Text note>Completed At</Text>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>
                        {viewServiceRequest.arrivedAt
                          ? viewServiceRequest.arrivedAt
                          : "N/A"}
                      </Text>
                      <Text note>Arrived At</Text>
                    </Body>
                  </CardItem>
                </Card>
                <UpdateServiceRequestProcessContainer
                  {...this.props}
                  serviceRequestProgress={viewServiceRequest}
                />
              </Content>
            </Container>
          );
        }}
      </ViewServiceRequestComponent>
    );
  }
}
