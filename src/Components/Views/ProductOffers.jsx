import React, { useState } from 'react'
import ProductCard from '../Cards/ProductCard';
import { FlatList, View,StyleSheet,Text } from 'react-native';
import CustomInput from '../CoreComponents/CustomInput';
import { useGetProductsQuery } from '../../services/ecommerceAPI';

const ProductOffers = ({}) => {

  const { data: products, error, isLoading, refetch,isSuccess } = useGetProductsQuery(); 


  const [filterValue,setFilterValue]=useState('')

  function filterItems(e){
      setFilterValue(e)
      // setBestOffers(offers.filter((product)=> product.title.toLowerCase().includes(e.toLowerCase())))
    }

  return (
    <View style={{flex:1,backgroundColor: '#34495e'}}>
      <CustomInput value={filterValue} setValue={(e)=>{filterItems(e)}} customStyles={{marginHorizontal:10}} placeholder={'Search'}/>
        <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard key={item.id} item={item} ></ProductCard>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default ProductOffers

const styles = StyleSheet.create({})