import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { AuthStack } from "./AuthStack";
import { SeekersStack } from "./SeekerStack";

export const AppNavigator = createAppContainer(
  createSwitchNavigator({
    Auth: AuthStack,
    Seekers: SeekersStack,
  })
);
