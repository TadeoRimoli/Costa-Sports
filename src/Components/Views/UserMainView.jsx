import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity } from 'react-native';
import MapPreview from '../CoreComponents/MapPreview';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserView from './UserView';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator()

const UserMainView = () => {
  
    const handleLogout = () => {
      Alert.alert(
          'Cerrar sesión',
          '¿Estás seguro de que deseas cerrar sesión?',
          [
            { text: 'Volver', style: 'cancel' },
            { text: 'Cerrar sesión', onPress:()=>{ dispatch(setUser(null)) } },
          ]
        );
      };

  return (
   <Stack.Navigator >
    <Stack.Screen name="Perfil" component={UserView}
        options={{
          headerRight: () => (
            <Ionicons
              name="log-out"
              size={30}
              color="black"
              style={{ marginRight: 10 }}
              onPress={handleLogout}
            />
          ),
        }}
    >

    </Stack.Screen>
   </Stack.Navigator>
  );
};


export default UserMainView;

