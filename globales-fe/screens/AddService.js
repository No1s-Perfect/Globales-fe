import React, {useState} from "react";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput, TouchableHighlight, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import {
    Platform,
    Button,Picker
  } from 'react-native';

//formik
import { Formik } from "formik";

//icons
import { Octicons, Ionicons, Fontisto, AntDesign, FontAwesome } from "@expo/vector-icons";

//keyboard avoiding view
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

//api Client
import axios from 'axios';

import{ 
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
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';

//Colors
const {brand,darkLight, primary} = Colors;

//DateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from "react-native-elements";

 
const AddService = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000,0,1));

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

    const handleAddService = (credentials, setSubmitting) => {
        handleMessage(null);
        const url= 'https://dbcc-186-179-64-43.ngrok.io/offers';
        axios
        .post(url,credentials)
        .then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if(status !== 'SUCCESS'){
                handleMessage(message, status);
            }else{
                navigation.navigate('Cards', {...data});
            }
            setSubmitting(false);
        })
        .catch(error => {
            //console.log(error.JSON());
            setSubmitting(false);
            handleMessage("An error occurred. Check your network and try again");
        });
    };

    const handleMessage = (message,type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };
 
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
            <StatusBar style="dark"/>
                <InnerContainer>
                    <SubTile>Create a New Service</SubTile>

                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode= 'date'
                        is24Hour={true}
                        display= "default"
                        onChange={onChange}
                        />
                    )}
                
                <Formik
                    initialValues={{ubicacion: '', descripcion: '', numTelefono:'', precioServicio: '', idCategoria:''}}
                    onSubmit={(values,{setSubmitting}) => {
                        values = {...values};
                        if(values.ubicacion == '' || values.descripcion == ''|| values.numTelefono == ""|| values.precioServicio== "" || values.idCategoria==""){
                            handleMessage('Please fill all the fields');
                            setSubmitting(false);
                        }
                        else{
                            //handleAddService(values, setSubmitting);
                            console.log(values);
                            navigation.navigate("Welcome"); 
                        }
                        
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit,values, isSubmitting}) => ( 
                    <StyledFormArea>
                        <MyTextInput
                            label="Place where the service is offered"
                            icon="location-arrow"
                            placeholder=""
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('ubicacion')}
                            onBlur={handleBlur('ubicacion')}
                            value={values.name}
                        />
                        <MyTextInput
                            label="Service description"
                            placeholder=""
                            style={[styles.input, styles.textArea]}
                            multiline={true}
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('descripcion')}
                            onBlur={handleBlur('descripcion')}
                            value={values.descripcion}
                        />
                        <MyTextInput
                            label="Phone Number"
                            icon="phone"
                            placeholder= ""
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('numTelefono')}
                            onBlur={handleBlur('numTelefono')}
                            value={values.numTelefono}
                        />
                        <MyTextInput
                            label="Cost of Service"
                            icon="money"
                            placeholder= ""
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('precioServicio')}
                            onBlur={handleBlur('precioServicio')}
                            value={values.precioServicio}
                        />
                        <MyPicker 
                            label="Service Type"
                            icon="shield"
                        />
                
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
                            <ButtonText>Add</ButtonText>
                        </StyledButton>
                        <Line/>
                    </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>        
        </StyledContainer>
    </KeyboardAvoidingWrapper>
    );

}

const MyTextInput = ({label, icon, isPassword, hidePassword,setHidePassword, isDate, showDatePicker, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <FontAwesome name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props}/>}
            {isDate && (
                <TouchableOpacity onPress={showDatePicker}>
                    <StyledTextInput {...props}/>
                </TouchableOpacity>
            )}
            {isPassword && (
                   <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                       <Ionicons name={hidePassword ? 'md-eye-off': 'md-eye'} size={30} color={darkLight}/>
                   </RightIcon>
            )}
        </View>

    );

    
};

const MyPicker= ({label, icon}) => {
    return (
        <View>
          <StyledInputLabel>{label}</StyledInputLabel>
          <Picker>
          <Picker.Item label="Jardinería" value="1"/>
          <Picker.Item label="Cocina" value="2" />
          <Picker.Item label="Electricidad" value="3"/>
          <Picker.Item label="Limpieza doméstica" value="4"/>
          </Picker>
          
        </View>
      );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#F5FCFF",
        padding: 20
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 2,
        marginBottom: 20,
        borderRadius: 5
    },
    textArea: {
        height:100
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#01C13D",
        padding: 15,
        borderRadius: 5
    },
    textButton: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold"
    },
    tostada:{
        backgroundColor: "white",
        zIndex: 9000,
        elevation: 300000
    },
});
export default AddService;