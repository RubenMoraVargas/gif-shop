import  { store }  from  '../store';

import  { addToCart,  removeFromCart }  from  './cartReducer';

  

describe('cart reducer',  ()  =>  {

it('should add an item to the cart', () => {

const  item  = { id:  '1',  title:  'item 1',  price:  10 };

store.dispatch(addToCart(item));

const  state  =  store.getState().cart;

expect(state.items).toContainEqual(item);

});

  

it('should remove an item from the cart', () => {

const  item  = { id:  '1',  title:  'item 1',  price:  10 };

store.dispatch(addToCart(item));

store.dispatch(removeFromCart(item.id));

const  state  =  store.getState().cart;

expect(state.items).not.toContainEqual(item);

});

});