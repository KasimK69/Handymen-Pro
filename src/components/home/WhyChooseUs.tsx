
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Clock, Users, Award, Wrench, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'All AC units are thoroughly tested for quality and performance before listing.',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'Free delivery within 24-48 hours in Rawalpindi and Islamabad areas.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Users,
      title: 'Expert Installation',
      description: 'Professional installation by certified technicians included with every purchase.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Award,
      title: 'Warranty Coverage',
      description: 'Comprehensive warranty on all new AC units with dedicated service support.',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      icon: Wrench,
      title: '24/7 Service',
      description: 'Round-the-clock maintenance and repair services for all AC brands.',
      color: 'from-red-400 to-red-600'
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      description: 'Dedicated customer support team available to assist you anytime.',
      color: 'from-indigo-400 to-indigo-600'
    }
  ];

  const stats = [
    { number: '10+', label: 'Years Experience' },
    { number: '5000+', label: 'Happy Customers' },
    { number: '24/7', label: 'Service Available' },
    { number: '4.9★', label: 'Customer Rating' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#2D3559] via-[#4CC9F0] to-[#8843F2]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-['Inter']">
            Why Choose <span className="bg-gradient-to-r from-[#FF467E] to-white bg-clip-text text-transparent">AC Services</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            We deliver exceptional AC services with professionalism and expertise you can trust across Pakistan.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF467E] to-white mx-auto mt-8"></div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${benefit.color} flex items-center justify-center shadow-lg`}>
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                  <p className="text-white/80 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/80 text-lg">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
