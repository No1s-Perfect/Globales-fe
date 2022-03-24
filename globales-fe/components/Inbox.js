import React from 'react';
import { View, Text,  Button, StyleSheet, FlatList } from "react-native";

import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyles';

const Messages = [
  {id:1,
  userName:"Jesus Sanchez",
  userImg: require("../assets/users/Jesus.jpg"),
  messageTime: "4 Minutes ago",
  messageText:  "Hola soy Jesus",
},
{id:2,
  userName:"Jesus Sanchez",
  userImg:require("../assets/users/Jesus.jpg"),
  messageTime: "4 Minutes ago",
  messageText:  "Hola soy Jesus",
},
{id:3,
  userName:"Jesus Sanchez",
  userImg:require("../assets/users/Jesus.jpg"),
  messageTime: "4 Minutes ago",
  messageText:  "Hola soy Jesus",
},
]
const Inbox = ({navigation}) => {


  return(
    <Container>
    <FlatList 
      data={Messages}
      keyExtractor={item=>item.id}
      renderItem={({item}) => (
        <Card>
          <UserInfo>
            <UserImgWrapper>
              <UserImg source={item.userImg} />
            </UserImgWrapper>
            <TextSection>
              <UserInfoText>
                <UserName>{item.userName}</UserName>
                <PostTime>{item.messageTime}</PostTime>
              </UserInfoText>
              <MessageText>{item.messageText}</MessageText>
            </TextSection>
          </UserInfo>
        </Card>
      )}
    />
  </Container>
  );
}

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});