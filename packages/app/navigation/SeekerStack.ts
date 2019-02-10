import { CreateRequestScreen } from "./../screens/CreateRequest";
import { createStackNavigator } from "react-navigation";
import { BookingScreen } from "./../screens/BookingScreen";
import { ServicesScreen } from "./../screens/ServicesScreen";

export const SeekersStack = createStackNavigator(
  {
    Booking: BookingScreen,
    Services: ServicesScreen,
    CreateRequest: CreateRequestScreen,
  },
  { initialRouteName: "Booking" }
);
