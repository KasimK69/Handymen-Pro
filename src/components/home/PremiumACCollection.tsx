import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Eye, Heart, ArrowRight, Zap, Snowflake, Wind, Phone, MessageCircle, Shield, Wrench } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  updated_at: string;
}

const PremiumACCollection = () => {
  const [products, setProducts] = useState<ACProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ACProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('🔄 Fetching featured AC products from Supabase...');
      setLoading(true);
      const { data, error } = await supabase
        .from('ac_products')
        .select('*')
        .eq('status', 'active')
        .eq('category', 'sale')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('❌ Error fetching AC products:', error);
        throw error;
      }

      console.log('✅ Featured AC products fetched successfully:', data?.length || 0, 'products');
      setProducts(data || []);
    } catch (error) {
      console.error('❌ Error in fetchProducts:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (product: ACProduct) => {
    // Update view count
    try {
      await supabase
        .from('ac_products')
        .update({ views: (product.views || 0) + 1 })
        .eq('id', product.id);
    } catch (error) {
      console.error('Error updating view count:', error);
    }

    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleBuyNow = (product: ACProduct) => {
    const message = `Hello! I'm interested in purchasing this AC unit:

📱 Product: ${product.name}
🏢 Brand: ${product.brand}
💰 Price: ${formatPrice(product.price)}
❄️ Tonnage: ${product.tonnage || 'Not specified'}
⭐ Condition: ${product.condition}

Please provide me with:
- Availability status
- Installation service options
- Warranty details
- Final pricing including installation

Thank you!`;

    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallNow = () => {
    window.open('tel:+923125242182', '_self');
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getImageUrl = (images: string[]) => {
    if (!images || images.length === 0) {
      return 'https://images.unsplash.com/photo-1631545806609-3c97db6df3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    }
    return images[0];
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 font-['Inter']">
              Premium AC Collection
            </h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Modern Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div 
            className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-8 shadow-xl"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <Snowflake className="h-12 w-12 text-white" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 font-['Inter']">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AC Collection</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Discover our handpicked selection of premium air conditioners from top brands. 
            Quality guaranteed, expert installation included.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Warranty Included</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              <span>Free Installation</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>Certified Products</span>
          </div>
        </motion.div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
                whileHover={{ y: -8 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={getImageUrl(product.images)}
                      alt={product.name}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-3">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            size="sm"
                            onClick={() => toggleFavorite(product.id)}
                            className={`rounded-full ${favorites.includes(product.id) ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'} text-white border-white/20`}
                          >
                            <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button 
                            size="sm" 
                            className="rounded-full bg-white/20 hover:bg-white/30 text-white border-white/20"
                            onClick={() => handleViewDetails(product)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold">
                          ⭐ Featured
                        </Badge>
                      )}
                      <Badge variant="secondary" className="bg-white/95 text-gray-800 font-medium">
                        {product.condition}
                      </Badge>
                    </div>

                    {/* Discount Badge */}
                    {product.original_price && product.original_price > product.price && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-red-500 text-white font-bold">
                          -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 font-['Inter']">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 font-semibold text-lg">{product.brand}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold">4.8</span>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {product.tonnage && (
                        <div className="flex flex-col items-center gap-1 p-3 bg-blue-50 rounded-xl">
                          <Snowflake className="h-5 w-5 text-blue-600" />
                          <span className="text-sm font-medium text-gray-700">{product.tonnage}</span>
                        </div>
                      )}
                      {product.energy_rating && (
                        <div className="flex flex-col items-center gap-1 p-3 bg-green-50 rounded-xl">
                          <Zap className="h-5 w-5 text-green-600" />
                          <span className="text-sm font-medium text-gray-700">{product.energy_rating}</span>
                        </div>
                      )}
                      <div className="flex flex-col items-center gap-1 p-3 bg-purple-50 rounded-xl">
                        <Wind className="h-5 w-5 text-purple-600" />
                        <span className="text-sm font-medium text-gray-700">Smart</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-3xl font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </div>
                        {product.original_price && product.original_price > product.price && (
                          <div className="text-lg text-gray-500 line-through">
                            {formatPrice(product.original_price)}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600 font-medium">{product.views || 0} views</div>
                        {product.location && (
                          <div className="text-xs text-gray-500">{product.location}</div>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs font-medium">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Action Button */}
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl text-lg mt-auto"
                      onClick={() => handleViewDetails(product)}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      View Details & Buy
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-8xl mb-8">❄️</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6 font-['Inter']">No Featured Products Available</h3>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              Our featured AC collection is currently being updated. Please check back later or contact us for current availability.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-5 text-xl font-semibold rounded-2xl shadow-xl hover:shadow-2xl">
            <Link to="/ac-buy-and-sale">
              View All AC Products
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Product Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-gray-900 mb-2 font-['Inter']">
                  {selectedProduct.name}
                </DialogTitle>
                <DialogDescription className="text-lg text-gray-600">
                  {selectedProduct.brand} - {selectedProduct.condition} Condition
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div>
                  <img
                    src={getImageUrl(selectedProduct.images)}
                    alt={selectedProduct.name}
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {formatPrice(selectedProduct.price)}
                    </div>
                    {selectedProduct.original_price && selectedProduct.original_price > selectedProduct.price && (
                      <div className="text-xl text-gray-500 line-through">
                        Original: {formatPrice(selectedProduct.original_price)}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {selectedProduct.tonnage && (
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-1">
                          <Snowflake className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold">Tonnage</span>
                        </div>
                        <span className="text-gray-700">{selectedProduct.tonnage}</span>
                      </div>
                    )}
                    {selectedProduct.energy_rating && (
                      <div className="p-4 bg-green-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="h-5 w-5 text-green-600" />
                          <span className="font-semibold">Energy Rating</span>
                        </div>
                        <span className="text-gray-700">{selectedProduct.energy_rating}</span>
                      </div>
                    )}
                  </div>

                  {selectedProduct.description && (
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Description</h4>
                      <p className="text-gray-700 leading-relaxed">{selectedProduct.description}</p>
                    </div>
                  )}

                  {selectedProduct.features && selectedProduct.features.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-lg mb-3">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="font-medium">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <Button 
                      onClick={() => handleBuyNow(selectedProduct)}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 rounded-xl"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Buy via WhatsApp
                    </Button>
                    <Button 
                      onClick={handleCallNow}
                      variant="outline"
                      className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-4 rounded-xl"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Call Now
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PremiumACCollection;
