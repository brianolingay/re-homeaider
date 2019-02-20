import * as React from "react";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  H2,
  Header,
  Left,
  Right,
  Spinner,
} from "native-base";
import {
  ViewServiceRequestComponent,
  MeComponent,
} from "../components/apollo-components";
import { serviceRequestProgressSubscription } from "../graphql/serviceRequest/subscriptions/serviceRequestProgress";
import { AppLoading } from "expo";
import { ServiceRequestContainer } from "../components/ServiceRequestContainer";

type Props = {
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

  render() {
    const { navigation } = this.props;
    const serviceRequestId = navigation.getParam("serviceRequestId");
    const type = navigation.getParam("type");

    return (
      <MeComponent>
        {({ loading, data: { me } }) => {
          if (loading) {
            return <AppLoading />;
          }

          return (
            <ViewServiceRequestComponent
              variables={{ serviceRequestId }}
              fetchPolicy="network-only"
            >
              {({ data: { viewServiceRequest }, loading, subscribeToMore }) => {
                if (loading) {
                  return <AppLoading />;
                }

                return (
                  <ServiceRequestContainer
                    me={me}
                    navigation={navigation}
                    subscribe={() =>
                      subscribeToMore({
                        document: serviceRequestProgressSubscription,
                        variables: { serviceRequestId },
                        updateQuery: (prev, { subscriptionData }) => {
                          if (!subscriptionData.data) {
                            return prev;
                          }
                          console.log("subscribe...");
                          console.log(
                            (subscriptionData.data as any)
                              .serviceRequestProgress
                          );
                          return {
                            ...prev,
                            viewServiceRequest: {
                              ...(subscriptionData.data as any)
                                .serviceRequestProgress,
                            },
                          };
                        },
                      })
                    }
                    type={type}
                    viewServiceRequest={viewServiceRequest}
                  />
                );
              }}
            </ViewServiceRequestComponent>
          );
        }}
      </MeComponent>
    );
  }
}
