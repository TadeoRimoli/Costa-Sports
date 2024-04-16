import { Dimensions, StyleSheet, Text, View } from 'react-native'
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
import {  deleteSession,  getSession } from '../../db';
import { reset, setDimensions, setProductList, setUser } from '../../../Redux/slices/GeneralSlice';
import { AppColors } from '../../Styles/GeneralStyles';
import { useLazyGetProductsByCategoryQuery } from '../../services/ecommerceAPI';
import { maxMobileResolution } from '../../Constants/Constants';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return <Stack.Navigator 
  
  
  initialRouteName='Home'>
      <Stack.Screen name="Home" 
      options={{ headerShown:false, }}
      component={HomeScreen}></Stack.Screen>
      <Stack.Screen name="Purchases" 
      options={{
        headerStyle:{
          backgroundColor:AppColors.footerBackground,
        },
        headerTintColor:AppColors.white
      }}
      component={Purchases}></Stack.Screen>
  </Stack.Navigator>
}

const CategoriesStack = ({navigation,route}) => {
  
  
  const [fetchTrigger] = useLazyGetProductsByCategoryQuery({});


  const dispatch = useDispatch()
  async function fetchItems(category){
    const response = await fetchTrigger(category)
    if(response.isSuccess){
      dispatch(setProductList(response.data))
    }
  }  
   // Función para manejar el clic en el botón
  return <Stack.Navigator 
  initialRouteName='Categories' 
  >
      <Stack.Screen name="Categories" 
      options={{
        headerStyle:{
          backgroundColor:AppColors.footerBackground,
        },
        headerTintColor:AppColors.white
      }}
      
      component={Categories} />
      <Stack.Screen
      options={({ route }) => ({
        headerRight:()=>(
          <Ionicons style={{marginRight:10}} name="reload" onPress={()=>{
            fetchItems(route.params.selectedCategory.name);
          }} size={30} color={AppColors.white}/>
        ),
        headerTitle:route.params.selectedCategory.name.toLowerCase().split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        ,
        headerStyle:{
          backgroundColor:AppColors.footerBackground,
        },
        headerTintColor:AppColors.white

      })}
      name="Products" component={ProductList} />
  </Stack.Navigator>
}


const ShoppingCartStack = ({ navigation }) => {

  return <Stack.Navigator initialRouteName="Shopping Cart">
      <Stack.Screen 
          name="Shopping Cart" 
          options={{
            headerTitle:'Shopping Cart',
            headerStyle:{
              backgroundColor:AppColors.footerBackground,
            },
          headerTintColor:AppColors.white

          }}
          component={ShoppingCart} 
      />
      <Stack.Screen 
          name="Payment Screen" 
          options={{
            headerTitle:'Shopping Cart',
            headerStyle:{
              backgroundColor:AppColors.footerBackground,
            },
            headerTintColor:AppColors.white,

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

  const { user,cart } = useSelector(state=>state.General)
  
  useEffect(() => {
    fetchSession()
  }, []);

  const dispatch = useDispatch();
  
  const MAX_SESSION_TIME = 3600; // 1 hora en segundos

  const fetchSession = () => {
    getSession(session => {
      if (session) {
        const { updatedAt } = session;
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        const elapsedTime = currentTimeInSeconds - updatedAt;
        if (elapsedTime > MAX_SESSION_TIME) {
          // Si ha pasado el tiempo máximo de sesión
          deleteSession(); // Elimina la sesión expirada de la base de datos
          dispatch(reset())
          dispatch(setUser(null)); // Actualiza el estado del usuario a null
        } else {
          // Si la sesión aún no ha expirado
          dispatch(setUser(session)); // Actualiza el estado del usuario con los datos de la sesión
        }
      } else {
        // Si no hay sesión almacenada
        deleteSession(); // Elimina la sesión expirada de la base de datos
        dispatch(reset())
        dispatch(setUser(null)); // Actualiza el estado del usuario a null
      }
    });
  };




  return  user ? 
  (
        <Tab.Navigator
        
    
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'white', 
          tabBarStyle: {
            backgroundColor: AppColors.footerBackground,
            borderTopWidth: 0, // Eliminar el borde superior de la barra de navegación
          },
          
        }}
      >
        <Tab.Screen  
        name="HomeStack" component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        
        <Tab.Screen  
        name="Marketplace"
        component={CategoriesStack}
        options={{

            tabBarLabel:'',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="pricetags-outline" size={size} color={color} />
            ),
          }}
        />
        
        <Tab.Screen  
        name="Cart" 
        component={ShoppingCartStack}
        options={{
            tabBarLabel:'',
            tabBarIcon: ({ color, size }) => (
              <View style={{ position: 'relative',marginRight:12 }}>
                <Ionicons color={color} name="cart-outline" size={size} />
                {cart.length > 0 && (
                  <View style={{
                    position: 'absolute',
                    top: -5,
                    right: -5,
                    backgroundColor: 'white',
                    borderRadius: 12,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 12 }}>{cart.length}</Text>
                  </View>
                )}
              </View>
            ),
          }}
        />
        <Tab.Screen  
        name="User" 
        component={UserMainView}
        options={{
            
            tabBarLabel:'',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
  ) : <PublicStack/>

}

export default MyNavigator
