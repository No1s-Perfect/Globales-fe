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


 
const Welcome = () => {
    

    return (
        <>
        <StatusBar style ="light" />
        <InnerContainer>
               
            <WelcomeImage resizeMode="cover" source={require('./../assets/img/img1.png')}/>
                <WelcomeContainer>
                <PageTitle welcome={true}> Welcome </PageTitle>
                <SubTile welcome={true}>Name</SubTile>
                    <StyledFormArea>  
                    <Avatar resizeMode="cover" source={require('./../assets/img/img1.png')}/>
              
                        <Line/>
                        <StyledButton onPress={()=>{}}>
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>        
        </>
    );

}

export default Welcome;