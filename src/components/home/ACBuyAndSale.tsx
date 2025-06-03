
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Eye, MessageSquare, ArrowRight, AirVent, ShoppingCart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useACProducts } from '@/hooks/useACProducts';

interface ACUnit {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  condition: 'new' | 'used';
  features: string[];
  discount?: number;
  tonnage: string;
  energyRating: string;
}

const ACBuyAndSale = () => {
  const { products, loading } = useACProducts();

  // Convert products to featured ACs format
  const featuredACs: ACUnit[] = products
    .filter(product => product.category === 'sale' && (product.featured || false))
    .slice(0, 4)
    .map(product => ({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: Number(product.price),
      originalPrice: product.original_price ? Number(product.original_price) : undefined,
      rating: 4.8, // Default rating
      image: product.images?.[0] || 'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      condition: product.condition as 'new' | 'used',
      features: product.features?.slice(0, 4) || [],
      discount: product.original_price 
        ? Math.round(((Number(product.original_price) - Number(product.price)) / Number(product.original_price)) * 100)
        : undefined,
      tonnage: product.tonnage || '1.5 Ton',
      energyRating: product.energy_rating || '5 Star'
    }));

  const formatPrice = (price: number) => `PKR ${price.toLocaleString()}`;

  const handleWhatsAppInquiry = (ac: ACUnit) => {
    const message = `Hi! I'm interested in buying this AC:

🔸 Model: ${ac.name} (${ac.brand})
🔸 Tonnage: ${ac.tonnage}
🔸 Price: ${formatPrice(ac.price)}
🔸 Condition: ${ac.condition === 'new' ? 'Brand New' : 'Used'}
🔸 Energy Rating: ${ac.energyRating}

Key Features:
${ac.features.map(feature => `• ${feature}`).join('\n')}

Please provide more details and confirm availability. Thank you!`;
    
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading featured ACs...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-20 left-10"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <AirVent className="h-32 w-32 text-blue-600" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="p-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full shadow-xl"
            >
              <AirVent className="h-10 w-10 text-white" />
            </motion.div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">AC Buy & Sale</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover our curated collection of premium air conditioners. From brand new energy-efficient models to well-maintained used units, find the perfect AC for your space.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg group">
              <Link to="/ac-buy-and-sale">
                <Eye className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Browse All ACs
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white group">
              <Link to="/contact">
                <MessageSquare className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Sell Your AC
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Featured AC Cards */}
        {featuredACs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {featuredACs.map((ac, index) => (
              <motion.div
                key={ac.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2 * index,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={ac.image} 
                      alt={ac.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {ac.discount && (
                        <Badge className="bg-red-500 hover:bg-red-600 text-white font-semibold">
                          {ac.discount}% OFF
                        </Badge>
                      )}
                      <Badge className={`font-semibold ${ac.condition === 'new' ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'} text-white`}>
                        {ac.condition === 'new' ? 'Brand New' : 'Used'}
                      </Badge>
                    </div>
                    
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="bg-white/90 text-blue-700 border-blue-200 font-semibold">
                        {ac.brand}
                      </Badge>
                    </div>

                    {/* Quick View Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        className="bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30"
                        onClick={() => handleWhatsAppInquiry(ac)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Quick View
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {ac.name}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(ac.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-600">{ac.rating}</span>
                      </div>

                      {/* Specifications */}
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Zap className="h-3 w-3 mr-1 text-green-600" />
                          {ac.energyRating}
                        </div>
                        <div className="flex items-center">
                          <AirVent className="h-3 w-3 mr-1 text-blue-600" />
                          {ac.tonnage}
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="mb-4">
                        {ac.originalPrice ? (
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-blue-600">{formatPrice(ac.price)}</span>
                            <span className="text-sm text-gray-500 line-through">{formatPrice(ac.originalPrice)}</span>
                          </div>
                        ) : (
                          <span className="text-2xl font-bold text-blue-600">{formatPrice(ac.price)}</span>
                        )}
                      </div>
                      
                      {/* Features */}
                      <div className="space-y-1 mb-4">
                        {ac.features.slice(0, 2).map((feature, idx) => (
                          <div key={idx} className="text-xs text-gray-600 flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button 
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white group"
                        onClick={() => handleWhatsAppInquiry(ac)}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                        Buy This AC
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white group"
                        asChild
                      >
                        <Link to={`/ac-buy-and-sale?ac=${ac.id}`}>
                          <MessageSquare className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                          Get Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-4">No featured AC products available at the moment.</p>
            <Button asChild>
              <Link to="/ac-buy-and-sale">
                View All Products
              </Link>
            </Button>
          </div>
        )}

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
            <motion.div 
              className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: 360 
              }}
              transition={{ 
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
            />
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Looking for More Options?
              </h3>
              <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Explore our complete collection of premium air conditioners with detailed specifications, expert reviews, and unbeatable prices.
              </p>
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg px-8 py-3 group"
              >
                <Link to="/ac-buy-and-sale">
                  View Complete AC Collection
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ACBuyAndSale;
