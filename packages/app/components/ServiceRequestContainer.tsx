import * as React from "react";
import {
  Body,
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Spinner,
} from "native-base";
import { Dimensions } from "react-native";
import { MapViewContainer } from "./MapViewContainer";
import { UpdateServiceRequestProcessContainer } from "./UpdateServiceResquestContainer";
import {
  ServiceRequestInfoFragment,
  UserInfoFragment,
} from "./apollo-components";
import { shallowCompare } from "../utils/shouldComponentUpdateMixin";

const height = Dimensions.get("window").height / 3;

type Props = {
  me: UserInfoFragment;
  navigation: any;
  subscribe: () => () => void;
  type: string;
  viewServiceRequest: ServiceRequestInfoFragment;
};

const AccountInfoHeader = () => (
  <CardItem header>
    <Body>
      <Text style={{ fontSize: 18 }}>Account Info</Text>
    </Body>
  </CardItem>
);

const SeekerAcountInfo = ({ viewServiceRequest }) => (
  <Card>
    <AccountInfoHeader />
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
        <Text>{viewServiceRequest.serviceSeeker.email}</Text>
        <Text note>Seeker Email</Text>
      </Body>
    </CardItem>
    <CardItem>
      <Body>
        <Text>{viewServiceRequest.serviceSeeker.mobile}</Text>
        <Text note>Mobile</Text>
      </Body>
    </CardItem>
    <CardItem>
      <Body>
        <Text>{viewServiceRequest.serviceSeeker.phone}</Text>
        <Text note>Phone</Text>
      </Body>
    </CardItem>
  </Card>
);

const ProviderAccountInfo = ({ viewServiceRequest }) => (
  <Card>
    <AccountInfoHeader />
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
);

export class ServiceRequestContainer extends React.PureComponent<Props> {
  // componentDidUpdate(prevProps, prevState) {
  //   return shallowCompare(this, prevProps, prevState);
  // }

  unsubscribe: (() => void) | undefined;

  componentDidMount() {
    const { me, navigation, subscribe, viewServiceRequest, type } = this.props;
    if (
      me.role.name === "service_seeker" ||
      (me.role.name === "provider" && viewServiceRequest.accepted)
    ) {
      this.unsubscribe = subscribe();
    }

    if (viewServiceRequest.canceledAt || viewServiceRequest.ignoredAt) {
      navigation.navigate(type);
    }
  }

  render() {
    const { me, navigation, viewServiceRequest } = this.props;
    console.log(viewServiceRequest);
    return (
      <Container>
        <Content>
          <Card transparent>
            {viewServiceRequest.coordinates.length > 0 && (
              <CardItem cardBody>
                <MapViewContainer
                  latitude={viewServiceRequest.coordinates[0]}
                  longitude={viewServiceRequest.coordinates[1]}
                  coordinates={
                    viewServiceRequest.provider
                      ? [
                          {
                            color: "red",
                            coordinates: viewServiceRequest.coordinates,
                          },
                          {
                            color: "green",
                            coordinates:
                              viewServiceRequest.provider.coordinates,
                          },
                        ]
                      : [
                          {
                            color: "red",
                            coordinates: viewServiceRequest.coordinates,
                          },
                        ]
                  }
                  height={height}
                />
              </CardItem>
            )}
            <CardItem>
              <Body>
                <Text style={{ fontSize: 18 }}>
                  {viewServiceRequest.service.category.name} -{" "}
                  {viewServiceRequest.service.name}
                </Text>
                <Text note style={{ textAlign: "center" }}>
                  Category - Service
                </Text>
              </Body>
            </CardItem>
          </Card>
          {me.role.name === "provider" && viewServiceRequest.serviceSeeker && (
            <SeekerAcountInfo viewServiceRequest={viewServiceRequest} />
          )}
          {me.role.name === "service_seeker" && viewServiceRequest.provider && (
            <ProviderAccountInfo viewServiceRequest={viewServiceRequest} />
          )}
          {(me.role.name === "service_seeker" ||
            (me.role.name === "provider" && viewServiceRequest.accepted)) && (
            <Card>
              <CardItem header>
                <Body>
                  <Text style={{ fontSize: 18 }}>Updates</Text>
                </Body>
              </CardItem>
              {!viewServiceRequest.accepted && !viewServiceRequest.arrivedAt && (
                <CardItem>
                  <Spinner />
                </CardItem>
              )}
              {viewServiceRequest.accepted && !viewServiceRequest.arrivedAt && (
                <CardItem>
                  <Body>
                    <Text>Comming...</Text>
                  </Body>
                </CardItem>
              )}

              {Boolean(viewServiceRequest.amount) && (
                <CardItem>
                  <Body>
                    <Text>{viewServiceRequest.amount}</Text>
                    <Text note>Agreed Amount</Text>
                  </Body>
                </CardItem>
              )}
              {Boolean(viewServiceRequest.arrivedAt) && (
                <CardItem>
                  <Body>
                    <Text>{viewServiceRequest.arrivedAt}</Text>
                    <Text note>Arrived At</Text>
                  </Body>
                </CardItem>
              )}
              {Boolean(viewServiceRequest.startedAt) && (
                <CardItem>
                  <Body>
                    <Text>{viewServiceRequest.startedAt}</Text>
                    <Text note>Started At</Text>
                  </Body>
                </CardItem>
              )}
              {Boolean(viewServiceRequest.completedAt) && (
                <CardItem>
                  <Body>
                    <Text>{viewServiceRequest.completedAt}</Text>
                    <Text note>Completed At</Text>
                  </Body>
                </CardItem>
              )}
            </Card>
          )}
          <UpdateServiceRequestProcessContainer
            navigation={navigation}
            me={me}
            serviceRequestProgress={viewServiceRequest}
            unsubscribe={this.unsubscribe}
          />
        </Content>
      </Container>
    );
  }
}
