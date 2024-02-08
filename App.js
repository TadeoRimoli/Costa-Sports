import { useState } from 'react';
import {StatusBar, StyleSheet, SafeAreaView,Text, View ,TextInput,ScrollView,Image,FlatList,Keyboard,Dimensions, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, FontSizeStyles, GeneralStyle, MarginDirectionStyles, MarginStyles } from './Styles/GeneralStyles';
import { productCategories,products } from './src/Constants/Arrays';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProductCard from './src/Components/Cards/ProductCard';
import Header from './src/Components/Header';
import ProductCatalog from './src/Components/Views/ProductCatalog';
import ProductOffers from './src/Components/Views/ProductOffers';
import ShoppingCart from './src/Components/Views/ShoppingCart';

export default function App() {
      
  const [cart,setCart]=useState([]) 

  const componentToShow = [
    {title:'Costa Shopping',content:<ProductCatalog cart={cart} setCart={setCart} />},
    {title:'HOT SALE',content:<ProductOffers cart={cart} setCart={setCart}/>},
    {title:'Cart',content:<ShoppingCart cart={cart} setCart={setCart}/>}
  ]

  const [index,setIndex] =useState(0)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar  />
      <Header title={componentToShow[index].title}/>
      {componentToShow[index].content}
      <View style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.green, 
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:15,
        paddingVertical:10,
      }}>
            <Ionicons  name="home" size={30}  color={'white'} onPress={()=>{setIndex(0)}}/>
            <MaterialIcons name="local-fire-department" size={30} color="white" onPress={()=>{setIndex(1)}} />
            <Ionicons  name="cart" size={30}  color={'white'} onPress={()=>{setIndex(2)}}/>
        </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer:{
    flexDirection:'row',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection:'column',
    backgroundColor:'white',
    paddingBottom:50
  },
});

{/* <FlatList
      horizontal
      data={discoutProducts.slice(0,10)}
      renderItem={({ item }) => (
        <View  style={[ GeneralStyle.softPink,{width:windowWidth-20,height:windowHeight/2,  margin: 10,borderRadius:10 }]}>
          <Text  numberOfLines={1} ellipsizeMode='tail' style={[MarginDirectionStyles.margin5,FontSizeStyles.fontSize22,{alignSelf:'center'}]}>{item.title}</Text>
          <Image
          style={{ flex: 1, width: null,resizeMode: 'cover' , height: null,  borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
          source={{ uri: item.thumbnail }}
          onError={(error) => console.error('Error al cargar la imagen:', error.nativeEvent.error)}
          />
           <View style={{ position: 'absolute',flexDirection:'row', top: 50, right: 10, backgroundColor: '#C57474', borderRadius: 5, padding: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>-{item.discountPercentage}%</Text>
          </View>
        </View>
      )}
      keyExtractor={item => item.id}
    /> */}