
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Users, Heart, ArrowRight } from 'lucide-react';
import TestimonialCard from './TestimonialCard';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "I bought a used inverter AC from them and couldn't be happier. It works like new and the price was extremely reasonable. The installation team was professional and efficient.",
      author: "Asim Khan",
      role: "Homeowner",
      location: "Rawalpindi",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      quote: "Their team was very professional during installation. The AC I purchased is energy efficient and keeping my home cool even in peak summer. Great after-sales support too!",
      author: "Sania Ahmed", 
      role: "Business Owner",
      location: "Islamabad",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b588?w=150&h=150&fit=crop&crop=face"
    },
    {
      quote: "I was able to sell my old AC unit quickly through their platform. The process was smooth and I got a fair price. Highly recommend their buy-back service!",
      author: "Fahad Mehmood",
      role: "Engineer", 
      location: "Rawalpindi",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const stats = [
    { number: "2,500+", label: "Happy Customers", icon: Users },
    { number: "98%", label: "Satisfaction Rate", icon: Heart },
    { number: "4.9", label: "Average Rating", icon: Star }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf6_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf6_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-xl"
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-full px-6 py-3 mb-6">
            <Quote className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Customer Reviews</span>
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-gray-900">What Our</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Customers Say
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real experiences from satisfied customers across Pakistan who trust us 
            with their AC buying and selling needs
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Card Background with Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-sm opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-blue-200 opacity-30">
                  <Quote className="h-10 w-10" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-gray-700 text-lg leading-relaxed mb-8">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      {testimonial.author}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {testimonial.role}, {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-8 md:p-12 shadow-xl">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl"></div>
            
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to Join Our Satisfied Customers?
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Experience premium AC solutions with professional service and customer satisfaction guaranteed.
              </p>
              
              <motion.button
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Your Free Quote Today
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
