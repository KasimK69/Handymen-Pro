
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onTabChange: (tab: 'for-sale' | 'wanted') => void;
  onOpenSellingForm: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onTabChange, onOpenSellingForm }) => {
  return (
    <section className="bg-gradient-to-r from-brand-blue to-blue-700 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">AC Buy & Sale</h1>
            <p className="text-lg opacity-90 mb-6">
              Find top-quality air conditioners for your home or office, or sell your used AC units to interested buyers. 
              All transactions are secure and convenient.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <Button 
                size="lg" 
                className="bg-brand-red hover:bg-brand-red/90 text-white"
                onClick={() => onTabChange('for-sale')}
              >
                Browse ACs For Sale
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => onTabChange('wanted')}
              >
                View Buying Requests
              </Button>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={onOpenSellingForm}
              >
                Sell Your AC
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Air Conditioner" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="text-brand-blue font-bold text-xl">Premium Quality</div>
                <div className="text-gray-600">Guaranteed Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
