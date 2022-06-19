import { useState, useContext } from 'react';
import { Image, View } from 'react-native';
import UserContext from './context/UserContext';
import { Text, StyleSheet, Button } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Account = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="account" color="#6D28D9" size={100} />
      <Text style={styles.baseText}>Correo Electrónico: {user.email}</Text>
      <Text style={styles.baseText}>Nombre de Usuario: {user.nombre}</Text>
      <Button onPress={() => setUser(null)} title="Log out" color="#10B981" accessibilityLabel="Log out" />
    </View>
  );
};

const styles = StyleSheet.create({
    image:{
        width: 50,
        height: 50,
    },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    width: '100%',
   
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default Account;
