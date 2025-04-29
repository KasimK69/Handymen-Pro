
import React from 'react';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
  formatPrice: (price: number) => string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string, name: string) => void;
  calculateItemPrice: (item: CartItemType) => number;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  formatPrice, 
  onUpdateQuantity, 
  onRemoveItem,
  calculateItemPrice
}) => {
  const itemPrice = item.discounted 
    ? item.price * (1 - (item.discountPercentage || 0) / 100)
    : item.price;

  return (
    <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
      <div className="w-full md:w-24 h-24 rounded overflow-hidden">
        <img 
          src={item.images[0]} 
          alt={item.name}
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
        <div className="text-brand-blue font-bold">
          {formatPrice(itemPrice)}
          {item.discounted && (
            <span className="text-gray-500 text-sm line-through ml-2">
              {formatPrice(item.price)}
            </span>
          )}
        </div>
        {item.condition && (
          <div className="mt-1 text-sm text-gray-500">
            Condition: <span className="capitalize">{item.condition}</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-row md:flex-col items-center gap-4">
        <div className="flex items-center border border-gray-300 rounded shadow-sm">
          <button 
            className="px-3 py-1 hover:bg-gray-100 text-gray-700 transition-colors" 
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-4 py-1 font-medium">{item.quantity}</span>
          <button 
            className="px-3 py-1 hover:bg-gray-100 text-gray-700 transition-colors"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        
        <button 
          className="text-gray-500 hover:text-red-500 transition-colors"
          onClick={() => onRemoveItem(item.id, item.name)}
          title="Remove item"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
      
      <div className="text-right">
        <div className="font-bold">
          {formatPrice(calculateItemPrice(item))}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
