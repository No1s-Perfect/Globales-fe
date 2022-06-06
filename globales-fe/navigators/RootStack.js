import React from 'react';

import { Colors } from './../components/styles';
const { primary, tertiary } = Colors;
import Toast from 'react-native-toast-message';
//React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Tostada from '../components/Tostada';
const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <>
      <NavigationContainer>
      <Tostada offSet={40}/>
        <Stack.Navigator
          screenOptions={{
            headerStyled: {
              backgroundColor: 'transparent',
            },
            headerTintColor: tertiary,
            headerTransparent: true,
            headerTitle: '',
            headerLeftContainerStyle: {
              paddingLeft: 20,
            },
          }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen option={{ headerTintColor: primary }} name="Welcome" component={Welcome} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootStack;
