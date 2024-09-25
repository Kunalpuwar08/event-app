import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CInput from '../../components/CInput';
import CButton from '../../components/CButton';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUp = () => {
  const navigation = useNavigation();

  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        firestore().collection('Users').doc(email).set({
          email: email,
          fullname: fullname,
          password: password,
        });
        navigation.navigate('signin');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error, 'Err >>>>>>>>>>>>');
      });
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
          placeholder={'FullName'}
          value={fullname}
          onChangeText={txt => setFullName(txt)}
        />
        <CInput
          placeholder={'abc@gmail.com'}
          value={email}
          onChangeText={txt => setEmail(txt)}
        />
        <CInput
          placeholder={'Your Password'}
          value={password}
          onChangeText={txt => setPassword(txt)}
          secureTextEntry={true}
        />
        <CInput
          placeholder={'Confirm Password'}
          value={confirmPassword}
          onChangeText={txt => setConfirmPassword(txt)}
          secureTextEntry={true}
        />

        <View style={styles.forgotContainer}>
          <Text>Forgot Password?</Text>
        </View>

        <CButton btnTxt={'SignUp'} onPress={onSignUp} />

        <TouchableOpacity
          style={styles.txt}
          onPress={() => navigation.navigate('signin')}>
          <Text>Already have an account? Signin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

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
