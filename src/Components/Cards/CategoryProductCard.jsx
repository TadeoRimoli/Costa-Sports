import { StyleSheet, Text, View,Dimensions, Pressable, Image, ScrollView } from 'react-native'
import React from 'react'
import { Colors, GeneralStyle } from '../../Styles/GeneralStyles';

const CategoryProductCard = ({item,handlePressCategory}) => {
  
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    let titleFixed = item.name.toLowerCase().split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

    const renderBrands = () => {
      return item.brands.map((brand, index) => (
        <Text key={index} style={{ fontWeight: 'bold' }}>{brand}</Text>
      ));
    };
    return (
      <Pressable
      onPress={handlePressCategory}
      style={[styles.cardContainer,{
        width:windowWidth-20,
      }]}
    >
      <Image
        style={[styles.image,{
          height: windowHeight / 2.5,
        }]}
        source={{ uri: item.image }}
        onError={(error) => console.error('Error al cargar la imagen:', error.nativeEvent.error)}
      />
      
      {item.isNew && (
              <View style={[GeneralStyle.row,{position:'absolute',right:0,margin:8,padding:8,backgroundColor:Colors.softSkyBlue,borderRadius:8}]}>
                <Text style={{ fontWeight: 'bold', color: 'green' }}>New</Text>
              </View>
            )}
      <View style={{marginHorizontal:10,paddingTop:10,paddingBottom:20}}>
        <View style={[GeneralStyle.row,GeneralStyle.justifyBetween,GeneralStyle.itemsCenter,GeneralStyle.marginBottom10]}>
          <Text ellipsizeMode='tail' numberOfLines={1} style={{ marginRight:8,fontSize: 20, fontWeight: 'bold' }}>{titleFixed}</Text>
          <Text style={{ fontWeight: 'bold' }}>{item.priceRange}</Text>
        </View>
        
        <Text>{item.description}</Text>

          <View style={GeneralStyle.row}>
            <Text >{item.brands.join(', ')}</Text>
          </View>
      </View>
    </Pressable>
    
  )
}

export default CategoryProductCard


const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: '#BAE0F2',
      borderRadius: 15,
      shadowColor: '#000000',
      shadowOpacity: 0.3,
      alignSelf:'center',
      marginVertical:10,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      elevation: 2,
    },
    categoryText: {
      margin: 5,
      fontSize: 22,
      alignSelf: 'center',
      fontWeight: 'bold',
    },
    image: {
      position:'relative',
      resizeMode: 'cover',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
  });