
import React from 'react';
import { BadgeCheck, MessageSquare, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ACUnit } from '@/types/acUnit';

interface ProductCardProps {
  product: ACUnit;
  onImageClick: () => void;
  onWhatsAppContact: () => void;
  formatPrice: (price: number) => string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onImageClick,
  onWhatsAppContact,
  formatPrice
}) => {
  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="relative">
        {product.discounted && (
          <Badge className="absolute top-4 right-4 z-10 bg-brand-red hover:bg-brand-red">
            {product.discountPercentage}% OFF
          </Badge>
        )}
        
        <AspectRatio ratio={4/3} className="overflow-hidden cursor-pointer">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onClick={onImageClick}
          />
        </AspectRatio>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-2 gap-2">
          <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700">
            {product.condition === 'new' ? 'New' : 'Used'}
          </Badge>
          
          <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700">
            {product.brand}
          </Badge>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        
        <div className="mb-4">
          <span className="text-2xl font-bold text-brand-blue">
            {product.discounted 
              ? formatPrice(product.price * (1 - (product.discountPercentage || 0) / 100))
              : formatPrice(product.price)}
          </span>
          {product.discounted && (
            <span className="text-lg text-gray-500 line-through ml-2">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        
        <div className="space-y-2 mb-4">
          {product.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-start">
              <BadgeCheck className="w-4 h-4 text-brand-blue mt-1 mr-2 shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
            </div>
          ))}
          {product.features.length > 3 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm text-brand-blue hover:text-brand-blue pl-0 flex items-center" 
              onClick={onImageClick}
            >
              <Info className="h-4 w-4 mr-1" />
              +{product.features.length - 3} more features
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button 
            className="w-full bg-brand-blue hover:bg-brand-blue/90" 
            onClick={onImageClick}
          >
            View Details
          </Button>
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center" 
            onClick={onWhatsAppContact}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Us
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
