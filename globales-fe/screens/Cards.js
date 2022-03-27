import { useState } from "react";
import ModalReview from "../components/ModalReview";
import { View, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import Tostada from "../components/Tostada";
import CardList from "../components/CardList";
const Cards = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [infoCards, setInfoCards] = useState([
    { title: "pruebis", parla: "i could be optinal if you guys want" },
    { title: "pruebis2", parla: "OG OMGOMGOMGOMG" },
  ]);

  return (
    <View>
      <Tostada />
      <SearchBar
        placeholder="Search whatever your heart desires"
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
                ? infoCards.filter((info) => info.title === search)
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
