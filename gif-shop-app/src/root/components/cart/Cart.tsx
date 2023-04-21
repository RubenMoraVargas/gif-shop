import { useSelector } from "react-redux";

import { CartItem } from "@/root/components/cart-item/CartItem";
import { CartItem as CartItemType } from "@/root/types/CartItem.type";
import {
  selectCartItems,
  selectCartTotal,
} from "@/root/redux/selectors/cart-selector/cart.selector";
export const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <div className="container">
      <h1>Cart</h1>
      <div className="cart-items">
        {cartItems.map((item: CartItemType) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="cart-total">
        <span>Total:</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};
export default Cart;
