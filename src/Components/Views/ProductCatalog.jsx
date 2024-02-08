import React from 'react'
import { useState } from 'react';
import {StatusBar, StyleSheet, SafeAreaView,Text, View ,TextInput,ScrollView,Image,FlatList,Keyboard,Dimensions, Pressable } from 'react-native';
import CustomInput from '../CustomInput'; // Cambiado aquí

import { Colors, FontSizeStyles, GeneralStyle, MarginDirectionStyles, MarginStyles } from '../../../Styles/GeneralStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProductCard from '../Cards/ProductCard';
import { productCategories, products } from '../../Constants/Arrays';
import CategoryProductCard from '../Cards/CategoryProductCard';
const ProductCatalog = ({cart ,setCart}) => {


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
        setLocalProducts(products.filter((product)=> product.title.toLowerCase().includes(e.toLowerCase()) && product.category.toLowerCase() == selectedCategory.name.toLowerCase() ))
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
        <Text style={{ fontSize: 16, }}>{selectedCategory.name.toLowerCase().split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</Text>
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
        <CategoryProductCard item={item}handlePressCategory={handlePressCategory}></CategoryProductCard>
      )}
      keyExtractor={item => item.name+'category'}
    />}
      </React.Fragment>
  )
}

export default ProductCatalog

