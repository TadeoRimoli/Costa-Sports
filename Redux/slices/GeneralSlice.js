import { createSlice } from '@reduxjs/toolkit';
import { Dimensions } from 'react-native';

const initialState = {
  user:null,
  cart: [],
  user:null,
  productList:[],
  deleteProductFromCartModal:{
    visible:false,
    item:-1
  },
  addProductFromModal:{
    visible:false,
    item:-1
  },
  logoutModal:false,
  dimensions:Dimensions.get('window')
};

const GeneralSlice = createSlice({
  name: 'GeneralSlice',
  initialState,
  reducers: {
    deleteAllCartItems(state){
        state.cart = [];
    },
    setUser(state,action){
      state.user = action.payload;
    },
    resetUser(state){
      state.user =null;
    },
    addCartItem(state, action) {
      state.cart.push(action.payload);
    },
    setCartItems(state, action){
        state.cart = action.payload
    },
    removeCartItem(state, action){
        const itemIndexToRemove = action.payload;
        state.cart.splice(itemIndexToRemove, 1);
    },
    setProductList(state, action){
      state.productList = action.payload;
    },
    clearProductList(state, action){
      state.productList = [];
    },
    setDeleteProductFromCartModal(state, action){
      state.deleteProductFromCartModal = action.payload;
    },
    setAddProductFromModal(state, action){
      state.addProductFromModal = action.payload;
    },
    showLogoutModal(state){
      state.logoutModal = true;
    },
    hideLogoutModal(state){
      state.logoutModal = false;
    },
    setDimensions(state,action){
      state.dimensions = action.payload;
    },
    reset: () => initialState
  },
});

export const { showLogoutModal,hideLogoutModal,reset,clearProductList,setProductList,deleteAllCartItems,addCartItem,setCartItems,removeCartItem,setUser,resetUser,setDeleteProductFromCartModal,setAddProductFromModal,setDimensions} = GeneralSlice.actions;
export default GeneralSlice.reducer;
