import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Historic } from "@screens/Historic";
import { Home } from "@screens/Home";
import { Exercise } from "@screens/Exercise";
import { Profile } from "@screens/Profile";

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  return (
    <Navigator>
      <Screen 
        name="home"
        component={Home}
      />
      <Screen 
        name="profile"
        component={Profile}
      />
      <Screen 
        name="exercise"
        component={Exercise}
      />
      <Screen 
        name="historic"
        component={Historic}
      />
    </Navigator>
  )
}