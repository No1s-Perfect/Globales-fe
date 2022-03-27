import { Text, View, Animated } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { useEffect, useRef } from "react";
const Feed = ({ msg, nombre, star }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true 
    }).start();
  }, [fadeAnim]);
  return (
    <>
      <Animated.View
        style={{
          opacity: fadeAnim,
          borderColor: "green",
          borderWidth: 1,
          borderRadius: 10,
          marginTop: 6,
          alignItems: "center",
          padding: 5,
        }}
      >
        <View>
          <Text>{nombre}</Text>
        </View>
        <View>
          <AirbnbRating
            reviews={["Care", "Barro", "La", "Cago", "Puto"]}
            showRating
            size={10}
            reviewSize={10}
            startingValue={0}
            isDisabled
            defaultRating={star}
            starContainerStyle={{}}
            ratingContainerStyle={{ alignSelf: "flex-start" }}
          />
        </View>
        <View style={{ marginTop: 5 }}>
          <Text
            style={{
              fontStyle: "italic",
              fontSize: 15,
            }}
          >
            "{msg}"
          </Text>
        </View>
      </Animated.View>
    </>
  );
};

export default Feed;
