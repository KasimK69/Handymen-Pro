
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { CartItem as CartItemType } from '@/context/CartContext';
import CartItem from './CartItem';

interface CartItemsListProps {
  items: CartItemType[];
  formatPrice: (price: number) => string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string, name: string) => void;
  calculateItemPrice: (item: CartItemType) => number;
}

const CartItemsList: React.FC<CartItemsListProps> = ({ 
  items, 
  formatPrice, 
  onUpdateQuantity, 
  onRemoveItem,
  calculateItemPrice
}) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Cart Items */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.map(item => (
            <CartItem 
              key={item.id}
              item={item}
              formatPrice={formatPrice}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
              calculateItemPrice={calculateItemPrice}
            />
          ))}
        </div>
        
        {/* Continue Shopping */}
        <div className="p-6 bg-gray-50 dark:bg-gray-900">
          <Link 
            to="/ac-buy-and-sale" 
            className="text-brand-blue hover:text-brand-blue/80 inline-flex items-center group"
          >
            <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartItemsList;
