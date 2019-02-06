import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { MainTabNavigator } from "./MainTabNavigator";
import { AuthStack } from "./AuthStack";


export const AppNavigator = createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Auth: AuthStack,
  })
);
