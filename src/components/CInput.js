import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const CInput = ({
  leftImg,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  return (
    <View style={styles.inputContainer}>
      {leftImg && <Image source={leftImg} style={styles.leftImgStyle} />}
      <TextInput
        value={value}
        style={[styles.input, {width: leftImg ? '80%' : '100%'}]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default CInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E4DFDF',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 12,
    padding: 4,
  },
  leftImgStyle: {
    width: '20%',
  },
});
