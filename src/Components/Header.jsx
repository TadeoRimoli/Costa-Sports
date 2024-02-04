import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GeneralStyle } from '../../Styles/GeneralStyles'

const Header = () => {
  return (
    <View style={[styles.container,GeneralStyle.background1]}>
      <Text style={styles.header}>Costa Compras</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        padding:20,
        height:'10%'
    },
    header:{
        fontSize:20
    }
})