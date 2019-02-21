import * as React from "react";
import {
  CurrentLocationComponent,
  CreateServiceRequestComponent,
  ObjectId,
} from "../../components/apollo-components";
import { Container, Content, Button, Icon, Text } from "native-base";
import { View, Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { MapViewContainer } from "../../components/MapViewContainer";
import { AppLoading } from "expo";
import SwitchHeader from "../../components/SwitchHeader";

const height = Dimensions.get("window").height / 1.5;

type Props = {
  navigation: any;
};

export class CreateRequestScreen extends React.PureComponent<Props> {
  static navigationOptions = {
    header: null,
  };
  state = {
    address: "",
    coordinates: [],
    showPlacesList: false,
  };

  render() {
    const { navigation } = this.props;
    const type = navigation.getParam("type");
    const serviceId = navigation.getParam("serviceId");
    const providerId = navigation.getParam("providerId", null);

    return (
      <CurrentLocationComponent>
        {({ data: { currentLocation }, loading }) => {
          if (loading) {
            return <AppLoading />;
          }

          return (
            <CreateServiceRequestComponent>
              {mutate => {
                return (
                  <Container>
                    <SwitchHeader
                      navigation={navigation}
                      title="Create Request"
                    />
                    <Content>
                      <View style={{ marginTop: 10 }}>
                        <GooglePlacesAutocomplete
                          placeholder="Search"
                          minLength={2} // minimum length of text to search
                          autoFocus={false}
                          returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                          listViewDisplayed={this.state.showPlacesList}
                          textInputProps={{
                            onFocus: () =>
                              this.setState({ showPlacesList: true }),
                          }}
                          fetchDetails={true}
                          renderDescription={(row: any) => row.description} // custom description render
                          onPress={(data: any, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            if (details) {
                              const location = (details as any).geometry
                                .location;

                              this.setState({
                                address: data.description,
                                coordinates: [location.lat, location.lng],
                                showPlacesList: false,
                              });
                            }
                          }}
                          getDefaultValue={() => ""}
                          query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: "AIzaSyDD3T0PReSbzffYAnO9CxV49T3P5APXCno",
                          }}
                          styles={{
                            textInputContainer: {
                              width: "100%",
                            },
                            description: {
                              fontSize: 14,
                              paddingHorizontal: 10,
                            },
                            predefinedPlacesDescription: {
                              color: "#1faadb",
                            },
                          }}
                          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                          currentLocationLabel="Current location"
                          // GooglePlacesSearchQuery={{
                          //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                          //   rankby: "distance",
                          //   types: "food"
                          // }}
                          // filterReverseGeocodingByTypes={[
                          //   "locality",
                          //   "sublocality",
                          //   "postal_code",
                          //   "country",
                          //   "administrative_area_level_1",
                          //   "administrative_area_level_2"
                          // ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                        />
                      </View>

                      {currentLocation.coordinates.length > 0 && (
                        <MapViewContainer
                          latitude={
                            this.state.coordinates.length > 0
                              ? this.state.coordinates[0]
                              : currentLocation.coordinates[0]
                          }
                          longitude={
                            this.state.coordinates.length > 0
                              ? this.state.coordinates[1]
                              : currentLocation.coordinates[1]
                          }
                          coordinates={[
                            {
                              color: "red",
                              coordinates:
                                this.state.coordinates.length > 0
                                  ? this.state.coordinates
                                  : currentLocation.coordinates,
                            },
                          ]}
                          height={height}
                        />
                      )}
                      {this.state.address.length > 0 &&
                        currentLocation.coordinates.length > 0 && (
                          <Button
                            block
                            icon
                            style={{ marginTop: 15 }}
                            onPress={async () => {
                              const response = await mutate({
                                variables: {
                                  input: {
                                    service: serviceId as ObjectId,
                                    provider: providerId,
                                    address: this.state.address,
                                    coordinates: this.state.coordinates,
                                  },
                                },
                              });

                              console.log("Create Request Response");
                              console.log(response);

                              if (
                                response &&
                                response.data &&
                                response.data.createServiceRequest
                                  .serviceRequestId
                              ) {
                                const {
                                  data: {
                                    createServiceRequest: { serviceRequestId },
                                  },
                                } = response;
                                navigation.navigate("ServiceRequestProcess", {
                                  type,
                                  serviceRequestId,
                                });
                              }
                            }}
                          >
                            {type === "Hire" ? (
                              <Icon
                                type="Feather"
                                name="user-check"
                                color="#ffffff"
                              />
                            ) : (
                              <Icon
                                type="FontAwesome"
                                name="book"
                                color="#ffffff"
                              />
                            )}
                            <Text>{type}</Text>
                          </Button>
                        )}
                    </Content>
                  </Container>
                );
              }}
            </CreateServiceRequestComponent>
          );
        }}
      </CurrentLocationComponent>
    );
  }
}
