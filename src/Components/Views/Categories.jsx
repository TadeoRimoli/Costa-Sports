import React, { useEffect } from 'react'
import { useState } from 'react';
import {View ,FlatList, ActivityIndicator } from 'react-native';
import CustomInput from '../CoreComponents/CustomInput'; 
import CategoryProductCard from '../Cards/CategoryProductCard';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { useGetCategoriesQuery } from '../../services/ecommerceAPI';
const Categories = ({}) => {


    const { data: categories, error, isLoading,isSuccess } = useGetCategoriesQuery();

    const navigation = useNavigation()
    const [localCategories,setLocalCategories]=useState([])
    const [filterValue,setFilterValue]=useState('')

    function handlePressCategory(item){
      setFilterValue('')
      navigation.navigate("Products",{selectedCategory:item})
    }
  
    function filterItems(e){
      setFilterValue(e)
      setLocalCategories(categories.filter((category)=>category.name.toLowerCase().includes(e.toLowerCase())))
    }
    
    const isFocused = useIsFocused()

    useEffect(()=>{
      setLocalCategories(categories);
    },[categories])

    if (isLoading) {
      return <ActivityIndicator/>;
    }
  
    if (error) {
      return <Text>Error: {error.message}</Text>;
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

export default Categories

