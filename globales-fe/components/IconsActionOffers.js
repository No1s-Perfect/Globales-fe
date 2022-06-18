import { Icon, Text } from "react-native-elements";
import { Pressable, Vibration ,StyleSheet} from "react-native";
const IconsAction = ({ setShow, setViewInfo, setViewReviews, sendMsg,setIdOferta,idOferta }) => {
  return (
    <>
      <Pressable 
        onPress={() => setViewReviews(true)}
      >
        <Icon raised name="add" type="material" color="#2196F3" />
      </Pressable>
      <Pressable 
        onPress={() => setViewReviews(true)}//todo: Enviar al add services
      >
        <Icon raised name="edit" type="material" color="#2196F3" />
      </Pressable>
    </>
      
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default IconsAction;
