
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowRight, Star, Eye, MessageCircle, ShoppingCart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { acUnitsForSale } from '@/data/acUnits';
import { ACUnit } from '@/types/acUnit';

const PremiumACCollection = () => {
  const navigate = useNavigate();
  const [selectedAC, setSelectedAC] = useState<ACUnit | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Show first 6 AC units for homepage
  const featuredACs = acUnitsForSale.slice(0, 6);

  const formatPrice = (price: number) => `PKR ${price.toLocaleString()}`;

  const handleACClick = (ac: ACUnit) => {
    setSelectedAC(ac);
    setCurrentImageIndex(0);
  };

  const handleCloseModal = () => {
    setSelectedAC(null);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    if (selectedAC && selectedAC.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === selectedAC.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedAC && selectedAC.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedAC.images.length - 1 : prev - 1
      );
    }
  };

  const handleWhatsAppContact = () => {
    if (!selectedAC) return;
    
    const message = `Hello! I'm interested in this AC from your website:

AC Model: ${selectedAC.name}
Brand: ${selectedAC.brand}
Price: ${formatPrice(selectedAC.price)}

Please provide more details about availability and installation. Thank you!`;
    
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleBuyNow = () => {
    if (!selectedAC) return;
    
    const message = `I want to buy this AC:

AC Model: ${selectedAC.name}
Brand: ${selectedAC.brand}
Price: ${formatPrice(selectedAC.price)}
Features: ${selectedAC.features.slice(0, 3).join(', ')}

Please confirm availability and arrange delivery. Thank you!`;
    
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2D3559] font-['Inter']">
            Premium AC <span className="bg-gradient-to-r from-[#8843F2] to-[#FF467E] bg-clip-text text-transparent">Collection</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our curated selection of top-quality air conditioning units with competitive pricing and professional installation services.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#8843F2] to-[#FF467E] mx-auto mt-8"></div>
        </motion.div>

        {/* AC Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredACs.map((ac, index) => (
            <motion.div
              key={ac.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-lg hover:scale-105"
                onClick={() => handleACClick(ac)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={ac.images[0]} 
                    alt={ac.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {ac.condition === 'new' && (
                      <Badge className="bg-green-500 text-white font-semibold">
                        NEW
                      </Badge>
                    )}
                    <Badge className="bg-[#2D3559] text-white font-semibold">
                      {ac.brand}
                    </Badge>
                  </div>

                  {ac.discounted && ac.discountPercentage && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-[#FF467E] to-[#8843F2] text-white font-bold">
                      {ac.discountPercentage}% OFF
                    </Badge>
                  )}

                  {/* View Details Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                      <Eye className="h-8 w-8 text-[#2D3559]" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#2D3559] group-hover:text-[#8843F2] transition-colors duration-300">
                    {ac.name}
                  </h3>
                  
                  {/* Price */}
                  <div className="mb-4">
                    {ac.originalPrice && ac.originalPrice > ac.price ? (
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-[#FF467E]">
                          {formatPrice(ac.price)}
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          {formatPrice(ac.originalPrice)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-[#2D3559]">
                        {formatPrice(ac.price)}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  {ac.rating && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(ac.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{ac.rating}</span>
                    </div>
                  )}

                  {/* Key Features */}
                  <div className="space-y-1">
                    {ac.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-gradient-to-r from-[#8843F2] to-[#FF467E] rounded-full mr-3 flex-shrink-0"></div>
                        <span className="line-clamp-1">{feature}</span>
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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button 
            onClick={() => navigate('/ac-buy-and-sale')}
            size="lg"
            className="bg-gradient-to-r from-[#2D3559] to-[#4CC9F0] hover:from-[#1e2442] hover:to-[#3ab5d9] text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            View Complete AC Collection
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        {/* AC Details Modal */}
        <Dialog open={!!selectedAC} onOpenChange={handleCloseModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
            {selectedAC && (
              <div className="relative">
                <DialogHeader className="p-6 pb-0">
                  <DialogTitle className="text-2xl font-bold text-[#2D3559]">
                    {selectedAC.name}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {/* Image Gallery */}
                  <div className="space-y-4">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <img 
                        src={selectedAC.images[currentImageIndex] || selectedAC.images[0]} 
                        alt={selectedAC.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {selectedAC.images.length > 1 && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                            onClick={handlePrevImage}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                            onClick={handleNextImage}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {currentImageIndex + 1} / {selectedAC.images.length}
                      </div>
                    </div>
                    
                    {/* Thumbnail Navigation */}
                    {selectedAC.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {selectedAC.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`aspect-square rounded overflow-hidden border-2 ${
                              currentImageIndex === index ? 'border-[#8843F2]' : 'border-gray-200'
                            }`}
                          >
                            <img 
                              src={image} 
                              alt={`${selectedAC.name} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="space-y-6">
                    {/* Price and Rating */}
                    <div>
                      {selectedAC.originalPrice && selectedAC.originalPrice > selectedAC.price ? (
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl font-bold text-[#FF467E]">
                            {formatPrice(selectedAC.price)}
                          </span>
                          <span className="text-xl text-gray-500 line-through">
                            {formatPrice(selectedAC.originalPrice)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-3xl font-bold text-[#2D3559] block mb-2">
                          {formatPrice(selectedAC.price)}
                        </span>
                      )}
                      
                      {selectedAC.rating && (
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-5 w-5 ${i < Math.floor(selectedAC.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-lg font-semibold text-gray-600">{selectedAC.rating}</span>
                        </div>
                      )}
                    </div>

                    {/* Badges */}
                    <div className="flex gap-2">
                      <Badge className="bg-[#2D3559] text-white">{selectedAC.brand}</Badge>
                      {selectedAC.condition === 'new' && (
                        <Badge className="bg-green-500 text-white">NEW</Badge>
                      )}
                      {selectedAC.discounted && (
                        <Badge className="bg-gradient-to-r from-[#FF467E] to-[#8843F2] text-white">
                          {selectedAC.discountPercentage}% OFF
                        </Badge>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-[#2D3559]">Description</h4>
                      <p className="text-gray-600 leading-relaxed">{selectedAC.description}</p>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-lg mb-3 text-[#2D3559]">Key Features</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedAC.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-gray-600">
                            <div className="w-2 h-2 bg-gradient-to-r from-[#8843F2] to-[#FF467E] rounded-full mr-3 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4 pt-4">
                      <Button 
                        onClick={handleBuyNow}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 text-lg font-bold"
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Buy Now
                      </Button>
                      
                      <Button 
                        onClick={handleWhatsAppContact}
                        variant="outline"
                        className="w-full border-2 border-[#8843F2] text-[#8843F2] hover:bg-gradient-to-r hover:from-[#8843F2] hover:to-[#FF467E] hover:text-white hover:border-transparent py-3 text-lg font-bold"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Contact via WhatsApp
                      </Button>
                      
                      <Button 
                        onClick={() => navigate('/ac-buy-and-sale')}
                        variant="ghost"
                        className="w-full text-[#8843F2] hover:text-[#FF467E] py-3 text-lg font-bold"
                      >
                        Go to AC Buy & Sell Page
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default PremiumACCollection;
