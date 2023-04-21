import { useDispatch } from "react-redux";

import { addItem } from "@/root/redux/reducers/cart-reducer/cartReducer";
import { Item } from "@/root/types/Item.type";

interface AddToCartButtonProps {
  item: Item;
}

export const AddToCartButton = ({ item }: AddToCartButtonProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({ ...item, quantity: 1 }));
  };

  return <button onClick={handleAddToCart}>Add to cart</button>;
};
