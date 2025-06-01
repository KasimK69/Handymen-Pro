
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, MessageCircle, ShoppingCart, Star, MapPin, Calendar } from 'lucide-react';
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
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white hover:scale-[1.02] cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden" onClick={onImageClick}>
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.condition === 'new' && (
            <Badge className="bg-green-500 text-white font-semibold px-3 py-1 text-xs">
              NEW
            </Badge>
          )}
          <Badge className="bg-[#2D3559] text-white font-semibold px-3 py-1 text-xs">
            {product.brand}
          </Badge>
        </div>

        {product.discounted && product.discountPercentage && (
          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-[#FF467E] to-[#8843F2] text-white font-bold px-3 py-2 text-sm">
            {product.discountPercentage}% OFF
          </Badge>
        )}

        {/* View Details Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
            <Eye className="h-8 w-8 text-[#2D3559]" />
          </div>
        </div>

        {/* Image Count Indicator */}
        {product.images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            +{product.images.length - 1} more
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-[#2D3559] line-clamp-2 group-hover:text-[#8843F2] transition-colors duration-300">
            {product.name}
          </h3>
          
          {/* Price Section */}
          <div className="mb-4">
            {product.originalPrice && product.originalPrice > product.price ? (
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-[#FF467E]">
                  {formatPrice(product.price)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-[#2D3559]">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-600">{product.rating}</span>
            </div>
          )}

          {/* Key Features */}
          <div className="space-y-2 mb-4">
            {product.features.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-gradient-to-r from-[#8843F2] to-[#FF467E] rounded-full mr-3 flex-shrink-0"></div>
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
            {product.features.length > 3 && (
              <div className="text-xs text-[#8843F2] font-medium">
                +{product.features.length - 3} more features
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4 border-t pt-3">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>Islamabad</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>2 days ago</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleBuyNow}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Buy Now
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-2 border-[#8843F2] text-[#8843F2] hover:bg-gradient-to-r hover:from-[#8843F2] hover:to-[#FF467E] hover:text-white hover:border-transparent py-3 text-base font-bold transition-all duration-300"
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
