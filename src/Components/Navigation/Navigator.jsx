import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Views/HomeScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import Categories from '../Views/Categories';
import ProductOffers from '../Views/ProductOffers';
import { MaterialIcons } from '@expo/vector-icons';
import ShoppingCart from '../Views/ShoppingCart';
import ProductList from '../Views/ProductList';
import PaymentScreen from '../Views/PaymentScreen';
import Purchases from '../Views/Purchases';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const MyNavigator = ({}) => {

    const HomeStack = () => {
        return <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
            <Stack.Screen name="Purchases" component={Purchases}></Stack.Screen>
        </Stack.Navigator>
    }

    const CategoriesStack = ({navigation,route}) => {

        return <Stack.Navigator initialRouteName='Categories' 
        >
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen 
            options={({ route }) => ({
              headerTitle:route.params.selectedCategory.name.toLowerCase().split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
              ,
            })}
            name="Products" component={ProductList} />
        </Stack.Navigator>
    }

    const ProductOffersStack = () => {
      
      return <Stack.Navigator >
          <Stack.Screen name="HotSale" 
          options={{headerTitle:'20 Best Offers'}}
          component={ProductOffers} />
      </Stack.Navigator>
    }

    const ShoppingCartStack = ({ navigation }) => {

        return <Stack.Navigator initialRouteName='ShoppingCart'>
            <Stack.Screen 
                name="ShoppingCart" 
                options={{
                  headerTitle:'Shopping Cart'
                }}
                component={ShoppingCart} 
            />
            <Stack.Screen 
                name="PaymentScreen" 
                options={{
                  headerTitle:'Shopping Cart'
                }}
                component={PaymentScreen}
            />
        </Stack.Navigator>
    }

  return (
      <Tab.Navigator
      screenOptions={{ headerShown: false,tabBarShowLabel:false,
        tabBarActiveTintColor: '#877665', 
        tabBarStyle: {
          backgroundColor: '#f2f2f2',
        }
      }}
      >
        <Tab.Screen  
        name="HomeStack" component={HomeStack}
        options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        
        <Tab.Screen  
        name="CategoriesStack"
        component={CategoriesStack}
        options={{
            tabBarLabel:'',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="pricetags" size={size} color={color} />
            ),
          }}
        />
        
        <Tab.Screen  
        name="HotSaleStack" component={ProductOffersStack}
        options={{
            tabBarLabel:'',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="local-fire-department" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen  
        name="CartStack" 
        component={ShoppingCartStack}
        options={{
            tabBarLabel:'',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
  )
}

export default MyNavigator
