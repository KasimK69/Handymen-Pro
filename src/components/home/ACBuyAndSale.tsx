
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Eye, MessageSquare, ArrowRight, AirVent, ShoppingCart, Zap, Clock } from 'lucide-react';
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
  views?: number;
}

const ACBuyAndSale = () => {
  const { products, loading, error } = useACProducts();

  // Convert products to featured ACs format
  const featuredACs: ACUnit[] = products
    .filter(product => product.category === 'sale' && (product.featured || false))
    .slice(0, 6)
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
      energyRating: product.energy_rating || '5 Star',
      views: product.views || 0
    }));

  const formatPrice = (price: number) => `PKR ${price.toLocaleString()}`;

  const handleWhatsAppInquiry = (ac: ACUnit) => {
    const message = `Hi! I'm interested in buying this AC from your website:

🔸 Model: ${ac.name} (${ac.brand})
🔸 Tonnage: ${ac.tonnage}
🔸 Price: ${formatPrice(ac.price)}
🔸 Condition: ${ac.condition === 'new' ? 'Brand New' : 'Used'}
🔸 Energy Rating: ${ac.energyRating}

Key Features:
${ac.features.map(feature => `• ${feature}`).join('\n')}

Please provide more details about:
1. Availability and delivery
2. Installation service
3. Warranty information
4. Payment options

Thank you!`;
    
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div 
              className="flex items-center justify-center mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <AirVent className="h-12 w-12 text-blue-600" />
            </motion.div>
            <p className="text-lg text-gray-600">Loading featured ACs...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load AC Products</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button asChild className="rounded-2xl">
              <Link to="/ac-buy-and-sale">
                Browse AC Collection
              </Link>
            </Button>
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
        <motion.div 
          className="absolute bottom-20 right-10"
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <AirVent className="h-24 w-24 text-purple-600" />
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
              className="p-6 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full shadow-2xl"
            >
              <AirVent className="h-12 w-12 text-white" />
            </motion.div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">AC Marketplace</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
            Discover our curated collection of premium air conditioners. From brand new energy-efficient models to well-maintained used units, find the perfect AC for your space with verified quality and competitive pricing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 text-white shadow-2xl group rounded-3xl px-12 py-6 text-lg font-bold transform hover:scale-105 transition-all duration-300">
              <Link to="/ac-buy-and-sale">
                <Eye className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Browse All ACs
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-3 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white group rounded-3xl px-12 py-6 text-lg font-bold transform hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <Link to="/contact">
                <MessageSquare className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Sell Your AC
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Featured AC Cards */}
        {featuredACs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredACs.map((ac, index) => (
              <motion.div
                key={ac.id}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.2 * index,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -15, scale: 1.03 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-xl hover:shadow-3xl transition-all duration-700 bg-white/90 backdrop-blur-sm rounded-3xl">
                  <div className="relative overflow-hidden h-56">
                    <img 
                      src={ac.image} 
                      alt={ac.name}
                      className="w-full h-full object-cover group-hover:scale-120 transition-transform duration-1000"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {ac.discount && (
                        <Badge className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-sm px-3 py-1 rounded-full shadow-lg">
                          {ac.discount}% OFF
                        </Badge>
                      )}
                      <Badge className={`font-bold text-sm px-3 py-1 rounded-full shadow-lg ${
                        ac.condition === 'new' 
                          ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white' 
                          : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
                      }`}>
                        {ac.condition === 'new' ? '✨ Brand New' : '🔄 Used'}
                      </Badge>
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-white/95 text-blue-700 border-blue-200 font-bold backdrop-blur-sm">
                        {ac.brand}
                      </Badge>
                    </div>

                    {/* Views Counter */}
                    {ac.views !== undefined && ac.views > 0 && (
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="outline" className="bg-black/80 text-white border-white/30 font-medium backdrop-blur-sm">
                          <Eye className="h-3 w-3 mr-1" />
                          {ac.views} views
                        </Badge>
                      </div>
                    )}

                    {/* Quick Action Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <Button 
                        className="bg-white/20 backdrop-blur-md text-white border-2 border-white/40 hover:bg-white/30 hover:border-white/60 rounded-2xl px-6 py-3 font-bold transform hover:scale-105 transition-all duration-300"
                        onClick={() => handleWhatsAppInquiry(ac)}
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Buy Now
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                        {ac.name}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center mb-4">
                        <div className="flex mr-3">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-5 w-5 ${i < Math.floor(ac.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-600">{ac.rating}</span>
                        <span className="text-xs text-gray-500 ml-2">(150+ reviews)</span>
                      </div>

                      {/* Specifications */}
                      <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                        <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                          <Zap className="h-4 w-4 mr-1 text-green-600" />
                          <span className="font-medium">{ac.energyRating}</span>
                        </div>
                        <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                          <AirVent className="h-4 w-4 mr-1 text-blue-600" />
                          <span className="font-medium">{ac.tonnage}</span>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="mb-4">
                        {ac.originalPrice ? (
                          <div className="flex items-center gap-3">
                            <span className="text-3xl font-bold text-blue-600">{formatPrice(ac.price)}</span>
                            <span className="text-lg text-gray-500 line-through">{formatPrice(ac.originalPrice)}</span>
                          </div>
                        ) : (
                          <span className="text-3xl font-bold text-blue-600">{formatPrice(ac.price)}</span>
                        )}
                        <p className="text-sm text-gray-500 mt-1">Including delivery & installation</p>
                      </div>
                      
                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {ac.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="text-sm text-gray-600 flex items-center">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-3"></div>
                            {feature}
                          </div>
                        ))}
                        {ac.features.length > 3 && (
                          <div className="text-sm text-blue-600 font-medium">
                            +{ac.features.length - 3} more features
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white group rounded-2xl py-4 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        onClick={() => handleWhatsAppInquiry(ac)}
                      >
                        <ShoppingCart className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                        Buy This AC
                        <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white group rounded-2xl py-3 font-semibold transition-all duration-300"
                        asChild
                      >
                        <Link to={`/ac-buy-and-sale?ac=${ac.id}`}>
                          <MessageSquare className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-8xl mb-6">🏠</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No Featured AC Products Yet</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're working on adding amazing AC products to our collection. Check back soon or browse our complete inventory!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="rounded-3xl px-8 py-4 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600">
                <Link to="/ac-buy-and-sale">
                  View All Products
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-3xl px-8 py-4 text-lg font-bold border-2">
                <Link to="/contact">
                  List Your AC
                </Link>
              </Button>
            </div>
          </motion.div>
        )}

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden shadow-2xl">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
            <motion.div 
              className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: 360 
              }}
              transition={{ 
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 25, repeat: Infinity, ease: "linear" }
              }}
            />
            <motion.div 
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: -360 
              }}
              transition={{ 
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 30, repeat: Infinity, ease: "linear" }
              }}
            />
            
            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Find Your Perfect AC?
              </h3>
              <p className="text-xl md:text-2xl mb-10 opacity-95 max-w-3xl mx-auto leading-relaxed">
                Explore our complete collection of premium air conditioners with detailed specifications, expert reviews, competitive prices, and guaranteed quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 font-bold text-xl px-12 py-6 group rounded-3xl transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  <Link to="/ac-buy-and-sale">
                    <Eye className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                    Explore AC Collection
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline"
                  size="lg" 
                  className="border-3 border-white text-white hover:bg-white hover:text-blue-600 font-bold text-xl px-12 py-6 group rounded-3xl transform hover:scale-105 transition-all duration-300"
                >
                  <Link to="/contact">
                    <MessageSquare className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                    Get Expert Advice
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ACBuyAndSale;
