import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { Historic } from "@screens/Historic";
import { Home } from "@screens/Home";
import { Exercise } from "@screens/Exercise";
import { Profile } from "@screens/Profile";

type AppRoutes = {
  home: undefined
  profile: undefined
  exercise: undefined
  historic: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false
    }}>
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