import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../reducers/cartReducer';
import { CartItem } from '../components/CartItem';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <div className="container">
      <h1>Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
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
