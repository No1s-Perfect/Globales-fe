import { Text, Card, Button, Icon } from 'react-native-elements';
import { View, StyleSheet, Pressable } from 'react-native';
import IconsAction from './IconsActionOffers';
import { useState } from 'react';
import FeedBackList from './FeedBackList';
const CardView = ({ setShow, idOferta, title, parla, setIdOferta }) => {
  const [viewReviews, setViewReviews] = useState(false);
  const [editOffer, setEditOffer] = useState(false);
  const goBack = () => {
    setViewReviews(false);
  };
  return (
    <Card>
      {(viewReviews) && (
        <>
          <Card.Title>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={goBack}>
              <Text style={styles.textStyle}>Atras</Text>
            </Pressable>
          </Card.Title>
          <Card.Divider />
        </>
      )}
      { !viewReviews &&  (
        <>
          <Card.Title>{title}</Card.Title>
          <Card.Divider />

          <Text style={{ marginBottom: 10 }}>{parla}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <IconsAction
              setViewReviews={setViewReviews}
              setShow={setShow}
              setEditOffer={setEditOffer}
              setIdOferta={setIdOferta}
              idOferta={idOferta}
            />
          </View>
        </>
      )}
      {viewReviews && <FeedBackList idOferta={idOferta}></FeedBackList>}
      {editOffer && 
                navigation.navigate('Login')}
    </Card>
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

export default CardView;
