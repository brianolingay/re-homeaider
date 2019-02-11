import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { AuthStack } from "./AuthStack";
// import { SeekersDrawer } from "./SeekerDrawerNavigator";
import { ProvidersDrawer } from "./PorivderDrawerNavigator";

export const AppNavigator = createAppContainer(
  createSwitchNavigator({
    Auth: AuthStack,
    // Seekers: SeekersDrawer,
    Providers: ProvidersDrawer,
  })
);
