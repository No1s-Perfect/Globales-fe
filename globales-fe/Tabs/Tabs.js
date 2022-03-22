import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Papaya from "../components/Papaya";
import Melon from "../components/Melon";
import Inbox from "../components/Inbox";

const Tab = createBottomTabNavigator();
const Tabs = () => (
  <Tab.Navigator
    initialRouteName="Notifications"
    screenOptions={{
      tabBarActiveTintColor: "#e91e63",
    }}
  >
    <Tab.Screen
      name="Feed"
      component={Papaya}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={Melon}
      options={{
        tabBarLabel: "Updates",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="bell" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Inbox"
      component={Inbox}
      options={{
        tabBarLabel: "Mensajeria",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="android-messages" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default Tabs;
