import { Platform, StatusBar } from "react-native";
import { createStackNavigator } from "react-navigation";
import { LandingScreen } from "./../screens/LandingScreen";
import { LoginScreen } from "./../screens/LoginScreen";
import { RegisterScreen } from "./../screens/RegisterScreen";

export const AuthStack = createStackNavigator(
  {
    Landing: LandingScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    initialRouteName: "Landing",
    defaultNavigationOptions: {
      headerStyle: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      },
    },
  }
);
