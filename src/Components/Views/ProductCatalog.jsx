import React from 'react'
import { useState } from 'react';
import {StatusBar, StyleSheet, SafeAreaView,Text, View ,TextInput,ScrollView,Image,FlatList,Keyboard,Dimensions, Pressable } from 'react-native';
import CustomInput from '../CoreComponents/CustomInput'; // Cambiado aquí
import { Colors, FontSizeStyles, GeneralStyle, MarginDirectionStyles, MarginStyles } from '../../../Styles/GeneralStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProductCard from '../Cards/ProductCard';
import { productCategories, products } from '../../Constants/Arrays';
import CategoryProductCard from '../Cards/CategoryProductCard';
const ProductCatalog = ({navigation,route,}) => {

    const [localCategories,setLocalCategories]=useState(productCategories)
    const [filterValue,setFilterValue]=useState('')

    function handlePressCategory(item){
      setFilterValue('')
      navigation.navigate("Products",{selectedCategory:item})
    }
  
    function filterItems(e){
      setFilterValue(e)
      setLocalCategories(productCategories.filter((category)=>category.name.toLowerCase().includes(e.toLowerCase())))
    }

  return (
    <View style={{flex:1,backgroundColor: '#34495e'}}>
      <View style={{paddingHorizontal:10}}>
        <View style={[{flexDirection:'row',alignItems:'center'}]}>
          <CustomInput value={filterValue} setValue={(e)=>{filterItems(e)}} customStyles={{flex:1,marginRight:10}} placeholder={'Search'}/>
        </View>
        <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 3,
            marginHorizontal:0
          }}
        />
      </View>
        <FlatList
        data={localCategories}
        renderItem={({ item }) => (
          <CategoryProductCard item={item} handlePressCategory={()=>handlePressCategory(item)}></CategoryProductCard>
        )}
        keyExtractor={item => item.name+'category'}
      />
      </View>
  )
}

export default ProductCatalog

