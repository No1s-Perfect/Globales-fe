import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { Icon } from "react-native-elements";
import EditOffer from "./EditOffer";
import { useState } from "react";
import Spinner from "./Spinner";
import Toast from "react-native-toast-message";
const ModalReview = ({ show, setShow, idOferta }) => {
  const [fetchReview, setFetchReview] = useState(false);
  return (
    <>
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={show}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ alignSelf: "flex-end" }}>
                <Icon name="close" size={20} onPress={() => setShow(false)} />
              </View>

              {!fetchReview && (
                <>
                  <EditOffer idOferta={idOferta} setFetchReview={setFetchReview} setShow={setShow}/>
                </>
              )}
              {fetchReview && <Spinner />}
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
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
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#10B981",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ModalReview;
