
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProductCard from './ProductCard';
import WantedCard from './WantedCard';
import { ACUnit } from '@/types/acUnit';

interface ProductsSectionProps {
  selectedTab: 'for-sale' | 'wanted';
  onTabChange: (tab: 'for-sale' | 'wanted') => void;
  acUnitsForSale: ACUnit[];
  acUnitsWanted: ACUnit[];
  onOpenGallery: (unit: ACUnit) => void;
  onWhatsAppContact: (unit: ACUnit) => void;
  formatPrice: (price: number) => string;
  onOpenSellingForm: () => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  selectedTab,
  onTabChange,
  acUnitsForSale,
  acUnitsWanted,
  onOpenGallery,
  onWhatsAppContact,
  formatPrice,
  onOpenSellingForm
}) => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <Tabs value={selectedTab} onValueChange={(value) => onTabChange(value as 'for-sale' | 'wanted')}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="for-sale" className="text-base py-3">ACs For Sale</TabsTrigger>
              <TabsTrigger value="wanted" className="text-base py-3">ACs Wanted</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="for-sale">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Air Conditioners For Sale</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Browse our selection of new and used air conditioning units with competitive pricing and quality assurance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {acUnitsForSale.map(unit => (
                <ProductCard 
                  key={unit.id} 
                  product={unit} 
                  onImageClick={() => onOpenGallery(unit)}
                  onWhatsAppContact={() => onWhatsAppContact(unit)}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="wanted">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">AC Buying Requests</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                These are the current requests from people looking to buy AC units. If you have something that matches, contact us.
              </p>
              <Button 
                className="mt-4 bg-brand-blue hover:bg-brand-blue/80"
                onClick={onOpenSellingForm}
              >
                Sell Your AC Unit
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {acUnitsWanted.map(unit => (
                <WantedCard 
                  key={unit.id} 
                  request={unit} 
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProductsSection;
