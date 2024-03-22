import { View,  Text,FlatList, ActivityIndicator, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useIsFocused, useRoute } from '@react-navigation/native'
import CustomInput from '../CoreComponents/CustomInput';
import ProductCard from '../Cards/ProductCard';
import LoadingIndicator from '../CoreComponents/LoadingIndicator';
import { useGetProductsByCategoryQuery, useLazyGetProductsByCategoryQuery } from '../../services/ecommerceAPI';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppColors, GeneralStyle, NewColors } from '../../Styles/GeneralStyles';
import CustomModal from '../CoreComponents/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, clearProductList, setAddProductFromModal, setCartItems, setProductList } from '../../../Redux/slices/GeneralSlice';
import { AntDesign } from '@expo/vector-icons';
import PrimaryButton from '../CoreComponents/PrimaryButton';
import SecondaryButton from '../CoreComponents/SecondaryButton';

const ProductList = ({}) => {

    const route = useRoute();
    const {selectedCategory} = route.params
    const [filterValue,setFilterValue]=useState('')
    const dispatch = useDispatch()
    const [firstLoad, setFirstLoad] = useState(true); 
    const {productList,addProductFromModal,cart} = useSelector(state=>state.General)
    function filterItems(e){
        setFilterValue(e)
        dispatch(setProductList(products.filter((product)=> product.title.toLowerCase().includes(e.toLowerCase()))))
    }

    const [showFilters,setShowFilters]=useState(false);
    const [fetchTrigger, { isLoading, isError, error, data: products }] = useLazyGetProductsByCategoryQuery({});
    
    const isFocused = useIsFocused()

    useEffect(()=>{
      const fetch = async ()=>{
        const response = await fetchTrigger(selectedCategory.name)
        if(response.isSuccess){
          dispatch(setProductList(response.data))
        }
      }
      isFocused && fetch()
    },[isFocused])

    const [count, setCount] = useState(1);

    const handleIncrement = () => {
      if(count < addProductFromModal.item.stock)
        setCount(count + 1);
    };
  
    const handleDecrement = () => {
      if (count > 1 ) {
        setCount(count - 1);
      }
    };
    
    const handleAddProduct = (item) => {
      if (count <= item.stock && count >= 1) {
        const existingProductIndex = cart.findIndex(cartItem => cartItem.item.id === item.id);
    
        if (existingProductIndex !== -1) {
          // Si ya existe un objeto con el mismo ID en el array cart
          const updatedCart = [...cart]; // Clonar el array cart
          updatedCart.splice(existingProductIndex, 1); // Eliminar el producto existente del carrito
          dispatch(setCartItems([...updatedCart, { item: item, quantity: cart[existingProductIndex].quantity + count }])); // Agregar un nuevo producto al carrito con la cantidad combinada
        } else {
          // Si no existe un objeto con el mismo ID en el array cart, agregar un nuevo elemento
          dispatch(addCartItem({ item: item, quantity: count }));
        }
      }
    };

  function handleAddCount(e) {
    if (e === "") {
      setCount(0);
      return;
    }
    const countValue = parseInt(e, 10);
    
    if (!isNaN(countValue) && countValue <= item.stock && countValue >= 1) {
      setCount(countValue);
    }
  }
    const priceWithDiscount = addProductFromModal.item ? (addProductFromModal.item.price-((addProductFromModal.item.discountPercentage/100)*addProductFromModal.item.price)).toFixed(2) : 0

    return (
    <View style={{flex:1,backgroundColor: AppColors.footerBackground}}>
    {isLoading ? <LoadingIndicator /> : error ? <Text>Error: {error.message}</Text> : (
      <>
        <View style={[GeneralStyle.row,GeneralStyle.itemsCenter,GeneralStyle.padding8]}>
          <CustomInput value={filterValue} setValue={(e)=>{filterItems(e)}} customStyles={{flex:1,marginRight:10}} placeholder={'Search'}/>
          <Ionicons style={{marginRight:4}} name="funnel-outline" onPress={()=>{setShowFilters(true)}}  size={30} color="white" />
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
            <Text style={[GeneralStyle.fontBold,GeneralStyle.fontSize20,GeneralStyle.marginBottom10]}>Ordenar por $$$:</Text>
            <SecondaryButton
            label='De menor a mayor'
            onPress={()=>{
              const productsCopy = [...products]
              dispatch(setProductList(productsCopy.sort((a, b) => a.price - b.price)))
              setShowFilters(false)
            }} 
            />
            <SecondaryButton
            label='De mayor a menor'
            customStyles={{marginTop:8}}
            onPress={()=>{
              const productsCopy = [...products]
              dispatch(setProductList(productsCopy.sort((a, b) => b.price - a.price)))
              setShowFilters(false)
            }} 
            />
          </View>
        </CustomModal>
      </>)}
      <CustomModal
        visible={addProductFromModal.visible}
        hideModalFunction={()=>{dispatch(setAddProductFromModal({visible:false,item:-1}))}}
        >   
        {/*  */}
          {addProductFromModal.item && <>
          <View style={{  borderRadius: 8, backgroundColor: 'white', marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>{addProductFromModal?.item.title}</Text>
              <Text style={{ fontSize: 14, color: 'gray', marginBottom: 8 }}>{addProductFromModal?.item.description}</Text>
              
              <View style={[GeneralStyle.row,GeneralStyle.itemsCenter,GeneralStyle.justifyBetween]}>
                <View style={[]}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Price: ${priceWithDiscount}</Text>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Stock: {addProductFromModal.item.stock}</Text>
                </View>

              <View style={{ flexDirection: 'col',  marginVertical: 8 }}>
                <View style={[GeneralStyle.row,GeneralStyle.itemsCenter]}>
                    <Pressable style={{backgroundColor:NewColors.blueGrey100,borderRadius:40}} onPress={handleDecrement}>
                      <AntDesign name="minus" size={30} color="black" />
                    </Pressable>
                    <CustomInput customStyles={{marginHorizontal: 10,}} keyboardType={"numeric"} value={count.toString()} setValue={handleAddCount}/>
                    <Pressable style={{backgroundColor:NewColors.blueGrey100,borderRadius:40}} onPress={handleIncrement}>
                      <Ionicons name="add" fontWeight='bold' size={30} color="black" />
                    </Pressable>
                </View>
              </View>
              </View>
              <Text style={{ fontSize: 16, fontWeight: 'bold',alignSelf:'flex-end',marginTop:8 }}>Total: ${(priceWithDiscount*count).toFixed(2)}</Text>
          </View>
         
          <View style={[GeneralStyle.row,GeneralStyle.justifyBetween]}>
              <SecondaryButton label='Cancel' onPress={()=>dispatch(setAddProductFromModal({visible:false,item:null}))}></SecondaryButton>
              <PrimaryButton label='Add' onPress={()=>{
                const value = { ...addProductFromModal.item };
                handleAddProduct(value);
                dispatch(setAddProductFromModal({visible:false,item:null}))
                }}></PrimaryButton>
          </View>
          </>}
        </CustomModal>
    </View>
  )
}

export default ProductList