import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Colors, GeneralStyle } from '../../../Styles/GeneralStyles';
import CustomInput from '../../CoreComponents/CustomInput';
import CustomButton from '../../CoreComponents/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation } from '../../../services/authAPI';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../Redux/slices/GeneralSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login,{data, isLoading, isError: postError, isSuccess,result}] = useLoginMutation();

  const handleLogin = () => {
    
    if (!email || !password ) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
      return;
    }
    login({ email, password });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data))
    }
  }, [isSuccess]);
  
  const navigation = useNavigation()
  return (
    <View style={[GeneralStyle.padding16, GeneralStyle.flex1, GeneralStyle.justifyCenter, GeneralStyle.itemsCenter]}>
        <Text style={[GeneralStyle.fontBold,GeneralStyle.fontSize24,GeneralStyle.marginBottom10]}>La costa Shopping</Text>
        <CustomInput
        customStyles={{width:'100%'}}
        placeholder="Email"
        value={email}
        setValue={text => setEmail(text)}
        />
        <CustomInput
        customStyles={{width:'100%'}}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        setValue={text => setPassword(text)}
        />
        <CustomButton
        customStyles={{width:'100%'}}
        label='Login' onPress={handleLogin}/>
        <Text style={[GeneralStyle.fontSize16,GeneralStyle.marginTop15]}>Don't have an account? <Text onPress={()=>{
            navigation.navigate("Register")
        }} style={[GeneralStyle.fontSize16,{color:'blue'}]}>Sign up</Text> </Text>
    </View>
  );
};


export default Login;
