import { Icon } from 'react-native-elements';
import { Pressable, Vibration } from 'react-native';
const IconsAction = ({ setShow, setViewInfo, setViewReviews, sendMsg, setIdOferta, idOferta }) => {
  return (
    <>
      <Icon raised name="info" type="antdesign" color="#10B981" onPress={() => setViewInfo(true)} />
      <Pressable onPress={() => setViewReviews(true)}>
        <Icon raised name="feedback" type="material" color="#10B981" />
      </Pressable>
      <Icon
        raised
        name="chat-plus-outline"
        type="material-community"
        color="#10B981"
        onPress={() => {
          Vibration.vibrate(10);
          setShow(true);
          setIdOferta(idOferta);
        }}
      />
    </>
  );
};

export default IconsAction;
