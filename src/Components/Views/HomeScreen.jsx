import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { fetchSession } from '../../db';

const HomeScreen = ({navigation,route}) => {
  
  const hour = new Date().getHours();
  

  return (
    <View style={styles.container}>
      <Text style={styles.saludo}>{hour <12 ? 'Good morning!' : hour<18 ? 'Good afternoon!' : 'Good evening!' }</Text>
      <Text style={styles.noticia}>Explore, choose, enjoy! Find what you need in one place.</Text>
        <Pressable
          style={[styles.button, styles.catalogButton]}
          onPress={()=>navigation.navigate("CategoriesStack",{screen:"Categories"})}
        >
          <Text style={styles.buttonText}>Categories</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.cartButton]}
          onPress={()=>navigation.navigate("CartStack",{screen:"ShoppingCart"})}
        >
        
          <Text style={styles.buttonText}>Cart</Text>
        </Pressable>
        
      <Pressable
          style={[styles.button, styles.purchasesButton]}
          onPress={()=>navigation.navigate("Purchases")}
        >
      <Text style={styles.buttonText}>My Purchases</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34495e', 
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
    paddingHorizontal: 20,
    marginBottom: 20,

  },
  button: {
    width: '80%',
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff', 
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
