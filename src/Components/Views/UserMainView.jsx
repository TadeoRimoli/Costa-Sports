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
import { reset, setUser, showLogoutModal } from '../../../Redux/slices/GeneralSlice';
import { AppColors } from '../../Styles/GeneralStyles';

const Stack = createNativeStackNavigator()

const UserMainView = () => {
    const dispatch = useDispatch()

   

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
              onPress={()=>{dispatch(showLogoutModal())}}
            />
          ),
        }}
    />
    <Stack.Screen name="Location" 
    options={{
      headerTintColor:AppColors.white,
      headerStyle:{
        backgroundColor:AppColors.footerBackground
      }
    }}
    component={MapPreview}/>
    <Stack.Screen name="Settings"
    options={{
      headerTintColor:AppColors.white,
      headerStyle:{
        backgroundColor:AppColors.footerBackground
      }
    }}
    component={SettingsScreen}/>
    <Stack.Screen name="Security"
    options={{
      headerTintColor:AppColors.white,
      headerStyle:{
        backgroundColor:AppColors.footerBackground
      }
    }}
    component={SecurityScreen}/>

   </Stack.Navigator>
  );
};


export default UserMainView;

