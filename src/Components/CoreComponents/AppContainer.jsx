import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { setDimensions } from '../../../Redux/slices/GeneralSlice';
import { maxMobileResolution } from '../../Constants/Constants';
import { useDispatch, useSelector } from 'react-redux';

const AppContainer = ({children}) => {


    const {dimensions} = useSelector(state=>state.General);

    const dispatch = useDispatch()

    const updateDimensions = () => {
      let dimensions = Dimensions.get('window');
      if(dimensions.width>maxMobileResolution) setDimensions(dimensions)
      dispatch(setDimensions(dimensions))
    };
  
    useEffect(() => {
      updateDimensions(); // Llama a la función una vez para establecer el estado inicial
  
      const subscription = Dimensions.addEventListener('change', updateDimensions);
  
      return () => {
        subscription.remove();
      };
    }, []);

  return (
    <View style={ dimensions.width > maxMobileResolution ? { width: maxMobileResolution, height:dimensions.height,marginHorizontal: 'auto' } : { flex: 1 }}>
        {children}
    </View>
  )
}

export default AppContainer

const styles = StyleSheet.create({})