import { useState } from 'react';

import { StyleSheet,Pressable, Text,Dimensions,Image, View } from 'react-native'
import React from 'react'
import { Colors, GeneralStyle, MarginDirectionStyles } from '../../../Styles/GeneralStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomButton from '../CoreComponents/CustomButton';
import CustomModal from '../CoreComponents/CustomModal';
import CustomInput from '../CoreComponents/CustomInput';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../../../Redux/slices/GeneralSlice';


const ProductCard = ({item}) => {
    const dispatch = useDispatch()
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    
    const [count, setCount] = useState(1);
    const [addProductModal,setAddProductModal] = useState({visible:false,item:null});

    const handleIncrement = () => {
      if(count < item.stock)
        setCount(count + 1);
    };
  
    const handleDecrement = () => {
      if (count > 1 ) {
        setCount(count - 1);
      }
    };

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
  const handleAddProduct = (item) => {
    if(count <= item.stock && count >= 1){

      dispatch(addCartItem( { item: item, quantity: count }));
    }
  };
  function handleAddCount(e) {
    // Si la entrada es una cadena vacía, establece el valor en 0
    if (e === "") {
      setCount(0);
      return;
    }
    // Intenta convertir la entrada a un número entero
    const countValue = parseInt(e, 10);
    
    // Verifica si el resultado es un número válido
    if (!isNaN(countValue) && countValue <= item.stock && countValue >= 1) {
      setCount(countValue);
    }
  }

  return (
    <View  style={[ {alignSelf:'center',marginVertical:10, backgroundColor:'#d2d7d3',width:windowWidth-20,height:(windowHeight+50)/2,borderRadius:10 }]}>
          <Image
          style={{ flex: 1, width: null,resizeMode: 'cover' , height: null,  borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
          source={{ uri: item.thumbnail }}
          onError={(error) => console.error('Error al cargar la imagen:', error.nativeEvent.error)}
          />
           <View style={{ position: 'absolute',flexDirection:'row', top: 20, right: 10, backgroundColor: '#C57474', borderRadius: 5, padding: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>-{item.discountPercentage}%</Text>
          </View>
          <View style={[GeneralStyle.padding16]}>
            <View style={[GeneralStyle.row,GeneralStyle.justifyBetween,MarginDirectionStyles.marginBottom5]}>
              <Text ellipsizeMode='tail' numberOfLines={1} style={{ flex:1,marginRight:8,fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>${item.price}</Text>
            </View>
            <Text >{item.description}</Text>
            <View style={[GeneralStyle.row,GeneralStyle.justifyBetween,GeneralStyle.itemsCenter,MarginDirectionStyles.marginTop5]}>
              <View style={[GeneralStyle.row]}>
                {renderStars(Math.round(item.rating * 2) / 2)}
              </View>
              <CustomButton  label='Add to Cart' onPress={()=>{
                setAddProductModal({visible:true,item:item})
                }} color={'#2c3e50'}/>
            </View>
          </View>
        <CustomModal
        visible={addProductModal.visible}
        hideModalFunction={()=>{setAddProductModal({visible:false,item:null})}}
        >   
          <View style={{  borderRadius: 8, backgroundColor: 'white', marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>{addProductModal?.item?.title}</Text>
              <Text style={{ fontSize: 14, color: 'gray', marginBottom: 8 }}>{addProductModal?.item?.description}</Text>
              
              <View style={[GeneralStyle.row,GeneralStyle.itemsCenter,GeneralStyle.justifyBetween]}>
                <View style={[]}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Price: ${addProductModal?.item?.price}</Text>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Stock: {item.stock}</Text>
                </View>

              <View style={{ flexDirection: 'col',  marginVertical: 8 }}>
                <View style={[GeneralStyle.row,GeneralStyle.itemsCenter]}>
                    <Pressable onPress={handleDecrement}>
                      <Ionicons name="arrow-down-outline" size={35} color="black" />
                    </Pressable>
                    <CustomInput customStyles={{marginHorizontal: 10,}} keyboardType={"numeric"} value={count.toString()} setValue={handleAddCount}/>
                    <Pressable onPress={handleIncrement}>
                      <Ionicons name="arrow-up-outline" size={35} color="black" />
                    </Pressable>
                </View>
              </View>
              </View>
              <Text style={{ fontSize: 16, fontWeight: 'bold',alignSelf:'flex-end',marginTop:8 }}>Total: ${addProductModal?.item?.price*count}</Text>
          </View>
          <View style={[GeneralStyle.row,GeneralStyle.justifyBetween]}>
              <CustomButton color={'#e74c3c'} label='Cancel' onPress={()=>setAddProductModal({visible:false,item:null})}></CustomButton>
              <CustomButton color={'#2ecc71'} label='Add' onPress={()=>{
                const value = { ...addProductModal.item }; // Copia superficial de addProductModal.item
                handleAddProduct(value);
                setAddProductModal({visible:false,item:null})
                }}></CustomButton>
          </View>
        </CustomModal>
    </View>
  )
}

export default ProductCard
