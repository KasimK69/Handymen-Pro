
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Star, Zap, Snowflake, Wind, ShoppingCart, Wrench, MapPin, Calendar, Eye } from 'lucide-react';

interface ACProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  original_price?: number;
  images: string[];
  condition: string;
  tonnage?: string;
  energy_rating?: string;
  features: string[];
  category: string;
  status: string;
  views: number;
  featured: boolean;
  location?: string;
  description?: string;
  contact_info?: string;
  created_at: string;
}

interface ProductDetailModalProps {
  product: ACProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleBuyNow = () => {
    const message = `I want to buy: ${product.name}
Brand: ${product.brand}
Price: ${formatPrice(product.price)}
Features: ${product.features.join(', ')}

Please confirm availability and arrange delivery.`;
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInstallationService = () => {
    const message = `I need AC installation service for: ${product.name}
Brand: ${product.brand}
Location: Please visit for installation
Additional Requirements: Professional installation with warranty

Please provide installation charges and schedule.`;
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Header */}
              <DialogHeader className="p-6 pb-0">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl font-bold text-gray-900">
                    {product.name}
                  </DialogTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="rounded-full hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-h-[80vh] overflow-y-auto">
                {/* Image Gallery */}
                <div className="space-y-4">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                    <img
                      src={product.images[currentImageIndex] || product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {product.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              index === currentImageIndex ? 'bg-blue-600' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                          Featured
                        </Badge>
                      )}
                      <Badge variant="secondary" className="bg-white/90 text-gray-800">
                        {product.condition}
                      </Badge>
                    </div>
                  </div>

                  {/* Thumbnail Gallery */}
                  {product.images.length > 1 && (
                    <div className="flex space-x-2 overflow-x-auto">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                            index === currentImageIndex ? 'border-blue-600' : 'border-gray-200'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  {/* Brand and Rating */}
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-600 text-white px-4 py-2 text-lg">
                      {product.brand}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="font-semibold">4.8</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold text-blue-600">
                        {formatPrice(product.price)}
                      </span>
                      {product.original_price && product.original_price > product.price && (
                        <>
                          <span className="text-xl text-gray-500 line-through">
                            {formatPrice(product.original_price)}
                          </span>
                          <Badge className="bg-red-500 text-white">
                            -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="grid grid-cols-3 gap-4">
                    {product.tonnage && (
                      <div className="text-center p-3 bg-gray-50 rounded-xl">
                        <Snowflake className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                        <div className="text-sm font-medium">{product.tonnage}</div>
                        <div className="text-xs text-gray-500">Tonnage</div>
                      </div>
                    )}
                    {product.energy_rating && (
                      <div className="text-center p-3 bg-gray-50 rounded-xl">
                        <Zap className="h-6 w-6 mx-auto mb-2 text-green-600" />
                        <div className="text-sm font-medium">{product.energy_rating}</div>
                        <div className="text-xs text-gray-500">Energy Rating</div>
                      </div>
                    )}
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <Wind className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                      <div className="text-sm font-medium">Smart</div>
                      <div className="text-xs text-gray-500">Technology</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Features</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-3 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  {product.description && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-lg">Description</h4>
                      <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    </div>
                  )}

                  {/* Additional Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{product.location || 'Islamabad'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{product.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(product.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <Button 
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={handleBuyNow}
                    >
                      <ShoppingCart className="mr-3 h-5 w-5" />
                      Buy Now - {formatPrice(product.price)}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-2 border-blue-600 text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent py-4 text-lg font-bold transition-all duration-300"
                      onClick={handleInstallationService}
                    >
                      <Wrench className="mr-3 h-5 w-5" />
                      Request AC Installation
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailModal;
