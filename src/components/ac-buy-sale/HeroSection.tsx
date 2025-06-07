
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search, Plus, Wind, Zap } from 'lucide-react';

interface HeroSectionProps {
  onTabChange: (tab: 'for-sale' | 'wanted') => void;
  onOpenSellingForm: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onTabChange, onOpenSellingForm }) => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-6 backdrop-blur-sm"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Wind className="h-8 w-8 text-white" />
          </motion.div>
          
          <h1 className="text-4xl md:text-7xl font-bold mb-6">
            AC Buy & <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">Sell</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Your trusted marketplace for premium air conditioners in Pakistan
          </p>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Buy certified used ACs or sell your unit with guaranteed fair pricing
          </p>
        </motion.div>

        {/* Main Action Buttons */}
        <motion.div 
          className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* ACs For Sale Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group"
          >
            <Button
              onClick={() => onTabChange('for-sale')}
              className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:via-green-600 hover:to-emerald-700 text-white border-0 shadow-2xl px-12 py-8 text-xl font-bold rounded-3xl min-w-[280px] h-auto"
            >
              {/* Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 skew-x-12"></div>
              
              <div className="relative z-10 flex flex-col items-center gap-3">
                <motion.div
                  className="p-3 bg-white/20 rounded-full"
                  whileHover={{ rotate: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <ShoppingCart className="h-8 w-8" />
                </motion.div>
                <div>
                  <div className="text-2xl font-bold">ACs For Sale</div>
                  <div className="text-sm opacity-90 font-medium">Browse Available Units</div>
                </div>
              </div>
            </Button>
          </motion.div>

          {/* VS Divider */}
          <motion.div 
            className="hidden lg:block relative"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
              <span className="text-xl font-bold text-white">OR</span>
            </div>
          </motion.div>

          {/* ACs Wanted Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group"
          >
            <Button
              onClick={() => onTabChange('wanted')}
              className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white border-0 shadow-2xl px-12 py-8 text-xl font-bold rounded-3xl min-w-[280px] h-auto"
            >
              {/* Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 skew-x-12"></div>
              
              <div className="relative z-10 flex flex-col items-center gap-3">
                <motion.div
                  className="p-3 bg-white/20 rounded-full"
                  whileHover={{ rotate: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <Search className="h-8 w-8" />
                </motion.div>
                <div>
                  <div className="text-2xl font-bold">ACs Wanted</div>
                  <div className="text-sm opacity-90 font-medium">Find Buyers for Your AC</div>
                </div>
              </div>
            </Button>
          </motion.div>
        </motion.div>

        {/* Sell Your AC Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-lg mb-6 opacity-90">Have an AC to sell?</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onOpenSellingForm}
              variant="outline"
              className="relative overflow-hidden bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-blue-600 backdrop-blur-sm px-10 py-6 text-lg font-semibold rounded-2xl group"
            >
              {/* Hover Background */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  <Plus className="h-6 w-6" />
                </motion.div>
                <span>List Your AC for Sale</span>
                <Zap className="h-5 w-5" />
              </div>
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { number: "500+", label: "ACs Sold", icon: ShoppingCart },
            { number: "98%", label: "Customer Satisfaction", icon: Zap },
            { number: "24hrs", label: "Quick Response", icon: Wind },
            { number: "5★", label: "Average Rating", icon: Search }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div
                className="inline-flex items-center justify-center p-4 bg-white/10 rounded-2xl mb-3 backdrop-blur-sm group-hover:bg-white/20 transition-colors"
                whileHover={{ rotate: 5 }}
              >
                <stat.icon className="h-6 w-6" />
              </motion.div>
              <div className="text-3xl md:text-4xl font-bold mb-1 group-hover:text-yellow-300 transition-colors">
                {stat.number}
              </div>
              <div className="text-sm opacity-80 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
