import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

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
          <Text style={styles.buttonText}>Products</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.offersButton]}
          onPress={()=>navigation.navigate("HotSaleStack",{screen:"HotSale"})}
        >
          <Text style={styles.buttonText}>Hot Sale</Text>
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
    backgroundColor: '#34495e', // Color de fondo oscuro azul
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
    color: '#ffffff', // Color de texto blanco
  },
  catalogButton: {
    backgroundColor: '#3498db', // Azul claro para el botón de Catálogo
  },
  offersButton: {
    backgroundColor: '#2ecc71', // Verde azulado para el botón de Ofertas
  },
  purchasesButton: {
    backgroundColor: '#8C7B61', // Rojo oscuro para el fondo del botón "My Purchases"
  },
  cartButton: {
    backgroundColor: '#e74c3c', // Rojo oscuro para el botón de Carrito
  },
  
});

export default HomeScreen;
