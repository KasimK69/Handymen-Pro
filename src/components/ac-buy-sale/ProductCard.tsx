
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, MessageCircle, Calendar } from 'lucide-react';
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
  const handleBookInstallation = () => {
    window.location.href = '/booking';
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-lg">
      <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={onImageClick}>
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {product.condition === 'new' && (
          <Badge className="absolute top-3 left-3 bg-green-500 text-white">
            New
          </Badge>
        )}
        <Badge className="absolute top-3 right-3 bg-brand-blue text-white">
          {product.brand}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
            {product.name}
          </h3>
          <p className="text-2xl font-bold text-brand-blue mb-2">
            {formatPrice(product.price)}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>
        
        <div className="space-y-2">
          <Button 
            className="w-full bg-brand-red hover:bg-brand-red/90 text-white"
            onClick={handleBookInstallation}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Book AC Installation
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
            onClick={onWhatsAppContact}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Request Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
