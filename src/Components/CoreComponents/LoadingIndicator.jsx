import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GeneralStyle } from '../../Styles/GeneralStyles'

const LoadingIndicator = () => {
  return (
    <View style={[GeneralStyle.flex1,GeneralStyle.itemsCenter,GeneralStyle.justifyCenter]}>
        <ActivityIndicator size={50}   />
    </View>
  )
}

export default LoadingIndicator

const styles = StyleSheet.create({})