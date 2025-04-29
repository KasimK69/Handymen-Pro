
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface OrderSummaryProps {
  cartTotal: number;
  itemCount: number;
  formatPrice: (price: number) => string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartTotal, itemCount, formatPrice }) => {
  const navigate = useNavigate();
  
  return (
    <div className="lg:col-span-1">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden sticky top-24">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Subtotal ({itemCount} items)</span>
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
  );
};

export default OrderSummary;
