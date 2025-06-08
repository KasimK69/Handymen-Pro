
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, TrendingUp, Snowflake, Shield, Zap, Award } from 'lucide-react';

interface HeroSectionProps {
  onTabChange: (tab: 'for-sale' | 'wanted') => void;
  onOpenSellingForm: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onTabChange, onOpenSellingForm }) => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        
        {/* Floating Geometric Shapes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 backdrop-blur-sm"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header Content */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white/90 text-sm font-medium">
              <Snowflake className="h-4 w-4 text-blue-300" />
              Premium AC Solutions
              <Award className="h-4 w-4 text-yellow-300" />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
          >
            <span className="block text-white mb-2">Next-Gen</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse">
              AC Marketplace
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            Experience the future of air conditioning with AI-powered recommendations, 
            smart pricing, and premium quality units. Your comfort, our priority.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-16"
          >
            {[
              { number: "500+", label: "ACs Available", icon: ShoppingCart },
              { number: "98%", label: "Satisfaction", icon: Heart },
              { number: "24/7", label: "Support", icon: Shield },
              { number: "1000+", label: "Happy Clients", icon: Award }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-6 w-6 mx-auto mb-2 text-blue-300" />
                <div className="text-2xl font-bold text-white">{stat.number}</div>
                <div className="text-sm text-blue-200">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {/* Buy ACs Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <ShoppingCart className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Premium ACs</h3>
                    <p className="text-blue-200">For Sale</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                {[
                  "Energy Efficient Models",
                  "1-3 Year Warranty",
                  "Free Installation Support",
                  "Smart Temperature Control"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Zap className="h-4 w-4 text-cyan-400" />
                    <span className="text-blue-100">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Price Info */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-blue-200 text-sm">Starting from</span>
                  <div className="text-3xl font-bold text-white">PKR 25,000</div>
                </div>
                <div className="flex items-center gap-2 bg-green-500/20 rounded-full px-4 py-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-green-300 text-sm font-medium">500+ Available</span>
                </div>
              </div>

              <Button 
                onClick={() => onTabChange('for-sale')}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105"
              >
                <ShoppingCart className="mr-3 h-5 w-5" />
                Browse Premium ACs
                <motion.div 
                  className="ml-3"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </Button>
            </div>
          </motion.div>

          {/* Sell ACs Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Sell Your AC</h3>
                    <p className="text-purple-200">Get Best Price</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                {[
                  "Instant Price Evaluation",
                  "Free Pickup Service",
                  "Quick Payment Process",
                  "No Hidden Charges"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Zap className="h-4 w-4 text-pink-400" />
                    <span className="text-purple-100">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Price Info */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-purple-200 text-sm">Get up to</span>
                  <div className="text-3xl font-bold text-white">PKR 80,000</div>
                </div>
                <div className="flex items-center gap-2 bg-green-500/20 rounded-full px-4 py-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-green-300 text-sm font-medium">Fast Payment</span>
                </div>
              </div>

              <Button 
                onClick={onOpenSellingForm}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105"
              >
                <Heart className="mr-3 h-5 w-5" />
                Sell Your AC Now
                <motion.div 
                  className="ml-3"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                >
                  →
                </motion.div>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            {
              icon: Shield,
              title: "Quality Assured",
              description: "Every AC tested and verified by our experts",
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "Quick transactions and instant support",
              gradient: "from-purple-500 to-pink-500"
            },
            {
              icon: Award,
              title: "Best Prices",
              description: "Competitive rates and transparent pricing",
              gradient: "from-green-500 to-emerald-500"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.05 }}
              className="text-center group"
            >
              <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                <item.icon className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors duration-300">
                {item.title}
              </h4>
              <p className="text-blue-200 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
