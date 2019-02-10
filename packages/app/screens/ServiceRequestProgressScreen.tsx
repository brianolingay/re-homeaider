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
} from "native-base";
import {
  ServiceRequestProgressComponent,
  UserInfoFragment,
} from "../components/apollo-components";
import { MapViewContainer } from "../components/MapViewContainer";
import { UpdateServiceRequestProcessContainer } from "../components/UpdateServiceResquestContainer";

type Props = {
  me: UserInfoFragment;
  navigation: any;
};

interface State {
  amount: number;
  rating: number;
  shouldReSubscribe: boolean;
}

export class ServiceRequestProcessScreen extends React.PureComponent<
  Props,
  State
> {
  static navigationOptions = ({ navigation }) => {
    const type = navigation.getParam("type");
    return {
      header: `${type} Progress`,
    };
  };

  static state = {
    amount: 0,
    rating: 0,
    shouldReSubscribe: true,
  };

  componentWillUnmount() {
    this.setState({ shouldReSubscribe: false });
  }

  render() {
    const { navigation, me } = this.props;
    const serviceRequestId = navigation.getParam("serviceRequestId");

    return (
      <ServiceRequestProgressComponent
        variables={serviceRequestId}
        shouldResubscribe={this.state.shouldReSubscribe}
      >
        {({ data: { serviceRequestProgress }, loading }) => {
          if (loading) {
            return <Text>Loading...</Text>;
          }

          if (serviceRequestProgress.canceledAt) {
            return navigation.goBack();
          }

          return (
            <Container>
              <Content>
                <Card transparent>
                  <CardItem>
                    <Body>
                      <H1 style={{ textAlign: "center" }}>
                        {serviceRequestProgress.service.category.name}
                      </H1>
                      <Text note style={{ textAlign: "center" }}>
                        Category
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <H2 style={{ textAlign: "center" }}>
                        {serviceRequestProgress.service.name}
                      </H2>
                      <Text note style={{ textAlign: "center" }}>
                        Service
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem cardBody>
                    <MapViewContainer
                      latitude={serviceRequestProgress.coordinates[0]}
                      longitude={serviceRequestProgress.coordinates[1]}
                      coordinates={
                        serviceRequestProgress.provider
                          ? [
                              serviceRequestProgress.coordinates,
                              serviceRequestProgress.provider.coordinates,
                            ]
                          : [serviceRequestProgress.coordinates, []]
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
                              {serviceRequestProgress.serviceSeeker.firstName}{" "}
                              {serviceRequestProgress.serviceSeeker.lastName}
                            </Text>
                            <Text note>Seeker Name</Text>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text>
                              {serviceRequestProgress.serviceSeeker.email}
                            </Text>
                            <Text note>Seeker Email</Text>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text>
                              {serviceRequestProgress.serviceSeeker.mobile}
                            </Text>
                            <Text note>Mobile</Text>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text>
                              {serviceRequestProgress.serviceSeeker.phone}
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
                              {serviceRequestProgress.provider.firstName}{" "}
                              {serviceRequestProgress.provider.lastName}
                            </Text>
                            <Text note>Seeker Name</Text>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text>{serviceRequestProgress.provider.email}</Text>
                            <Text note>Seeker Email</Text>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text>
                              {serviceRequestProgress.provider.mobile}
                            </Text>
                            <Text note>Mobile</Text>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text>{serviceRequestProgress.provider.phone}</Text>
                            <Text note>Phone</Text>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text>
                              {serviceRequestProgress.provider.address}
                              {", "}
                              {serviceRequestProgress.provider.city}
                              {", "}
                              {serviceRequestProgress.provider.country}
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
                        {serviceRequestProgress.arrivedAt
                          ? serviceRequestProgress.arrivedAt
                          : "N/A"}
                      </Text>
                      <Text note>Arrived At</Text>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>
                        {serviceRequestProgress.startedAt
                          ? serviceRequestProgress.startedAt
                          : "N/A"}
                      </Text>
                      <Text note>Started At</Text>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>
                        {serviceRequestProgress.completedAt
                          ? serviceRequestProgress.completedAt
                          : "N/A"}
                      </Text>
                      <Text note>Completed At</Text>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>
                        {serviceRequestProgress.arrivedAt
                          ? serviceRequestProgress.arrivedAt
                          : "N/A"}
                      </Text>
                      <Text note>Arrived At</Text>
                    </Body>
                  </CardItem>
                </Card>
                <UpdateServiceRequestProcessContainer
                  {...this.props}
                  serviceRequestProgress={serviceRequestProgress}
                />
              </Content>
            </Container>
          );
        }}
      </ServiceRequestProgressComponent>
    );
  }
}
