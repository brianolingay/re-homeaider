import * as React from "react";
import { Content, Text, Button, Icon } from "native-base";
import {
  DrawerItems,
  SafeAreaView,
  createDrawerNavigator,
} from "react-navigation";
import { StyleSheet } from "react-native";
import { LogoutComponent } from "../components/apollo-components";
import { BookingStack, HiringStock } from "./ProviderStack";
import { nativeAuthTokenStorage } from "../lib/nativeAuthTokenStorage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const ProvidersDrawer = createDrawerNavigator(
  {
    Booking: { screen: BookingStack },
    Hiring: { screen: HiringStock },
  },
  {
    contentComponent: props => (
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <Content>
          <DrawerItems {...props} />
        </Content>
        <LogoutComponent>
          {() => (
            <Button
              icon
              block
              light
              onPress={async () => {
                await nativeAuthTokenStorage.removeTokens();
                props.navigation.navigate("Auth");
              }}
            >
              <Icon type="Entypo" name="log-out" />
              <Text>Logout</Text>
            </Button>
          )}
        </LogoutComponent>
      </SafeAreaView>
    ),
    initialRouteName: "Booking",
  }
);
