import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList ,Image} from 'react-native';
import { useSelector } from 'react-redux';
import { useGetOrdersMutation } from '../../services/ecommerceAPI';
import { useIsFocused } from '@react-navigation/native';
import { AppColors } from '../../Styles/GeneralStyles';
import { isLoading } from 'expo-font';
import LoadingIndicator from '../CoreComponents/LoadingIndicator';

const Purchases = ({}) => {
  

  const [purchases, setPurchases] = useState([]);
  const [getOrders, {data, isLoading: isPosting, isError: postError,error, isSuccess }] = useGetOrdersMutation();
  const {user} = useSelector(state=>state.General)
  const isFocused = useIsFocused()

  useEffect(() => {
      if(isFocused){
        getOrders(user.localId);}
  }, [isFocused]);
  useEffect(()=>{
    if(isSuccess){
      setPurchases(Object.values(data).sort((a,b)=> b.date -a.date ))
    }
  },[isSuccess])


  const renderItem = ({ item, index }) => {
    let date = new Date(item.date);
    return (
      <View style={[styles.purchaseCard, { backgroundColor: AppColors.softYellow }]}>
        <View style={styles.header}>
          <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
          <Text style={styles.dateText}>{date.toLocaleTimeString()}</Text>
        </View>
        <Text style={styles.totalAmountText}>Total Amount: ${item.totalAmount ? item.totalAmount.toFixed(2) : 'N/A'}</Text>
        <Text style={styles.cardText}>Credit Card Number: {item.card}</Text>
        <Text style={styles.itemsHeader}>Items:</Text>
        {item.items.map((product, productIndex) => {
          return (
            <View key={"product.item.id"+productIndex} style={styles.itemContainer}>
              <Image source={{ uri: product.item.thumbnail }} style={styles.thumbnail} />

              <View style={{}}>
                <Text style={styles.itemIndexText}>{product.item.title}</Text>
                <Text style={styles.itemPriceText}>Price per unit: ${product.item.price.toFixed(2)}</Text>
                <Text style={styles.itemPriceText}>Quantity: ${product.quantity}</Text>
                <Text style={styles.itemPriceText}>Total: ${(product.quantity * product.item.price).toFixed(2)}</Text>
              </View>

            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{flex:1,backgroundColor: AppColors.footerBackground}}>
    {postError ? <Text style={{color:'white'}}>Error: {error.data.error}</Text>:
    isPosting ? <LoadingIndicator/> :
    <FlatList
      style={[styles.container,{backgroundColor:AppColors.footerBackground}]}
      contentContainerStyle={{alignItems:''}}
      data={purchases}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
    }
    </View>
  );
};
const styles = StyleSheet.create({
  purchaseCard: {
    borderRadius: 8,
    padding: 8,
    margin: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalAmountText: {
    fontSize: 16,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
  itemsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemContainer: {
    marginBottom: 8,
    flexDirection:'row'
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight:10,
    marginTop:5,
    borderRadius: 4,
  },
  itemIndexText: {
    fontSize: 16,
    marginBottom: 4,
  },
  itemPriceText: {
    fontSize: 14,
    color: 'gray',
  },
});
export default Purchases;
