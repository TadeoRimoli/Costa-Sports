import React from 'react'
import { useState } from 'react';
import {StatusBar, StyleSheet, SafeAreaView,Text, View ,TextInput,ScrollView,Image,FlatList,Keyboard,Dimensions, Pressable } from 'react-native';
import CustomInput from '../CustomInput'; // Cambiado aquí

import { Colors, FontSizeStyles, GeneralStyle, MarginDirectionStyles, MarginStyles } from '../../../Styles/GeneralStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProductCard from '../Cards/ProductCard';
import { productCategories, products } from '../../Constants/Arrays';
const ProductCatalog = ({cart ,setCart}) => {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [localProducts,setLocalProducts]=useState([])
    const [localCategories,setLocalCategories]=useState(productCategories)
    const [filterValue,setFilterValue]=useState('')
    const [selectedCategory,setSelectedCategory]=useState(null)
  
    function handlePressCategory(item){
      setFilterValue('')
      setSelectedCategory(item)
      setLocalProducts(products.filter((product)=>product.category == item.name))
    }
  
    function filterItems(e){
      setFilterValue(e)
  
      if(selectedCategory){
        setLocalProducts(products.filter((product)=> product.title.toLowerCase().includes(e.toLowerCase()) && product.category == selectedCategory.name ))
      }else{
        setLocalCategories(productCategories.filter((category)=>category.name.toLowerCase().includes(e.toLowerCase())))
      }
    }

  return (
    <React.Fragment>
      <View style={{paddingHorizontal:10}}>
        <View style={[{flexDirection:'row',alignItems:'center'}]}>
          <CustomInput value={filterValue} setValue={(e)=>{filterItems(e)}} customStyles={{flex:1,marginRight:10}} placeholder={'Category or product'}/>
          <Ionicons name="search" size={35}  color={'black'} />
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 3,
          }}
        />
      </View>
      {selectedCategory && <View
      style={[GeneralStyle.softPurple,{flexDirection:'row',alignItems:'center',justifyContent:'space-between',   borderRadius: 5, margin:10,padding: 5,width:'50%' }]}
      >
        <Text style={{ fontSize: 16, }}>{selectedCategory.name}</Text>
        <Ionicons onPress={()=>{
          setLocalProducts([])
          setFilterValue('')
          setSelectedCategory(null)
          setLocalCategories(productCategories)
          }} name="close" size={35}  color={'black'} />
      </View>}
      {selectedCategory && 
          <FlatList
        data={localProducts}
        renderItem={({ item }) => (
          <ProductCard key={item.id} item={item} cart={cart} setCart={setCart}></ProductCard>
        )}
        keyExtractor={item => item.id}
      />}

      {!selectedCategory && <FlatList
      data={localCategories}
      renderItem={({ item }) => (
        <Pressable onPress={()=>{handlePressCategory(item)}} style={[ GeneralStyle.softPink,{width:windowWidth-20,height:windowHeight/2,  margin: 10,borderRadius:10 }]}>
          <Text style={[MarginDirectionStyles.margin5,FontSizeStyles.fontSize22,{alignSelf:'center'}]}>{item.name}</Text>
          <Image
          style={{ flex: 1, width: null,resizeMode: 'cover' , height: null,  borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
          source={{ uri: item.image }}
          onError={(error) => console.error('Error al cargar la imagen:', error.nativeEvent.error)}
          />
        </Pressable>
      )}
      keyExtractor={item => item.name+'category'}
    />}
      </React.Fragment>
  )
}

export default ProductCatalog

const styles = StyleSheet.create({})