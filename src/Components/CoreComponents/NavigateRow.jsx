import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { GeneralStyle } from '../../Styles/GeneralStyles';

const NavigateRow = ({label,iconColor, route}) => {
  const navigation = useNavigation()
    return (
    <View style={[{width:'100%',padding:5},GeneralStyle.row,GeneralStyle.justifyBetween,GeneralStyle.marginVertical5]}>
        <Text style={{fontSize:16,fontWeight:600}}>{label}</Text>
        <Ionicons onPress={()=>{navigation.navigate(route)}} name={'arrow-forward'} size={30} color={iconColor} />

    </View>
  )
}

export default NavigateRow

const styles = StyleSheet.create({})