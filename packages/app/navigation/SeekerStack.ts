import { ProvidersScreen } from "../screens/seekers/ProvidersScreen";
import { HiringScreen } from "../screens/seekers/HiringScreen";
import { CreateRequestScreen } from "../screens/seekers/CreateRequestScreen";
import { createStackNavigator } from "react-navigation";
import { BookingScreen } from "../screens/seekers/BookingScreen";
import { ServicesScreen } from "../screens/seekers/ServicesScreen";
import { ServiceRequestProcessScreen } from "../screens/seekers/ServiceRequestProgressScreen";

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
