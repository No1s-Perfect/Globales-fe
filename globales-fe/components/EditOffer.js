import { AirbnbRating } from 'react-native-ratings';
import { TextInput, StyleSheet, Pressable, Text, View } from 'react-native';
import { useState, useContext } from 'react';
import axios from 'axios';
import Toast from "react-native-toast-message";
import UserContext from './context/UserContext';
import { url } from './Constants';
const EditOffer = ({setShow,setFetchReview, idOferta}) => {
  const [text, setText] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioServicio, setPrecioServicio] = useState(0.0);
  const [ubicacion, setUbicacion] = useState('');
  const [numTelefono, setNumTelefono] = useState(0);

  const handleSubmit = async() => {

    try{
      console.log(idOferta,'asdasdasdasd')
      setFetchReview(true)
      await axios.post(`https://8d2a-186-179-64-82.ngrok.io/offers/${idOferta}`,{
        titulo : text, 
        descripcion: descripcion,
        precioServicio: precioServicio,
        ubicacion:ubicacion,
        numTelefono: numTelefono
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
    <View style={{ flexDirection: 'row' }}>
    <TextInput
      style={styles.input}
      placeholder="Titulo"
      textAlignVertical="top"
      multiple
      onChangeText={setText}
      numberOfLines={4}
    />
  </View> 
  <View style={{ flexDirection: 'row' }}>
    <TextInput
      style={styles.input}
      placeholder="Ubicación"
      textAlignVertical="top"
      multiple
      onChangeText={setUbicacion}
      numberOfLines={4}
    />
  </View>
  <View style={{ flexDirection: 'row' }}>
    <TextInput
      style={styles.input}
      placeholder="Descripción"
      textAlignVertical="top"
      multiple
      onChangeText={setDescripcion}
      numberOfLines={4}
    />
  </View><View style={{ flexDirection: 'row' }}>
    <TextInput
      style={styles.input}
      placeholder="Número de contacto"
      textAlignVertical="top"
      multiple
      onChangeText={setNumTelefono}
      numberOfLines={4}
    />
  </View><View style={{ flexDirection: 'row' }}>
    <TextInput
      style={styles.input}
      placeholder="Precio por hora"
      textAlignVertical="center"
      multiple
      onChangeText={setPrecioServicio}
      numberOfLines={4}
    />
  </View>
      <Pressable style={[styles.button, styles.buttonClose]} onPress={handleSubmit}>
        <Text style={styles.textStyle}>Editar</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 15,
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
    backgroundColor: "#6D28D9",
  },
  buttonClose: {
    backgroundColor: "#10B981",
  },
});

export default EditOffer;
