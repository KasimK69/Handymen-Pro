
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Users, Award, Wrench, ThermometerSun } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Certified AC Technicians",
      description: "Our team consists of certified and experienced AC technicians who ensure professional installation and repair services.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Clock,
      title: "24/7 Emergency Service",
      description: "Round-the-clock emergency AC repair services to keep you comfortable during Pakistan's extreme weather conditions.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: ThermometerSun,
      title: "Climate Expertise",
      description: "Specialized knowledge of Pakistan's climate challenges with tailored AC solutions for optimal cooling efficiency.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Users,
      title: "10,000+ Happy Customers",
      description: "Over a decade of trust with thousands of satisfied customers across Islamabad, Rawalpindi, and surrounding areas.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Award,
      title: "Premium AC Brands",
      description: "Authorized dealers of top AC brands including Haier, Gree, Orient, and PEL with genuine warranties.",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: Wrench,
      title: "Complete AC Solutions",
      description: "From installation to maintenance, repair to replacement - we provide comprehensive AC services under one roof.",
      gradient: "from-teal-500 to-green-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">AC Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience unmatched quality, reliability, and expertise in air conditioning services across Pakistan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Icon */}
              <motion.div 
                className={`inline-flex items-center justify-center p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 text-white`}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <feature.icon className="h-8 w-8" />
              </motion.div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Border */}
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { number: "10K+", label: "Happy Customers" },
            { number: "15+", label: "Years Experience" },
            { number: "24/7", label: "Support Available" },
            { number: "100%", label: "Satisfaction Rate" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
