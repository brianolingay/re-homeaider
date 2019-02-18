import { createStackNavigator } from "react-navigation";
import { BookScreen } from "../screens/seekers/BookScreen";
import { HireScreen } from "../screens/seekers/HireScreen";
import { ServicesScreen } from "../screens/seekers/ServicesScreen";
import { ProvidersScreen } from "../screens/seekers/ProvidersScreen";
import { CreateRequestScreen } from "../screens/seekers/CreateRequestScreen";
import { ServiceRequestProcessScreen } from "../screens/ServiceRequestProgressScreen";

export const BookStack = createStackNavigator(
  {
    Book: BookScreen,
  },
  { initialRouteName: "Book" }
);

export const HireStock = createStackNavigator(
  {
    Hire: HireScreen,
    Services: ServicesScreen,
    Providers: ProvidersScreen,
    CreateRequest: CreateRequestScreen,
    ServiceRequestProcess: ServiceRequestProcessScreen,
  },
  { initialRouteName: "Hire" }
);
