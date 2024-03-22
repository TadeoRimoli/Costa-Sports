import { Button, FlatList, StyleSheet, Text, View,Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import CartProduct from '../Cards/CartProduct';
import CustomButton from '../../Components/CoreComponents/CustomButton';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem } from '../../../Redux/slices/GeneralSlice';
import { AppColors, Colors, GeneralStyle } from '../../Styles/GeneralStyles';
import CustomInput from '../CoreComponents/CustomInput';
import Ionicons from '@expo/vector-icons/Ionicons';


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

  const windowWidth = Dimensions.get('window').width;

  return (
    <View style={{ flex: 1,backgroundColor: AppColors.footerBackground,}}>
      
      {totalPrice === 0 ? (
      <View style={styles.emptyCartMessage}>
        <Text style={styles.emptyCartText}>You don't have anything in your cart yet.</Text>
      </View>
      ):
      // <View style={[GeneralStyle.marginVertical10,GeneralStyle.marginHorizontal20]}>
      //   <Text style={[{ fontWeight: 'bold', color: AppColors.white }, GeneralStyle.fontSize18]}>
      //     Total: ${totalPrice.toFixed(2)}
      //   </Text>
      // </View>
      <View style={[GeneralStyle.row,GeneralStyle.itemsCenter,{
          padding: 10,
          borderRadius: 10,
          marginVertical: 10,
          borderColor: '#ccc',
          borderWidth: 1,
          backgroundColor:AppColors.white,
          width:windowWidth-20,
          alignSelf:'center',
      }]}>
        <View style={{ position: 'relative',marginRight:12 }}>
          <Ionicons color={'rgba(0, 0, 0, 0.7)'} name="cart-outline" size={30} />
          {cart.length > 0 && (
            <View style={{
              position: 'absolute',
              top: -5,
              right: -5,
              backgroundColor: 'black',
              borderRadius: 12,
              paddingHorizontal: 5,
              paddingVertical: 2,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{ color: 'white', fontSize: 12 }}>{cart.length}</Text>
            </View>
          )}
        </View>
        <Text style={{color:'rgba(0, 0, 0, 0.8)'}}>{`Total: $${totalPrice.toFixed(2)}`}</Text>
      </View>

      }
      <FlatList
        data={cart}
        renderItem={({ item, index }) => (
          <CartProduct
            key={index + item.item.id.toString()}
            item={item}
            onRemove={() => {
              dispatch(removeCartItem(index))
            }}
          />
        )}
        keyExtractor={(item, index) => item.item.id.toString() + '_' + index.toString()}
      />

      {/* Botón para simular el pago */}
      {cart.length>0 && <CustomButton color={AppColors.green} label="Go to Pay" onPress={handlePayment} 
      customStyles={{marginTop:4,marginBottom:8,width:'50%',alignSelf:'center'}} 
      textBlack={true}
      textStyles={{ fontWeight: '400'}} // Establecer el color del texto aquí
      />}
    </View>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
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
