import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity } from 'react-native';
import MapPreview from '../CoreComponents/MapPreview';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserView from './UserView';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import SettingsScreen from './Settings';
import SecurityScreen from './Security';
import { deleteSession } from '../../db';
import { reset, setUser } from '../../../Redux/slices/GeneralSlice';
import { AppColors } from '../../Styles/GeneralStyles';

const Stack = createNativeStackNavigator()

const UserMainView = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
      Alert.alert(
          'Log out',
          'Are you sure you want to log out?',
          [
            { text: 'Go back', style: 'cancel' },
            { text: 'Log out', onPress:()=>{ 
              deleteSession()
              dispatch(reset())
              dispatch(setUser(null))
            } },
          ]
        );
      };
  return (
   <Stack.Navigator >
    <Stack.Screen name="Perfil" component={UserView}
        options={{
          headerTintColor:AppColors.white,
          headerStyle:{
            backgroundColor:AppColors.footerBackground,
          },
          headerRight: () => (
            <Ionicons
              name="log-out"
              size={30}
              color={AppColors.white}
              style={{ marginRight: 10 }}
              onPress={handleLogout}
            />
          ),
        }}
    />
    <Stack.Screen name="Location" component={MapPreview}/>
    <Stack.Screen name="Settings" component={SettingsScreen}/>
    <Stack.Screen name="Security" component={SecurityScreen}/>

   </Stack.Navigator>
  );
};


export default UserMainView;

