import { useEffect, useState } from 'react';
import { StyleSheet, Pressable, Text, Dimensions, Image, View } from 'react-native';
import React from 'react';
import { AppColors, Colors, GeneralStyle } from '../../Styles/GeneralStyles';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItems, setDeleteProductFromCartModal } from '../../../Redux/slices/GeneralSlice';
import CustomInput from '../CoreComponents/CustomInput';

const CartProduct = ({ item, onRemove }) => {

  const {cart,dimensions} = useSelector(state=>state.General);
  const product = item.item;
  const dispatch = useDispatch()

  function getStockAvailable(){
    return product.stock - item.quantity
  }

  // const dispatch = useDispatch()
  function modifyQuantity( increment) {
    const index = cart.findIndex(item => item.item.id === product.id);
    // Si se encontró el objeto
    const newQuantity = increment ? item.quantity+1 : item.quantity-1;
    if (index !== -1) {
      // Clonar el objeto encontrado para no modificar el original directamente
      const objetoModificado = { ...cart[index] };
      // Modificar el campo deseado del objeto clonado
      if(newQuantity==0){
        dispatch(setDeleteProductFromCartModal({visible:true,item:product.id}))
      }else if( (increment && getStockAvailable()>0) || (!increment && item.quantity>1) ){
        objetoModificado.quantity = newQuantity;
      // Reemplazar el objeto original con el objeto modificado en el array
      const newArray = [...cart];
      newArray[index] = objetoModificado;
      dispatch(setCartItems(newArray));
      }
    }
  }
  
  const priceWithDiscount = (product.price-((product.discountPercentage/100)*product.price)).toFixed(2)


  const [isDesktop, setIsDesktop] = useState(false);


  
  return (
    <View style={[{ alignSelf:'center',backgroundColor: '#d2d7d3', width: !isDesktop ? dimensions.width-20 : '95%', height: (dimensions.height ) / 1.9, margin: 10, borderRadius: 10 }]}>
      <Image
        style={{ position:'relative',flex: 1, width: null, resizeMode: 'cover', height: null, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
        source={{ uri: product.thumbnail }}
        onError={(error) => console.error('Error al cargar la imagen:', error.nativeEvent.error)}
      />
        <View style={{ position: 'absolute',flexDirection:'row', top: 0, left: 0, backgroundColor: AppColors.green, margin:5,borderRadius: 16, padding: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>-{product.discountPercentage}%</Text>
          </View>
        <Pressable style={{ position:'absolute',top:0,right:0,margin:5}} onPress={onRemove}>
            <Ionicons   name="close"  size={25} style={{padding:2,borderRadius:17}}  color={AppColors.softYellow} backgroundColor={'rgba(0, 0, 0, 0.7)'}/>
        </Pressable>
      <View style={[GeneralStyle.padding8]}>
        <View style={[GeneralStyle.row, GeneralStyle.justifyBetween, GeneralStyle.marginBottom5]}>
          <Text ellipsizeMode='tail' numberOfLines={1} style={{ flex: 1, marginRight: 8, fontSize: 20, fontWeight: 'bold' }}>{product.title}</Text>
          <Text style={{color:'rgba(0, 0, 0, 0.7)', fontSize: 20, fontWeight: 'bold',textDecorationLine:'line-through' }}>${product.price}</Text>

        </View>
        <Text style={{  textAlign:'right',fontSize: 20, fontWeight: 'bold', }}>${priceWithDiscount}</Text>

        <View style={[GeneralStyle.row, GeneralStyle.justifyBetween, GeneralStyle.itemsCenter, GeneralStyle.marginTop5]}>
          <View style={[,GeneralStyle.row, GeneralStyle.itemsCenter]}>
            <MaterialCommunityIcons onPress={()=>modifyQuantity(false)} name="minus" size={28} color="black"  style={{ borderWidth: 1,paddingLeft:2,borderRadius:4  }} />
            <CustomInput customStyles={{marginHorizontal:8}} value={item.quantity.toString()} enabled={false} setValue={()=>{}}></CustomInput>
            <MaterialCommunityIcons onPress={()=>modifyQuantity(true)} name="plus" size={28} color="black" style={{ borderWidth: 1,paddingLeft:2,borderRadius:4  }} />
          </View>
          <View style={[,GeneralStyle.row, GeneralStyle.itemsCenter]}>
            <Text style={[,{fontWeight:'bold'},GeneralStyle.fontSize18]}>Total: </Text>
            <Text style={[GeneralStyle.fontSize22]}>{(item.quantity*priceWithDiscount).toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CartProduct;
