import { StyleSheet, Text, View,Dimensions, Pressable, Image } from 'react-native'
import React from 'react'

const CategoryProductCard = ({item,handlePressCategory}) => {
  
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
    <Pressable
    onPress={handlePressCategory}
    style={[styles.cardContainer,{
      
    }]}
  >
    <Text style={[styles.categoryText]}>{item.name.toLowerCase().split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</Text>
    <Image
      style={[styles.image,{
        width: windowWidth - 50, 
        height: windowHeight / 2.5,
      }]}
      source={{ uri: item.image }}
      onError={(error) => console.error('Error al cargar la imagen:', error.nativeEvent.error)}
    />
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
      elevation: 2, // Solo para Android
    },
    categoryText: {
      margin: 5,
      fontSize: 22,
      alignSelf: 'center',
      fontWeight: 'bold',
    },
    image: {
      width: null,
      resizeMode: 'cover',
      height: null,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
  });