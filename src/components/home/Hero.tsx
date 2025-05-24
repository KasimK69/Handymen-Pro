
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const fadeIn = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="relative bg-gradient-to-r from-brand-blue to-brand-blue/80 pt-32 pb-20 overflow-hidden w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-brand-red" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-red" />
      </div>
      
      <div className="w-full px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="text-white">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" 
              custom={1} 
              initial="hidden" 
              animate="visible" 
              variants={fadeIn}
            >
              Professional AC Services in Rawalpindi & Islamabad
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed max-w-xl" 
              custom={2} 
              initial="hidden" 
              animate="visible" 
              variants={fadeIn}
            >
              From expert installations to speedy repairs, we provide premium AC services to keep your home cool and comfortable in Bahria Town and surrounding areas.
            </motion.p>
            
            {/* Features */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8" 
              custom={3} 
              initial="hidden" 
              animate="visible" 
              variants={fadeIn}
            >
              <FeatureItem>Same Day Service</FeatureItem>
              <FeatureItem>Certified Technicians</FeatureItem>
              <FeatureItem>Warranty on Services</FeatureItem>
              <FeatureItem>Free Consultations</FeatureItem>
            </motion.div>
            
            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4" 
              custom={4} 
              initial="hidden" 
              animate="visible" 
              variants={fadeIn}
            >
              <Button size="lg" className="bg-brand-red hover:bg-brand-red/90 text-white shadow-lg" asChild>
                <Link to="/booking">Book a Service</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/ac-buy-and-sale">Shop AC Units</Link>
              </Button>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div 
              className="mt-8 flex flex-wrap items-center text-white/80 gap-y-2" 
              custom={5} 
              initial="hidden" 
              animate="visible" 
              variants={fadeIn}
            >
              <a href="tel:+923125242182" className="flex items-center hover:text-white transition-colors mr-6">
                <Phone className="h-4 w-4 mr-2" />
                +92 312 5242182
              </a>
              <span>Bahria Town, Phase 8, Rawalpindi</span>
            </motion.div>
          </div>
          
          {/* Image */}
          <motion.div 
            className="relative" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                alt="Professional AC service in Rawalpindi" 
                className="w-full h-auto rounded-lg object-cover" 
                loading="eager" 
                src="/lovable-uploads/05b08b97-a88a-4b4f-81f6-8e0c4fa82a0f.jpg" 
              />
              
              {/* Stats Overlay */}
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-red">12+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-red">4000+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">AC Services Done</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Floating Shapes - Decorative */}
      <div className="hidden lg:block">
        <div className="absolute top-1/4 left-10 w-20 h-20 border-4 border-white/10 rounded-full animate-float" />
        <div className="absolute bottom-1/3 right-10 w-16 h-16 bg-brand-red/10 rounded-full animate-float animation-delay-1000" />
        <div className="absolute top-1/2 right-1/4 w-12 h-12 border-4 border-brand-red/10 rounded-full animate-float animation-delay-2000" />
      </div>
    </section>
  );
};

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center">
    <CheckCircle className="w-5 h-5 text-brand-red mr-2 shrink-0" />
    <span>{children}</span>
  </div>
);

export default Hero;
