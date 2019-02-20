import * as React from "react";
import { AvailableBookingRequestComponent } from "../apollo-components";
import { newBookingServiceRequestSubscription } from "../../graphql/serviceRequest/subscriptions/newBookingServiceRequest";
import { List, ListItem, Body, Text, Right } from "native-base";
import { AppLoading } from "expo";

type Props = {
  type: string;
  user: any;
  navigation: any;
};

export class AvailableBookings extends React.PureComponent<Props> {
  unsubscribe: (() => void) | undefined;
  render() {
    const { type, user, navigation } = this.props;

    const services = user.providerServices
      .filter(item => item.service !== null && typeof item.service !== "string")
      .map(item => item.service._id);
    return (
      <AvailableBookingRequestComponent variables={{ input: { services } }}>
        {({
          error,
          data: { availableBookingRequest },
          loading,
          subscribeToMore,
        }) => {
          if (loading) {
            return <AppLoading />;
          }
          this.unsubscribe = subscribeToMore({
            document: newBookingServiceRequestSubscription,
            variables: { input: { services } },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) {
                return prev;
              }

              return {
                ...prev,
                availableBookingRequest: [
                  (subscriptionData.data as any).newBookingServiceRequest,
                  ...prev.availableBookingRequest,
                ],
              };
            },
          });

          return (
            <List>
              {availableBookingRequest.map(item => (
                <ListItem
                  key={`serviceRequest-${item._id}`}
                  onPress={() =>
                    navigation.navigate("ServiceRequestProcess", {
                      type,
                      serviceRequestId: item._id,
                    })
                  }
                >
                  <Body>
                    <Text>
                      {item.serviceSeeker.firstName}{" "}
                      {item.serviceSeeker.lastName}
                    </Text>
                    <Text note>Email: {item.serviceSeeker.email}</Text>
                    <Text note>Service: {item.service.name}</Text>
                  </Body>
                  <Right>
                    <Text>View</Text>
                  </Right>
                </ListItem>
              ))}
            </List>
          );
        }}
      </AvailableBookingRequestComponent>
    );
  }
}
