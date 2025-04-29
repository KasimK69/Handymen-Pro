
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const CartIcon = () => {
  const { cartCount } = useCart();
  
  return (
    <Link to="/cart" className="relative inline-flex items-center">
      <ShoppingCart className="h-6 w-6" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-brand-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
