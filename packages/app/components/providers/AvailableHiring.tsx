import * as React from "react";

import { List, ListItem, Body, Text, Right } from "native-base";
import {
  UserInfoFragment,
  AvailableHiringRequestComponent,
} from "../apollo-components";
import { newHiringServiceRequestSubscription } from "../../graphql/serviceRequest/subscriptions/newHiringServiceRequest";
import { AppLoading } from "expo";

type Props = {
  type: string;
  me: UserInfoFragment;
  navigation: any;
};

export class AvailableHiring extends React.PureComponent<Props> {
  unsubscribe: (() => void) | undefined;
  render() {
    const { type, me, navigation } = this.props;
    return (
      <AvailableHiringRequestComponent>
        {({ data: { availableHiringRequest }, loading, subscribeToMore }) => {
          if (loading) {
            return <AppLoading />;
          }

          this.unsubscribe = subscribeToMore({
            document: newHiringServiceRequestSubscription,
            variables: { providerId: me._id },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) {
                return prev;
              }

              return {
                ...prev,
                availableHiringRequest: [
                  (subscriptionData.data as any).newBookingServiceRequest
                    .serviceRequest,
                  ...prev.availableHiringRequest,
                ],
              };
            },
          });

          return (
            <List>
              {availableHiringRequest.map(item => (
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
      </AvailableHiringRequestComponent>
    );
  }
}
