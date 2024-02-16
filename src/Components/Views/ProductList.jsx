import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { FontSizeStyles, GeneralStyle } from '../../../Styles/GeneralStyles'
import { useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomInput from '../CoreComponents/CustomInput';
import ProductCard from '../Cards/ProductCard';
import { products } from '../../Constants/Arrays';

const ProductList = ({navigation,cart ,setCart}) => {
    const route = useRoute()
    const {selectedCategory} = route.params
    const [filterValue,setFilterValue]=useState('')
    const [localProducts,setLocalProducts]=useState(products.filter((product)=> product.category.toLowerCase() == selectedCategory.name.toLowerCase() ))

    function filterItems(e){
        setFilterValue(e)
        setLocalProducts(products.filter((product)=> product.title.toLowerCase().includes(e.toLowerCase()) && product.category.toLowerCase() == selectedCategory.name.toLowerCase() ))
      }
  return (
    <View style={{backgroundColor: '#34495e'}}>
        <View style={{paddingHorizontal:10}}>
            <View style={[GeneralStyle.softPurple,{flexDirection:'row',alignItems:'center',justifyContent:'space-between',   borderRadius: 5, margin:10,padding: 5,width:'50%' }]}
            >
                <Text style={[,GeneralStyle.padding8,FontSizeStyles.fontSize16]}>{selectedCategory.name.toLowerCase().split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</Text>
            
            </View>
            <View style={{borderBottomColor: 'white',borderBottomWidth: 3,}}/>
            <View style={[{flexDirection:'row',alignItems:'center'}]}>
                <CustomInput value={filterValue} setValue={(e)=>{filterItems(e)}} customStyles={{flex:1,marginRight:10}} placeholder={'Product'}/>
            </View>
        </View>
        <FlatList
        data={localProducts}
        renderItem={({ item }) => (
          <ProductCard key={item.id} item={item} cart={cart} setCart={setCart}></ProductCard>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default ProductList