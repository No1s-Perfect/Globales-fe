import React, {useState} from "react";
import { StatusBar } from "expo-status-bar";

import{ 
   InnerContainer, 
    PageTitle, 
    SubTile, 
    StyledFormArea, 
    StyledButton,
    ButtonText,
    Line, 
    WelcomeContainer,
    WelcomeImage,
    Avatar,
} from './../components/styles';
 
const Welcome = ({navigation, route}) => {
    //const {name, email, photoUrl} = route.params;
    //const AvatarImg = photoUrl ? {uri:photoUrl} : require('./../assets/img/rayo.png')

    return (
        <>
        <StatusBar style ="light" />
        <InnerContainer>
               
            <WelcomeImage resizeMode="cover" source={require('./../assets/img/img1.png')}/>
                <WelcomeContainer>
                <PageTitle welcome={true}> Welcome </PageTitle>
                <SubTile welcome={true}>{/*name || 'Name'*/}name</SubTile>
                <SubTile welcome={true}>{/*email || 'email'*/}email</SubTile>
                    <StyledFormArea>  
                    <Avatar resizeMode="cover" source={require('./../assets/img/img1.png')}/>
                        <Line/>
                    <StyledButton onPress={()=>{navigation.navigate('Login');}}>
                        <ButtonText>Logout</ButtonText>
                    </StyledButton>
                </StyledFormArea>
            </WelcomeContainer>
        </InnerContainer>        
        </>
    );
}

export default Welcome;