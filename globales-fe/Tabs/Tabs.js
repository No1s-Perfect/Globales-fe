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
      tabBarActiveTintColor: "#6D28D9",
    }}
  >
    <Tab.Screen
      name="Servicios"
      component={Cards}
      options={{
        tabBarLabel: "Principal",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Nuevo"
      component={AddService}
      options={{
        tabBarLabel: "Crear Servicio",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="plus-circle-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Notificaciones"
      component={CardsOffersU}
      options={{
        tabBarLabel: "Notificaciones",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="bell" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Cuenta"
      component={Account}
      options={{
        tabBarLabel: 'Cuenta',
        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={color} size={size} />,
      }}
    />
  </Tab.Navigator>
);


export default Tabs;
