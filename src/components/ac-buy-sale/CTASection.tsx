
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail, ArrowRight, AirVent, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const CTASection = () => {
  const handleGetConsultation = () => {
    const message = `Hello! I would like to get a free AC consultation. 

I'm interested in:
- AC selection advice
- Installation guidance  
- Best models for my space
- Pricing and warranty information

Please help me choose the right AC for my needs. Thank you!`;
    
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#2D3559] via-[#8843F2] to-[#4CC9F0] relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-10 left-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <AirVent className="h-32 w-32 text-white" />
        </motion.div>
        <motion.div 
          className="absolute bottom-10 right-10"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <AirVent className="h-24 w-24 text-white" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          {/* Header */}
          <div className="flex justify-center mb-8">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="p-4 bg-white/10 backdrop-blur-sm rounded-full"
            >
              <AirVent className="h-12 w-12 text-white" />
            </motion.div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 font-['Inter']"
          >
            Ready to Experience <span className="text-[#4CC9F0]">Superior Comfort?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed"
          >
            Get expert guidance from our AC specialists. We'll help you choose the perfect air conditioner for your space, budget, and cooling needs.
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-[#4CC9F0]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-['Inter']">Expert Guidance</h3>
              <p className="text-sm opacity-80">Professional advice on AC selection and installation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AirVent className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-['Inter']">Quality Products</h3>
              <p className="text-sm opacity-80">Premium AC brands with warranty and support</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-[#4CC9F0]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-['Inter']">24/7 Support</h3>
              <p className="text-sm opacity-80">Round-the-clock customer service and maintenance</p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleGetConsultation}
                size="lg"
                className="bg-gradient-to-r from-[#FF467E] to-[#8843F2] hover:from-[#F03A6E] hover:to-[#7335E8] text-white px-8 py-4 text-lg font-semibold shadow-lg group font-['Inter']"
              >
                <MessageCircle className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Get Free AC Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-[#2D3559] px-8 py-4 text-lg font-semibold group font-['Inter']"
              >
                <a href="tel:+923125242182">
                  <Phone className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  Call Now: +92 312 5242182
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm opacity-80">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                info@acservices.pk
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                24/7 Emergency Service Available
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-2 text-[#4CC9F0] fill-current" />
                4.9/5 Customer Rating
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
