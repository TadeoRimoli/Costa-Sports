import React, { useEffect } from 'react'
import { useState,Text } from 'react';
import {View ,FlatList, ActivityIndicator, Dimensions } from 'react-native';
import CustomInput from '../CoreComponents/CustomInput'; 
import CategoryProductCard from '../Cards/CategoryProductCard';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { AppColors, GeneralStyle } from '../../Styles/GeneralStyles';
import LoadingIndicator from '../CoreComponents/LoadingIndicator';
import { useGetCategoriesQuery } from '../../services/ecommerceAPI';
import {  useSelector } from 'react-redux';
import { maxMobileResolution } from '../../Constants/Constants';

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

    const {dimensions} = useSelector(state=>state.General);

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(()=>{
      if(dimensions.width>maxMobileResolution) setIsDesktop(true)
    },[dimensions])
   

  return (
    <View style={{ flex: 1, backgroundColor: AppColors.footerBackground }}>
    {isLoading ? <LoadingIndicator /> : error ? <Text>Error: {error.message}</Text> : (
      <>
        <View style={{ paddingHorizontal: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomInput value={filterValue} setValue={(e) => { filterItems(e) }} customStyles={{ flex: 1, marginRight: 10 }} placeholder={'Search'} />
          </View>
          <View
            style={{
              borderBottomColor: 'white',
              borderBottomWidth: 3,
              marginHorizontal: 0
            }}
          />
        </View>
        <FlatList
          data={localCategories}
          renderItem={({ item }) => (
            <CategoryProductCard item={item} isDesktop={isDesktop} handlePressCategory={() => handlePressCategory(item)} />
          )}
          keyExtractor={(item) => item.name + 'category'}
        />
      </>
    )}
  </View>
  )
}

export default Categories

