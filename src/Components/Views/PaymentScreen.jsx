import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ActivityIndicator, BackHandler } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import PrimaryButton from '../CoreComponents/PrimaryButton';
import CustomInput from '../CoreComponents/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllCartItems } from '../../../Redux/slices/GeneralSlice';
import { AppColors, Colors, GeneralStyle } from '../../Styles/GeneralStyles';
import { usePostOrderMutation, useReduceProductStockMutation } from '../../services/ecommerceAPI';
import SecondaryButton from '../CoreComponents/SecondaryButton';

const PaymentScreen = ({  }) => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [creditCardError, setCreditCardError] = useState({error:false,message:''});
  const [securityCodeError, setSecurityCodeError] = useState({error:false,message:''});
  const [cardholderNameError, setCardholderNameError] = useState({error:false,message:''});
  const route = useRoute();
  const { totalPrice } = route.params;

  const [postOrder, { isLoading, isError, isSuccess }] = usePostOrderMutation();
  const [updateProductStock, { }] = useReduceProductStockMutation();

  const {cart,purchases} = useSelector(state => state.General);
  const {user} = useSelector(state=>state.General)

  const cases ={
    good:'VALIDATED',
    bad:'ERROR',
    neutral:'NEUTRAL',
  }
  const [purchaseStatus, setPurchaseStatus] = useState(cases.neutral);

  const handleReduceStock = async (items) => {
    try {
      let allProductsHaveEnoughStock = true;
      let i = 0;
      while (allProductsHaveEnoughStock && i < items.length) {
        const product = items[i];
        const { item, stock, quantity } = product;
        let newStock = stock - quantity;
        if (newStock < 0) {
          console.error(`La cantidad solicitada para el producto con ID ${item.id} excede el stock disponible`);
          allProductsHaveEnoughStock = false;
        }
        i++;
      }
  
      if (allProductsHaveEnoughStock) {
        for (const product of items) {
          const { item, quantity } = product;
          await updateProductStock({ productId: item.id, amount: item.stock - quantity });
        }
      } else {
        return false;
      }
  
      return true;
    } catch (error) {
      console.error('Error al reducir el stock:', error);
      return false;
    }
  };

  const simulatePurchase = async () => {
    if (!creditCardNumber || !securityCode || !cardholderName) {
      setCreditCardError({error:!creditCardNumber,message:''});
      setSecurityCodeError({error:!securityCode,message:''});
      setCardholderNameError({error:!cardholderName,message:''});
      setLoading(false);
      return;
    } else {
      setLoading(true);
      await simulateTransaction(); // Espera 2 segundos con el cosito girando
      
      const success = true;//Math.random() < 0.5; // 50% de probabilidad para simular mas realidad

      if(success){
        try{
          let item={
            date: new Date().getTime(),
            totalAmount: totalPrice,
            items: cart,
            card: creditCardNumber,
            user:user.localId
          }
          const checkStock  = await handleReduceStock(cart);
          if(checkStock){
            await postOrder(item);
            setPurchaseStatus(cases.good);
            dispatch(deleteAllCartItems());
          }else{
            setPurchaseStatus(cases.bad);
          }

        }catch(error){
            console.log(error)
        }
      } else {
        setPurchaseStatus(cases.bad);
      }
      setLoading(false);
    }
  };

  const simulateTransaction = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };
  const dispatch = useDispatch()
  const handleReturn = () => {
    dispatch(deleteAllCartItems())
    navigation.navigate("CategoriesStack")
  };

  const isFocused = useIsFocused()

  useEffect(()=>{
    if(!isFocused){
      navigation.pop()
    }
  },[isFocused])

  return (
    <View style={[styles.container,{backgroundColor:AppColors.footerBackground}]}>
      {loading ? <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />
      :
      <>
      {purchaseStatus=== cases.neutral &&<View style={{ width: '100%' }}>
        <Text style={[styles.text, GeneralStyle.fontSize18,{color:AppColors.white}]}>Total to pay: ${totalPrice.toFixed(2)}</Text>
        <CustomInput
          placeholder="Credit Card Number"
          keyboardType="numeric"
          value={creditCardNumber}
          setValue={(e) => setCreditCardNumber(e)}
          error={creditCardError}
          setError={setCreditCardError}
        />
        <CustomInput
          placeholder="Security Code"
          keyboardType="numeric"
          value={securityCode}
          setValue={(e) => setSecurityCode(e)}
          error={securityCodeError}
          setError={setSecurityCodeError}
        />
        <CustomInput
          placeholder="Cardholder Name"
          value={cardholderName}
          setValue={(e) => setCardholderName(e)}
          error={cardholderNameError}
          setError={setCardholderNameError}
        />
        <View style={[GeneralStyle.row, GeneralStyle.justifyBetween,GeneralStyle.marginTop5]}>
          <PrimaryButton color="#B93649" label="Cancel" onPress={handleReturn} />
          <PrimaryButton color={Colors.green} label="Buy" onPress={simulatePurchase} />
        </View>
      </View>}

      {purchaseStatus === cases.good && (
        <>
          <Text style={[styles.successText,{color:AppColors.green}]}>Purchase successful!</Text>
          <SecondaryButton label='View my purchases' onPress={()=>{navigation.navigate("Purchases")}}></SecondaryButton>
        </>
      )}
      {purchaseStatus === cases.bad && (
        <>
          <Text style={[styles.errorText, { color: Colors.error,textAlign:'center' }]}>Purchase failed!</Text>
          <PrimaryButton color={Colors.error} label="Try again" 
          onPress={() => 
            setPurchaseStatus(cases.neutral)
          }
            />
        </>
      )}
      </>}
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  successText: {
    marginVertical: 20,
    fontSize: 30,
  },
  errorText: {
    fontSize: 20,
    marginVertical: 20,

  },
});