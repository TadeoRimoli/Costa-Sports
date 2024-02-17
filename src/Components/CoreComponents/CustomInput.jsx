import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { GeneralStyle } from '../../../Styles/GeneralStyles';

const CustomInput = ({ customStyles, placeholder, label, value, setValue, keyboardType, error,setError }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    // Desactivar el estado de error cuando el campo está enfocado
    if (error) {
      setError(false);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      keyboardType={keyboardType}
      onChangeText={setValue}
      style={[
        styles.inputText,
        customStyles,
        isFocused && styles.focused,
        error && styles.error,
        { backgroundColor: error ? '#FADBD8' : '#f5f5f5' }
      ]}
      placeholderTextColor="rgba(0, 0, 0, 0.8)"
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

CustomInput.propTypes = {
  customStyles: PropTypes.object,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  keyboardType: PropTypes.string,
  error: PropTypes.bool,
};

const styles = StyleSheet.create({
  inputText: {
    color: 'black',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  focused: {
    borderColor: '#2980b9', // Cambiar el color del borde cuando el campo está enfocado
  },
  error: {
    borderColor: '#e74c3c', // Cambiar el color del borde cuando hay un error
  },
});

export default CustomInput;
