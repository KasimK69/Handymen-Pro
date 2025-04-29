import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Trash2, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();
  
  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };
  
  const calculateItemPrice = (item: any) => {
    return item.discounted 
      ? item.price * (1 - (item.discountPercentage || 0) / 100) * item.quantity
      : item.price * item.quantity;
  };
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any AC units to your cart yet.
          </p>
          <Button 
            className="bg-brand-blue hover:bg-brand-blue/90"
            size="lg"
            onClick={() => navigate('/ac-buy-and-sale')}
          >
            Browse AC Units
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {/* Cart Items */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {cart.map(item => {
                const itemPrice = item.discounted 
                  ? item.price * (1 - (item.discountPercentage || 0) / 100)
                  : item.price;
                  
                return (
                  <div key={item.id} className="p-4 md:p-6 flex flex-col md:flex-row gap-4">
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
                    </div>
                    
                    <div className="flex flex-row md:flex-col items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button 
                          className="px-3 py-1 hover:bg-gray-100" 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button 
                          className="px-3 py-1 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <button 
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => removeFromCart(item.id)}
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
              })}
            </div>
            
            {/* Continue Shopping */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900">
              <Link 
                to="/ac-buy-and-sale" 
                className="text-brand-blue hover:text-brand-blue/80 inline-flex items-center"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-500">Free</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Including all taxes
                </div>
              </div>
              
              <Button 
                className="w-full bg-brand-red hover:bg-brand-red/90" 
                size="lg"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
              
              <div className="mt-4">
                <Alert variant="default" className="bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Free delivery available for Rawalpindi and Islamabad
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
