import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user:null,
  cart: [],
  user:null,
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
    }
  },
});

export const { deleteAllCartItems,addCartItem,setCartItems,removeCartItem,setUser,resetUser} = GeneralSlice.actions;
export default GeneralSlice.reducer;
