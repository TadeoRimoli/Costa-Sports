import { useState } from 'react';
import { StyleSheet, Pressable, Text, Dimensions, Image, View } from 'react-native';
import React from 'react';
import { Colors, FontSizeStyles, GeneralStyle, MarginDirectionStyles } from '../../../Styles/GeneralStyles';
import { Ionicons } from '@expo/vector-icons';

const CartProduct = ({ quantity,item, onRemove }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={[{ alignSelf:'center',backgroundColor: '#d2d7d3', width: windowWidth - 50, height: (windowHeight ) / 2.5, margin: 10, borderRadius: 10 }]}>
      <Image
        style={{ position:'relative',flex: 1, width: null, resizeMode: 'cover', height: null, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
        source={{ uri: item.thumbnail }}
        onError={(error) => console.error('Error al cargar la imagen:', error.nativeEvent.error)}
      />
        <Pressable style={{ position:'absolute',top:0,right:0,margin:5}} onPress={onRemove}>
            <Ionicons name="close-circle" size={30} color="white" />
        </Pressable>
      <View style={[GeneralStyle.padding16]}>
        <View style={[GeneralStyle.row, GeneralStyle.justifyBetween, MarginDirectionStyles.marginBottom5]}>
          <Text ellipsizeMode='tail' numberOfLines={1} style={{ flex: 1, marginRight: 8, fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>${item.price}</Text>
        </View>
            {/* Aquí puedes incluir el icono de eliminación */}

        <View style={[GeneralStyle.row, GeneralStyle.justifyBetween, GeneralStyle.itemsCenter, MarginDirectionStyles.marginTop5]}>
          <View style={[GeneralStyle.row, GeneralStyle.itemsCenter]}>
            <Text style={[,{fontWeight:'bold'},FontSizeStyles.fontSize18]}>Quantity: </Text>
            <Text style={{ paddingHorizontal: 10 }}>{quantity}</Text>
          </View>
          <View style={[GeneralStyle.row, GeneralStyle.itemsCenter]}>
            <Text style={[,{fontWeight:'bold'},FontSizeStyles.fontSize18]}>Total: </Text>
            <Text style={[FontSizeStyles.fontSize22]}>{quantity*item.price}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CartProduct;
