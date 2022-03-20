import { View, Text, Button } from "react-native";
const Papaya = ({ navigation }) => (
  <View>
    <Text>In papaya</Text>
    <Button title="Go to melon" onPress={() => navigation.navigate("Melon")} />
  </View>
);

export default Papaya;
