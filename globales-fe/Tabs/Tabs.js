import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Melon from "../components/Melon";
import Cards from "../screens/Cards";
import Post from "../components/Post";
import CardsOffersU from "../screens/CardsOffersU";
import AddService from "../screens/AddService";
import Account from '../components/Account';
const Tab = createBottomTabNavigator();
const Tabs = () => (
  <Tab.Navigator
    initialRouteName="Feed"
    screenOptions={{
      tabBarActiveTintColor: "#e91e63",
    }}
  >
    <Tab.Screen
      name="Feed"
      component={Cards}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Add a New Service"
      component={AddService}
      options={{
        tabBarLabel: "Create Service",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="plus-circle-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={CardsOffersU}
      options={{
        tabBarLabel: "Updates",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="bell" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={Account}
      options={{
        tabBarLabel: 'Account',
        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={color} size={size} />,
      }}
    />
  </Tab.Navigator>
);


export default Tabs;
