import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  purchases: [],
};

const GeneralSlice = createSlice({
  name: 'GeneralSlice',
  initialState,
  reducers: {
    deleteAllCartItems(state){
        state.cart = [];
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
    addPurchasesItem(state, action) {
        state.purchases.push(action.payload);
    },
    setPurchasesItems(state, action){
        state.purchases = action.payload
    },
    removePurchasesItem(state, action){
        const itemIndexToRemove = action.payload;
        state.purchases.splice(itemIndexToRemove, 1);
    }
  },
});

export const { deleteAllCartItems,addCartItem,setCartItems,removeCartItem,addPurchasesItem,setPurchasesItems,removePurchasesItem} = GeneralSlice.actions;
export default GeneralSlice.reducer;
