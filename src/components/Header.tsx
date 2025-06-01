
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Phone, Mail, AirVent, Snowflake, Quote, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
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
    { name: 'AC Buy & Sell', path: '/ac-buy-and-sale' },
    { name: 'Services', path: '/services' },
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
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-100' 
            : 'bg-white/90 backdrop-blur-md'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Top Contact Bar */}
        <div className="bg-gradient-to-r from-[#2D3559] via-[#8843F2] to-[#4CC9F0] text-white py-2.5 px-4">
          <div className="container mx-auto flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="font-medium">+92 312 5242182</span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@acservices.pk</span>
              </div>
            </div>
            <div className="text-sm font-medium">
              ❄️ 24/7 Emergency AC Services - Fast Response
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#8843F2] to-[#FF467E] rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
                  <AirVent className="h-8 w-8 text-white z-10" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#4CC9F0] to-[#8843F2] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <Snowflake className="absolute top-1 right-1 h-4 w-4 text-blue-200 animate-pulse" />
                </div>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold leading-tight font-['Inter']">
                  <span className="text-[#2D3559]">AC</span>
                  <span className="text-[#8843F2]"> Services</span>
                </h1>
                <p className="text-xs text-gray-600 -mt-1 font-medium">Professional AC Solutions Pakistan</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative group font-['Inter'] ${
                    location.pathname === item.path
                      ? 'text-[#8843F2] bg-gradient-to-r from-[#8843F2]/15 to-[#FF467E]/15'
                      : 'text-gray-700 hover:text-[#8843F2] hover:bg-gradient-to-r hover:from-[#8843F2]/10 hover:to-[#FF467E]/10'
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#8843F2] to-[#FF467E] transition-all duration-200 group-hover:w-full ${
                    location.pathname === item.path ? 'w-full' : ''
                  }`} />
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button 
                onClick={handleGetService}
                size="sm"
                variant="outline"
                className="border-[#8843F2] text-[#8843F2] hover:bg-[#8843F2] hover:text-white transition-all duration-300 font-['Inter'] font-medium px-4"
              >
                <Wrench className="mr-2 h-4 w-4" />
                Get Service
              </Button>
              <Button 
                onClick={handleGetQuote}
                size="sm"
                className="bg-gradient-to-r from-[#8843F2] to-[#FF467E] hover:from-[#7335E8] hover:to-[#F03A6E] text-white shadow-lg font-['Inter'] font-medium px-6"
              >
                <Quote className="mr-2 h-4 w-4" />
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#8843F2] to-[#FF467E] rounded-xl flex items-center justify-center">
                      <AirVent className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2D3559] font-['Inter']">AC Services</h3>
                      <p className="text-xs text-gray-500">Professional Solutions</p>
                    </div>
                  </div>
                  
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors font-['Inter'] ${
                        location.pathname === item.path
                          ? 'text-[#8843F2] bg-gradient-to-r from-[#8843F2]/15 to-[#FF467E]/15'
                          : 'text-gray-700 hover:text-[#8843F2] hover:bg-gradient-to-r hover:from-[#8843F2]/10 hover:to-[#FF467E]/10'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <div className="pt-4 space-y-3">
                    <Button 
                      onClick={() => {
                        handleGetService();
                        setIsMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full border-[#8843F2] text-[#8843F2] hover:bg-[#8843F2] hover:text-white font-['Inter'] font-medium"
                    >
                      <Wrench className="mr-2 h-4 w-4" />
                      Get Service
                    </Button>
                    <Button 
                      onClick={() => {
                        handleGetQuote();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-[#8843F2] to-[#FF467E] hover:from-[#7335E8] hover:to-[#F03A6E] text-white font-['Inter'] font-medium"
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
      
      {/* Spacer */}
      <div className="h-24"></div>
    </>
  );
};

export default Header;
