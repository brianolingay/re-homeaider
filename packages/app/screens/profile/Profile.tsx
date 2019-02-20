import * as React from "react";
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Title,
  Right,
  Text,
  View
} from "native-base";

import {
  ImageBackground,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native';


import Email from './Email';
import Tel from './Tel';
import Separator from './Separator';
import { Icon, Card } from 'react-native-elements';

const mainColor = '#01C89E';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  } as any,
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
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
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
});

const telDS =  [
  { "id": 1, "name": "Mobile", "number": "+66 (089)-928-2134" },
  { "id": 2, "name": "Work", "number": "+41 (112)-435-9887" }
];

const emails = [
  { "id": 1, "name": "Personal", "email": "elsie-goodman@mail.com" },
  { "id": 2, "name": "Work", "email": "elsie@work.com" }
];

export default class Profile extends React.PureComponent<{
  navigation?: any;
}> {
  static navigationOptions = {
    header: (
      <Header>
        <Left />
        <Body />
        <Right />
      </Header>
    )
  };

  state = {
    telDS: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(telDS),
    emailDS: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(emails),
  };

  renderHeader = () => {

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
            <Text style={styles.userNameText}>Teofilo Makatawtaw</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  // onPress={this.onPressPlace}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  Tokyo tokyo tempura, Japan
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  };

  renderTel = () => (
    <ListView
      contentContainerStyle={styles.telContainer}
      dataSource={this.state.telDS}
      renderRow={({ id, name, number }, _, k) => {
        return (
          <Tel
            key={`tel-${id}`}
            index={k}
            name={name}
            number={number}
            // onPressSms={this.onPressSms}
            // onPressTel={this.onPressTel}
          />
        )
      }}
    />
  );

  renderEmail = () => (
    <ListView
      contentContainerStyle={styles.emailContainer}
      dataSource={this.state.emailDS}
      renderRow={({ email, id, name }, _, k) => {
        return (
          <Email
            key={`email-${id}`}
            index={k}
            name={name}
            email={email}
            // onPressEmail={this.onPressEmail}
          />
        )
      }}
    />
  );

  render() {
    return (
      <Container>
        <Content padder>
          <ScrollView style={styles.scroll}>
            <View style={styles.container}>
              <Card containerStyle={styles.cardContainer}>
                {this.renderHeader()}
                {this.renderTel()}
                {Separator()}
                {this.renderEmail()}
              </Card>
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
