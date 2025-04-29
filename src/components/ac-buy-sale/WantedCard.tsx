
import React from 'react';
import { BadgeCheck, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ACUnit } from '@/types/acUnit';

interface WantedCardProps {
  request: ACUnit;
  formatPrice: (price: number) => string;
}

const WantedCard: React.FC<WantedCardProps> = ({ request, formatPrice }) => {
  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="h-40 bg-gradient-to-r from-blue-500 to-blue-600 p-6 flex items-center justify-center relative">
        <div className="absolute top-4 left-4 bg-white text-brand-blue text-xs font-bold px-3 py-1 rounded-full">
          Wanted
        </div>
        <div className="text-white text-center">
          <h3 className="text-xl font-bold">{request.name}</h3>
          <p className="text-white/80 mt-2">{formatPrice(request.price)}</p>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="space-y-2 mb-4">
          {request.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <BadgeCheck className="w-4 h-4 text-brand-blue mt-1 mr-2 shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
            </div>
          ))}
        </div>
        
        <Button className="w-full bg-brand-blue hover:bg-brand-blue/90">
          <Phone className="mr-2 h-4 w-4" />
          Contact Buyer
        </Button>
      </CardContent>
    </Card>
  );
};

export default WantedCard;
