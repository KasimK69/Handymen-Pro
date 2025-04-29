
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Trash2, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

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

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    toast({
      title: "Item removed",
      description: `${name} has been removed from your cart.`,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity >= 1) {
      updateQuantity(id, quantity);
      toast({
        title: "Cart updated",
        description: "The quantity has been updated.",
      });
    }
  };
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-3xl mx-auto text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
              <ShoppingCart className="h-12 w-12 text-gray-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven't added any AC units to your cart yet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-brand-blue hover:bg-brand-blue/90"
              size="lg"
              onClick={() => navigate('/ac-buy-and-sale')}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Browse AC Units
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
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
                  <div key={item.id} className="p-4 md:p-6 flex flex-col md:flex-row gap-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
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
                      <div className="flex items-center border border-gray-300 rounded shadow-sm">
                        <button 
                          className="px-3 py-1 hover:bg-gray-100 text-gray-700 transition-colors" 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-1 font-medium">{item.quantity}</span>
                        <button 
                          className="px-3 py-1 hover:bg-gray-100 text-gray-700 transition-colors"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <button 
                        className="text-gray-500 hover:text-red-500 transition-colors"
                        onClick={() => handleRemoveItem(item.id, item.name)}
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
              })}
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
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden sticky top-24">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal ({cart.length} items)</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Delivery</span>
                  <span className="text-green-500 font-medium">Free</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
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
                className="w-full bg-brand-red hover:bg-brand-red/90 h-12 text-base shadow-md" 
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
              
              <div className="mt-6 bg-gray-50 dark:bg-gray-900 rounded-md p-4">
                <Alert variant="default" className="bg-transparent border-none p-0">
                  <AlertCircle className="h-5 w-5 text-brand-blue" />
                  <AlertDescription className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium block mb-1">Free delivery</span>
                    Available for Rawalpindi and Islamabad
                  </AlertDescription>
                </Alert>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  <ShoppingCart className="h-3.5 w-3.5" />
                  <span>Safe shopping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
