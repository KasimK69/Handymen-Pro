
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, TrendingUp } from 'lucide-react';

interface HeroSectionProps {
  onTabChange: (tab: 'for-sale' | 'wanted') => void;
  onOpenSellingForm: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onTabChange, onOpenSellingForm }) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
          >
            AC <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Marketplace</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Buy or sell air conditioners with confidence. Premium quality ACs at unbeatable prices.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* ACs For Sale Button */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-8 shadow-2xl border border-blue-500/20 hover:shadow-blue-500/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <ShoppingCart className="h-12 w-12 text-blue-200 group-hover:text-white transition-colors duration-300" />
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors duration-300">
                  ACs For Sale
                </h3>
                
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Browse our premium collection of air conditioners. From split ACs to window units - find your perfect cooling solution.
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="text-blue-200">
                    <span className="text-sm">Starting from</span>
                    <div className="text-2xl font-bold text-white">PKR 25,000</div>
                  </div>
                  <div className="flex items-center space-x-2 text-green-300">
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-sm font-medium">500+ Available</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => onTabChange('for-sale')}
                  className="w-full bg-white text-blue-700 hover:bg-blue-50 font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                >
                  Browse ACs for Sale
                  <ShoppingCart className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* ACs Wanted Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 p-8 shadow-2xl border border-purple-500/20 hover:shadow-purple-500/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <Heart className="h-12 w-12 text-purple-200 group-hover:text-white transition-colors duration-300" />
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-100 transition-colors duration-300">
                  ACs Wanted
                </h3>
                
                <p className="text-purple-100 mb-6 leading-relaxed">
                  Sell your AC to us! Get instant quotes for used air conditioners. Quick evaluation and best market prices guaranteed.
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="text-purple-200">
                    <span className="text-sm">Up to</span>
                    <div className="text-2xl font-bold text-white">PKR 80,000</div>
                  </div>
                  <div className="flex items-center space-x-2 text-green-300">
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-sm font-medium">Fast Payment</span>
                  </div>
                </div>
                
                <Button 
                  onClick={onOpenSellingForm}
                  className="w-full bg-white text-purple-700 hover:bg-purple-50 font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                >
                  Sell Your AC
                  <Heart className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Quality Assured</h4>
            <p className="text-gray-600">All ACs tested and verified</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Best Prices</h4>
            <p className="text-gray-600">Competitive market rates</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Fast Service</h4>
            <p className="text-gray-600">Quick buying and selling</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
