import { Button, Pressable } from 'react-native';
import React from 'react'
import { Text,StyleSheet} from 'react-native';
import { AppColors, GeneralStyle } from '../../Styles/GeneralStyles';

const SecondaryButton = ({customStyles, textStyles,label = "", value, setValue,onPress, color,colorText,textBlack }) => {
    return (
      <Pressable
        onPress={onPress}
        style={[styles.button,customStyles,  {backgroundColor:AppColors.white,borderWidth:0.5,borderColor:AppColors.primaryButton} ]}
      >
        <Text style={[styles.buttonText,textStyles,{ color:AppColors.primaryButton }]}>{label}</Text>
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
export default SecondaryButton