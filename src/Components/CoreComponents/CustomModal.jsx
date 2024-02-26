import { View, Text, Modal,StyleSheet, Button, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'

const CustomModal = ({
  children,
  style,
  visible,
  animationType = "fade",
  transparent = true,
  hideModalFunction,
  autoCloseTimeout,
  expandModal
})=>{

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
      if (visible && autoCloseTimeout) {
        const timeoutId = setTimeout(() => {
          hideModalFunction && hideModalFunction();
        }, autoCloseTimeout);
  
        return () => clearTimeout(timeoutId);
      }
    }, [visible, autoCloseTimeout, hideModalFunction]);

    const handleChildPress = (event) => {
      event.stopPropagation();
    };
  return (
    <Modal
    style={style}
    visible={visible}
    animationType={animationType}
    transparent={transparent}
    onRequestClose={hideModalFunction}
    
    >
      <TouchableWithoutFeedback onPress={hideModalFunction}>
        <View style={[styles.modalContainer]}>
          <TouchableWithoutFeedback onPress={(event)=>handleChildPress(event)}>
          <View style={[styles.modalContent,{width:expandModal ? '100%' : '80%',maxHeight:isKeyboardVisible ? '100%': '80%'}]}>
            {children}
          </View>
          </TouchableWithoutFeedback>
        </View>
        </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
    buttons: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      paddingHorizontal: 16, 
      marginTop: 20, 
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    openButton: {
      fontSize: 18,
      color: 'blue',
      marginBottom: 20,
    },
    modalContainer: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      elevation: 5,
      maxWidth: '90%',
      overflow: 'hidden', 
      display: 'flex',     
      flexDirection:'column'
    },
  
  });

export default CustomModal