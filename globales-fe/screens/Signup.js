import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

//formik
import { Formik } from 'formik';

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

//keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

//api Client
import axios from 'axios';

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
import { View, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
//Colors
const { brand, darkLight, primary } = Colors;
import {url} from '../components/Constants'
//DateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker';

const sendMessageAndShowToasty = () => {
  setSendMsg(true);
  setTimeout(() => {
    setSendMsg(false);
    Toast.show({
      type: 'success',
      text1: 'OK!',
      text2: 'It was done successfully 👋',
    });
  }, 3000);
};

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));

  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

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

  const handleSignup = async ({ nombreUsuario, correoElectronico, password, fecNacimento }, setSubmitting) => {
    handleMessage(null);
    try {
      await axios.post(url.addUser, {
        nombreUsuario,
        correoElectronico,
        password,
        fecNacimento,
      });
      console.log(nombreUsuario + ", " + correoElectronico, ", ", password, "," , fecNacimento);
      Toast.show({
        type: 'success',
        text1: 'Te has registrado correctamente 👋',
      });
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Ocurrió un error al registrar tu cuenta',
      });
    }
  };

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Empleo Express</PageTitle>
          <SubTile>Registro de Cuenta</SubTile>
          
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
              nombreUsuario: '',
              correoElectronico: '',
              fecNacimento: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              values = { ...values, fecNacimento: dob.toDateString() };
              if (
                values.nombreUsuario == '' ||
                values.correoElectronico == '' ||
                values.fecNacimento == '' ||
                values.password == '' ||
                values.confirmPassword == ''
              ) {
                handleMessage('Por favor complete todos los campos');
                setSubmitting(false);
              } else if(values.password.length<8 ){
                handleMessage('Contraseña muy corta. Debe ser mínimo 8 caracteres');
                setSubmitting(false);
              } else if (values.password !== values.confirmPassword) {
                handleMessage('Constraseñas no son iguales');
                setSubmitting(false);
              }else {
                handleSignup(values, setSubmitting);
                navigation.navigate('Login');
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Nombre Completo"
                  icon="person"
                  placeholder=""
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('nombreUsuario')}
                  onBlur={handleBlur('nombreUsuario')}
                  value={values.nombreUsuario}
                />
                <MyTextInput
                  label="Correo Electrónico"
                  icon="mail"
                  placeholder=""
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('correoElectronico')}
                  onBlur={handleBlur('correoElectronico')}
                  value={values.correoElectronico}
                  keyboardType="email-address"
                />

                {Platform.OS === 'ios' && 
                            
                            <DateTimePicker
                                style={{width:'100%'}}
                                testID="dateTimePicker"
                                value={date}
                                mode= 'date'
                                is24Hour={true}
                                display= "default"
                                onChange={onChange}
                            />
                         
                }
                {Platform.OS === 'android' && <MyTextInput

                    label="Fecha de Nacimiento"
                    icon="calendar"
                    placeholder= "YYYY - MM - DD"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('fecNacimento')}
                    onBlur={handleBlur('fecNacimento')}
                    value={dob ? dob.toDateString() : ''}  
                    isDate={true}
                    editable= {false}
                    showDatePicker={showDatePicker}
                    />
                                           
             }
                

                <MyTextInput
                  label="Contraseña"
                  icon="lock"
                  placeholder=""
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  editable={true}
                  setHidePassword={setHidePassword}
                />

                <MyTextInput
                  label="Confirmación de Contraseña"
                  icon="lock"
                  placeholder=""
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>
                {/*
                        {!isSubmitting && (
                            <StyledButton onPress= {handleSubmit}>
                                <ButtonText>Signup</ButtonText>
                            </StyledButton>
                        )}
                        {isSubmitting && (
                            <StyledButton disabled={true}>
                                <ActivityIndicator size="large" color={primary}/>
                            </StyledButton>
                        )}
                        */}

                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Registrarse</ButtonText>
                </StyledButton>
                <Line />

                <ExtraView>
                  <ExtraText>¿Ya tienes cuenta? </ExtraText>
                  <TextLink
                    onPress={() => {
                      navigation.navigate('Login');
                    }}
                  >
                    <TextLinkContent>Inicio de Sesión</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
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

export default Signup;
