import { useState } from 'react';
import {StatusBar, StyleSheet, SafeAreaView,Text, View ,TextInput,ScrollView,Image,FlatList,Keyboard,Dimensions } from 'react-native';
import CustomInput from './src/Components/CustomInput'; // Cambiado aquí
import CustomButton from './src/Components/CustomButton'; // Cambiado aquí
import ArticleCard from './src/Components/Cards/ArticleCard'; // Cambiado aquí
import CustomText from './src/Components/CustomText';
import CustomModal from './src/Components/CustomModal';
import Header from './src/Components/Header';
import ArticleForm from './src/Components/Forms/ArticleForm';
import { FontSizeStyles, GeneralStyle, MarginDirectionStyles, MarginStyles } from './Styles/GeneralStyles';
import { productCategories,products } from './src/Constants/Arrays';
import Ionicons from '@expo/vector-icons/Ionicons';

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
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar  />
      <Header></Header>
      {/* <View style={{paddingHorizontal:10}}>
        <View style={[{flexDirection:'row',alignItems:'center'}]}>
          <CustomInput customStyles={{flex:1,marginRight:10}} placeholder={'Category or product'}/>
          <Ionicons name="search" size={35}  color={'black'} />
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 3,
          }}
        />
      </View> */}
    <ScrollView>
      <FlatList
      horizontal
      data={productCategories}
      renderItem={({ item }) => (
        <View style={[ GeneralStyle.softPink,{width:windowWidth-20,height:windowHeight/2,  margin: 10,borderRadius:10 }]}>
          <Text style={[MarginDirectionStyles.margin5,FontSizeStyles.fontSize22,{alignSelf:'center'}]}>{item.name}</Text>
          <Image
          style={{ flex: 1, width: null,resizeMode: 'cover' , height: null,  borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
          source={{ uri: item.image }}
          onError={(error) => console.error('Error al cargar la imagen:', error.nativeEvent.error)}
          />
        </View>
      )}
      keyExtractor={item => item.name+'category'}
    />
    <FlatList
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
    />
    </ScrollView>
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
    backgroundColor:'white'
  },
});

{/* <ArticleForm article={article} setArticle={setArticle} addArticle={addArticle} />
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ArticleCard key={`CategoryCard${index}`} article={item} onPress={() => { setModalProps({ visible: true, item }); }}></ArticleCard>
          )}
        />
    <CustomModal  visible={modalProps.visible} hideModalFunction={()=>{setModalProps({visible:false,item:defaultArticle})}}>
      <CustomText styles={FontSizeStyles.fontSize20}>Estas seguro que queres eliminar el articulo {modalProps.item.title} ?</CustomText>
      <View style={[{flexDirection:'row',justifyContent:'space-between'},,MarginDirectionStyles.marginTop10]}>
        <CustomButton color={GeneralStyle.sandBackgroundLight} label='Cancelar' onPress={()=>{setModalProps({visible:false,item:defaultArticle})}}></CustomButton>
        <CustomButton 
        color={GeneralStyle.skyBlueLight}
        label='Si, eliminar' onPress={()=>{
          setArticles(articles.filter((article) => article.id !== modalProps.item.id))
          setModalProps({visible:false,item:defaultArticle})
        }}></CustomButton>
      </View>
    </CustomModal>
    <CustomModal  visible={alertModal.visible} hideModalFunction={()=>{setAlertModal({visible:false,message:''})}} autoCloseTimeout={3500}>
      <CustomText styles={FontSizeStyles.fontSize20}>{alertModal.message}</CustomText>
    </CustomModal> */}