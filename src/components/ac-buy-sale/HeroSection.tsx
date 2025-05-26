
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AirVent, Snowflake, Star, ShoppingCart, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onTabChange: (tab: 'for-sale' | 'wanted') => void;
  onOpenSellingForm: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onTabChange, onOpenSellingForm }) => {
  return (
    <section className="relative bg-gradient-to-br from-brand-blue via-blue-600 to-brand-red text-white py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 opacity-20">
          <AirVent className="h-32 w-32 text-white animate-pulse" />
        </div>
        <div className="absolute top-10 right-20 opacity-20">
          <Snowflake className="h-24 w-24 text-white animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <div className="absolute bottom-20 left-1/4 opacity-20">
          <AirVent className="h-28 w-28 text-white" />
        </div>
        <div className="absolute bottom-10 right-1/3 opacity-20">
          <Snowflake className="h-20 w-20 text-white animate-pulse" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <AirVent className="h-12 w-12 text-white" />
              </div>
              <div className="text-4xl font-bold">+</div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <ShoppingCart className="h-12 w-12 text-white" />
              </div>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Premium <span className="text-yellow-300">AC Buy & Sale</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed"
          >
            Discover the best air conditioners in <strong>Islamabad & Rawalpindi</strong>. From brand new energy-efficient models to quality used units with professional installation and support.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center mb-8"
          >
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
              <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
              <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
              <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
              <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
              <span className="ml-2 font-semibold">4.9/5 Rating • 500+ Happy Customers</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center mb-8"
          >
            <Tabs defaultValue="for-sale" onValueChange={(value) => onTabChange(value as 'for-sale' | 'wanted')}>
              <TabsList className="grid grid-cols-2 w-full max-w-md bg-white/20 backdrop-blur-sm border-0">
                <TabsTrigger 
                  value="for-sale" 
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-brand-blue font-semibold"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Buy ACs
                </TabsTrigger>
                <TabsTrigger 
                  value="wanted" 
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-brand-blue font-semibold"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Sell ACs
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="bg-white text-brand-blue hover:bg-gray-100 font-semibold shadow-xl"
              onClick={() => onTabChange('for-sale')}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Browse AC Collection
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-brand-blue font-semibold"
              onClick={onOpenSellingForm}
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Sell Your AC
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-2xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">ACs Sold</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-2xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Support</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-2xl font-bold mb-2">Free</div>
              <div className="text-sm opacity-90">Installation</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
