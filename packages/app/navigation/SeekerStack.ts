import { ProvidersScreen } from "./../screens/ProvidersScreen";
import { HiringScreen } from "./../screens/HiringScreen";
import { CreateRequestScreen } from "../screens/CreateRequestScreen";
import { createStackNavigator } from "react-navigation";
import { BookingScreen } from "./../screens/BookingScreen";
import { ServicesScreen } from "./../screens/ServicesScreen";
import { ServiceRequestProcessScreen } from "../screens/ServiceRequestProgressScreen";

export const SeekersStack = createStackNavigator(
  {
    Booking: BookingScreen,
    Hiring: HiringScreen,
    Services: ServicesScreen,
    Providers: ProvidersScreen,
    CreateRequest: CreateRequestScreen,
    ServiceRequestProcess: ServiceRequestProcessScreen,
  },
  { initialRouteName: "Booking" }
);
