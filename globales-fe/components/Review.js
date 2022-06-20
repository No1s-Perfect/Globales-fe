import { AirbnbRating } from 'react-native-ratings';
import { TextInput, StyleSheet, Pressable, Text, View } from 'react-native';
import { useState, useContext } from 'react';
import axios from 'axios';
import Toast from "react-native-toast-message";
import UserContext from './context/UserContext';
import { url } from './Constants';
const Review = ({setShow,setFetchReview, idOferta}) => {
  const [rating, setRating] = useState(0);
  const { user, setUser } = useContext(UserContext);
  const [text, setText] = useState('');

  const handleSubmit = async() => {

    try{
      console.log(idOferta,'asdasdasdasd')
      setFetchReview(true)
      await axios.post(url.feedback,{
        calificacion:rating,
        retroalimentacion:text,
        idUsuario:user.id,
        idOferta:idOferta
      })
      
      Toast.show({
        type: "success",
        text2: "Su comentario ha sido posteado",
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
             reviews={["Muy Mal", "Mal", "Regular", "Bueno", "Excelente"]}
        showRating
        size={20}
        startingValue={0}
        defaultRating={0}
        reviewColor='#808080'
        selectedColor="#F5DC3C"
        onFinishRating={(rating) => setRating(rating)}
      />
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={styles.input}
          placeholder="Añade un comentario"
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
    backgroundColor:'#cfd0d1',
    borderColor:'#cfd0d1',
    color:'black',
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
    backgroundColor: "#10B981",
  },
});

export default Review;
