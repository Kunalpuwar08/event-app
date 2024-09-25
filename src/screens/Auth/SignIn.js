import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CInput from '../../components/CInput';
import CButton from '../../components/CButton';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (auth()?.currentUser) {
      navigation.navigate('home');
    }
  }, []);

  const onSignin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('home');
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.logoText}>EventTest</Text>
      </View>

      <View style={styles.mainConatiner}>
        <Text style={styles.heading}>SignIn</Text>

        <CInput
          value={email}
          placeholder={'abc@gmail.com'}
          onChangeText={txt => setEmail(txt)}
        />
        <CInput
          value={password}
          placeholder={'Your Password'}
          onChangeText={txt => setPassword(txt)}
        />

        <View style={styles.forgotContainer}>
          <Text>Forgot Password?</Text>
        </View>

        <CButton btnTxt={'Sign In'} onPress={onSignin} />
        <TouchableOpacity
          style={styles.txt}
          onPress={() => navigation.navigate('signup')}>
          <Text>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    height: '20%',
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 50,
    width: 50,
  },
  logoText: {
    fontSize: 35,
    color: '#000',
    fontWeight: '500',
    marginTop: 8,
  },
  mainConatiner: {
    marginTop: 28,
    width: '90%',
    alignSelf: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000',
    marginBottom: 10,
  },
  forgotContainer: {
    width: 'auto',
    alignSelf: 'flex-end',
    marginVertical: 5,
  },
  txt: {
    alignSelf: 'center',
  },
});
