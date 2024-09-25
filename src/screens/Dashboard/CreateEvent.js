import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import CInput from '../../components/CInput';
import CButton from '../../components/CButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CImagePicker from '../../components/CImagePicker';
import storage from '@react-native-firebase/storage';

const CreateEvent = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLoaction] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  const createEvent = async () => {
    const currentUserEmail = auth()?.currentUser?.email;
    const data = {
      title: title,
      description: description,
      date: date,
      location: location,
    };

    try {
      const imageUrls = await Promise.all(
        selectedImages.map(async image => {
          const imageName = `events/${currentUserEmail}/${Date.now()}_${
            image.fileName
          }`;
          const reference = storage().ref(imageName);

          await reference.putFile(image.uri);

          const url = await reference.getDownloadURL();
          return url;
        }),
      );

      const eventData = {...data, images: imageUrls};

      await firestore()
        .collection('Events')
        .doc(currentUserEmail)
        .collection('event')
        .add(eventData);

      navigation.navigate('dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  const handleImagesSelected = images => {
    setSelectedImages(images);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} color={'#000'} />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <Text style={styles.label}>New Event</Text>

        <CInput
          value={title}
          placeholder={'Event Title'}
          onChangeText={txt => setTitle(txt)}
        />
        <CInput
          value={description}
          placeholder={'Event Description'}
          onChangeText={txt => setDescription(txt)}
        />
        <CInput
          value={date}
          placeholder={'Date'}
          onChangeText={txt => setDate(txt)}
        />
        <CInput
          value={location}
          placeholder={'loacation'}
          onChangeText={txt => setLoaction(txt)}
        />

        <CImagePicker onImagesSelected={handleImagesSelected} />

        <CButton btnTxt={'Add Event'} onPress={createEvent} />
      </View>
    </View>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '90%',
    alignSelf: 'center',
    height: '10%',
    justifyContent: 'center',
  },
  mainContainer: {
    marginTop: 18,
    width: '90%',
    alignSelf: 'center',
  },
  label: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000',
  },
});
