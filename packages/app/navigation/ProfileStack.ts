import { createStackNavigator } from "react-navigation";
import ProfileScreen from '../screens/profile/ProfileScreeen';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  {
    initialRouteName: "Profile",
  }
);


export default ProfileStack;