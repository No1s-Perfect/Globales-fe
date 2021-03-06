import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import UserContext from '../components/context/UserContext';

import { Platform, Button, Picker } from 'react-native';

//formik
import { Formik } from 'formik';

import { url } from '../components/Constants';
//icons
import { Octicons, Ionicons, Fontisto, AntDesign, FontAwesome } from '@expo/vector-icons';

//keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

//api Client
import axios from 'axios';
import Tostada from '../components/Tostada';
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTile,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  Colors,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent,
} from '../components/styles';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';

//Colors
const { brand, darkLight, primary } = Colors;

//DateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker';

import { Icon } from 'react-native-elements';

const AddService = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);

  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));

  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const [valuePicker, setValuePicker] = useState();

  //Actual date of birth to be sent
  const [dob, setDob] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const handleAddService = async (
    { descripcion, idCategoria, numTelefono, precioServicio, titulo, ubicacion },
    setSubmitting,
  ) => {
    handleMessage(null);
    try {
       await axios.post(url.offers, {
        titulo,
        descripcion,
        precioServicio,
        idUsuario: user.id,
        idCategoria,
        ubicacion,
        numTelefono,
      });
      Toast.show({
        type: 'success',
        text1: 'Servicio creado',
      });
      setTimeout(()=>navigation.navigate('Feed'),1000) 
      console.log('success')
    } catch (e) {
        Toast.show({
            type: 'error',
            text1: 'Hubo un error al a??adir el servicio',
          });
    }
  };

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  return (
      <>
      <Tostada />
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <SubTile>Crear un nuevo servicio</SubTile>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          <Formik
            initialValues={{
              titulo: '',
              ubicacion: '',
              descripcion: '',
              numTelefono: '',
              precioServicio: '',
              idCategoria: 1,
            }}
            onSubmit={(values, { setSubmitting }) => {
              values = { ...values };
              if (
                values.titulo == '' ||
                values.ubicacion == '' ||
                values.descripcion == '' ||
                values.numTelefono == '' ||
                values.precioServicio == '' ||
                values.idCategoria == 0
              ) {
                handleMessage('Please fill all the fields');
                setSubmitting(false);
              } else {
                handleAddService(values, setSubmitting);
                //navigation.navigate("Welcome");
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label="T??tulo para el servicio"
                  placeholder=""
                  multiline={true}
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('titulo')}
                  onBlur={handleBlur('titulo')}
                  value={values.titulo}
                />
                <MyTextInput
                  label="Ubicaci??n del servicio que ofrece"
                  icon="location-arrow"
                  placeholder=""
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('ubicacion')}
                  onBlur={handleBlur('ubicacion')}
                  value={values.name}
                />
                <MyTextInput
                  label="Descripci??n del servicio"
                  placeholder=""
                  style={[styles.input, styles.textArea]}
                  multiline={true}
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('descripcion')}
                  onBlur={handleBlur('descripcion')}
                  value={values.descripcion}
                />
                <MyTextInput
                  label="N??mero de contacto"
                  icon="phone"
                  placeholder=""
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('numTelefono')}
                  onBlur={handleBlur('numTelefono')}
                  value={values.numTelefono}
                  keyboardType='phone-pad'
                  maxLength={8}
                  numberOfLines={4}
                  multiple
                />
                <MyTextInput
                  label="Precio del servicio"
                  icon="money"
                  placeholder=""
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('precioServicio')}
                  onBlur={handleBlur('precioServicio')}
                  value={values.precioServicio}
                />
                <View>
                  <StyledInputLabel>Tipo de servicio</StyledInputLabel>
                  <Picker onValueChange={(itemValue, itemIndex) => (values.idCategoria = parseInt(itemValue))}>
                  <Picker.Item label="Jardiner??a" value="1" />
                  <Picker.Item label="Cocina" value="2" />
                  <Picker.Item label="Electricidad" value="3" />
                  <Picker.Item label="Limpieza dom??stica" value="4" />
                  <Picker.Item label="Decoraci??n de Interiores" value="9" />
                  <Picker.Item label="Desarrollador" value="11" />
                  </Picker>
                </View>
                <MsgBox type={messageType}>{message}</MsgBox>
                {/*
                        {!isSubmitting && (
                            <StyledButton onPress= {handleSubmit}>
                                <ButtonText>AddService</ButtonText>
                            </StyledButton>
                        )}
                        {isSubmitting && (
                            <StyledButton disabled={true}>
                                <ActivityIndicator size="large" color={primary}/>
                            </StyledButton>
                        )}
                        */}

                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Crear</ButtonText>
                </StyledButton>
                <Line />
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
    </>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <FontAwesome name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#01C13D',
    padding: 15,
    borderRadius: 5,
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  tostada: {
    backgroundColor: 'white',
    zIndex: 9000,
    elevation: 300000,
  },
});
export default AddService;
