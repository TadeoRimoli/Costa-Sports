import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'; // Importa hook de navegación
import CartProduct from '../Cards/CartProduct';
import { Colors, FontSizeStyles } from '../../../Styles/GeneralStyles';
import CustomButton from '../../Components/CoreComponents/CustomButton';

const ShoppingCart = ({ cart, setCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const navigation = useNavigation(); // Inicializa el hook de navegación

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.item.price * item.quantity;
    });
    setTotalPrice(total);
  }, [cart]);

  const handlePayment = () => {
    // Navega a la vista de pago al presionar el botón
    navigation.navigate('PaymentScreen',{totalPrice});
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#34495e' }}>
      <View style={styles.totalContainer}>
        <Text style={[{ fontWeight: 'bold', color: 'white' }, FontSizeStyles.fontSize18]}>
          Total: ${totalPrice.toFixed(2)}
        </Text>
      </View>

      <FlatList
        data={cart}
        renderItem={({ item, index }) => (
          <CartProduct
            key={index + item.item.id.toString()}
            item={item.item}
            quantity={item.quantity}
            onRemove={() => {
              const updatedCart = [...cart];
              updatedCart.splice(index, 1);
              setCart(updatedCart);
            }}
          />
        )}
        keyExtractor={(item, index) => item.item.id.toString() + '_' + index.toString()}
      />

      {/* Botón para simular el pago */}
      {totalPrice>0 && <CustomButton color={Colors.green} label="Pagar" onPress={handlePayment} />}
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
});
