
import React from 'react';
import { Link } from 'react-router-dom';
import { AirVent, Phone, Mail, MapPin, Clock, Star, MessageCircle, CheckCircle2, Wrench, Shield, Zap, ArrowRight, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'AC Installation', path: '/services' },
      { name: 'AC Repair', path: '/services' },
      { name: 'AC Maintenance', path: '/services' },
      { name: 'AC Cleaning', path: '/services' },
      { name: 'Gas Refilling', path: '/services' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Services', path: '/services' },
      { name: 'AC Buy & Sale', path: '/ac-buy-and-sale' },
      { name: 'Blog', path: '/blog' },
      { name: 'Contact', path: '/contact' },
    ],
    support: [
      { name: 'Get Quote', path: '/get-quote' },
      { name: 'Emergency Service', path: '/contact' },
      { name: 'Warranty Info', path: '/about' },
      { name: 'FAQ', path: '/blog' },
      { name: 'Customer Support', path: '/contact' },
    ]
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <AirVent className="w-full h-full text-white" />
        </motion.div>
        <motion.div 
          className="absolute top-20 right-20 w-24 h-24"
          animate={{ 
            rotate: -360,
            y: [0, -20, 0],
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <AirVent className="w-full h-full text-white opacity-30" />
        </motion.div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Company Info - Larger Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 space-y-6"
            >
              {/* Logo and Brand */}
              <div className="flex items-center space-x-3 mb-6">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="relative"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl">
                    <AirVent className="h-9 w-9 text-white" />
                  </div>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-1 rounded-2xl border-2 border-dashed border-blue-400 opacity-40"
                  />
                </motion.div>
                <div>
                  <h3 className="text-3xl font-bold">
                    <span className="text-blue-400">AC</span>
                    <span className="text-white"> Services</span>
                  </h3>
                  <p className="text-sm text-blue-200">Professional AC Solutions Pakistan</p>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-300 leading-relaxed text-lg">
                Leading AC service provider in Islamabad & Rawalpindi. We offer professional installation, repair, maintenance, and premium air conditioner sales with 24/7 emergency support.
              </p>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">500+</div>
                  <div className="text-sm text-gray-300">Happy Customers</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">5+ Years</div>
                  <div className="text-sm text-gray-300">Experience</div>
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i, duration: 0.3 }}
                    >
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-sm text-gray-300">4.9/5 Customer Rating</span>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <h4 className="text-xl font-bold text-white mb-6 relative">
                Our Services
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-400 to-transparent rounded"></span>
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index + 0.2, duration: 0.3 }}
                  >
                    <Link 
                      to={link.path} 
                      className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <h4 className="text-xl font-bold text-white mb-6 relative">
                Company
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-400 to-transparent rounded"></span>
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index + 0.3, duration: 0.3 }}
                  >
                    <Link 
                      to={link.path} 
                      className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <h4 className="text-xl font-bold text-white mb-6 relative">
                Support
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-400 to-transparent rounded"></span>
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index + 0.4, duration: 0.3 }}
                  >
                    <Link 
                      to={link.path} 
                      className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <h4 className="text-xl font-bold text-white mb-6 relative">
                Contact
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-400 to-transparent rounded"></span>
              </h4>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-start space-x-3 group cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <div className="h-10 w-10 rounded-full bg-blue-800/50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">+92 312 5242182</p>
                    <p className="text-gray-400 text-sm">24/7 Emergency</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-3 group cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <div className="h-10 w-10 rounded-full bg-blue-800/50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white">info@acservices.pk</p>
                    <p className="text-gray-400 text-sm">Email Support</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-3 group cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <div className="h-10 w-10 rounded-full bg-blue-800/50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white">Bahria Town, Phase 8</p>
                    <p className="text-gray-400 text-sm">Rawalpindi, Pakistan</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              {/* Background Animation */}
              <motion.div 
                className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mt-20 -mr-20"
                animate={{ 
                  scale: [1, 1.2, 1], 
                  rotate: 360,
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ 
                  scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              
              <div className="relative z-10 text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
                  className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mx-auto mb-6"
                >
                  <AirVent className="h-10 w-10 text-white" />
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Need AC Service? Get Free Consultation!
                </h3>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Expert advice on AC selection, installation, and maintenance for your home or office. Available 24/7 for emergency services.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href="https://wa.me/923125242182?text=Hi! I'd like a free AC consultation. Could you please provide me with expert advice for my needs?"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <MessageCircle className="mr-3 h-6 w-6" />
                      WhatsApp Consultation
                    </a>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href="tel:+923125242182"
                      className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20"
                    >
                      <Phone className="mr-3 h-6 w-6" />
                      Call Emergency: +92 312 5242182
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0"
            >
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <p className="text-gray-400 text-center md:text-left">
                  © {currentYear} AC Services & Repairs Pakistan. All rights reserved.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                  <span className="text-gray-600">•</span>
                  <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </div>
              </div>
              
              {/* Social Links & Contact */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <motion.a 
                    href="https://wa.me/923125242182" 
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors"
                  >
                    <MessageCircle className="h-5 w-5 text-white" />
                  </motion.a>
                  <motion.a 
                    href="tel:+923125242182"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Phone className="h-5 w-5 text-white" />
                  </motion.a>
                </div>
                <div className="text-sm text-gray-400">
                  Made with ❤️ in Pakistan
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
