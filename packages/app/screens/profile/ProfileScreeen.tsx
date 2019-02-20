import * as React from "react";
import Profile from './Profile'

const ProfileScreen = () => <Profile />;

ProfileScreen.navigationOptions = () => ({
  header: null,
});

export default ProfileScreen