import { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Cart from '../cart/Cart';
import { selectCartItems } from '@/root/redux/selectors/cart-selector/cart.selector';

export const CartMenu = () => {
  const cartItems = useSelector(selectCartItems);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Link href="/cart" onClick={handleToggle}>
        Cart ({cartItems.length})
      </Link>
      {isOpen && <Cart />}
    </>
  );
};