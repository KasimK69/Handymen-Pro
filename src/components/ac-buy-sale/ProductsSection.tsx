
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProductCard from './ProductCard';
import WantedCard from './WantedCard';
import { ACUnit } from '@/types/acUnit';
import { ArrowRight } from 'lucide-react';

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
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <Tabs value={selectedTab} onValueChange={(value) => onTabChange(value as 'for-sale' | 'wanted')}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 w-full max-w-md shadow-md rounded-lg overflow-hidden">
              <TabsTrigger value="for-sale" className="text-base py-3 data-[state=active]:bg-brand-blue data-[state=active]:text-white">
                ACs For Sale
              </TabsTrigger>
              <TabsTrigger value="wanted" className="text-base py-3 data-[state=active]:bg-brand-blue data-[state=active]:text-white">
                ACs Wanted
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="for-sale">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Premium Air Conditioners <span className="text-brand-blue">For Sale</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Browse our curated selection of new and used air conditioning units with competitive pricing and quality assurance.
              </p>
              <div className="w-20 h-1 bg-brand-blue mx-auto mt-6"></div>
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
            
            <div className="mt-12 text-center">
              <Button 
                className="bg-gray-900 hover:bg-gray-800 text-white group"
                onClick={() => onOpenGallery(acUnitsForSale[0])}
              >
                View More Options
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="wanted">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                AC <span className="text-brand-blue">Buying Requests</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                These are the current requests from people looking to buy AC units. If you have something that matches, contact us.
              </p>
              <div className="w-20 h-1 bg-brand-blue mx-auto mt-6"></div>
              <Button 
                className="mt-6 bg-brand-blue hover:bg-brand-blue/80 text-white shadow-lg"
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
