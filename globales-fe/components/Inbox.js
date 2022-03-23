import { View, Text, FlatList } from "react-native";

const Messages = [
  {id:1,
  userName:"Jesus Sanchez",
  userImg:"img",
  messageTime: "4 Minutes ago",
  messageText:  "Hola soy Jesus",
},
{id:2,
  userName:"Jesus Sanchez",
  userImg:"img",
  messageTime: "4 Minutes ago",
  messageText:  "Hola soy Jesus",
},
{id:3,
  userName:"Jesus Sanchez",
  userImg:"img",
  messageTime: "4 Minutes ago",
  messageText:  "Hola soy Jesus",
},
]
const Inbox = () => {


  return(
      <View>
      <FlatList
        data={Messages}
        keyExtractor={item=>item.id}
        renderItem={({item})=>(
          <View>
            <Text>{item.userName}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default Inbox;