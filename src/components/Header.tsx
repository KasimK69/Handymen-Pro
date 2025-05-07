
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white dark:bg-gray-900 shadow-md py-4' 
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-heading font-bold text-brand-blue">
            <span className="text-brand-red">AC</span>Services
          </span>
        </Link>

        {/* Contact Info - Desktop */}
        <div className="hidden md:flex items-center">
          <a href="tel:+923125242182" className="mr-8 flex items-center text-gray-700 dark:text-gray-200 hover:text-brand-red transition-colors">
            <Phone className="h-4 w-4 mr-2" />
            <span>+92 312 5242182</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/ac-sale">AC Units</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <Button variant="default" className="ml-4 bg-brand-red hover:bg-brand-red/90" asChild>
            <Link to="/booking" className="flex items-center">
              Book Now
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
            <Link to="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="text-2xl font-heading font-bold text-brand-blue">
                <span className="text-brand-red">AC</span>Services
              </span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Close Menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex flex-col space-y-6">
            <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/services" onClick={() => setIsMobileMenuOpen(false)}>Services</MobileNavLink>
            <MobileNavLink to="/ac-sale" onClick={() => setIsMobileMenuOpen(false)}>AC Units</MobileNavLink>
            <MobileNavLink to="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</MobileNavLink>
            <Link 
              to="/booking" 
              className="btn-primary flex justify-center items-center mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Now
            </Link>
          </nav>
          <div className="mt-auto pt-8">
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <Phone className="h-5 w-5 text-brand-red mr-2" />
                <a href="tel:+923125242182" className="font-medium">+92 312 5242182</a>
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

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to}
    className="px-3 py-2 text-gray-700 hover:text-brand-red dark:text-gray-200 dark:hover:text-brand-red font-medium transition-colors"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, onClick, children }: { 
  to: string; 
  onClick?: () => void;
  children: React.ReactNode;
}) => (
  <Link 
    to={to}
    className="text-xl font-medium text-gray-800 dark:text-gray-200 hover:text-brand-red dark:hover:text-brand-red transition-colors"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Header;
