
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-brand-blue text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience Superior Comfort?</h2>
        <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
          Whether you're looking to buy a new AC, sell your current one, or find a specific model, 
          we're here to help you with all your air conditioning needs.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-brand-red hover:bg-brand-red/90"
          >
            <Link to="/cart">View Cart</Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white/10"
          >
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
