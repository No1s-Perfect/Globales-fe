import CardView from './Card';
import { FlatList, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
const CardList = ({ setShow, infoCards,setIdOferta }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  return (
    <>
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}
      >
        {infoCards.map((info, index) => (
          <CardView
            key={index}
            setShow={setShow}
            idOferta={info.idOferta}
            title={info.tituloOferta}
            parla={info.descripcionOferta}
            url={info.pathCategoria}
            numTelefono={info.numTelefono}
            ubicacion={info.ubicacion}
            nomUsuario={info.nombreUsuario}
            setIdOferta={setIdOferta}
            precioServicio={info.precioServicio}
          ></CardView>
        ))}
      </Animated.View>
    </>
  );
};

export default CardList;

