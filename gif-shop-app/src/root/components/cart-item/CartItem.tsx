import { useDispatch } from "react-redux";

import { CartItem as CartItemType } from "@/root/types/CartItem.type";
import { removeItem } from '@/root/redux/reducers/cart-reducer/cartReducer';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeItem(item.id));
  };

  return (
    <div>
      <p>{item.name}</p>
      <p>{item.price}</p>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
}; 
export default CartItem ;