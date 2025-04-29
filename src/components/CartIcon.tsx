
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const CartIcon = () => {
  const { cartCount, cart } = useCart();
  
  return (
    <Link to="/cart" className="relative inline-flex items-center group">
      <div className="p-2 rounded-full transition-colors group-hover:bg-gray-100 dark:group-hover:bg-gray-800">
        <ShoppingCart className="h-6 w-6" />
        {cartCount > 0 && (
          <span className={cn(
            "absolute -top-2 -right-2 bg-brand-red text-white text-xs",
            "w-6 h-6 rounded-full flex items-center justify-center",
            "animate-in fade-in duration-300"
          )}>
            {cartCount}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;
