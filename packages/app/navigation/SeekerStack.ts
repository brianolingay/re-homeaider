import { ProvidersScreen } from "../screens/seekers/ProvidersScreen";
import { HireScreen } from "../screens/seekers/HireScreen";
import { CreateRequestScreen } from "../screens/seekers/CreateRequestScreen";
import { createStackNavigator } from "react-navigation";
import { BookScreen } from "../screens/seekers/BookScreen";
import { ServicesScreen } from "../screens/seekers/ServicesScreen";
import { ServiceRequestProcessScreen } from "../screens/ServiceRequestProgressScreen";

export const BookStack = createStackNavigator(
  {
    Book: BookScreen,
    Services: ServicesScreen,
    CreateRequest: CreateRequestScreen,
    ServiceRequestProcess: ServiceRequestProcessScreen,
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
