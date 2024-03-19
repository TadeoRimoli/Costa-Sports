import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Views/HomeScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import Categories from '../Views/Categories';
import { MaterialIcons } from '@expo/vector-icons';
import ShoppingCart from '../Views/ShoppingCart';
import ProductList from '../Views/ProductList';
import PaymentScreen from '../Views/PaymentScreen';
import Purchases from '../Views/Purchases';
import Register from '../Views/Public/Register';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../Views/Public/Login';
import UserMainView from '../Views/UserMainView';
import { createTable, deleteSession, dropTable, fetchSession, getSession } from '../../db';
import { setUser } from '../../../Redux/slices/GeneralSlice';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

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

const PublicStack = ({})=>{
  return <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen 
          name="Login" 
          options={{
            headerShown:false,
          }}
          component={Login} 
      />
      <Stack.Screen 
          name="Register" 
          options={{
            headerShown:false,
          }}
          component={Register}
      />
  </Stack.Navigator>
}

const MyNavigator = ({}) => {

  const { user } = useSelector(state=>state.General)
  
  useEffect(() => {
    // Crear la tabla al cargar la aplicación
    createTable();
    fetchSession()
  }, []);

  const dispatch = useDispatch()
  const MAX_SESSION_TIME = 10; // 1 hora en segundos

  const fetchSession = () => {
    getSession(session => {
      console.log('Session:', session);
      if (session) {
        const { updatedAt } = session;
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        const elapsedTime = currentTimeInSeconds - updatedAt;
        if (elapsedTime > MAX_SESSION_TIME) {
          // Si ha pasado el tiempo máximo de sesión
          deleteSession(); // Elimina la sesión expirada de la base de datos
          dispatch(setUser(null)); // Actualiza el estado del usuario a null
        } else {
          // Si la sesión aún no ha expirado
          dispatch(setUser(session)); // Actualiza el estado del usuario con los datos de la sesión
        }
      } else {
        // Si no hay sesión almacenada
      }
    });
  };

  return  user ? 
  (
      <Tab.Navigator
      screenOptions={{ headerShown: false,tabBarShowLabel:false,
        tabBarActiveTintColor: '#877665', 
        tabBarStyle: {
          backgroundColor: '#f2f2f2',
        },
        tabBarIconStyle:{
          color:'black'
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
        name="CartStack" 
        component={ShoppingCartStack}
        options={{
            tabBarLabel:'',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart" size={size} color={color} />
            ),
          }}
        />
          <Tab.Screen  
        name="UserStack" 
        component={UserMainView}
        options={{
            tabBarLabel:'',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
  ) : <PublicStack/>
}

export default MyNavigator
