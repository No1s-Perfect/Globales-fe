import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
const Spinner = () => {
  return (
    <View style={styles.centerView}>
      <ActivityIndicator size="large" color="#00ff00" />
      <Text style={styles.text}>Please wait...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centerView: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    
  },
  text:{
      marginTop:10
  }
});

export default Spinner;
