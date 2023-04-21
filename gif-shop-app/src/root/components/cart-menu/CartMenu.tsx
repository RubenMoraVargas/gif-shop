import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../reducers/cartReducer';
import { Cart } from './Cart';
import Link from 'next/link';

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