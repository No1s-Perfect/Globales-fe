import { AirbnbRating } from 'react-native-ratings';
import { TextInput, StyleSheet, Pressable, Text, View } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Toast from "react-native-toast-message";
import UserContext from './context/UserContext';
import { url } from './Constants';
const EditOffer = ({setShow,setFetchReview, idOferta, oferta, cb}) => {
  const [text, setText] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioServicio, setPrecioServicio] = useState(0.0);
  const [ubicacion, setUbicacion] = useState('');
  const [numTelefono, setNumTelefono] = useState(0);

  useEffect(()=>{
    setText(oferta.tituloOferta)
    setUbicacion(oferta.ubicacion)
    setDescripcion(oferta.descripcionOferta)
    setNumTelefono(oferta.numTelefono)
    setPrecioServicio(oferta.precioServicio)
  },[])
  const handleSubmit = async() => {

    try{
      setFetchReview(true)
      console.log(precioServicio,numTelefono,idOferta)
      const precio = parseInt(precioServicio)
      const num = parseInt(numTelefono)
      await axios.post(`${url.offers}/${idOferta}`,{
        titulo : text, 
        descripcion: descripcion,
        precioServicio: precio,
        ubicacion:ubicacion,
        numTelefono: num
      })
      cb(idOferta, text, ubicacion, descripcion, num, precio )
      Toast.show({
        type: "success",
        text2: "Everything went smoothly 👋",
      });
      
    }catch(e){
    
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
      value={text}
      textAlignVertical="top"
      multiple
      onChangeText={setText}
      numberOfLines={4}
    />
  </View> 
  <View style={{ flexDirection: 'row' }}>
    <TextInput
      style={styles.input}
      value={ubicacion}
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
      value={descripcion}
      textAlignVertical="top"
      multiple
      onChangeText={setDescripcion}
      numberOfLines={4}
    />
  </View><View style={{ flexDirection: 'row' }}>
    <TextInput
      style={styles.input}
      value={numTelefono.toString()}
      placeholder="Número de contacto"
      textAlignVertical="top"
      multiple
      onChangeText={setNumTelefono}
      keyboardType='phone-pad'
      maxLength={9}
      numberOfLines={4}
    />
  </View><View style={{ flexDirection: 'row' }}>
    <TextInput
      style={styles.input}
      placeholder="Precio por hora"
      value={precioServicio.toString()}
      textAlignVertical="center"
      multiple
      keyboardType="numeric"
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
