import { View,  Text,FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useIsFocused, useRoute } from '@react-navigation/native'
import CustomInput from '../CoreComponents/CustomInput';
import ProductCard from '../Cards/ProductCard';
import { useGetProductsByCategoryQuery } from '../../services/ecommerceAPI';

const ProductList = ({}) => {

    const route = useRoute();
    const {selectedCategory} = route.params
    const { data: products, error, isLoading, refetch,isSuccess } = useGetProductsByCategoryQuery(selectedCategory.name); 

    const [filterValue,setFilterValue]=useState('')
    const [localProducts,setLocalProducts]=useState([])

    const [firstLoad, setFirstLoad] = useState(true); // Estado para controlar si es la primera carga

    function filterItems(e){
        setFilterValue(e)
        setLocalProducts(products.filter((product)=> product.title.toLowerCase().includes(e.toLowerCase())  ))
    }

    const isFocused = useIsFocused();

    // Lógica para hacer el refetch solo cuando vuelves a esta pantalla
    useEffect(() => {
          setLocalProducts(products)
    },[isSuccess]);

    if (isLoading) {
      console.log("loading")
      return <ActivityIndicator />;
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