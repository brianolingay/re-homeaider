import * as React from "react";
import { AvailableBookingRequestComponent } from "../apollo-components";
import { newBookingServiceRequestSubscription } from "../../graphql/serviceRequest/subscriptions/newBookingServiceRequest";
import { List, ListItem, Body, Text, Right } from "native-base";
import { AppLoading } from "expo";
import { shallowCompare } from "../../utils/shouldComponentUpdateMixin";

type Props = {
  type: string;
  user: any;
  navigation: any;
};

interface State {
  timer: NodeJS.Timeout | null;
  counter: number;
}

export class AvailableBookings extends React.PureComponent<Props, State> {
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
          refetch,
        }) => {
          if (loading) {
            return <AppLoading />;
          }
          this.refetch = refetch;
          this.unsubscribe = subscribeToMore({
            document: newBookingServiceRequestSubscription,
            variables: { input: { services } },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) {
                return prev;
              }

              const newArr = prev.availableBookingRequest.filter(
                item =>
                  item._id ===
                  (subscriptionData.data as any).newBookingServiceRequest._id
              );

              if (newArr.length) {
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
