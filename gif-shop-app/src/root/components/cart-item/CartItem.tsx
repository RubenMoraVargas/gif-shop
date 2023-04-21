import  { useDispatch }  from  'react-redux';

import  { removeCartItem }  from  '../reducers/cartReducer';

import  { CartItem  as  CartItemType }  from  '../types/cartItem';

  

interface CartItemProps {

item: CartItemType;

}

  

export  const  CartItem  =  ({  item  }: CartItemProps)  =>  {

const  dispatch  =  useDispatch();

  

const  handleRemove  = () => {

dispatch(removeCartItem(item.id));

};

  

return (

<div>

<p>{item.name}</p>

<p>{item.price}</p>

<button  onClick={handleRemove}>Remove</button>

</div>

);

};
