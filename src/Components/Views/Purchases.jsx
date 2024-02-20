import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GeneralStyle } from '../../../Styles/GeneralStyles';
import { useCart } from '../Context/Context';

const Purchases = ({}) => {
  const { cart, setCart, purchases, setPurchases } = useCart();
  
  const renderItem = ({ item, index }) => {
    let date = new Date(item.date);
    return (
      <View style={styles.purchaseCard}>
        <View style={styles.header}>
          <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
          <Text style={styles.dateText}>{date.toLocaleTimeString()}</Text>
        </View>
        <Text style={styles.totalAmountText}>Total Amount: ${item.totalAmount ? item.totalAmount.toFixed(2) : 'N/A'}</Text>
        <Text style={styles.cardText}>Credit Card Number: {item.card}</Text>
        <Text style={styles.itemsHeader}>Items:</Text>
        {item.items.map((product, productIndex) => (
          <View key={productIndex} style={styles.itemContainer}>
            <Text style={styles.itemIndexText}>Item {productIndex + 1}</Text>
            <Text style={styles.itemTitleText}>{product.item.title}</Text>
            <Text style={styles.itemPriceText}>Price: ${product.item.price.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{alignItems:''}}
      data={purchases}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  purchaseCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
  },
  itemsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemContainer: {
    marginLeft: 10,
  },
  itemIndexText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemTitleText: {
    fontSize: 16,
  },
  itemPriceText: {
    fontSize: 16,
  },
});

export default Purchases;
