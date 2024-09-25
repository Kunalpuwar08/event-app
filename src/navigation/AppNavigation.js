import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import AppTabNavigation from './AppTabNavigation';
import EventDetail from '../screens/Dashboard/EventDetail';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="signin" component={SignIn} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="home" component={AppTabNavigation} />
      <Stack.Screen name="detail" component={EventDetail} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
