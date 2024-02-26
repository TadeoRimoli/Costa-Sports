import { useState } from 'react';
import {StatusBar, StyleSheet, SafeAreaView,Text, View ,TextInput,ScrollView,Image,FlatList,Keyboard,Dimensions, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, FontSizeStyles, GeneralStyle, MarginDirectionStyles, MarginStyles } from './Styles/GeneralStyles';
import { productCategories,products } from './src/Constants/Arrays';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProductCard from './src/Components/Cards/ProductCard';
import Header from './src/Components/CoreComponents/Header';
import ProductCatalog from './src/Components/Views/ProductCatalog';
import ProductOffers from './src/Components/Views/ProductOffers';
import ShoppingCart from './src/Components/Views/ShoppingCart';
import HomeScreen from './src/Components/Views/HomeScreen';
import { FontsArray } from './src/Constants/Fonts';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native'
import MyNavigator from './src/Components/Navigation/Navigator';
import store from './Redux/Store';
import { Provider } from 'react-redux';

export default function App() {
      
  const [fontsLoaded] = Font.useFonts(FontsArray);

  if(!fontsLoaded){
    return <Text>Loading Fonts</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <StatusBar  />
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
