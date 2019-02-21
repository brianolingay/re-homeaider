import * as React from "react";
import { Container, Content, Text, View } from "native-base";

import {
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";

import MyInfo from "./MyInfo";
import Separator from "./Separator";
import { Card } from "react-native-elements";
import { MeComponent } from "../../components/apollo-components";
import { AppLoading } from "expo";
import DrawerHeader from "../../components/DrawerHeader";

const mainColor = "#01C89E";

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        alignItems: "center",
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: "center",
      },
    }),
  } as any,
  placeIcon: {
    color: "white",
    fontSize: 26,
  },
  scroll: {
    backgroundColor: "#FFF",
  },
  infoContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30,
  },
  userImage: {
    borderColor: mainColor,
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 8,
    textAlign: "center",
  },
});

export default class Profile extends React.PureComponent<{
  navigation?: any;
}> {
  static navigationOptions = {
    header: null,
  };
  renderHeader = ({ firstName, lastName, address, city, country }) => {
    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{
            uri: `https://orig00.deviantart.net/dcd7/f/2014/027/2/0/mountain_background_by_pukahuna-d73zlo5.png`,
          }}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{
                uri: `https://pbs.twimg.com/profile_images/909953369694859265/BOakwKQY_400x400.jpg`,
              }}
            />
            <Text
              style={styles.userNameText}
            >{`${firstName} ${lastName}`}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <DrawerHeader navigation={navigation} title="Profile" />
        <Content padder>
          <ScrollView style={styles.scroll}>
            <MeComponent>
              {({ data: { me }, loading }) => {
                if (loading) {
                  return <AppLoading />;
                }

                return (
                  <View style={styles.container}>
                    <Card containerStyle={styles.cardContainer}>
                      {this.renderHeader(me)}
                      <MyInfo
                        containerStyle={styles.infoContainer}
                        icon={{ name: "email" }}
                        note="Email"
                        value={me.email}
                      />
                      <MyInfo
                        containerStyle={styles.infoContainer}
                        icon={{ name: "call" }}
                        note="Mobile"
                        value={me.mobile}
                      />
                      {Boolean(me.phone) && (
                        <MyInfo
                          containerStyle={styles.infoContainer}
                          icon={{ name: "call" }}
                          note="Phone"
                          value={me.phone}
                        />
                      )}
                      <Separator />
                      {Boolean(me.address) && (
                        <MyInfo
                          containerStyle={styles.infoContainer}
                          icon={{ name: "home" }}
                          note="Address/City/Country"
                          value={`${me.address}, ${me.city}, ${me.country}`}
                        />
                      )}
                    </Card>
                  </View>
                );
              }}
            </MeComponent>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
