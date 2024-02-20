import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { FontSizeStyles, GeneralStyle } from '../../../Styles/GeneralStyles'
import { useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomInput from '../CoreComponents/CustomInput';
import ProductCard from '../Cards/ProductCard';
import { products } from '../../Constants/Arrays';
import { useCart } from '../Context/Context';

const ProductList = ({navigation}) => {
    const route = useRoute()
    const {selectedCategory} = route.params
    const [filterValue,setFilterValue]=useState('')
    const [localProducts,setLocalProducts]=useState(products.filter((product)=> product.category.toLowerCase() == selectedCategory.name.toLowerCase() ))
    const { cart, setCart, purchases, setPurchases } = useCart();

    function filterItems(e){
        setFilterValue(e)
        setLocalProducts(products.filter((product)=> product.title.toLowerCase().includes(e.toLowerCase()) && product.category.toLowerCase() == selectedCategory.name.toLowerCase() ))
      }
  return (
    <View style={{flex:1,backgroundColor: '#34495e'}}>
        <View style={{paddingHorizontal:10}}>
            <View style={[{flexDirection:'row',alignItems:'center'}]}>
                <CustomInput value={filterValue} setValue={(e)=>{filterItems(e)}} customStyles={{flex:1,marginRight:10}} placeholder={'Search'}/>
            </View>
        </View>
        <FlatList
        data={localProducts}
        renderItem={({ item }) => (
          <ProductCard key={item.id} item={item} ></ProductCard>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default ProductList