import { useState,useEffect } from "react";
import ModalReview from "../components/ModalReview";
import { View, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import Tostada from "../components/Tostada";
import CardList from "../components/CardList";

//API client
import axios from 'axios';

const Cards = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [infoCards, setInfoCards] = useState([  ]);
  const handleOffers = async() => {
    
    const url= 'https://dbcc-186-179-64-43.ngrok.io/offers';
 
  await axios
    .get(url)
    .then((response) => {
        const result = response;
        const {status, data} = result;
        if(status!=200){
          console.log("status 200")
        }else{
            console.log("all ok")
            setInfoCards(data)
        }
    })
    .catch((error)=> {
      console.log(error);
    });
};
useEffect(() => {
  handleOffers();
}, []);
  return (
    <View>
      <Tostada />
      <SearchBar
        placeholder="Buscar ofertas según categoría"
        onChangeText={setSearch}
        value={search}
        lightTheme
        round
      />
      <ScrollView>
        <View style={{ marginBottom: 100 }}>
          <CardList
            infoCards={
              search.length > 0
              ? infoCards.filter((info) => info.title == search)
              : infoCards
            }
            setShow={setShow}
          />
        </View>
      </ScrollView>
      <ModalReview show={show} setShow={setShow} />
    </View>
  );
};

export default Cards;
