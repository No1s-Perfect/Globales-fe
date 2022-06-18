import { useState, useContext } from 'react';
import { Image, View } from 'react-native';
import UserContext from './context/UserContext';
import { Text, StyleSheet, Button } from 'react-native';
const Account = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./../assets/img/rayo.png')} />
      <Text style={styles.baseText}>Email: {user.email}</Text>
      <Text style={styles.baseText}>Name: {user.nombre}</Text>
      <Button onPress={() => setUser(null)} title="Log out" color="red" accessibilityLabel="Log out" />
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
