import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Colors, GeneralStyle } from '../../../Styles/GeneralStyles';
import CustomInput from '../../CoreComponents/CustomInput';
import CustomButton from '../../CoreComponents/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation } from '../../../services/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../../Redux/slices/GeneralSlice';
import { loginSchema } from '../../../services/authYupSchema';
import { insertSession } from '../../../db';


const Login = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState({error:false,message:''});
  const [passwordError, setPasswordError] = useState({error:false,message:''});
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [login,{}] = useLoginMutation();

  const handleLogin = async () => {

    try {
      loginSchema.validateSync({ email, password }, { abortEarly: false });

      const {data, isLoading, isError: postError, isSuccess,result,error} = await login({ email, password });
      console.log(data, isLoading,  postError, isSuccess,result,error)
      if(error && error.data.error.message && error.data.error.message=="INVALID_LOGIN_CREDENTIALS")
        Alert.alert("Error","Credenciales incorrectas")
      else if(postError){
        Alert.alert("Error",error.data.error.message)
      }
      if (data && data.idToken) {
        insertSession(data.email,data.idToken,data.localId)
        dispatch(setUser(data));
      }

    } catch (error) {
      const errors = {};
      error.inner.forEach(err => {
        errors[err.path] = err.message;
      });
      setEmailError({ error: errors.email ? true : false, message: errors.email || '' });
      setPasswordError({ error: errors.password ? true : false, message: errors.password || '' });
    }
  }
  return (
    <View style={[GeneralStyle.padding16, GeneralStyle.flex1, GeneralStyle.justifyCenter, GeneralStyle.itemsCenter]}>
        <Text style={[GeneralStyle.fontBold,GeneralStyle.fontSize24,GeneralStyle.marginBottom10]}>La costa Shopping</Text>
        <CustomInput
        customStyles={{width:'100%'}}
        placeholder="Email"
        value={email}
        setValue={text => setEmail(text)}
        error={emailError}
        setError={setEmailError}
        />
        <CustomInput
        customStyles={{width:'100%'}}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        setValue={text => setPassword(text)}
        error={passwordError}
        setError={setPasswordError}
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
