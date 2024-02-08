import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ viewIndexes,navigate }) => {
  
  const [saludo, setSaludo] = useState('');

  useEffect(() => {
    // Logic to get the personalized greeting based on the time of day
    const hour = new Date().getHours();
    if (hour < 12) {
      setSaludo('Good morning!');
    } else if (hour < 18) {
      setSaludo('Good afternoon!');
    } else {
      setSaludo('Good evening!');
    }
  }, []);

  return (
    <View style={styles.container}>
    <Text style={styles.saludo}>{saludo}</Text>
    <Text style={styles.noticia}>Explore, choose, enjoy! Find what you need in one place.</Text>
      <TouchableOpacity
        style={[styles.button, styles.catalogButton]}
        onPress={() => navigate(viewIndexes.products)}
      >
        <Text style={styles.buttonText}>Products</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.offersButton]}
        onPress={() => navigate(viewIndexes.offers)}
      >
        <Text style={styles.buttonText}>Hot Sale</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.cartButton]}
        onPress={() => navigate(viewIndexes.cart)}
      >
        <Text style={styles.buttonText}>Cart</Text>
      </TouchableOpacity>
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
  cartButton: {
    backgroundColor: '#e74c3c', // Rojo oscuro para el botón de Carrito
  },
});

export default HomeScreen;
