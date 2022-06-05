import { ScrollView } from "react-native";
import { useState,useEffect } from "react";
import Feed from "./Feed";
//API client
import axios from 'axios';

const FeedBackList = ({idOferta}) => {
  
  const [FeedBacks, setFeedBacks] = useState([  ]);
  
  const handleFeedBack = async() => {
    const url=`https://0778-186-179-64-43.ngrok.io/feedback/${idOferta}`;
 
  await axios
    .get(url)
    .then((response) => {
        const result = response;
        const {status, data} = result;
        if(status!=200){
          console.log("status 200")
        }else{
            console.log(data)
            setFeedBacks(data)
        }
    })
    .catch((error)=> {
      console.log(error);
    });
};
useEffect(() => {
  handleFeedBack();
}, []);

  return (
    <ScrollView>
      {FeedBacks.map((info, index) => (
        <Feed
          key={index}
          star={info.calificacion}
          nombre={info.nombreUsuario}
          msg={info.retroalimentacion}
        />
      ))}
    </ScrollView>
  );
};

export default FeedBackList;
