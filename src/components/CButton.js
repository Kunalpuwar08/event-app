import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const CButton = ({btnTxt, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.btn} onPress={onPress}>
      <Text style={styles.txt}>{btnTxt}</Text>
    </TouchableOpacity>
  );
};

export default CButton;

const styles = StyleSheet.create({
  btn: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#5669FF',
    height: 58,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  txt: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
});
