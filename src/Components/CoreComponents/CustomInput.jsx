import React, { useState } from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { AppColors } from '../../Styles/GeneralStyles';

const CustomInput = ({ enabled=true,customStyles, placeholder, label, value, setValue, keyboardType, error, setError, secureTextEntry=false }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = () => {
    setIsFocused(true);
    if (error && error.error) {
      setError({error:false,message:''});
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  function handle(e){
    if (error && error.error) {
      setError({error:false,message:''});
    }
    setValue(e)
  }

  return (
    <>
      <TextInput
        placeholder={placeholder}
        value={value}
        editable={enabled} // Controla si el input es editable o no
        keyboardType={keyboardType}
        onChangeText={handle}
        autoCapitalize='none'
        secureTextEntry={secureTextEntry}
        style={[
          styles.inputText,
          customStyles,
          isFocused && styles.focused,
          error && error.error && styles.error,
          { 
            outline:'none',
            fontSize:16,backgroundColor: error && error.error ? '#FADBD8' : AppColors.white },
          
        ]}
        placeholderTextColor="rgba(0, 0, 0, 0.7)"
        
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {error && error.message ? <Text style={{color:AppColors.white,marginBottom:10,alignSelf:'flex-start'}}>{error.message}</Text> : null}
    </>
  );
};

CustomInput.propTypes = {
  customStyles: PropTypes.object,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  keyboardType: PropTypes.string,
  error: PropTypes.object,
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
    borderColor: '#2980b9',
  },
  error: {
    borderColor: '#e74c3c', 
  },
});

export default CustomInput;
