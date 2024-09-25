import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CButton from '../../components/CButton';

const Home = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await firestore()
        .collection('Events')
        .doc(auth()?.currentUser?.email)
        .collection('event')
        .get()
        .then(querySnapshot => {
          const dumy = [];
          querySnapshot?.forEach(documentSnapshot => {
            if (documentSnapshot?.data) {
              dumy.push(documentSnapshot?.data?.());
            }
          });
          setData(dumy);
        });
    };

    getData();
  }, []);

  const renderCard = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => navigation.navigate('detail', {item: item})}
        style={styles.card}>
        <Image
          source={require('../../assets/cardImg.png')}
          style={styles.cardImg}
        />

        <Text style={styles.label}>{item.title}</Text>
        <Text style={styles.locationlabel}>{item.location}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.topContainer}>
          <Image source={require('../../assets/menu.png')} />
          <Image source={require('../../assets/noti.png')} />
        </View>
      </View>
      <View style={styles.mainView}>
        <View style={styles.mainHead}>
          <Text>Upcoming Events</Text>
          <Text>See All</Text>
        </View>
        <FlatList
          data={data}
          horizontal
          renderItem={renderCard}
          keyExtractor={(_, e) => e}
          contentContainerStyle={{height: 300, justifyContent: 'center'}}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <CButton
        btnTxt={'Logout'}
        onPress={() =>
          auth()
            .signOut()
            .then(() => navigation.navigate('signin'))
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topView: {
    height: '20%',
    backgroundColor: '#4A43EC',
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33,
  },
  mainView: {
    marginVertical: 10,
    width: '95%',
    alignSelf: 'flex-end',
  },
  card: {
    height: 255,
    width: 237,
    backgroundColor: '#fff',
    marginHorizontal: 8,
    borderRadius: 24,
    elevation: 6,
    padding: 9,
  },
  mainHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 9,
  },
  cardImg: {
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '400',
    marginVertical: 7,
    color: '#000',
    width: '90%',
  },
  topContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  locationlabel: {
    fontSize: 13,
    fontWeight: '400',
    color: '#2B2849',
  },
});
