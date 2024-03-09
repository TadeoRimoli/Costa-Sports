import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Colors, GeneralStyle } from '../../../Styles/GeneralStyles';
import CustomInput from '../../CoreComponents/CustomInput';
import CustomButton from '../../CoreComponents/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation } from '../../../services/authAPI';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../Redux/slices/GeneralSlice';
import CustomModal from '../../CoreComponents/CustomModal';
import { loginSchema } from '../../../services/authYupSchema';

const Login = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState({error:false,message:''});
  const [passwordError, setPasswordError] = useState({error:false,message:''});
  const [password, setPassword] = useState('');

  const [login,{data, isLoading, isError: postError, isSuccess,result,error}] = useLoginMutation();

  const handleLogin = async () => {
    try {
      loginSchema.validateSync({ email, password }, { abortEarly: false });
      await login({ email, password });
    } catch (error) {
      const errors = {};
      error.inner.forEach(err => {
        errors[err.path] = err.message;
      });
      setEmailError({ error: errors.email ? true : false, message: errors.email || '' });
      setPasswordError({ error: errors.password ? true : false, message: errors.password || '' });
    }
  }
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
    } else if (postError) { 
      if(error.data.error.message=="INVALID_LOGIN_CREDENTIALS")
        setModal({ visible: true, title:"Error",content:'Credenciales incorrectas' });
      else{
        setModal({ visible: true, title:"Error",content:error.data.error.message });

      }
    }
  }, [isSuccess,postError]);
  
  

  const navigation = useNavigation()
  const [modal,setModal]=useState({visible:false,content:'',title:''})
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
        <CustomModal visible={modal.visible} hideModalFunction={()=>{setModal({visible:false,content:'',title:''})}}>
          {modal.title &&<Text style={[GeneralStyle.marginBottom10,GeneralStyle.fontBold]}>{modal.title}</Text>}
          {modal.content &&<Text>{modal.content}</Text>}
        </CustomModal>
        
    </View>
  );
};


export default Login;