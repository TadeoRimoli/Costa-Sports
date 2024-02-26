import React, { useState } from 'react'
import { products } from '../../Constants/Arrays';
import ProductCard from '../Cards/ProductCard';
import { FlatList, View,StyleSheet,Text } from 'react-native';
import CustomInput from '../CoreComponents/CustomInput';

const ProductOffers = ({}) => {
  const [filterValue,setFilterValue]=useState('')
  const [offers,setOffers]=useState(products.sort((a, b) => b.discountPercentage - a.discountPercentage).slice(0, 20))
  const [bestOffers,setBestOffers]=useState( offers)

  function filterItems(e){
      setFilterValue(e)
      setBestOffers(offers.filter((product)=> product.title.toLowerCase().includes(e.toLowerCase())))
    }

  return (
    <View style={{flex:1,backgroundColor: '#34495e'}}>
      <CustomInput value={filterValue} setValue={(e)=>{filterItems(e)}} customStyles={{marginHorizontal:10}} placeholder={'Search'}/>
      {bestOffers[0] && 
        <FlatList
        data={bestOffers}
        renderItem={({ item }) => (
          <ProductCard key={item.id} item={item} ></ProductCard>
        )}
        keyExtractor={item => item.id}
      />}
    </View>
  )
}

export default ProductOffers

const styles = StyleSheet.create({})