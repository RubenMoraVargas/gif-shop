import  { useDispatch }  from  'react-redux';

import  { addItem }  from  '../reducers/cartReducer';

import  { Item }  from  '../types/item';

  

interface AddToCartButtonProps {

item: Item;

}

  

export  const  AddToCartButton  =  ({  item  }: AddToCartButtonProps)  =>  {

const  dispatch  =  useDispatch();

  

const  handleAddToCart  = () => {

dispatch(addItem({ id:  item.id,  name:  item.name,  price:  item.price }));

};

  

return <button  onClick={handleAddToCart}>Add  to  cart</button>;

};

  