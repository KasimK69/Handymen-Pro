
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, AirVent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white dark:bg-gray-900 shadow-xl py-2 border-b border-gray-200 dark:border-gray-700' 
          : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm py-3'
      )}
    >
      <div className="w-full px-4 mx-auto flex justify-between items-center max-w-7xl">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center">
            <AirVent className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
            <span className="text-brand-red">AC</span>
            <span className="text-brand-blue">Services</span>
          </span>
        </Link>

        {/* Contact Info - Desktop */}
        <div className="hidden md:flex items-center">
          <a href="tel:+923125242182" className="mr-8 flex items-center text-gray-800 dark:text-gray-200 hover:text-brand-red transition-colors font-medium">
            <Phone className="h-4 w-4 mr-2" />
            <span className="font-semibold">+92 312 5242182</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <NavLink to="/" isActive={isActive('/')}>Home</NavLink>
          <NavLink to="/services" isActive={isActive('/services')}>AC Services</NavLink>
          <NavLink to="/ac-buy-and-sale" isActive={isActive('/ac-buy-and-sale')}>AC Buy & Sale</NavLink>
          <NavLink to="/blog" isActive={isActive('/blog')}>Blog</NavLink>
          <NavLink to="/contact" isActive={isActive('/contact')}>Contact</NavLink>
          <Button variant="default" className="ml-4 bg-brand-red hover:bg-brand-red/90 font-semibold text-white" asChild>
            <Link to="/booking" className="flex items-center">
              Get Quote
            </Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <a href="tel:+923125242182" className="mr-4 p-2 rounded-full bg-brand-red/10 text-brand-red">
            <Phone className="h-5 w-5" />
          </a>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
            className="text-gray-800 dark:text-gray-200"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 bg-white dark:bg-gray-900 z-40 transform transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center">
                <AirVent className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
                <span className="text-brand-red">AC</span>
                <span className="text-brand-blue">Services</span>
              </span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Close Menu"
              className="text-gray-800 dark:text-gray-200"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex flex-col space-y-6">
            <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)} isActive={isActive('/')}>Home</MobileNavLink>
            <MobileNavLink to="/services" onClick={() => setIsMobileMenuOpen(false)} isActive={isActive('/services')}>AC Services</MobileNavLink>
            <MobileNavLink to="/ac-buy-and-sale" onClick={() => setIsMobileMenuOpen(false)} isActive={isActive('/ac-buy-and-sale')}>AC Buy & Sale</MobileNavLink>
            <MobileNavLink to="/blog" onClick={() => setIsMobileMenuOpen(false)} isActive={isActive('/blog')}>Blog</MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)} isActive={isActive('/contact')}>Contact</MobileNavLink>
            <Link 
              to="/booking" 
              className="btn-primary flex justify-center items-center mt-4 bg-brand-red hover:bg-brand-red/90 text-white py-3 px-6 rounded-lg font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Quote
            </Link>
          </nav>
          <div className="mt-auto pt-8">
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <Phone className="h-5 w-5 text-brand-red mr-2" />
                <a href="tel:+923125242182" className="font-semibold text-gray-800 dark:text-gray-200">+92 312 5242182</a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bahria Town, Phase 8, Rawalpindi
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Serving Rawalpindi & Islamabad
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, children, isActive }: { to: string; children: React.ReactNode; isActive: boolean }) => (
  <Link 
    to={to}
    className={cn(
      "px-4 py-2 text-gray-800 hover:text-brand-red dark:text-gray-200 dark:hover:text-brand-red font-semibold transition-colors rounded-md relative",
      isActive && "text-brand-red bg-brand-red/10"
    )}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, onClick, children, isActive }: { 
  to: string; 
  onClick?: () => void;
  children: React.ReactNode;
  isActive: boolean;
}) => (
  <Link 
    to={to}
    className={cn(
      "text-xl font-semibold text-gray-800 dark:text-gray-200 hover:text-brand-red dark:hover:text-brand-red transition-colors py-2",
      isActive && "text-brand-red"
    )}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Header;
