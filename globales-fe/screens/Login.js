import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

import UserContext from '../components/context/UserContext';

//formik
import { Formik } from 'formik';

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

//API client
import axios from 'axios';

import * as Google from 'expo-google-app-auth';

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
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
} from './../components/styles';
import { View, ActivityIndicator } from 'react-native';

//Colors
const { brand, darkLight, primary } = Colors;
import Toast from "react-native-toast-message";
//keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { url } from '../components/Constants';
const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleLogin = async ({ correoElectronico, password }, setSubmitting) => {
    handleMessage(null);

    try {
      const res = await axios.post(url.login, { correoElectronico, password });
      Toast.show({
        type: 'success',
        text1: 'Bienvenido 👋',
      });
      console.log(res);
       setUser({ id: res.data.userInfo.id, email: correoElectronico, nombre: res.data.userInfo.nombreUsuario });
    } catch (e) {
      console.log("@@@@@@@@@")
      Toast.show({
        type: 'error',
        text1: 'Correo electrónico o contraseña incorrecta',
      });
    }
  };

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  const handleGoogleSignin = () => {
    setGoogleSubmitting(true);
    const config = {
      iosClientId: `155576919300-drekt65fs76tm3op95akmehd0ppnpheq.apps.googleusercontent.com`,
      scopes: ['profile', 'email'],
    };
    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;

        if (type == 'success') {
          const { email, name, photoUrl } = user;
          handleMessage('Google signin was successful', 'SUCCESS');
          setTimeout(() => navigation.navigate('Welcome', { email, name, photoUrl })), 1000;
        } else {
          handleMessage('Google signin was cancelled');
        }
        setGoogleSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        handleMessage('An error occured. Check network and try again');
        setGoogleSubmitting(false);
      });
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require('./../assets/img/rayo.png')} />
          <PageTitle> Empleo Express </PageTitle>
          <SubTile>Inicio de Sesión</SubTile>

          <Formik
            initialValues={{ correoElectronico: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.correoElectronico == '' || values.password == '') {
                handleMessage('Please fill all the fields');
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);

                //navigation.navigate("Welcome");
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
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
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>

                {/*
                        {!isSubmitting && (
                            <StyledButton onPress= {handleSubmit}>
                                <ButtonText>Login</ButtonText>
                            </StyledButton>
                        )}
                        {isSubmitting && (
                            <StyledButton disabled={true}>
                                <ActivityIndicator size="large" color={primary}/>
                            </StyledButton>
                        )}
                        */}

                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Iniciar</ButtonText>
                </StyledButton>

                <Line />

                
                <ExtraView>
                  <ExtraText>¿No tienes una contraseña aún? </ExtraText>
                  <TextLink
                    onPress={() => {
                      navigation.navigate('Signup');
                    }}
                  >
                    <TextLinkContent>Registrarse</TextLinkContent>
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

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}></Ionicons>
        </RightIcon>
      )}
    </View>
  );
};

export default Login;

