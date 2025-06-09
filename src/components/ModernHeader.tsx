
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Phone, Mail, AirVent, Snowflake, Quote, Wrench, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ModernHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'AC Buy & Sale', path: '/ac-buy-and-sale' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleGetQuote = () => {
    window.location.href = '/get-quote';
  };

  const handleGetService = () => {
    const message = `Hello! I need AC service assistance. 

I'm looking for:
- Professional AC installation
- Repair and maintenance
- Emergency AC service
- Expert consultation

Please provide me with a quote and available service times. Thank you!`;
    
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-blue-100/50' 
          : 'bg-white/90 backdrop-blur-lg'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-2.5 px-4 overflow-hidden relative">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <div className="container mx-auto flex justify-between items-center text-sm relative z-10">
          <div className="flex items-center space-x-6">
            <motion.div 
              className="flex items-center space-x-2 hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="h-4 w-4" />
              <span className="font-semibold">+92 312 5242182</span>
            </motion.div>
            <div className="hidden md:flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@acservices.pk</span>
            </div>
            <div className="hidden lg:flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Bahria Town, Rawalpindi Phase 8</span>
            </div>
          </div>
          <motion.div 
            className="text-sm font-medium flex items-center space-x-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Snowflake className="h-4 w-4" />
            <span>24/7 Emergency AC Services - Fast Response</span>
          </motion.div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <AirVent className="h-9 w-9 text-white z-10" />
                <motion.div
                  className="absolute top-2 right-2"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Snowflake className="h-4 w-4 text-blue-200" />
                </motion.div>
              </div>
            </motion.div>
            <div className="hidden sm:block">
              <motion.h1 
                className="text-2xl font-bold leading-tight font-['Inter']"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-gray-900">AC</span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Services</span>
              </motion.h1>
              <p className="text-xs text-gray-600 -mt-1 font-medium">Professional AC Solutions Pakistan</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative group font-['Inter'] ${
                    location.pathname === item.path
                      ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 shadow-sm'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50'
                  }`}
                >
                  {item.name}
                  <motion.span 
                    className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-3/4 ${
                      location.pathname === item.path ? 'w-3/4' : ''
                    }`}
                    layoutId="activeTab"
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleGetService}
                size="sm"
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 font-['Inter'] font-medium px-5 py-2.5 rounded-xl"
              >
                <Wrench className="mr-2 h-4 w-4" />
                Get Service
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleGetQuote}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl font-['Inter'] font-medium px-6 py-2.5 rounded-xl transition-all duration-300"
              >
                <Quote className="mr-2 h-4 w-4" />
                Get Quote
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-xl">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <AirVent className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 font-['Inter']">AC Services</h3>
                      <p className="text-xs text-gray-500">Professional Solutions</p>
                    </div>
                  </div>
                  <SheetClose asChild>
                    <Button variant="ghost" size="sm">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
                
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 font-['Inter'] ${
                        location.pathname === item.path
                          ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 hover:border-l-4 hover:border-blue-300'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="pt-4 space-y-3 border-t border-gray-200">
                  <Button 
                    onClick={() => {
                      handleGetService();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-['Inter'] font-medium py-3 rounded-xl"
                  >
                    <Wrench className="mr-2 h-4 w-4" />
                    Get Service
                  </Button>
                  <Button 
                    onClick={() => {
                      handleGetQuote();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-['Inter'] font-medium py-3 rounded-xl"
                  >
                    <Quote className="mr-2 h-4 w-4" />
                    Get Quote
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default ModernHeader;
