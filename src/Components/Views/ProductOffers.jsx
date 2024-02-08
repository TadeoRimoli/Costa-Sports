import React from 'react'
import { products } from '../../Constants/Arrays';
import ProductCard from '../Cards/ProductCard';
import { FlatList, View,StyleSheet,Text } from 'react-native';
import CustomText from '../CustomText'

const ProductOffers = ({cart ,setCart}) => {
  let bestOffers = products.sort((a, b) => b.discountPercentage - a.discountPercentage).slice(0, 15);

  return (
    <React.Fragment>
      {bestOffers[0] && 
        <FlatList
        data={bestOffers}
        renderItem={({ item }) => (
          <ProductCard key={item.id} item={item} cart={cart} setCart={setCart}></ProductCard>
        )}
        keyExtractor={item => item.id}
      />}
    </React.Fragment>
  )
}

export default ProductOffers

const styles = StyleSheet.create({})