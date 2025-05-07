
import React from 'react';
import { Star, BadgeCheck, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
          <div className="absolute top-4 right-4 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            {product.discountPercentage}% OFF
          </div>
        )}
        
        <div 
          className="h-56 overflow-hidden cursor-pointer" 
          onClick={onImageClick}
        >
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center mb-2 gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-sm text-gray-600">{product.rating}</span>
          
          <span className="ml-auto text-sm px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {product.condition === 'new' ? 'New' : 'Used'}
          </span>
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
            <div className="text-sm text-gray-600 dark:text-gray-400 pl-6">
              +{product.features.length - 3} more features
            </div>
          )}
        </div>
        
        <Button className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center" onClick={onWhatsAppContact}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Contact on WhatsApp
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
