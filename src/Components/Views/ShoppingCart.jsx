import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductCard from '../Cards/ProductCard'
import CartProduct from '../Cards/CartProduct'
import { FontSizeStyles, GeneralStyle } from '../../../Styles/GeneralStyles'

const ShoppingCart = ({cart, setCart}) => {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = 0;
        cart.forEach((item) => {
          total += item.item.price * item.quantity;
        });
        setTotalPrice(total);
      }, [cart]);

  return (
    <View style={{flex:1,backgroundColor: '#34495e'}}>
     <View style={styles.totalContainer}>
        <Text style={[{fontWeight:'bold',color:'white'},FontSizeStyles.fontSize18,]}>Total: ${totalPrice.toFixed(2)}</Text>
      </View>

    <FlatList
        data={cart}
        renderItem={({ item,index }) => (
          <CartProduct key={index+item.item.id.toString()} item={item.item} quantity={item.quantity} onRemove={()=>{
            const updatedCart = [...cart];
            updatedCart.splice(index, 1);
            setCart(updatedCart);
          }}></CartProduct>
        )}
        keyExtractor={(item, index) => item.item.id.toString() + '_' + index.toString()} // Utiliza el ID del elemento y el índice
        />
    </View>

  )
}

export default ShoppingCart

const styles = StyleSheet.create({
    totalContainer: {
      alignItems: 'flex-end',
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
   
  });
  