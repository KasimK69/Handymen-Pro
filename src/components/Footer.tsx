
import React from 'react';
import { Link } from 'react-router-dom';
import { AirVent, Phone, Mail, MapPin, Clock, Snowflake, Star, MessageCircle, ThermometerSnowflake, Wind, Zap, Shield, Wrench, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-10 left-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <AirVent className="h-32 w-32 text-white" />
        </motion.div>
        <motion.div 
          className="absolute top-20 right-20"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <ThermometerSnowflake className="h-24 w-24 text-white" />
        </motion.div>
        <motion.div 
          className="absolute bottom-20 left-1/4"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Wind className="h-28 w-28 text-white opacity-50" />
        </motion.div>
        <motion.div 
          className="absolute bottom-10 right-1/3"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Snowflake className="h-20 w-20 text-white" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-14 h-14 bg-gradient-to-r from-brand-blue to-brand-red rounded-full flex items-center justify-center shadow-lg relative"
              >
                <AirVent className="h-8 w-8 text-white" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-1 rounded-full border-2 border-dashed border-blue-400 opacity-60"
                />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold">
                  <span className="text-brand-blue">AC</span>
                  <span className="text-brand-red">Services</span>
                </h3>
                <p className="text-sm text-gray-400">& Repairs</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Professional AC services, repairs, and premium air conditioner sales in Islamabad & Rawalpindi. Your comfort is our priority.
            </p>
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
              <span className="text-sm text-gray-400">4.9/5 Rating • 500+ Happy Customers</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h4 className="text-xl font-bold text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-gradient-to-r from-brand-blue to-transparent rounded"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/', icon: <CheckCircle2 className="h-4 w-4" /> },
                { name: 'AC Services', path: '/services', icon: <Wrench className="h-4 w-4" /> },
                { name: 'AC Buy & Sale', path: '/ac-buy-and-sale', icon: <AirVent className="h-4 w-4" /> },
                { name: 'Blog', path: '/blog', icon: <MessageCircle className="h-4 w-4" /> },
                { name: 'Contact Us', path: '/contact', icon: <Mail className="h-4 w-4" /> }
              ].map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.2, duration: 0.3 }}
                >
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-brand-blue transition-colors duration-300 flex items-center group"
                  >
                    <span className="text-brand-blue mr-3 group-hover:scale-125 transition-transform">{link.icon}</span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-xl font-bold text-white relative inline-block">
              Our Services
              <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-gradient-to-r from-brand-red to-transparent rounded"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'AC Installation', icon: <AirVent className="h-4 w-4" /> },
                { name: 'AC Repair & Maintenance', icon: <Wrench className="h-4 w-4" /> },
                { name: 'Premium AC Sales', icon: <Star className="h-4 w-4" /> },
                { name: 'AC Gas Refilling', icon: <Wind className="h-4 w-4" /> },
                { name: 'Emergency AC Service', icon: <Zap className="h-4 w-4" /> },
                { name: 'AC Consultation', icon: <MessageCircle className="h-4 w-4" /> }
              ].map((service, index) => (
                <motion.li 
                  key={service.name} 
                  className="text-gray-300 flex items-center group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.3, duration: 0.3 }}
                >
                  <span className="text-brand-red mr-3 group-hover:scale-125 transition-transform">{service.icon}</span>
                  {service.name}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h4 className="text-xl font-bold text-white relative inline-block">
              Contact Info
              <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-gradient-to-r from-blue-400 to-transparent rounded"></span>
            </h4>
            <div className="space-y-4">
              <motion.div 
                className="flex items-start space-x-3 group"
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <div className="h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center group-hover:bg-brand-blue transition-colors duration-300">
                  <Phone className="h-5 w-5 text-white flex-shrink-0" />
                </div>
                <div>
                  <p className="text-white font-semibold">+92 312 5242182</p>
                  <p className="text-gray-400 text-sm">24/7 Emergency Service</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start space-x-3 group"
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <div className="h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center group-hover:bg-brand-blue transition-colors duration-300">
                  <Mail className="h-5 w-5 text-white flex-shrink-0" />
                </div>
                <div>
                  <p className="text-white">info@acservices.pk</p>
                  <p className="text-gray-400 text-sm">Get free consultation</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start space-x-3 group"
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <div className="h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center group-hover:bg-brand-blue transition-colors duration-300">
                  <MapPin className="h-5 w-5 text-white flex-shrink-0" />
                </div>
                <div>
                  <p className="text-white">Bahria Town, Phase 8</p>
                  <p className="text-gray-400 text-sm">Rawalpindi, Pakistan</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start space-x-3 group"
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                <div className="h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center group-hover:bg-brand-blue transition-colors duration-300">
                  <Clock className="h-5 w-5 text-white flex-shrink-0" />
                </div>
                <div>
                  <p className="text-white">Mon - Sun: 8:00 AM - 10:00 PM</p>
                  <p className="text-gray-400 text-sm">Emergency: 24/7</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-red rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div 
              className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mt-32 -mr-32"
              animate={{ scale: [1, 1.2, 1], rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full -mb-20 -ml-20"
              animate={{ scale: [1, 1.3, 1], rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center"
                >
                  <ThermometerSnowflake className="h-10 w-10 text-white" />
                </motion.div>
              </div>
              
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="text-3xl font-bold mb-4"
              >
                Get a Free AC Consultation
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="text-xl mb-6 opacity-90"
              >
                Expert advice on AC selection, installation, and maintenance for your home or office
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <a
                  href="https://wa.me/923125242182?text=Hi! I'd like a free AC consultation. Could you please provide me with expert advice for my needs?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <MessageCircle className="mr-3 h-6 w-6" />
                  Get Free WhatsApp Consultation
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 pt-8 border-t border-gray-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              © {currentYear} AC Services & Repairs. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <a 
                href="https://wa.me/923125242182" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 transition-colors flex items-center"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
