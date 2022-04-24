import { Text, Card, Button, Icon } from "react-native-elements";
import { View, StyleSheet, Pressable } from "react-native";
import IconsAction from "./IconsAction";
import Info from "./Info";
import { useState } from "react";
import FeedBackList from "./FeedBackList";
import Toast from "react-native-toast-message";
import Spinner from "./Spinner";
const CardView = ({ setShow, title, parla }) => {
  const [viewInfo, setViewInfo] = useState(false);
  const [viewReviews, setViewReviews] = useState(false);
  const [sendMsg, setSendMsg] = useState(false);
  const goBack = () => {
    setViewInfo(false);
    setViewReviews(false);
  };

  const sendMessageAndShowToasty = () => {
    setSendMsg(true);
    setTimeout(() => {
      setSendMsg(false);
      Toast.show({
        type: "success",
        text1: "Hello",
        text2: "Everything went smoothly 👋",
      });
    }, 3000);
  };
  return (
    <Card>
      {sendMsg && (
        <>
          <Card.Title>
            Sending your msg...
          </Card.Title>
          <Card.Divider />
        </>
      )}
      {(viewInfo || viewReviews) && (
        <>
          <Card.Title>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={goBack}
            >
              <Text style={styles.textStyle}>Atras</Text>
            </Pressable>
          </Card.Title>
          <Card.Divider />
        </>
      )}
      {!viewInfo && !viewReviews && !sendMsg && (
        <>
          <Card.Title>{title}</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
            }}
          />
          <Text style={{ marginBottom: 10 }}>{parla}</Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <IconsAction
              setViewInfo={setViewInfo}
              setViewReviews={setViewReviews}
              sendMsg={sendMessageAndShowToasty}
              setShow={setShow}
            />
          </View>
        </>
      )}
      {viewInfo && <Info setViewInfo={setViewInfo} />}
      {viewReviews && <FeedBackList />}
      {sendMsg && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Spinner msg="Laoding please wait..." />
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
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
    backgroundColor: "#2196F3",
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

export default CardView;
