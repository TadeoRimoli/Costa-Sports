import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Importa ImagePicker de expo-image-picker
import CustomButton from '../CoreComponents/CustomButton';
import { GeneralStyle } from '../../Styles/GeneralStyles';
import { resetUser, setUser } from '../../../Redux/slices/GeneralSlice';
import { useGetImageProfileQuery, usePutImageProfileMutation } from '../../services/profileApi';
import MapPreview from '../CoreComponents/MapPreview';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';

const UserView = () => {

    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.General)

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
    <ScrollView contentContainerStyle={{alignItems:'center',padding:10}}>
        
        <View style={[GeneralStyle.justifyCenter,GeneralStyle.itemsCenter]}>
            {image ? (
            <TouchableOpacity onPress={showImagePickerOptions}>
            <Image  source={{ uri: image }} style={styles.userImage} />
            </TouchableOpacity>
            )
            : (
            <Pressable onPress={showImagePickerOptions} style={styles.userIconContainer}>
                <Ionicons name="person-circle-outline" size={100} color="black" />
            </Pressable>
            )}
            <View style={[GeneralStyle.row, GeneralStyle.marginBottom20]}>
                <Text style={[GeneralStyle.fontBold, GeneralStyle.fontSize18]}>Email: </Text>
                <Text style={[GeneralStyle.fontSize18]}>{user.email}</Text>
            </View>
        </View>
        <MapPreview/>
    </ScrollView>
  )
}

export default UserView

const styles = StyleSheet.create({
    userImage: {
      width: 150,
      height: 150,
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
  