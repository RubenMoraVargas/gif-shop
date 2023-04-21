import  { createSlice,  PayloadAction }  from  '@reduxjs/toolkit';

import  { CartItem }  from  '../types/cartItem';

  

interface CartState {

items: CartItem[];

}

  

const  initialState: CartState =  {

items:  [],

};

  

export  const  cartSlice  =  createSlice({

name:  'cart',

initialState,

reducers:  {

addItem:  (state,  action: PayloadAction<CartItem>)  =>  {

const  item  =  action.payload;

const  existingItem  =  state.items.find((i) =>  i.id  ===  item.id);

if (existingItem) {

existingItem.quantity  +=  1;

} else {

state.items.push({ ...item,  quantity:  1 });

}

},

removeItem:  (state,  action: PayloadAction<string>)  =>  {

state.items  =  state.items.filter((item) =>  item.id  !==  action.payload);

},

},

});

  

export  const  {  addItem,  removeItem  }  = cartSlice.actions;

  

export  const  selectCartItems  =  (state:  any)  => state.cart.items;

  

export  const  cartReducer  = cartSlice.reducer;