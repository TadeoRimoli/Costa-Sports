import { useState } from 'react';
import {StatusBar, StyleSheet, SafeAreaView,Text, View ,TextInput,ScrollView,FlatList,Keyboard } from 'react-native';
import CustomInput from './Components/CustomInput'; // Cambiado aquí
import CustomButton from './Components/CustomButton'; // Cambiado aquí
import {Categories,shopItems} from './Items/Items'; // Cambiado aquí
import ArticleCard from './Components/Cards/ArticleCard'; // Cambiado aquí
import CustomText from './Components/CustomText';
import CustomModal from './Components/CustomModal';
import ArticleForm from './Components/Forms/ArticleForm';
import { FontSizeStyles, GeneralStyle, MarginDirectionStyles, MarginStyles } from './Styles/GeneralStyles';
import { productCategories } from './Constants/Arrays';

export default function App() {
  
  const defaultArticle={id:'',description:'',createdAt:new Date(),category:productCategories[0]}
  const [articles,setArticles]=useState([])
  const [article,setArticle]=useState(defaultArticle)
  const [selectedOption, setSelectedOption] = useState('option1');
  const [modalProps,setModalProps]=useState({visible:false,item:{id:-1,title:''}})
  const [alertModal,setAlertModal]=useState({visible:false,message:''})
  function addArticle(){       
    Keyboard.dismiss();
    const foundArticle = articles.find(article => article.id === article.id);
    if(foundArticle){
      setAlertModal({visible:true,message:'Ya existe un articulo con este codigo, prueba con otro distinto'})
    }
    else if(article.id && article.category && article.description){
      setArticles([...articles,{...article,createdAt:new Date()}])
      setArticle(defaultArticle)
    }else{
      setAlertModal({visible:true,message:'Completa todos los campos'})
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar  />
        <ArticleForm article={article} setArticle={setArticle} addArticle={addArticle} />
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
    </CustomModal>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer:{
    flexDirection:'row',
  },
  container: {
    flex: 1,
    padding:10,
    justifyContent: 'flex-start',
    flexDirection:'column',
    backgroundColor:'white'
  },
});
