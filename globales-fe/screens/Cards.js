import { useState, useEffect, useCallback } from 'react';
import ModalReview from '../components/ModalReview';
import { View, ScrollView , RefreshControl} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Tostada from '../components/Tostada';
import CardList from '../components/CardList';
import { url } from '../components/Constants';
//API client
import axios from 'axios';
import Spinner from '../components/Spinner';

const Cards = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [infoCards, setInfoCards] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [idOferta,setIdOferta] = useState(-1)
  const handleOffers = async () => {
    try {
      setFetching(true);
      const res = await axios.get(url.offers);
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
      <SearchBar
        placeholder="Buscar ofertas según categoría"
        onChangeText={setSearch}
        value={search}
        lightTheme
        round
      />
      <ScrollView refreshControl={<RefreshControl refreshing={fetching} onRefresh={onRefresh} />}>
        <View style={{ marginBottom: 100 }}>
          {!fetching && (
            <CardList
              infoCards={search.length > 0 ? infoCards.filter((info) => info.title == search) : infoCards}
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

export default Cards;
