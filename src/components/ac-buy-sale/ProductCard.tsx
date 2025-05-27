
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, MessageCircle, ShoppingCart, Star } from 'lucide-react';
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
  const handleBuyNow = () => {
    const message = `I want to buy: ${product.name}
Brand: ${product.brand}
Price: ${formatPrice(product.price)}
Features: ${product.features.join(', ')}

Please confirm availability and arrange delivery.`;
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg bg-white dark:bg-gray-800 hover:scale-105">
      <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={onImageClick}>
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <Eye className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {product.condition === 'new' && (
          <Badge className="absolute top-4 left-4 bg-green-500 text-white text-lg px-3 py-2">
            New
          </Badge>
        )}
        <Badge className="absolute top-4 right-4 bg-brand-blue text-white text-lg px-3 py-2">
          {product.brand}
        </Badge>
        {product.discounted && product.discountPercentage && (
          <Badge className="absolute bottom-4 left-4 bg-red-500 text-white text-lg px-3 py-2">
            {product.discountPercentage}% OFF
          </Badge>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2">
            {product.name}
          </h3>
          {product.rating && (
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="ml-2 text-sm font-semibold text-gray-600 dark:text-gray-400">{product.rating}</span>
            </div>
          )}
          <p className="text-3xl font-bold text-brand-blue mb-3">
            {formatPrice(product.price)}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
            {product.description}
          </p>
          <div className="space-y-1">
            {product.features.slice(0, 2).map((feature, idx) => (
              <div key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                <div className="w-2 h-2 bg-brand-blue rounded-full mr-2"></div>
                {feature}
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 text-lg font-bold shadow-lg"
            onClick={handleBuyNow}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Buy Now
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white py-3 text-lg font-bold"
            onClick={onWhatsAppContact}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Request Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
