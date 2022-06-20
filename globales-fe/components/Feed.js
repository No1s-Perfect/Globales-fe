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
          borderColor: "#6D28D9",
          borderWidth: 2,
          borderRadius: 10,
          marginTop: 6,
          alignItems: "center",
          padding: 5,
        }}
      >
        <View>
          <Text
            style={{
            fontWeight: "bold",
            fontSize: 15,
            color:"#606060"
          }}>
            {nombre}
            </Text>
        </View>
        <View>
          <AirbnbRating
            reviews={["Muy ", "Mal", "Regular", "Bueno", "Excelente"]}
            showRating
            size={18}
            reviewSize={15}
            startingValue={0}
            isDisabled
            defaultRating={star}
            reviewColor='black'
            selectedColor='#F5DC3C'

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
