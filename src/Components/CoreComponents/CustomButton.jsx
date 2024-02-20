import { Button, Pressable } from 'react-native';
import React from 'react'
import { Text,StyleSheet} from 'react-native';
import { GeneralStyle } from '../../../Styles/GeneralStyles';

const CustomButton = ({customStyles, label = "", value, setValue,onPress, color }) => {

    return (
      <Pressable
        onPress={onPress}
        style={[styles.button,customStyles, color ? {backgroundColor:color} :GeneralStyle.softPink]}
      >
        <Text style={styles.buttonText}>{label}</Text>
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
      fontSize:15,
      alignSelf:'center',
      color: 'white',
    },
});
export default CustomButton