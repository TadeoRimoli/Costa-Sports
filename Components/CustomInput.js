import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { GeneralStyle } from '../Styles/GeneralStyles';

const CustomInput = ({ customStyles,placeholder, label, value, setValue }) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={setValue}
      style={[customStyles,styles.inputText,GeneralStyle.background4]}
      placeholderTextColor='black' 
    />
  );
};

const styles = StyleSheet.create({
  inputText: {
    color: 'black',
    padding: 10,
    borderRadius:10,
    marginVertical:10
  },
});

export default CustomInput;
