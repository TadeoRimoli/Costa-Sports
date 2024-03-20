import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,ImageBackground, TouchableOpacity, Pressable } from 'react-native';
import { fetchSession } from '../../db';
import { AppColors, GeneralStyle, NewColors } from '../../Styles/GeneralStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomButton from '../CoreComponents/CustomButton';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = ({navigation,route}) => {
  
  const isFocused = useIsFocused()
  const [saludo,setSaludo]=useState('')
  const [backgroundImage,setBackgroundImage]=useState(null)
  useEffect(()=>{
    if(isFocused){
      hour=new Date().getHours()
      if (hour > 6 && hour <= 12) {
        setSaludo('Good morning!')
        setBackgroundImage(require('../../images/morningbackground.png')) ;
      } else if (hour > 12 && hour < 18) {
        setSaludo('Good afternoon!')
        setBackgroundImage(require('../../images/afternoonbackground.png')) ;
      } else {
        setSaludo('Good evening!')
        setBackgroundImage(require('../../images/eveningbackground.png')) ;
      }
    }
    console.log("a")
  },[isFocused])

  return (
    <ImageBackground style={{ width: '100%', height: '100%' }} source={backgroundImage}> 
    <View style={styles.container}>
      <Text style={styles.saludo}>{saludo}</Text>
      <Text style={[styles.noticia]}>Explore, choose, enjoy! Find what you need in one place.</Text>
      <Pressable style={[styles.button, GeneralStyle.row,{backgroundColor:AppColors.primaryButton}]} onPress={() => navigation.navigate("CategoriesStack", { screen: "Categories" })}>
      <View style={[GeneralStyle.row, { flex: 1, justifyContent: 'center', alignItems: 'center' ,color:AppColors.primaryText}]}> 
        <Text style={[{fontSize:20,color:AppColors.primaryText,fontWeight:600},]}>Explore</Text>
      </View>
      <Ionicons name="arrow-forward" size={30} color="white" />
    </Pressable>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:20
  },
  saludo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  noticia: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  catalogButton: {
    backgroundColor: '#3498db', 
  },
  offersButton: {
    backgroundColor: '#2ecc71', 
  },
  purchasesButton: {
    backgroundColor: '#8C7B61',
  },
  cartButton: {
    backgroundColor: '#e74c3c',
  },
  
});

export default HomeScreen;
