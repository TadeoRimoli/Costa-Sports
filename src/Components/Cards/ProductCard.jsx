import { useState } from 'react';

import { StyleSheet,Pressable, Text,Dimensions,Image, View } from 'react-native'
import React from 'react'
import { AppColors, Colors, GeneralStyle, NewColors } from '../../Styles/GeneralStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import PrimaryButton from '../CoreComponents/PrimaryButton';
import CustomModal from '../CoreComponents/CustomModal';
import CustomInput from '../CoreComponents/CustomInput';
import { useDispatch } from 'react-redux';
import { addCartItem, setAddProductFromModal } from '../../../Redux/slices/GeneralSlice';

const ProductCard = ({item}) => {
    const dispatch = useDispatch()
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    

  const renderStars = (roundedRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(
          <Ionicons key={i} name="star" size={20} color={'black'} />
        );
      } else if (i - 0.5 === roundedRating) {
        stars.push(
          <Ionicons key={i} name="star-half" size={20} color={'black'} />
        );
      } else {
        stars.push(
          <Ionicons key={i} name="star-outline" size={20} color={'black'} />
        );
      }
    }
    return stars;
  };
  
  const priceWithDiscount = (item.price-((item.discountPercentage/100)*item.price)).toFixed(2)

  return (
    <View  style={[ {alignSelf:'center',marginVertical:10, backgroundColor:AppColors.softYellow,width:windowWidth-20,height:(windowHeight+50)/2,borderRadius:10 }]}>
          <Image
          style={{ flex: 1, width: null,resizeMode: 'cover' , height: null,  borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
          source={{ uri: item.thumbnail }}
          onError={(error) => console.error('Error al cargar la imagen:', error.nativeEvent.error)}
          />
           <View style={{ position: 'absolute',flexDirection:'row', top: 20, right: 10, backgroundColor: AppColors.green, borderRadius: 16, padding: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>-{item.discountPercentage}%</Text>
          </View>
          <View style={[GeneralStyle.padding16]}>
            <View style={[GeneralStyle.row,GeneralStyle.justifyBetween,GeneralStyle.marginBottom5]}>
              <Text ellipsizeMode='tail' numberOfLines={1} style={{ flex:1,marginRight:8,fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
              <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>${priceWithDiscount}</Text>
              <Text style={{ fontSize: 14, fontWeight: 400, textDecorationLine:'line-through',color:'rgba(0, 0, 0, 0.7)' }}>${item.price}</Text>

              </View>
            </View>
            <Text >{item.description}</Text>
            <View style={[GeneralStyle.row,GeneralStyle.justifyBetween,GeneralStyle.itemsCenter,GeneralStyle.marginTop5]}>
              <View style={[GeneralStyle.row]}>
                {renderStars(Math.round(item.rating * 2) / 2)}
              </View>
              <PrimaryButton  label='Add to Cart' onPress={()=>{
                dispatch(setAddProductFromModal({visible:true,item:item}))
                }} color={'#2c3e50'}/>
            </View>
          </View>
        
    </View>
  )
}

export default ProductCard
