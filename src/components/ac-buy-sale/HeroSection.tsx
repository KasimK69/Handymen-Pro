
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, PlusCircle, TrendingUp, Users, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onTabChange: (tab: 'for-sale' | 'wanted') => void;
  onOpenSellingForm: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onTabChange, onOpenSellingForm }) => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-[#2D3559] via-[#4CC9F0] to-[#8843F2] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-white/20 text-white border-white/30 px-6 py-2 text-lg font-semibold mb-6">
            Pakistan's #1 AC Marketplace
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-['Inter']">
            Buy & Sell ACs
            <br />
            <span className="bg-gradient-to-r from-[#FF467E] to-white bg-clip-text text-transparent">
              With Confidence
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
            Discover premium air conditioning units from verified sellers across Pakistan. 
            Quality assured, competitive prices, and hassle-free transactions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg"
              onClick={() => onTabChange('for-sale')}
              className="bg-white text-[#2D3559] hover:bg-gray-100 px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <ShoppingCart className="mr-3 h-6 w-6" />
              Browse ACs for Sale
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={onOpenSellingForm}
              className="border-2 border-white text-white hover:bg-white hover:text-[#2D3559] px-8 py-4 text-lg font-bold transition-all duration-300 hover:scale-105"
            >
              <PlusCircle className="mr-3 h-6 w-6" />
              Sell Your AC
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Users, label: 'Active Users', value: '10,000+' },
              { icon: ShoppingCart, label: 'ACs Sold', value: '5,000+' },
              { icon: TrendingUp, label: 'Success Rate', value: '98%' },
              { icon: Shield, label: 'Verified Sellers', value: '500+' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Shield,
              title: 'Quality Assured',
              description: 'All AC units are thoroughly tested for quality and performance before listing.',
              color: 'from-green-400 to-green-600'
            },
            {
              icon: Zap,
              title: 'Fast Delivery',
              description: 'Free delivery within 24-48 hours in Rawalpindi and Islamabad areas.',
              color: 'from-yellow-400 to-yellow-600'
            },
            {
              icon: Users,
              title: 'Expert Installation',
              description: 'Professional installation by certified technicians included with every purchase.',
              color: 'from-blue-400 to-blue-600'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/80 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
