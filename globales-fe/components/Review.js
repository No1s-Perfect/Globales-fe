import { AirbnbRating } from "react-native-ratings";
import { TextInput, StyleSheet, View } from "react-native";

const Review = () => {
  return (
    <>
      <AirbnbRating
        reviews={["Care", "Barro", "La", "Cago", "Puto"]}
        showRating
        size={20}
        startingValue={0}
        defaultRating={0}
      />
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.input}
          placeholder="Here you can rate this job"
          textAlignVertical="top"
          multiple
          numberOfLines={4}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    flexWrap: "wrap",
    flex: 1,
  },
});

export default Review;
