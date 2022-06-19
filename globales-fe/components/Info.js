import { Text, View, StyleSheet, Animated } from "react-native";
import { Icon } from "react-native-elements";
import { useEffect, useRef } from "react";
const Info = ({numTelefono, ubicacion, nomUsuario, precioServicio}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  return (
    <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.row}>
        <View style={styles.right}>
          <Icon
            raised
            size={10}
            name="user"
            type="evilicon"
            color="#6D28D9"
          />
        </View>
        <View style={styles.text}>
          <Text style={styles.data}>{nomUsuario}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.right}>
          <Icon
            size={10}
            raised
            name="phone"
            type="antdesign"
            color="#6D28D9"
          />
          
        </View>
        <View style={styles.text}>
          <Text style={styles.data}>{numTelefono}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.right}>
          <Icon
            raised
            size={10}
            name="location"
            type="evilicon"
            color="#6D28D9"
          />
        </View>
        <View style={styles.text}>
          <Text style={styles.data}>{ubicacion}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.right}>
          <Icon
            raised
            size={10}
            name="dollar"
            type="font-awesome"
            color="#6D28D9"
          />
        </View>
        <View style={styles.text}>
          <Text style={styles.data}>{precioServicio}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center"
  },
  right: {
    marginRight: 10,
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
  },
  data:{

      fontWeight: "bold",
      fontSize: 13,
    
  }
});

export default Info;
