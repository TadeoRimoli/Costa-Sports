import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { GeneralStyle } from '../../../Styles/GeneralStyles';

const CustomInput = ({ customStyles,placeholder, label, value, setValue }) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={setValue}
      style={[customStyles,styles.inputText,,{backgroundColor:'#f5f5f5'}]}
      placeholderTextColor='rgba(0, 0, 0, 0.8)'    />
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
