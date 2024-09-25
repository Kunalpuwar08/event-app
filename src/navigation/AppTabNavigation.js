import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Dashboard/Home';
import CreateEvent from '../screens/Dashboard/CreateEvent';
import ListEvent from '../screens/Dashboard/ListEvent';
import Map from '../screens/Dashboard/Map';
import Profile from '../screens/Dashboard/Profile';

const Tab = createBottomTabNavigator();

const AppTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="dashboard">
      <Tab.Screen
        name="dashboard"
        component={Home}
        options={{tabBarLabel: 'Explore'}}
      />
      <Tab.Screen
        name="listEvent"
        component={ListEvent}
        options={{tabBarLabel: 'Events'}}
      />
      <Tab.Screen
        name="create"
        component={CreateEvent}
        options={{
          tabBarIcon: () => (
            <View style={styles.plusBtn}>
              <Text style={styles.IconStyle}>+</Text>
            </View>
          ),
          tabBarLabelStyle: {display: 'none'},
        }}
      />
      <Tab.Screen name="map" component={Map} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default AppTabNavigation;

const styles = StyleSheet.create({
  plusBtn: {
    height: 46,
    width: 46,
    borderRadius: 23,
    backgroundColor: '#5669FF',
    alignItems: 'center',
    justifyContent: 'center',
    top: -20,
  },
  IconStyle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
