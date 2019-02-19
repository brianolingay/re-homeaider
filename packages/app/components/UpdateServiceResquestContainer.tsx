import * as React from "react";
import { View } from "react-native";
import { Button, Text, Icon, Item, Input } from "native-base";
import { Overlay, Rating } from "react-native-elements";
import dayjs from "dayjs";
import {
  UpdateServiceRequestComponent,
  ServiceRequestInfoFragment,
  UserInfoFragment,
} from "./apollo-components";

type Props = {
  me: UserInfoFragment;
  navigation: any;
  serviceRequestProgress: ServiceRequestInfoFragment;
  unsubscribe: () => void;
};

export class UpdateServiceRequestProcessContainer extends React.PureComponent<
  Props
> {
  state = {
    amount: 0,
    rating: 0,
    isVisible: false,
    isThankYouVisible: false, // [TODO]: Later add a Thank You Overlay
  };

  componentDidUpdate() {
    const { me, serviceRequestProgress, unsubscribe } = this.props;
    if (
      (me.role.name === "service_seeker" &&
        serviceRequestProgress.completedAt &&
        serviceRequestProgress.rating === 0) ||
      (me.role.name === "provider" &&
        !serviceRequestProgress.startedAt &&
        serviceRequestProgress.arrivedAt &&
        serviceRequestProgress.accepted)
    ) {
      this.setState({ isVisible: true });
    }

    if (
      (me.role.name === "service_seeker" &&
        serviceRequestProgress.rating > 0) ||
      (me.role.name === "provider" && serviceRequestProgress.amount > 0)
    ) {
      unsubscribe();
      this.setState({ isVisible: false });
    }

    console.log(`Is Visible: ${this.state.isVisible}`);
  }

  render() {
    const { serviceRequestProgress, me, navigation, unsubscribe } = this.props;
    const type = navigation.getParam("type");
    // [TODO]: Fix button alignment, font size in overlay,
    return (
      <View>
        {me.role.name === "provider" ? (
          <UpdateServiceRequestComponent>
            {mutate => (
              <View>
                {!serviceRequestProgress.accepted && (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      iconLeft
                      primary
                      onPress={async () => {
                        await mutate({
                          variables: {
                            input: {
                              accepted: true,
                            },
                            serviceRequestId: serviceRequestProgress._id,
                          },
                        });
                      }}
                    >
                      <Icon type="FontAwesome" name="check" color="#ffffff" />
                      <Text>Accept</Text>
                    </Button>
                    <Button
                      iconLeft
                      danger
                      onPress={async () => {
                        if (unsubscribe) {
                          unsubscribe();
                        }

                        if (type === "Hiring") {
                          await mutate({
                            variables: {
                              input: {
                                canceledAt: dayjs().format("YYYY-MM-DD"),
                              },
                              serviceRequestId: serviceRequestProgress._id,
                            },
                          });
                        }

                        navigation.goBack();
                      }}
                    >
                      <Icon type="Entypo" name="block" color="#ffffff" />
                      <Text>Cancel</Text>
                    </Button>
                  </View>
                )}
                {!serviceRequestProgress.arrivedAt &&
                  serviceRequestProgress.accepted && (
                    <Button
                      iconLeft
                      onPress={async () => {
                        await mutate({
                          variables: {
                            input: {
                              arrivedAt: dayjs().format("YYYY-MM-DD"),
                            },
                            serviceRequestId: serviceRequestProgress._id,
                          },
                        });
                      }}
                    >
                      <Icon type="FontAwesome" name="check" color="#ffffff" />
                      <Text>Arrive</Text>
                    </Button>
                  )}
                {!serviceRequestProgress.completedAt &&
                  serviceRequestProgress.startedAt !== null && (
                    <Button
                      iconLeft
                      onPress={async () => {
                        await mutate({
                          variables: {
                            input: {
                              completedAt: dayjs().format("YYYY-MM-DD"),
                            },
                            serviceRequestId: serviceRequestProgress._id,
                          },
                        });

                        navigation.goBack();
                      }}
                    >
                      <Icon type="FontAwesome" name="check" color="#ffffff" />
                      <Text>Complete</Text>
                    </Button>
                  )}
                <Overlay
                  isVisible={
                    me.role.name === "provider" && this.state.isVisible
                  }
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: "500",
                        marginBottom: 15,
                      }}
                    >
                      After you've done surveying, provide the needed amount to
                      be paid.
                    </Text>

                    <Item>
                      <Icon active type="FontAwesome" name="dollar" />
                      <Input
                        placeholder="Amount To Pay"
                        keyboardType="decimal-pad"
                        onChangeText={value => {
                          this.setState({
                            amount: parseFloat(value),
                          });
                        }}
                      />
                    </Item>

                    <Button
                      iconLeft
                      primary
                      onPress={async () => {
                        await mutate({
                          variables: {
                            input: {
                              amount: this.state.amount,
                              startedAt: dayjs().format("YYYY-MM-DD"),
                            },
                            serviceRequestId: serviceRequestProgress._id,
                          },
                        });

                        this.setState({ isVisible: false });
                      }}
                    >
                      <Icon type="FontAwesome" name="check" color="#ffffff" />
                      <Text>Proceed</Text>
                    </Button>
                  </View>
                </Overlay>
              </View>
            )}
          </UpdateServiceRequestComponent>
        ) : (
          <UpdateServiceRequestComponent>
            {mutate => (
              <View>
                {!serviceRequestProgress.accepted && (
                  <Button
                    block
                    icon
                    danger
                    onPress={async () => {
                      await mutate({
                        variables: {
                          input: {
                            canceledAt: dayjs().format("YYYY-MM-DD"),
                          },
                          serviceRequestId: serviceRequestProgress._id,
                        },
                      });

                      navigation.goBack();
                    }}
                  >
                    <Icon type="Entypo" name="block" color="#ffffff" />
                    <Text>Cancel</Text>
                  </Button>
                )}
                <Overlay
                  isVisible={
                    me.role.name === "service_seeker" && this.state.isVisible
                  }
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        marginBottom: 15,
                      }}
                    >
                      Please Rate My Performance
                    </Text>

                    <Rating
                      showRating
                      type="star"
                      fractions={1}
                      ratingCount={5}
                      startingValue={this.state.rating}
                      imageSize={30}
                      onFinishRating={rating => {
                        this.setState({
                          rating,
                        });
                      }}
                      style={{ paddingVertical: 10 }}
                    />

                    <View
                      style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      {this.state.rating === 0 && (
                        <Button
                          light
                          onPress={async () => {
                            this.setState({ isVisible: false });
                            await mutate({
                              variables: {
                                input: { rating: 0.1 },
                                serviceRequestId: serviceRequestProgress._id,
                              },
                            });

                            navigation.navigate(type);
                          }}
                        >
                          <Text>Not Now</Text>
                        </Button>
                      )}
                      {this.state.rating > 0 && (
                        <Button
                          primary
                          onPress={async () => {
                            this.setState({ isVisible: false });

                            await mutate({
                              variables: {
                                input: { rating: this.state.rating },
                                serviceRequestId: serviceRequestProgress._id,
                              },
                            });

                            navigation.navigate(type);
                          }}
                        >
                          <Text>Submit</Text>
                        </Button>
                      )}
                    </View>
                  </View>
                </Overlay>
              </View>
            )}
          </UpdateServiceRequestComponent>
        )}
      </View>
    );
  }
}
