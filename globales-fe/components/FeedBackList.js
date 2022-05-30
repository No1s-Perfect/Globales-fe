import { ScrollView } from "react-native";
import Feed from "./Feed";

const FeedBackList = () => {
  const DATA = [
    {
      star: 5,
      message: "BUENO ESTE MAE APESTA",
      nombre: "DAVID ZARATE",
      id: 1,
    },
    {
      star: 4,
      message: "WTF",
      nombre: "JUANITO DEL BOSQUE",
      id: 2,
    },
  ];

  return (
    <ScrollView>
      {DATA.map((info, index) => (
        <Feed
          key={index}
          star={info.star}
          nombre={info.nombre}
          msg={info.message}
        />
      ))}
    </ScrollView>
  );
};

export default FeedBackList;
