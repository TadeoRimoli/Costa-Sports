import { View,  Text,FlatList, ActivityIndicator, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useIsFocused, useRoute } from '@react-navigation/native'
import CustomInput from '../CoreComponents/CustomInput';
import ProductCard from '../Cards/ProductCard';
import LoadingIndicator from '../CoreComponents/LoadingIndicator';
import { useGetProductsByCategoryQuery } from '../../services/ecommerceAPI';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppColors, GeneralStyle, NewColors } from '../../Styles/GeneralStyles';
import CustomModal from '../CoreComponents/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { clearProductList, setProductList } from '../../../Redux/slices/GeneralSlice';

const ProductList = ({}) => {

    const route = useRoute();
    const {selectedCategory} = route.params
    const [filterValue,setFilterValue]=useState('')
    const dispatch = useDispatch()
    const [firstLoad, setFirstLoad] = useState(true); 
    const {productList} = useSelector(state=>state.General)
    function filterItems(e){
        setFilterValue(e)
        dispatch(setProductList(products.filter((product)=> product.title.toLowerCase().includes(e.toLowerCase()))))
    }

    const [showFilters,setShowFilters]=useState(false);
    const { data: products, isSuccess,isError,error, isLoading, refetch } = useGetProductsByCategoryQuery(selectedCategory.name);


    useEffect(() => {
      if (isSuccess) {
        dispatch(setProductList(products));
      }
    }, [isSuccess]);

    const handleRefetch = async () => {
      try {
        await refetch();
        if (isSuccess) {
          dispatch(setProductList(products));
        } else if (isLoading) {
          console.log("La consulta está en curso...");
        } else if (isError) {
          console.error("Error en la consulta:", error);
        }
      } catch (error) {
        console.error("Error al ejecutar refetch:", error);
      }
    };

    return (
    <View style={{flex:1,backgroundColor: AppColors.footerBackground}}>
    {isLoading ? <LoadingIndicator /> : error ? <Text>Error: {error.message}</Text> : (
      <>
        <View style={[GeneralStyle.row,GeneralStyle.itemsCenter,GeneralStyle.padding8]}>
          <CustomInput value={filterValue} setValue={(e)=>{filterItems(e)}} customStyles={{flex:1,marginRight:10}} placeholder={'Search'}/>
          <Ionicons name="funnel-outline" onPress={()=>{setShowFilters(true)}}  size={30} color="white" />
        </View>
        <FlatList
        data={productList}
        renderItem={({ item }) => (
          <ProductCard key={item.id} item={item} ></ProductCard>
        )}
        keyExtractor={item => item.id}
        />
        <CustomModal visible={showFilters} hideModalFunction={()=>{
          setShowFilters(false)
        }}>
          <View style={{  }}>
            <Pressable onPress={()=>{
              const productsCopy = [...products]
              dispatch(setProductList(productsCopy.sort((a, b) => a.price - b.price)))
              setShowFilters(false)
            }} style={{alignItems:'center',justifyContent:'center', width:'100%', height:40 ,
            marginVertical:4  ,  backgroundColor:NewColors.blueGrey200,borderRadius:8 }}>
              <Text>Ordenar de menor a mayor</Text>
            </Pressable>
            <Pressable onPress={()=>{
              const productsCopy = [...products]
              dispatch(setProductList(productsCopy.sort((a, b) => b.price - a.price)))
              setShowFilters(false)
            }} style={{alignItems:'center',justifyContent:'center', width:'100%', height:40 ,
            marginVertical:4  ,  backgroundColor:NewColors.blueGrey200,borderRadius:8 }}>
              <Text>Ordenar de mayor a menor</Text>
            </Pressable>
          </View>
        </CustomModal>
      </>)}
    </View>
  )
}

export default ProductList