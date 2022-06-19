import { useState, useEffect, useContext,useCallback } from 'react';
import ModalReview from '../components/ModalEditOffer';
import { View, ScrollView , RefreshControl} from 'react-native';
import Tostada from '../components/Tostada';
import CardListOffersU from '../components/CardListOffersU';
import { url } from '../components/Constants';
//API client
import axios from 'axios';
import Spinner from '../components/Spinner';


import UserContext from '../components/context/UserContext';
const CardsOffersU = ({navigation}) => {
  const { user, setUser } = useContext(UserContext);

  const [show, setShow] = useState(false);
  const [infoCards, setInfoCards] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [idOferta,setIdOferta] = useState(-1)
  const handleOffers = async () => {
    try {
      setFetching(true);
      const res = await axios.get( `${url.userOffers}/${user.id}`);
      console.log(res.data);
      setInfoCards(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setFetching(false);
    }
  };
  const onRefresh = useCallback(() => {
    handleOffers()
  }, []);

  useEffect(() => {
    console.log('cards');
    handleOffers();
  }, []);
  return (
    <View>
      <Tostada />
      <ScrollView refreshControl={<RefreshControl refreshing={fetching} onRefresh={onRefresh} />}>
        <View style={{ marginBottom: 100 }}>
          {!fetching && (
            <CardListOffersU
              infoCards={infoCards}
              setShow={setShow}
              setIdOferta={setIdOferta}
            />
          )}
          {fetching && (
            <View
              style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Spinner />
            </View>
          )}
        </View>
      </ScrollView>
      <ModalReview show={show} idOferta={idOferta}setShow={setShow} />
    </View>
  );
};

export default CardsOffersU;
