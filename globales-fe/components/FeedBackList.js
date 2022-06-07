import { ScrollView } from "react-native";
import { useState,useEffect } from "react";
import Feed from "./Feed";
//API client
import axios from 'axios';
import { url } from "./Constants";
const FeedBackList = ({idOferta}) => {
  
  const [FeedBacks, setFeedBacks] = useState([  ]);
  
  const handleFeedBack = async() => {
    try{

      const {data} = await axios.get(`${url.feedback}/${idOferta}`)
      setFeedBacks(data)
    }catch(e){
      console.log(e)
    }
    
 
  
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
