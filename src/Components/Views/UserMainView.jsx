import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../CoreComponents/CustomButton';
import { GeneralStyle } from '../../Styles/GeneralStyles';
import LoadingIndicator from '../CoreComponents/LoadingIndicator';
import { useNavigation } from '@react-navigation/native';
import { resetUser, setUser } from '../../../Redux/slices/GeneralSlice';

const UserMainView = () => {
  const {user} = useSelector(state=>state.General)
  const dispatch = useDispatch()
    
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
    const handleDeleteAccount = () => {
        Alert.alert(
          'Eliminar cuenta',
          '¿Estás seguro de que deseas eliminar tu cuenta?',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Eliminar', onPress: () => {} },
          ]
        );
      };
   
    
  return (
    <View style={styles.container}>
      <View style={[GeneralStyle.row,GeneralStyle.marginBottom20]}>
        <Text style={[GeneralStyle.fontBold,,GeneralStyle.fontSize18]}>Email: </Text>
        <Text style={[,GeneralStyle.fontSize18]}>{user.email}</Text>
      </View>

      <View style={[GeneralStyle.row,GeneralStyle.justifyBetween,GeneralStyle.maxwidth]}>
        <CustomButton label="Eliminar cuenta" onPress={handleDeleteAccount} />
        <CustomButton label="Cerrar sesión" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default UserMainView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
