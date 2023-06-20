import { useTheme } from "native-base";
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import HomeSvg from '@assets/home.svg'
import HistoricSvg from '@assets/history.svg'
import ProfileSvg from '@assets/profile.svg'

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
  const { sizes, colors } = useTheme()

  const iconSize = sizes[6]

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.green[500],
      tabBarInactiveTintColor: colors. gray[200]
    }}>
      <Screen 
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg 
              fill={color} 
              width={iconSize} 
              height={iconSize}
            />
          )
        }}
      />
      <Screen 
        name="historic"
        component={Historic}
        options={{
          tabBarIcon: ({ color }) => (
            <HistoricSvg 
              fill={color} 
              width={iconSize} 
              height={iconSize}
            />
          )
        }}
      />
      <Screen 
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg 
              fill={color} 
              width={iconSize} 
              height={iconSize}
            />
          )
        }}
      />
      <Screen 
        name="exercise"
        component={Exercise}
      />
    </Navigator>
  )
}