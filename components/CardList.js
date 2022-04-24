import CardView from "./Card";
import { FlatList } from "react-native";
const CardList = ({ setShow, infoCards }) => {
  return (
    <>
      {
        infoCards.map((info, index) => (
          <CardView
            key={index}
            setShow={setShow}
            title={info.title}
            parla={info.parla}
          ></CardView>
        ))}
    </>
  );
};

export default CardList;
