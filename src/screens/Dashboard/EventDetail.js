import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';

const EventDetail = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const cardData = router.params.item;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/cardbg.png')}
        resizeMode="stretch"
        style={{height: 244, width: '100%', zIndex: 0}}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.goBack()}>
            <AntDesign name={'arrowleft'} size={22} color={'#fff'} />
          </TouchableOpacity>
          <Text style={styles.txt}>Event Details</Text>
        </View>
      </ImageBackground>

      <View style={styles.mainView}>
        <View style={styles.floatView}></View>
        <Text style={styles.nameTxt}>{cardData.name}</Text>

        <View style={styles.listData}>
          <View style={styles.icon}></View>
          <View>
            <Text style={{color: '#000', fontSize: 16}}>14 December, 2021</Text>
            <Text style={{color: '#747688'}}>Tuesday, 4:00PM - 9:00PM</Text>
          </View>
        </View>

        <View style={styles.listData}>
          <View style={styles.icon}></View>
          <View>
            <Text style={{color: '#000', fontSize: 16}}>
              Gala Convention Center
            </Text>
            <Text style={{color: '#747688'}}>36 Guild Street London, UK </Text>
          </View>
        </View>

        <Text style={styles.aboutLabel}>About Event</Text>
        <Text style={styles.descTxt}>{cardData.description}</Text>
      </View>
    </View>
  );
};

export default EventDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 100,
    padding: 9,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  txt: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
    marginLeft: 12,
  },
  nameTxt: {
    fontSize: 35,
    color: '#000',
    fontWeight: 'bold',
  },
  mainView: {
    width: '90%',
    alignSelf: 'center',
  },
  listData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 48,
    width: 48,
    backgroundColor: '#5669FF',
    borderRadius: 6,
    marginRight: 8,
    marginVertical: 8,
  },
  aboutLabel: {
    marginVertical: 12,
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
  },
  floatView: {
    height: 60,
    backgroundColor: '#fff',
    width: 250,
    elevation: 6,
    position: 'absolute',
    top: -25,
    right: 60,
    borderRadius: 24,
  },
});
