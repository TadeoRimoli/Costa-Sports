import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,ImageBackground , TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { AppColors, Colors, GeneralStyle } from '../../../Styles/GeneralStyles';
import CustomInput from '../../CoreComponents/CustomInput';
import PrimaryButton from '../../CoreComponents/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation } from '../../../services/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../../Redux/slices/GeneralSlice';
import { loginSchema } from '../../../services/authYupSchema';
import { insertSession } from '../../../db';
import { appName } from '../../../Constants/Constants';
import CustomModal from '../../CoreComponents/CustomModal';


const Login = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState({error:false,message:''});
  const [passwordError, setPasswordError] = useState({error:false,message:''});
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [login,{}] = useLoginMutation();

  const [modalVisibility,setModalVisibility]=useState({visibility:false,message:''})
  const handleLogin = async () => {
    Keyboard.dismiss()
    try {
      loginSchema.validateSync({ email, password }, { abortEarly: false });
      const {data, isLoading, isError: postError, isSuccess,result,error} = await login({ email, password });
      if(error && error.data.error.message && error.data.error.message=="INVALID_LOGIN_CREDENTIALS")
        setModalVisibility({visibility:true,message:'Incorrect credentials'})
      else if(postError){
        setModalVisibility({visibility:true,message:error.data.error.message})

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

  const backgroundImage = require('../../../images/publicbackground.png');
  
  return (
    <ImageBackground source={backgroundImage} style={{ width: '100%', height: '100%' }}>

    <View style={[GeneralStyle.padding16, GeneralStyle.flex1, GeneralStyle.justifyCenter, GeneralStyle.itemsCenter]}>
        <Text style={[{color:AppColors.white},GeneralStyle.fontBold,GeneralStyle.fontSize36,GeneralStyle.marginBottom10]}>{appName}</Text>
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
        <PrimaryButton
        customStyles={[{marginTop:10,width:'100%'}]}
        label='Login' 
        textStyles={[{fontSize:18,fontWeight:600,},]}
        onPress={handleLogin}/>
        <Text style={[GeneralStyle.fontSize18,GeneralStyle.marginTop15,{color:AppColors.white}]}>Don't have an account? <Text onPress={()=>{
            navigation.navigate("Register")
        }} style={[GeneralStyle.fontSize18,{color:AppColors.secondaryText}]}>Sign up</Text> </Text>
    </View>
    <CustomModal visible={modalVisibility.visibility} autoCloseTimeout={3500} hideModalFunction={()=>{setModalVisibility({visibility:false,message:''})}}>
      <Text style={[GeneralStyle.fontBold, GeneralStyle.fontSize18]}>Error</Text>
      <Text style={[GeneralStyle.fontSize16, GeneralStyle.marginVertical10]}>{modalVisibility.message}</Text>
    </CustomModal>
    </ImageBackground>

  );
};


export default Login;
