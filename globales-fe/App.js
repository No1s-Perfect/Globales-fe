import React from "react";
import RootStack from "./navigators/RootStack";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./Tabs/Tabs";
export default function App() {
  return (
    <>
    {false && <RootStack/>}
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </>
  );

}



