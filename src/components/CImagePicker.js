import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

const CImagePicker = ({onImagesSelected}) => {
  const [images, setImages] = useState([]);

  const onUpload = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 2,
        quality: 0.6,
      },
      res => {
        if (!res.didCancel && res.assets) {
          setImages(res.assets);
          onImagesSelected(res.assets);
        }
      },
    );
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onUpload}
        style={styles.input}>
        <Text style={styles.txt}>Upload Images</Text>
      </TouchableOpacity>
      {images.length > 0 && (
        <View
          style={{
            height: 'auto',
            width: '90%',
            flexDirection: 'row',
            marginTop: 8,
          }}>
          {images.map(item => {
            return (
              <Image
                source={{uri: item?.uri}}
                style={{height: 100, width: 100, marginHorizontal: 5}}
              />
            );
          })}
        </View>
      )}
    </>
  );
};

export default CImagePicker;

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E4DFDF',
  },
  txt: {},
});
