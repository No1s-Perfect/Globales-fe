import Toast from "react-native-toast-message";
import { View } from "react-native";

const Tostada = () => (
  <View style={{ zIndex: 9000, elevation: 300000 }}>
    <Toast topOffset={5}/>
  </View>
);

export default Tostada;
