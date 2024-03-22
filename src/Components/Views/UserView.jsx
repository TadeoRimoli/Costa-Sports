import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Importa ImagePicker de expo-image-picker
import CustomButton from '../CoreComponents/CustomButton';
import { AppColors, GeneralStyle } from '../../Styles/GeneralStyles';
import { resetUser, setUser } from '../../../Redux/slices/GeneralSlice';
import { useGetImageProfileQuery, usePutImageProfileMutation } from '../../services/profileApi';
import MapPreview from '../CoreComponents/MapPreview';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import NavigateRow from '../CoreComponents/NavigateRow';

const UserView = () => {

    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.General)

    const [putImageProfile] = usePutImageProfileMutation()
    const {data,isSuccess,refetch } = useGetImageProfileQuery( user?.localId ?? '-1')
    const [image, setImage] = useState(null);
  
      useEffect(()=>{
        if(isSuccess && data){
            setImage(data.image)
        }
    },[isSuccess,data])

    const showImagePickerOptions = () => {
      Alert.alert(
        'Select image',
        'Choose an option to select an image:',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Gallery', onPress: pickImageFromGallery },
          { text: 'Camera', onPress: takePhotoWithCamera },
        ]
      );
    };
   
    const pickImageFromGallery = async () => {
      try {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
          throw new Error('Gallery permissions required');
        }
    
        const pickerResult = await ImagePicker.launchImageLibraryAsync({base64:true});
        if (pickerResult.canceled === true) {
          return;
        }
    
        const { uri } = pickerResult.assets[0];
        setImage(uri);
        let response = await putImageProfile({image:'data:image/jpeg;base64,' + pickerResult.assets[0].base64,localId:user.localId})
      } catch (error) {
        console.error('Error selecting image from gallery:', error);
        Alert.alert('Error', 'An error occurred while selecting the image from the gallery');
      }
    };
    
    const takePhotoWithCamera = async () => {
      try {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
          throw new Error('Camera permissions required');
        }
    
        const pickerResult = await ImagePicker.launchCameraAsync({
          allowsEditing:true,
          aspect:[6,4],
          quality:0.3,
          base64:true
        });
        if (pickerResult.canceled === true) {
          return;
        }
        const { uri } = pickerResult.assets[0];
        setImage(uri);
        await putImageProfile({image:'data:image/jpeg;base64,'+pickerResult.assets[0].base64,localId:user.localId});
      } catch (error) {
        console.error('Error taking photo with camera:', error);
        Alert.alert('Error', 'An error occurred while taking the photo with the camera');
      }
    };
    const navigation = useNavigation()
  
  return (
    user ? 
    <View style={{flex:1,padding:10,justifyContent:'space-between',backgroundColor:AppColors.footerBackground}}>
      <View style={{alignItems:'center',}}>
          
          <View style={[GeneralStyle.justifyCenter,GeneralStyle.itemsCenter]}>
              {image ? (
              <TouchableOpacity onPress={showImagePickerOptions}>
              <Image  source={{ uri: image }} style={styles.userImage} />
              </TouchableOpacity>
              )
              : (
              <Pressable onPress={showImagePickerOptions} style={styles.userIconContainer}>
                  <Ionicons name="person-circle-outline" size={100} color={AppColors.white} />
              </Pressable>
              )}
                  <Text style={[GeneralStyle.fontSize18,GeneralStyle.marginBottom20,{color:AppColors.white}]}>{user.email}</Text>
          </View>
          <NavigateRow label="Purchases" route="Purchases" />
          <NavigateRow label="Location" route="Location" />
          <NavigateRow label="Settings" route="Settings" />
          <NavigateRow label="Security" route="Security" />
      </View>
      <Text style={{alignSelf:'flex-end',color:AppColors.white}}>Version 1.0.0</Text>

    </View> : null
  )
}

export default UserView

const styles = StyleSheet.create({
    userImage: {
      width: 100,
      height: 100,
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
    },
  });
  