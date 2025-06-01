
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Phone, Mail, AirVent, Snowflake } from 'lucide-react';
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
    { name: 'Blogs', path: '/blog' },
  ];

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
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white/90 backdrop-blur-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Top Contact Bar */}
        <div className="bg-gradient-to-r from-[#2D3559] to-[#4CC9F0] text-white py-2 px-4">
          <div className="container mx-auto flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span>+92 312 5242182</span>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>info@acservices.pk</span>
              </div>
            </div>
            <div className="text-xs">
              ❄️ 24/7 Emergency AC Services Available
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#8843F2] to-[#FF467E] rounded-full flex items-center justify-center shadow-lg relative overflow-hidden">
                  <AirVent className="h-7 w-7 text-white z-10" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#4CC9F0] to-[#8843F2] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <Snowflake className="absolute top-1 right-1 h-3 w-3 text-blue-200 animate-pulse" />
                </div>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold leading-tight font-['Inter']">
                  <span className="text-[#2D3559]">AC</span>
                  <span className="text-gray-800"> Services</span>
                </h1>
                <p className="text-xs text-gray-500 -mt-1">& Repairs Pakistan</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group font-['Inter'] ${
                    location.pathname === item.path
                      ? 'text-[#8843F2] bg-gradient-to-r from-[#8843F2]/10 to-[#FF467E]/10'
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

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-3">
              <Button 
                onClick={handleGetConsultation}
                size="sm"
                className="bg-gradient-to-r from-[#8843F2] to-[#FF467E] hover:from-[#7335E8] hover:to-[#F03A6E] text-white shadow-lg font-['Inter'] font-medium px-6"
              >
                Get Free AC Consultation
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
                    <div className="w-10 h-10 bg-gradient-to-br from-[#8843F2] to-[#FF467E] rounded-full flex items-center justify-center">
                      <AirVent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2D3559] font-['Inter']">AC Services</h3>
                      <p className="text-xs text-gray-500">& Repairs Pakistan</p>
                    </div>
                  </div>
                  
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors font-['Inter'] ${
                        location.pathname === item.path
                          ? 'text-[#8843F2] bg-gradient-to-r from-[#8843F2]/10 to-[#FF467E]/10'
                          : 'text-gray-700 hover:text-[#8843F2] hover:bg-gradient-to-r hover:from-[#8843F2]/10 hover:to-[#FF467E]/10'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <div className="pt-4 space-y-3">
                    <Button 
                      onClick={() => {
                        handleGetConsultation();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-[#8843F2] to-[#FF467E] hover:from-[#7335E8] hover:to-[#F03A6E] text-white font-['Inter'] font-medium"
                    >
                      Get Free AC Consultation
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>
      
      {/* Spacer */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;
