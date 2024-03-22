import { Button, Pressable } from 'react-native';
import React from 'react'
import { Text,StyleSheet} from 'react-native';
import { AppColors, GeneralStyle } from '../../Styles/GeneralStyles';

const PrimaryButton = ({customStyles, textStyles,label = "", value, setValue,onPress, color,colorText,textBlack }) => {

    return (
      <Pressable
        onPress={onPress}
        style={[styles.button,customStyles,  {backgroundColor:color ?color:AppColors.primaryButton} ]}
      >
        <Text style={[styles.buttonText,textStyles,{ color:colorText ? colorText : textBlack ?AppColors.black:AppColors.white}]}>{label}</Text>
      </Pressable>
    );
  };
  
const styles = StyleSheet.create({
    button: {
      padding: 15,
      borderRadius:10,
      justifyContent:'center'
    },
    buttonText: {
      fontSize:16,
      fontWeight:600,
      alignSelf:'center',
      color: 'white',
    },
});
export default PrimaryButton