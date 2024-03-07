import { Alert, Button, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GeneralStyle } from '../../../Styles/GeneralStyles'
import CustomInput from '../../CoreComponents/CustomInput'
import CustomButton from '../../CoreComponents/CustomButton'
import { useSignUpMutation } from '../../../services/authAPI'

import { useNavigation } from '@react-navigation/native';
import LoadingIndicator from '../../CoreComponents/LoadingIndicator'
import CustomModal from '../../CoreComponents/CustomModal'
const Register = () => {

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorModal, setErrorModal] = useState(false);

  const [signUp,{data, isLoading, isError: postError, isSuccess,result}] = useSignUpMutation();

  
  useEffect(()=>{
    if(postError){
      setErrorModal(true)
    }
  },[postError])

  const handleSignUp = async () => {
    if (!email || !password || !repeatPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
      return;
    }
  
    if (password !== repeatPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if(password.length < 8){
      Alert.alert('Error', 'Las contraseñas deben tener al menos 8 caracteres');
      return;
    }

    signUp({ email, password });
  };

  const navigation = useNavigation()
  const redirectToLogin = () => {
    navigation.navigate('Login');
  };
  if(isLoading){
    return <LoadingIndicator/>
  }

  if(isSuccess){
    return   <Modal
    animationType="slide"
    transparent={false}
    visible={true}
    onRequestClose={() => {
      // Al cerrar el modal, redirige al usuario a la pantalla de login
      redirectToLogin();
    }}
  >
    <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', }]}>
      <Text style={[GeneralStyle.fontSize22,GeneralStyle.marginBottom10]}>Felicidades! la cuenta ya fue creada</Text>
      <CustomButton label="Iniciar sesión"textStyles={{fontSize:20}} onPress={redirectToLogin} />
    </View>
  </Modal>
  }

   


  return (
    <View style={[GeneralStyle.padding16, GeneralStyle.flex1, GeneralStyle.justifyCenter, GeneralStyle.itemsCenter]}>
      <Text style={[GeneralStyle.fontBold,GeneralStyle.fontSize24,GeneralStyle.marginBottom10]}>La costa Shopping</Text>
      <CustomInput
      customStyles={{width:'100%'}}
      placeholder="Email"
      value={email}
      setValue={(text) => {setEmail(text)}}
      />
      <CustomInput
      customStyles={{width:'100%'}}
      placeholder="Password"
      secureTextEntry={true}
      value={password}
      setValue={(text) => setPassword(text)}
      />
      <CustomInput
      customStyles={{width:'100%'}}
      placeholder="Repeat Password"
      secureTextEntry={true}
      value={repeatPassword}
      setValue={(text) => setRepeatPassword(text)}
      />
      <CustomButton
      customStyles={{width:'100%'}}
      label='Sign Up' onPress={handleSignUp} />
      <Text style={[GeneralStyle.fontSize16,GeneralStyle.marginTop15]}>Already have an account?<Text onPress={()=>{
          navigation.navigate("Login")
      }} style={[GeneralStyle.fontSize16,{color:'blue'}]}> Log in</Text> </Text>
      <CustomModal
      animationType="none"
      transparent={false}
      visible={errorModal}
      hideModalFunction={() => {
        setErrorModal(false);
      }}
    >
        <Text style={[GeneralStyle.fontSize22,GeneralStyle.marginBottom10]}>Ha ocurrido un error y no te pudimos registrar</Text>
    </CustomModal>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({})