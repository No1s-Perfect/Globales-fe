import { AirbnbRating } from 'react-native-ratings';
import { TextInput, StyleSheet, Pressable, Text, View } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import Toast from "react-native-toast-message";
const Review = ({setShow,setFetchReview}) => {
  const [rating, setRating] = useState(0);

  const [text, setText] = useState('');

  const handleSubmit = async() => {

    try{
      setFetchReview(true)
      await axios.post(process.env.REACT_APP_REVIEW,{
        calificacion:rating,
        retroalimentacion:text,
        idUsuario:1,
        idOferta:1
      })
      
      Toast.show({
        type: "success",
        text2: "Everything went smoothly 👋",
      });
      
     
    }catch(e){
      console.log(e)
    }
    finally{
      setFetchReview(false)
      setShow(false)
    }
    
  }
  return (
    <>
      <AirbnbRating
        reviews={['Care', 'Barro', 'La', 'Cago', 'Puto']}
        showRating
        size={20}
        startingValue={0}
        defaultRating={0}
        onFinishRating={(rating) => setRating(rating)}
      />
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={styles.input}
          placeholder="Here you can rate this job"
          textAlignVertical="top"
          multiple
          onChangeText={setText}
          numberOfLines={4}
        />
      </View>
      <Pressable style={[styles.button, styles.buttonClose]} onPress={handleSubmit}>
        <Text style={styles.textStyle}>Enviar</Text>
      </Pressable>
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
    flexWrap: 'wrap',
    flex: 1,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
});

export default Review;
