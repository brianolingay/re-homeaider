import * as React from "react";

import { List, ListItem, Body, Text, Right } from "native-base";
import {
  UserInfoFragment,
  AvailableHiringRequestComponent,
} from "../apollo-components";
import { newHiringServiceRequestSubscription } from "../../graphql/serviceRequest/subscriptions/newHiringServiceRequest";
import { AppLoading } from "expo";
import { shallowCompare } from "../../utils/shouldComponentUpdateMixin";

type Props = {
  type: string;
  me: UserInfoFragment;
  navigation: any;
};

export class AvailableHiring extends React.PureComponent<Props> {
  unsubscribe: (() => void) | undefined;
  refetch: () => void | undefined;

  state = {
    timer: null,
    counter: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (shallowCompare(this, prevProps, prevState)) {
      if (this.refetch) {
        this.refetch();
      }
    }
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 5000);
    this.setState({ timer });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
    this.unsubscribe();
  }

  tick = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };

  render() {
    const { type, me, navigation } = this.props;
    return (
      <AvailableHiringRequestComponent>
        {({
          data: { availableHiringRequest },
          loading,
          subscribeToMore,
          refetch,
        }) => {
          if (loading) {
            return <AppLoading />;
          }

          this.refetch = refetch;

          this.unsubscribe = subscribeToMore({
            document: newHiringServiceRequestSubscription,
            variables: { providerId: me._id },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) {
                return prev;
              }

              const newArr = prev.availableHiringRequest.filter(
                item =>
                  item._id ===
                  (subscriptionData.data as any).newHiringServiceRequest._id
              );

              if (newArr.length) {
                return prev;
              }

              return {
                ...prev,
                availableHiringRequest: [
                  (subscriptionData.data as any).newHiringServiceRequest
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
