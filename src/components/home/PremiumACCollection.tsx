
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart, Eye, Zap, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useACProducts } from '@/hooks/useACProducts';

const PremiumACCollection = () => {
  const { products, loading, error } = useACProducts();

  // Filter for featured products or take first 6
  const featuredProducts = products
    .filter(product => product.featured)
    .slice(0, 6);
  
  // If no featured products, take first 6 products
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 6);

  const formatPrice = (price: number): string => {
    return `PKR ${price.toLocaleString()}`;
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">AC Collection</span>
            </h2>
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">AC Collection</span>
            </h2>
            <p className="text-red-600">Failed to load AC products. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">AC Collection</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our curated selection of premium air conditioners, perfect for Pakistan's climate
          </p>
        </motion.div>

        {displayProducts.length === 0 ? (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-8xl mb-6">❄️</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No AC Products Available</h3>
            <p className="text-xl text-gray-600 mb-8">
              Check back soon for our latest premium AC collection
            </p>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl">
              <Link to="/contact">Contact Us for AC Options</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Product Image */}
                <div className="aspect-video overflow-hidden relative">
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <Wind className="h-16 w-16 text-blue-600" />
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.featured && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {product.condition === 'new' && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold">
                        New
                      </Badge>
                    )}
                    {product.discounted && product.discountPercentage && (
                      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold">
                        {product.discountPercentage}% OFF
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="icon" variant="outline" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="border-blue-200 text-blue-700">
                      {product.brand}
                    </Badge>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Specifications */}
                  <div className="flex gap-4 mb-4 text-sm text-gray-500">
                    {product.specifications?.tonnage && (
                      <div className="flex items-center gap-1">
                        <Zap className="h-4 w-4" />
                        {product.specifications.tonnage}
                      </div>
                    )}
                    {product.specifications?.energyRating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {product.specifications.energyRating}
                      </div>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-lg text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button asChild className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl">
                      <Link to="/ac-buy-and-sale">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg rounded-2xl transform hover:scale-105 transition-all duration-300">
            <Link to="/ac-buy-and-sale">
              Explore All AC Products
              <Wind className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumACCollection;
