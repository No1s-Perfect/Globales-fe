import React, {useState, useContext} from "react";
import { StatusBar } from "expo-status-bar";

import UserContext from "../components/context/UserContext";
//formik
import { Formik } from "formik";

//icons
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";

//API client
import axios from 'axios';

import * as Google from 'expo-google-app-auth'



import{ 
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
import {View, ActivityIndicator} from 'react-native';

//Colors
const {brand,darkLight, primary} = Colors;

//keyboard avoiding view
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";


 
const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [googleSubmitting, setGoogleSubmitting] = useState(false);
    
    const {user,setUser} = useContext(UserContext)

    const handleLogin = async({correoElectronico, password}, setSubmitting) => {
        handleMessage(null);
        const url= 'https://a705-201-199-92-169.ngrok.io/login';
        const params = JSON.stringify({
                "correoElectronico": correoElectronico,
                "password": password,
            });
     console.log(params)
      await axios
        .post(url,params,{
            "headers": {
                "content-type": "application/json",
            },
        })
        .then((response) => {
            const result = response;
            const {status, data} = result;
            const {userInfo, msg} = data;
            console.log(userInfo);
            setUser({email:correoElectronico})
            
            if(status!=200){
                handleMessage("I'm sorry, something is wrong... :(", status);
            }else{
                console.log("all ok")
                navigation.navigate('Welcome', {...data[0]});
            }
            setSubmitting(false);
        })
        .catch((error)=> {
            setSubmitting(false);
            handleMessage("An error occurred. Check your network and try again");
        });
    };

    const handleMessage = (message,type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };


    const handleGoogleSignin = () => {
        setGoogleSubmitting(true);
        const config = {
            iosClientId: `155576919300-drekt65fs76tm3op95akmehd0ppnpheq.apps.googleusercontent.com`,
            scopes: ['profile', 'email']    
        };
        Google
        .logInAsync(config)
        .then((result) => {
            const {type, user} = result;

            if(type=='success'){
                const{email,name,photoUrl} = user;
                handleMessage('Google signin was successful','SUCCESS');
                setTimeout(() => navigation.navigate('Welcome', {email,name,photoUrl})),1000;
            }else{
                handleMessage('Google signin was cancelled');
            }
            setGoogleSubmitting(false);
        })
        .catch(error => {
            console.log(error);
            handleMessage('An error occured. Check network and try again');
            setGoogleSubmitting(false);
        })
    };


    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
        <StatusBar style="dark"/>
        <InnerContainer>
            <PageLogo resizeMode="cover" source={require('./../assets/img/rayo.png')}/>
                <PageTitle> Empleo Express </PageTitle>
                <SubTile>Account Login</SubTile>

                <Formik
                    initialValues={{correoElectronico: '', password: ''}}
                    onSubmit={(values,{setSubmitting}) => {
                        if(values.correoElectronico == '' || values.password == ''){
                            handleMessage('Please fill all the fields');
                            setSubmitting(false)
                        }else{
                            handleLogin(values, setSubmitting);
                            
                            //navigation.navigate("Welcome"); 
                        }
                        
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => ( <StyledFormArea>
                        <MyTextInput
                            label="email Address"
                            icon="mail"
                            placeholder=""
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('correoElectronico')}
                            onBlur={handleBlur('correoElectronico')}
                            value={values.correoElectronico}
                            keyboardType="email-address"
                        />
                        <MyTextInput
                            label="Password"
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
                        <MsgBox type = {messageType}>{message}</MsgBox>
                        
                    
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
                            <ButtonText>Login</ButtonText>
                        </StyledButton>

                        <Line/>

                        {!googleSubmitting && (
                            <StyledButton google={true} onPress={handleGoogleSignin}>
                            <Fontisto name="google" color={primary} size={25}/>
                            <ButtonText google={true}>Sign in with Google</ButtonText>
                        </StyledButton>
                        )}

                        {googleSubmitting && (
                        <StyledButton google={true} disabled={true}>
                           <ActivityIndicator size="large" color={primary}/>
                        </StyledButton>

                        )}
                        <ExtraView>
                            <ExtraText>Don't have an account already?</ExtraText>
                            <TextLink onPress={() => {navigation.navigate("Signup");}}>
                                <TextLinkContent>Sign up</TextLinkContent>
                            </TextLink>

                        </ExtraView>
                    </StyledFormArea>)}
                </Formik>


            </InnerContainer>        
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );

}

const MyTextInput = ({label, icon, isPassword, hidePassword,setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                   <RightIcon onPress={()=> setHidePassword(!hidePassword)}>
                       <Ionicons name={hidePassword ? 'md-eye-off': 'md-eye'} size={30} color={darkLight}></Ionicons>
                   </RightIcon>
            )}

        </View>

    )

}

export default Login;