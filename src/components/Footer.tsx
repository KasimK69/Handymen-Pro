
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageCircle, Star, AirVent, Snowflake } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const handleGetQuote = () => {
    const message = "Hi! I'm interested in your AC services. Can you provide more information and pricing?";
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleExploreACs = () => {
    window.location.href = '/ac-buy-and-sale';
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 opacity-10">
          <AirVent className="h-24 w-24 text-brand-blue" />
        </div>
        <div className="absolute top-20 right-20 opacity-10">
          <Snowflake className="h-16 w-16 text-brand-red animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <div className="absolute bottom-10 left-1/3 opacity-10">
          <AirVent className="h-20 w-20 text-white" />
        </div>
      </div>
      
      <div className="relative w-full px-4 mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center mr-3">
                <AirVent className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-heading font-bold">
                <span className="text-brand-red">AC</span>
                <span className="text-white">Services</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Leading AC buy & sale platform in Islamabad and Rawalpindi. Premium air conditioners with professional installation, repair, and maintenance services.
            </p>
            <div className="flex items-center mb-4">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <Star className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-sm text-gray-300">4.9/5 Customer Rating</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-brand-red transition-colors font-medium flex items-center"><span className="mr-2">🏠</span>Home</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-brand-red transition-colors font-medium flex items-center"><span className="mr-2">🔧</span>AC Services</Link></li>
              <li><Link to="/ac-buy-and-sale" className="text-gray-300 hover:text-brand-red transition-colors font-medium flex items-center"><span className="mr-2">❄️</span>AC Buy & Sale</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-brand-red transition-colors font-medium flex items-center"><span className="mr-2">📰</span>AC Tips Blog</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-brand-red transition-colors font-medium flex items-center"><span className="mr-2">📞</span>Contact Us</Link></li>
              <li><Link to="/booking" className="text-gray-300 hover:text-brand-red transition-colors font-medium flex items-center"><span className="mr-2">📋</span>Get Quote</Link></li>
            </ul>
          </div>

          {/* AC Buy & Sale */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white flex items-center">
              <AirVent className="h-5 w-5 mr-2" />
              AC Buy & Sale
            </h3>
            <ul className="space-y-3">
              <li><span className="text-gray-300 font-medium">Premium New AC Units</span></li>
              <li><span className="text-gray-300 font-medium">Quality Used ACs</span></li>
              <li><span className="text-gray-300 font-medium">AC Installation Service</span></li>
              <li><span className="text-gray-300 font-medium">AC Repair & Maintenance</span></li>
              <li><span className="text-gray-300 font-medium">AC Trade-in Program</span></li>
              <li><span className="text-gray-300 font-medium">Emergency AC Support</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-brand-red mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <a href="tel:+923125242182" className="text-gray-300 hover:text-white transition-colors font-medium">
                    +92 312 5242182
                  </a>
                  <p className="text-sm text-gray-400">24/7 AC Emergency Service</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-brand-red mt-0.5 mr-3 flex-shrink-0" />
                <a href="mailto:info@acservices.pk" className="text-gray-300 hover:text-white transition-colors font-medium">
                  info@acservices.pk
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-brand-red mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-gray-300 font-medium">
                  <p>Bahria Town, Phase 8</p>
                  <p>Rawalpindi, Pakistan</p>
                  <p className="text-sm text-gray-400 mt-1">Serving Islamabad & Rawalpindi</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-brand-red mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-gray-300 font-medium">
                  <p>Mon - Sat: 8:00 AM - 8:00 PM</p>
                  <p>Sunday: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="bg-gradient-to-r from-brand-blue via-purple-600 to-brand-red rounded-xl p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="flex items-center space-x-2">
                  <AirVent className="h-8 w-8 text-white" />
                  <Snowflake className="h-6 w-6 text-white animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">Need AC Services or Looking for Quality AC Units?</h3>
              <p className="mb-6 text-blue-100 text-lg">Get instant quotes for AC services or explore our premium AC buy & sale collection in Islamabad & Rawalpindi</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-brand-blue hover:bg-gray-100 font-semibold shadow-lg"
                  onClick={handleGetQuote}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Get AC Service Quote
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-brand-blue font-semibold"
                  onClick={handleExploreACs}
                >
                  <AirVent className="mr-2 h-5 w-5" />
                  Explore AC Buy & Sale
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 AC Services. All rights reserved. | Premium AC Buy & Sale Solutions in Islamabad & Rawalpindi
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors font-medium">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors font-medium">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors font-medium">AC Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
