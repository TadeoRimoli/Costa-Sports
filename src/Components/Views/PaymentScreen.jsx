import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, FontSizeStyles, GeneralStyle } from '../../../Styles/GeneralStyles';
import CustomButton from '../CoreComponents/CustomButton';
import CustomInput from '../CoreComponents/CustomInput';

const PaymentScreen = ({ setCart }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [purchaseStatus, setPurchaseStatus] = useState('');
  const [creditCardError, setCreditCardError] = useState(false);
  const [securityCodeError, setSecurityCodeError] = useState(false);
  const [cardholderNameError, setCardholderNameError] = useState(false);
  const route = useRoute();
  const { totalPrice } = route.params;

  const simulatePurchase = () => {
    setLoading(true);
    // Verificar si los campos están vacíos
    if (!creditCardNumber || !securityCode || !cardholderName) {
      setCreditCardError(!creditCardNumber);
      setSecurityCodeError(!securityCode);
      setCardholderNameError(!cardholderName);
      setLoading(false);
      return;
    } else {
      // Simulación de proceso de compra
      setTimeout(() => {
        const success = Math.random() < 0.5; // 50% de probabilidad de éxito
        if (success) {
          setCart([]);
          setPurchaseStatus('success');
        } else {
          setPurchaseStatus('failed');
        }
        setLoading(false);
      }, 2000); // Simulando una espera de 2 segundos
    }
  };

  const handleReturn = () => {
    navigation.navigate('ShoppingCart'); // Volver a la vista del carrito
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />
      ) : (
        <>
          {purchaseStatus==='' && (
            <View style={{ width: '100%' }}>
              <Text style={[styles.text, FontSizeStyles.fontSize18]}>Total to pay: ${totalPrice.toFixed(2)}</Text>
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
              <View style={[GeneralStyle.row, GeneralStyle.justifyBetween]}>
                <CustomButton color="#B93649" label="Cancel" onPress={handleReturn} />
                <CustomButton color={Colors.green} label="Buy" onPress={simulatePurchase} />
              </View>
            </View>
          )}

          {purchaseStatus === 'success' && (
            <>
              <Text style={styles.successText}>Purchase successful!</Text>
              <CustomButton color={Colors.green} label="Continue Shopping" onPress={handleReturn} />
            </>
          )}
          {purchaseStatus === 'failed' && (
            <>
              <Text style={[styles.errorText, { color: Colors.error }]}>Purchase failed! Please try again later.</Text>
              <CustomButton color={Colors.error} label="Try again" onPress={() => setPurchaseStatus(null)} />
            </>
          )}
        </>
      )}
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    marginTop: 20,
    color: 'green',
    fontSize: 40,
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
  },
});