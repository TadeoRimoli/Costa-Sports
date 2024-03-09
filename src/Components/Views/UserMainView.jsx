import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Importa ImagePicker de expo-image-picker
import CustomButton from '../CoreComponents/CustomButton';
import { GeneralStyle } from '../../Styles/GeneralStyles';
import LoadingIndicator from '../CoreComponents/LoadingIndicator';
import { useNavigation } from '@react-navigation/native';
import { resetUser, setUser } from '../../../Redux/slices/GeneralSlice';
import { useGetImageProfileQuery, usePutImageProfileMutation } from '../../services/profileApi';
const UserMainView = () => {
  const {user} = useSelector(state=>state.General)
  const dispatch = useDispatch()

  const [putImageProfile] = usePutImageProfileMutation()
  const {data,isSuccess} = useGetImageProfileQuery(user.localId)
  const [image, setImage] = useState(null);

    useEffect(()=>{
      if(isSuccess && data) setImage(data.image)
  },[isSuccess,data])


  const showImagePickerOptions = () => {
    Alert.alert(
      'Seleccionar imagen',
      'Elige una opción para seleccionar una imagen:',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Galería', onPress: pickImageFromGallery },
        { text: 'Cámara', onPress: takePhotoWithCamera },
      ]
    );
  };
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
  const pickImageFromGallery = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        throw new Error('Permisos de la galería requeridos');
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({base64:true});
      if (pickerResult.canceled === true) {
        return;
      }

      const { uri } = pickerResult.assets[0];
      setImage(uri);
      let response = await putImageProfile({image:'data:image/jpeg;base64,' + pickerResult.assets[0].base64,localId:user.localId})
    } catch (error) {
      console.error('Error al seleccionar imagen de la galería:', error);
      Alert.alert('Error', 'Ocurrió un error al seleccionar la imagen de la galería');
    }
  };
  const takePhotoWithCamera = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        throw new Error('Permisos de la cámara requeridos');
      }

      const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing:true,
        aspect:[6,4],
        quality:0.3,
        base64:true
     })
      if (pickerResult.canceled === true) {
        return;
      }
      const { uri } = pickerResult.assets[0];
      setImage(uri);
      await putImageProfile({image:'data:image/jpeg;base64,'+pickerResult.assets[0].base64,localId:user.localId})
    } catch (error) {
      console.error('Error al tomar foto con la cámara:', error);
      Alert.alert('Error', 'Ocurrió un error al tomar la foto con la cámara');
    }
  };

  return (
    <View style={styles.container}>
        <CustomButton label="Cerrar sesión" customStyles={{alignSelf:'flex-end'}} onPress={handleLogout} />
      <View style={[GeneralStyle.flex1,GeneralStyle.justifyCenter,GeneralStyle.itemsCenter]}>
      {/* Mostrar la imagen seleccionada o el icono de usuario */}
        {image ? (
          <TouchableOpacity onPress={showImagePickerOptions}>
          <Image  source={{ uri: image }} style={styles.userImage} />
          </TouchableOpacity>
        )
        : (
          <TouchableOpacity onPress={showImagePickerOptions} style={styles.userIconContainer}>
            <Ionicons name="person-circle-outline" size={100} color="black" />
          </TouchableOpacity>
        )}
        <View style={[GeneralStyle.row, GeneralStyle.marginBottom20]}>
          <Text style={[GeneralStyle.fontBold, GeneralStyle.fontSize18]}>Email: </Text>
          <Text style={[GeneralStyle.fontSize18]}>{user.email}</Text>
        </View>
      </View>
        {/* <CustomButton label="Eliminar cuenta" onPress={handleDeleteAccount} /> */}
    </View>
  );
};


export default UserMainView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    alignItems: 'center',
  },
  userImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 20,
  },
  userIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
});
