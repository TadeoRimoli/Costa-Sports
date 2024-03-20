import { View,  Text,FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useIsFocused, useRoute } from '@react-navigation/native'
import CustomInput from '../CoreComponents/CustomInput';
import ProductCard from '../Cards/ProductCard';
import LoadingIndicator from '../CoreComponents/LoadingIndicator';
import { useGetProductsByCategoryQuery } from '../../services/ecommerceAPI';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GeneralStyle, NewColors } from '../../Styles/GeneralStyles';
import CustomModal from '../CoreComponents/CustomModal';

const ProductList = ({}) => {

    const route = useRoute();
    const {selectedCategory} = route.params
    const { data: products, error, isLoading, refetch,isSuccess } = useGetProductsByCategoryQuery(selectedCategory.name); 

    const [filterValue,setFilterValue]=useState('')
    const [localProducts,setLocalProducts]=useState([])

    const [firstLoad, setFirstLoad] = useState(true); 

    function filterItems(e){
        setFilterValue(e)
        setLocalProducts(products.filter((product)=> product.title.toLowerCase().includes(e.toLowerCase())  ))
    }

    useEffect(() => {
          setLocalProducts(products)
    },[isSuccess]);

    if (isLoading) {
      <LoadingIndicator/>
    }
  
    if (error) {
      return <Text>Error: {error.message}</Text>;
    }

    const [showFilters,setShowFilters]=useState(false);
  
    return (
    <View style={{flex:1,backgroundColor: '#34495e'}}>
        <View style={[GeneralStyle.row,GeneralStyle.itemsCenter,GeneralStyle.padding8]}>
          <CustomInput value={filterValue} setValue={(e)=>{filterItems(e)}} customStyles={{flex:1,marginRight:10}} placeholder={'Search'}/>
          <Ionicons name="funnel-outline" onPress={()=>{setShowFilters(true)}}  size={30} color="white" />
        </View>
        <FlatList
        data={localProducts}
        renderItem={({ item }) => (
          <ProductCard key={item.id} item={item} ></ProductCard>
        )}
        keyExtractor={item => item.id}
      />
      <CustomModal visible={showFilters} hideModalFunction={()=>{
        setShowFilters(false)
      }}>
        <View style={{  }}>
          <View style={{alignItems:'center',justifyContent:'center', width:'100%', height:40 ,
           marginVertical:4  ,  backgroundColor:NewColors.blueGrey200,borderRadius:8 }}>
            <Text>Ordenar de menor a mayor</Text>
          </View>
          <View style={{alignItems:'center',justifyContent:'center', width:'100%', height:40 ,
           marginVertical:4  ,  backgroundColor:NewColors.blueGrey200,borderRadius:8 }}>
            <Text>Ordenar de mayor a menor</Text>
          </View>
        </View>
      </CustomModal>
    </View>
  )
}

const styles = StyleSheet.create({

  picker: {
    position: 'absolute',
    top: 40, // Ajusta la posición vertical del Picker debajo del icono
    left: 0,
    right: 0,
    backgroundColor: 'white', // Color de fondo del Picker
    zIndex: 1, // Para colocar el Picker sobre otros elementos
  },
});

export default ProductList