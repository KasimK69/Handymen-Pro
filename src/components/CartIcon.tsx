
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CartIcon = () => {
  return (
    <Button variant="ghost" size="sm" asChild>
      <Link to="/contact" className="flex items-center">
        <Phone className="h-5 w-5 mr-2" />
        <span>Contact Us</span>
      </Link>
    </Button>
  );
};

export default CartIcon;
