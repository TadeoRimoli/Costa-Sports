import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // Función para cargar los datos de AsyncStorage
    const loadPurchases = async () => {
      try {
        const purchasesData = await AsyncStorage.getItem('purchases');
        if (purchasesData) {
          const parsedPurchases = JSON.parse(purchasesData);
          setPurchases(parsedPurchases);
        }
      } catch (error) {
        console.error('Error loading purchases:', error);
      }
    };

    // Llamar a la función para cargar los datos al montar el componente
    loadPurchases();
  }, []);
console.log(purchases)
  return (
    <ScrollView style={styles.container}>
      {purchases.map((purchase, index) => {
        let date = new Date(purchase.date)
        return <View key={index} style={styles.purchaseCard}>
          <Text>Date: {date.toLocaleDateString()}</Text>
          <Text>Hour: {date.toLocaleTimeString()}</Text>
          <Text>Total Amount: ${purchase.totalAmount ? purchase.totalAmount.toFixed(2) : 'N/A'}</Text>
          <Text>Credit Card Number: {purchase.card}</Text>
          <Text>Items:</Text>
          {purchase.items.map((item, itemIndex) => {
            return <View key={itemIndex} style={{marginLeft:5}}>
              <Text>{item.item.title}</Text>
              <Text>Price: ${item.item.price.toFixed(2)}</Text>
            </View>
          })}
        </View>
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  purchaseCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});

export default Purchases;
