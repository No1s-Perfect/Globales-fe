import CardView from "./Card";
import { FlatList } from "react-native";
const CardList = ({ setShow, infoCards }) => {
  {console.log(infoCards)}
  return (
    <>
      {
        infoCards.map((info, index) => (
          <CardView
            key={index}
            setShow={setShow}
            idOferta={info.idOferta}
            title={info.descripcionCategoria}
            parla={info.descripcionOferta}
            url={info.pathCategoria}
            numTelefono={info.numTelefono}
            ubicacion={info.ubicacion}
            nomUsuario={info.nombreUsuario}
          ></CardView>
        ))}
    </>
  );
};

export default CardList;
