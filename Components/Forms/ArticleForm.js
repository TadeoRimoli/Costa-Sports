import { StyleSheet,  Text, View } from 'react-native'
import React from 'react'
import CustomInput from '../../Components/CustomInput'; // Cambiado aquí
import CustomButton from '../../Components/CustomButton'; // Cambiado aquí
import { Picker } from '@react-native-picker/picker';
import { GeneralStyle, MarginDirectionStyles } from '../../Styles/GeneralStyles';
import { productCategories } from '../../Constants/Arrays';

const ArticleForm = ({article,setArticle,addArticle}) => {
    
  return (
    <View style={styles.container}>
       <View style={styles.headerContainer}>
        <CustomInput placeholder={'Ingrese codigo articulo'} label={''} value={article.id} setValue={(e)=>{setArticle({...article,id:e})}} ></CustomInput>
        <CustomInput placeholder={'Descripcion'} label={''} value={article.description} setValue={(e)=>{setArticle({...article,description:e})}}></CustomInput>
        <View style={[GeneralStyle.background4, { marginVertical:10,borderRadius: 10 }]}>
        <Picker
            selectedValue={article.category}
            onValueChange={(itemValue, itemIndex) => {
                setArticle({...article,category:itemValue})
            }}
        >
            {productCategories.map((category,index)=>
                <Picker.Item key={index} label={category} value={category} />
            )}
        </Picker>
        </View>
        <CustomButton 
        label='Agregar' 
        onPress={addArticle}
        ></CustomButton>
      </View>
    </View>
  )
}

export default ArticleForm

const styles = StyleSheet.create({
    headerContainer:{
      flexDirection:'col',
    },
    container: {
      marginBottom:10,
      flexDirection:'column',
      backgroundColor:'white',
    },
  });
  