import { useState } from 'react';
import {StatusBar, StyleSheet, SafeAreaView,Text, View ,TextInput,ScrollView,Image,FlatList,Keyboard,Dimensions, Pressable } from 'react-native';

import { FontsArray } from './src/Constants/Fonts';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native'
import MyNavigator from './src/Components/Navigation/Navigator';
import store from './Redux/Store';
import { Provider } from 'react-redux';
import { initDb } from './src/db';
import LoadingIndicator from './src/Components/CoreComponents/LoadingIndicator';
import { AppColors, GeneralStyle } from './src/Styles/GeneralStyles';


export default function App() {
      
  const [fontsLoaded] = Font.useFonts(FontsArray);

  if(!fontsLoaded){
    return <View style={[GeneralStyle.flex1,GeneralStyle.justifyCenter,GeneralStyle.itemsCenter,{ backgroundColor:AppColors.footerBackground}]}>
      <LoadingIndicator/>
    </View>
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <StatusBar  backgroundColor="transparent" barStyle="dark-content" />
        <Provider store={store}>
        <MyNavigator />
        </Provider>
        </NavigationContainer>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer:{
    flexDirection:'row',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection:'column',
    backgroundColor:'white',
  },
});
