
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CartIcon = () => {
  return (
    <Button variant="ghost" size="sm" className="hidden">
      <ShoppingCart className="h-5 w-5" />
    </Button>
  );
};

export default CartIcon;
