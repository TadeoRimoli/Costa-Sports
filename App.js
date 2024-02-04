import { useState } from 'react';
import {StatusBar, StyleSheet, SafeAreaView,Text, View ,TextInput,ScrollView,Image,FlatList,Keyboard,Dimensions, Pressable } from 'react-native';
import CustomInput from './src/Components/CustomInput'; // Cambiado aquí
import CustomButton from './src/Components/CustomButton'; // Cambiado aquí
import ArticleCard from './src/Components/Cards/ArticleCard'; // Cambiado aquí
import CustomText from './src/Components/CustomText';
import CustomModal from './src/Components/CustomModal';
import Header from './src/Components/Header';
import ArticleForm from './src/Components/Forms/ArticleForm';
import { Colors, FontSizeStyles, GeneralStyle, MarginDirectionStyles, MarginStyles } from './Styles/GeneralStyles';
import { productCategories,products } from './src/Constants/Arrays';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProductCard from './src/Components/Cards/ProductCard';

export default function App() {
  
  // const defaultArticle={id:'',description:'',createdAt:new Date(),category:productCategories[0]}
  // const [articles,setArticles]=useState([])
  // const [article,setArticle]=useState(defaultArticle)
  // const [selectedOption, setSelectedOption] = useState('option1');
  // const [modalProps,setModalProps]=useState({visible:false,item:{id:-1,title:''}})
  // const [alertModal,setAlertModal]=useState({visible:false,message:''})
  // function addArticle(){       
  //   Keyboard.dismiss();
  //   const foundArticle = articles.find(article => article.id === article.id);
  //   if(foundArticle){
  //     setAlertModal({visible:true,message:'Ya existe un articulo con este codigo, prueba con otro distinto'})
  //   }
  //   else if(article.id && article.category && article.description){
  //     setArticles([...articles,{...article,createdAt:new Date()}])
  //     setArticle(defaultArticle)
  //   }else{
  //     setAlertModal({visible:true,message:'Completa todos los campos'})
  //   }
    
  // }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  let discoutProducts = products.sort((a, b) => b.discountPercentage - a.discountPercentage);
  
  const [category,setCategory]=useState('')
  const [selectedCategory,setSelectedCategory]=useState(null)

  function handlePressCategory(item){
    setSelectedCategory(item)
  }



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar  />
      <Header></Header>
      <View style={{paddingHorizontal:10}}>
        <View style={[{flexDirection:'row',alignItems:'center'}]}>
          <CustomInput value={category} setValue={(e)=>setCategory(e)} customStyles={{flex:1,marginRight:10}} placeholder={'Category or product'}/>
          <Ionicons name="search" size={35}  color={'black'} />
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 3,
          }}
        />
      </View>
      {selectedCategory && <View
      style={[GeneralStyle.softPurple,{flexDirection:'row',alignItems:'center',justifyContent:'space-between',   borderRadius: 5, margin:10,padding: 5,width:'50%' }]}
      >
        <Text style={{ fontSize: 16, }}>{selectedCategory.name}</Text>
        <Ionicons onPress={()=>{setSelectedCategory(null)}} name="close" size={35}  color={'black'} />
      </View>}
      {selectedCategory && 
        <FlatList
      data={products.filter((product)=>product.category == selectedCategory.name)}
      renderItem={({ item }) => (
        <ProductCard key={item.id} item={item}></ProductCard>
      )}
      keyExtractor={item => item.id}
    />}

      {!selectedCategory && <FlatList
      data={productCategories}
      renderItem={({ item }) => (
        <Pressable onPress={()=>{handlePressCategory(item)}} style={[ GeneralStyle.softPink,{width:windowWidth-20,height:windowHeight/2,  margin: 10,borderRadius:10 }]}>
          <Text style={[MarginDirectionStyles.margin5,FontSizeStyles.fontSize22,{alignSelf:'center'}]}>{item.name}</Text>
          <Image
          style={{ flex: 1, width: null,resizeMode: 'cover' , height: null,  borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
          source={{ uri: item.image }}
          onError={(error) => console.error('Error al cargar la imagen:', error.nativeEvent.error)}
          />
        </Pressable>
      )}
      keyExtractor={item => item.name+'category'}
    />}
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
        <Ionicons  name="home" size={30}  color={'white'} />
        <Ionicons  name="pricetags" size={30}  color={'white'} />
        <Ionicons  name="cart" size={30}  color={'white'} />
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