import Toast from "react-native-toast-message";
import { View } from "react-native";

const Tostada = ({offSet = 5}) => (
  <View style={{ zIndex: 9000, elevation: 300000 }}>
    <Toast topOffset={offSet}/>
  </View>
);

export default Tostada;
