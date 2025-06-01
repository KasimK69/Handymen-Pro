
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Shield, Star, Users, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  {
    icon: <CheckCircle className="h-8 w-8 text-[#4CC9F0]" />,
    title: 'Expert Technicians',
    description: 'Certified AC specialists with 10+ years of experience in installation, repair, and maintenance services.'
  },
  {
    icon: <Clock className="h-8 w-8 text-[#8843F2]" />,
    title: '24/7 Emergency Service',
    description: 'Round-the-clock emergency AC repair services. We respond within 2 hours for urgent cooling needs.'
  },
  {
    icon: <Shield className="h-8 w-8 text-[#FF467E]" />,
    title: 'Quality Guarantee',
    description: 'All our services come with warranty protection and 100% satisfaction guarantee on workmanship.'
  },
  {
    icon: <Star className="h-8 w-8 text-[#4CC9F0]" />,
    title: 'Premium Brands',
    description: 'We work with top AC brands like Samsung, LG, Daikin, and Haier for quality and reliability.'
  },
  {
    icon: <Users className="h-8 w-8 text-[#8843F2]" />,
    title: '5000+ Happy Customers',
    description: 'Trusted by thousands of satisfied customers across Pakistan with 4.9/5 average rating.'
  },
  {
    icon: <Wrench className="h-8 w-8 text-[#FF467E]" />,
    title: 'Complete AC Solutions',
    description: 'From installation to maintenance, repair to AC buying/selling - we handle all your cooling needs.'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Inter']">
            Why Choose <span className="bg-gradient-to-r from-[#8843F2] to-[#FF467E] bg-clip-text text-transparent">AC Services</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're Pakistan's leading AC service provider, committed to delivering exceptional cooling solutions 
            with unmatched expertise and customer satisfaction.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#8843F2] to-[#FF467E] mx-auto mt-8"></div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white hover:scale-105 h-full">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full group-hover:from-[#8843F2]/10 group-hover:to-[#FF467E]/10 transition-all duration-300">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#2D3559] group-hover:text-[#8843F2] transition-colors duration-300 font-['Inter']">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 bg-gradient-to-r from-[#2D3559] to-[#4CC9F0] rounded-2xl p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <h4 className="text-4xl font-bold mb-2 font-['Inter']">10+</h4>
              <p className="text-white/80">Years Experience</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2 font-['Inter']">5000+</h4>
              <p className="text-white/80">Happy Customers</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2 font-['Inter']">24/7</h4>
              <p className="text-white/80">Emergency Service</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2 font-['Inter']">4.9★</h4>
              <p className="text-white/80">Customer Rating</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
