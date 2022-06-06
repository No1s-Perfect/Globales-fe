import { Text, View, StyleSheet, Animated } from "react-native";
import { Icon } from "react-native-elements";
import { useEffect, useRef } from "react";
const Info = ({numTelefono, ubicacion, nomUsuario}) => {
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
            size={10}
            raised
            name="phone"
            type="antdesign"
            color="#517fa4"
            onPress={() => console.log("hello")}
          />
        </View>
        <View style={styles.text}>
          <Text>{numTelefono}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.right}>
          <Icon
            raised
            size={10}
            name="location"
            type="evilicon"
            color="#517fa4"
            onPress={() => console.log("hello")}
          />
        </View>
        <View style={styles.text}>
          <Text>{ubicacion}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.right}>
          <Icon
            raised
            size={10}
            name="user"
            type="evilicon"
            color="#517fa4"
            onPress={() => console.log("hello")}
          />
        </View>
        <View style={styles.text}>
          <Text>{nomUsuario}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  right: {
    marginRight: 10,
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Info;
