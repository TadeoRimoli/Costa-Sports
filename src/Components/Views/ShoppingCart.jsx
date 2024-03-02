import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CartProduct from '../Cards/CartProduct';
import CustomButton from '../../Components/CoreComponents/CustomButton';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem } from '../../../Redux/slices/GeneralSlice';
import { Colors, GeneralStyle } from '../../Styles/GeneralStyles';


const ShoppingCart = ({ }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const navigation = useNavigation(); 
  const {cart}= useSelector(state =>state.General)
  const dispatch = useDispatch();


  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.item.price * item.quantity;
    });
    setTotalPrice(total);
  }, [cart]);

  const handlePayment = () => {
    navigation.navigate('PaymentScreen', { totalPrice });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#34495e' }}>
      
      {totalPrice === 0 ? (
      <View style={styles.emptyCartMessage}>
        <Text style={styles.emptyCartText}>You don't have anything in your cart yet.</Text>
      </View>
      ):
      <View style={styles.totalContainer}>
        <Text style={[{ fontWeight: 'bold', color: 'white' }, GeneralStyle.fontSize18]}>
          Total: ${totalPrice.toFixed(2)}
        </Text>
      </View>
      }
      <FlatList
        data={cart}
        renderItem={({ item, index }) => (
          <CartProduct
            key={index + item.item.id.toString()}
            item={item.item}
            quantity={item.quantity}
            onRemove={() => {
              dispatch(removeCartItem(index))
            }}
          />
        )}
        keyExtractor={(item, index) => item.item.id.toString() + '_' + index.toString()}
      />

      {/* Botón para simular el pago */}
      {cart.length>0 && <CustomButton color={Colors.green} label="Go to Pay" onPress={handlePayment} />}
    </View>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
  totalContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  emptyCartMessage: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  emptyCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
