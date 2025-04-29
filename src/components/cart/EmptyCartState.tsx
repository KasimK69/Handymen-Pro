
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmptyCartState = () => {
  const navigate = useNavigate();

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
};

export default EmptyCartState;
