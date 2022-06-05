import React from 'react';
import RootStack from './navigators/RootStack';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './Tabs/Tabs';
import UserContext from './components/context/UserContext';
import { useState } from 'react';
export default function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        {!user && <RootStack />}
        {user && (
          <NavigationContainer>
            <Tabs />
          </NavigationContainer>
        )}
      </UserContext.Provider>
    </>
  );
}
