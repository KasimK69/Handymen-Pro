
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowRight, AirVent, Zap, Star, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ACProduct {
  id: string;
  name: string;
  brand: string;
  capacity: string;
  price: number;
  images: string[];
  energyRating: string;
  features: string[];
  description: string;
  model: string;
}

const acProducts: ACProduct[] = [
  {
    id: '1',
    name: 'Ultra Cool Inverter AC',
    brand: 'Samsung',
    capacity: '1.5 Ton',
    price: 135000,
    images: [
      'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    energyRating: '5 Star',
    features: ['WiFi Control', 'Energy Efficient', 'Fast Cooling', '5 Year Warranty'],
    description: 'Energy-efficient inverter AC with smart WiFi control and fast cooling technology. Perfect for medium-sized rooms.',
    model: 'AR18TYHYC'
  },
  {
    id: '2',
    name: 'Eco Plus Window AC',
    brand: 'LG',
    capacity: '1 Ton',
    price: 95000,
    images: [
      'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    energyRating: '4 Star',
    features: ['Window Type', 'Energy Efficient', 'Easy Installation', '3 Year Warranty'],
    description: 'Affordable window AC with good cooling performance and energy efficiency for small to medium rooms.',
    model: 'LW8017ERSM'
  },
  {
    id: '3',
    name: 'Smart Cool Split AC',
    brand: 'Daikin',
    capacity: '2 Ton',
    price: 180000,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    energyRating: '5 Star',
    features: ['Voice Control', 'AI Thermostat', 'Ultra Silent', '7 Year Warranty'],
    description: 'Premium split AC with advanced AI features and voice control. Ideal for large rooms and offices.',
    model: 'FTKP60PRV16'
  },
  {
    id: '4',
    name: 'Budget Cool Window AC',
    brand: 'Haier',
    capacity: '1 Ton',
    price: 75000,
    images: [
      'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    energyRating: '3 Star',
    features: ['Basic Cooling', 'Affordable Price', 'Compact Design', '2 Year Warranty'],
    description: 'Budget-friendly AC option with reliable cooling performance for small rooms.',
    model: 'HW-12CH5CNA'
  }
];

const PremiumACCollection = () => {
  const [selectedProduct, setSelectedProduct] = useState<ACProduct | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: number) => `PKR ${price.toLocaleString()}`;

  const handleNextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => 
        prev === selectedProduct.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      );
    }
  };

  const handleProductClick = (product: ACProduct) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-[#8843F2]/10 to-[#FF467E]/10 rounded-full">
              <AirVent className="h-12 w-12 text-[#8843F2]" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Inter']">
            Premium <span className="bg-gradient-to-r from-[#8843F2] to-[#FF467E] bg-clip-text text-transparent">AC Collection</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our curated selection of high-quality air conditioners from top brands. 
            Find the perfect cooling solution for your space.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#8843F2] to-[#FF467E] mx-auto mt-8"></div>
        </motion.div>

        {/* AC Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {acProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card 
                className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white hover:scale-105 cursor-pointer overflow-hidden"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-[#8843F2] to-[#FF467E] text-white">
                    {product.brand}
                  </Badge>
                  <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                    <div className="flex items-center text-xs font-medium text-[#2D3559]">
                      <Zap className="h-3 w-3 mr-1" />
                      {product.energyRating}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-[#2D3559] line-clamp-2 font-['Inter']">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {product.capacity} • {product.model}
                  </p>
                  <p className="text-2xl font-bold text-[#8843F2] mb-4">
                    {formatPrice(product.price)}
                  </p>
                  <div className="space-y-2">
                    {product.features.slice(0, 2).map((feature, idx) => (
                      <div key={idx} className="text-sm text-gray-600 flex items-center">
                        <div className="w-2 h-2 bg-[#4CC9F0] rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View Complete Collection Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button 
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#2D3559] to-[#4CC9F0] hover:from-[#1F2347] hover:to-[#2BB5E8] text-white px-8 py-4 text-lg font-semibold shadow-lg group font-['Inter']"
          >
            <Link to="/ac-buy-and-sale">
              View Complete AC Collection
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-[#2D3559] font-['Inter']">
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={selectedProduct.images[currentImageIndex]} 
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    {selectedProduct.images.length > 1 && (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                          onClick={handlePrevImage}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                          onClick={handleNextImage}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                  
                  {/* Image Thumbnails */}
                  {selectedProduct.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {selectedProduct.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${selectedProduct.name} ${index + 1}`}
                          className={`w-16 h-16 rounded-lg object-cover cursor-pointer transition-all ${
                            index === currentImageIndex 
                              ? 'ring-2 ring-[#8843F2]' 
                              : 'opacity-70 hover:opacity-100'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <Badge className="bg-gradient-to-r from-[#8843F2] to-[#FF467E] text-white">
                        {selectedProduct.brand}
                      </Badge>
                      <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        <Zap className="h-4 w-4 mr-1" />
                        {selectedProduct.energyRating}
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-[#8843F2] mb-2">
                      {formatPrice(selectedProduct.price)}
                    </h3>
                    <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-[#2D3559] font-['Inter']">Specifications</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Capacity:</span>
                        <p className="text-gray-600">{selectedProduct.capacity}</p>
                      </div>
                      <div>
                        <span className="font-medium">Model:</span>
                        <p className="text-gray-600">{selectedProduct.model}</p>
                      </div>
                      <div>
                        <span className="font-medium">Energy Rating:</span>
                        <p className="text-gray-600">{selectedProduct.energyRating}</p>
                      </div>
                      <div>
                        <span className="font-medium">Brand:</span>
                        <p className="text-gray-600">{selectedProduct.brand}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-[#2D3559] font-['Inter']">Key Features</h4>
                    <div className="space-y-2">
                      {selectedProduct.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-[#4CC9F0] rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button 
                      asChild
                      className="w-full bg-gradient-to-r from-[#8843F2] to-[#FF467E] hover:from-[#7335E8] hover:to-[#F03A6E] text-white py-3 text-lg font-semibold shadow-lg font-['Inter']"
                    >
                      <Link to="/ac-buy-and-sale">
                        Go to AC Buy & Sell Page
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};

export default PremiumACCollection;
