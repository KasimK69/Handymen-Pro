
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, ArrowRight, Zap, Wind, Snowflake } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ACProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  original_price: number | null;
  condition: string;
  tonnage: string | null;
  energy_rating: string | null;
  images: string[];
  features: string[] | null;
  location: string | null;
  status: string;
  featured: boolean;
  created_at: string;
}

const PremiumACCollection = () => {
  const [products, setProducts] = useState<ACProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      console.log('🔄 Fetching featured AC products...');
      setLoading(true);
      
      const { data, error } = await supabase
        .from('ac_products')
        .select('*')
        .eq('status', 'active')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('❌ Error fetching products:', error);
        throw error;
      }

      console.log('✅ Featured products fetched:', data?.length || 0);
      setProducts(data || []);
    } catch (error) {
      console.error('❌ Error in fetchFeaturedProducts:', error);
      // Fallback to mock data
      const mockProducts: ACProduct[] = [
        {
          id: '1',
          name: 'Haier HSU-18HNF',
          brand: 'Haier',
          price: 85000,
          original_price: 95000,
          condition: 'new',
          tonnage: '1.5 Ton',
          energy_rating: '3 Star',
          images: ['https://images.unsplash.com/photo-1631545806609-3c97db6df3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
          features: ['Inverter Technology', 'Copper Coil', 'Fast Cooling'],
          location: 'Islamabad',
          status: 'active',
          featured: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Gree GS-24CT',
          brand: 'Gree',
          price: 75000,
          original_price: null,
          condition: 'used',
          tonnage: '2 Ton',
          energy_rating: '2 Star',
          images: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
          features: ['Rotary Compressor', 'R410A Gas', 'Auto Clean'],
          location: 'Rawalpindi',
          status: 'active',
          featured: true,
          created_at: new Date().toISOString()
        }
      ];
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscount = (price: number, originalPrice: number | null) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading premium AC collection...</p>
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
            Discover top-quality air conditioners from trusted brands, perfect for Pakistan's climate
          </p>
        </motion.div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {products.map((product, index) => (
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
                <div className="aspect-video relative overflow-hidden rounded-t-3xl">
                  <img 
                    src={product.images[0] || 'https://images.unsplash.com/photo-1631545806609-3c97db6df3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Discount Badge */}
                  {product.original_price && product.original_price > product.price && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 text-sm font-bold">
                        {calculateDiscount(product.price, product.original_price)}% OFF
                      </Badge>
                    </div>
                  )}
                  
                  {/* Condition Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className={`px-3 py-1 text-sm font-semibold ${
                      product.condition === 'new' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    }`}>
                      {product.condition === 'new' ? 'New' : 'Used'}
                    </Badge>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Brand & Model */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="border-blue-200 text-blue-700 font-semibold">
                      {product.brand}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* Specifications */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    {product.tonnage && (
                      <div className="flex items-center gap-2">
                        <Wind className="h-4 w-4 text-blue-500" />
                        <span className="text-gray-600">{product.tonnage}</span>
                      </div>
                    )}
                    {product.energy_rating && (
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-green-500" />
                        <span className="text-gray-600">{product.energy_rating}</span>
                      </div>
                    )}
                    {product.location && (
                      <div className="flex items-center gap-2">
                        <Snowflake className="h-4 w-4 text-cyan-500" />
                        <span className="text-gray-600">{product.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.features.slice(0, 2).map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                          {feature}
                        </Badge>
                      ))}
                      {product.features.length > 2 && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                          +{product.features.length - 2} more
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        PKR {product.price.toLocaleString()}
                      </div>
                      {product.original_price && product.original_price > product.price && (
                        <div className="text-sm text-gray-500 line-through">
                          PKR {product.original_price.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link to="/ac-buy-and-sale" className="w-full">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">❄️</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No Featured Products</h3>
            <p className="text-xl text-gray-600 mb-8">
              Featured AC products will appear here once added from the admin panel.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link to="/ac-buy-and-sale">
            <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 text-white font-bold text-lg px-12 py-4 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl">
              <ShoppingCart className="mr-3 h-6 w-6" />
              View All AC Products
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumACCollection;
