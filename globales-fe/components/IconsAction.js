import { Icon } from "react-native-elements";
import { Pressable, Vibration } from "react-native";
const IconsAction = ({ setShow, setViewInfo, setViewReviews, sendMsg }) => {
  return (
    <>
      <Icon
        raised
        name="info"
        type="antdesign"
        color="#517fa4"
        onPress={() => setViewInfo(true)}
      />
      <Pressable
        onLongPress={() => {
          Vibration.vibrate(10);
          setShow(true);
        }}
        onPress={() => setViewReviews(true)}
      >
        <Icon raised name="feedback" type="material" color="#517fa4" />
      </Pressable>
      <Icon
        raised
        name="chat-plus-outline"
        type="material-community"
        color="#517fa4"
        onPress={sendMsg}
      />
    </>
  );
};

export default IconsAction;
