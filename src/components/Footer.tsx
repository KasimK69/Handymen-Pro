
import React from 'react';
import { Link } from 'react-router-dom';
import { AirVent, Phone, Mail, MapPin, Clock, Snowflake, Star, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10">
          <AirVent className="h-32 w-32 text-white animate-pulse" />
        </div>
        <div className="absolute top-20 right-20">
          <Snowflake className="h-24 w-24 text-white animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <div className="absolute bottom-20 left-1/4">
          <AirVent className="h-28 w-28 text-white opacity-50" />
        </div>
        <div className="absolute bottom-10 right-1/3">
          <Snowflake className="h-20 w-20 text-white animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-gradient-to-r from-brand-blue to-brand-red rounded-full flex items-center justify-center shadow-lg">
                <AirVent className="h-8 w-8 text-white" />
              </div>
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
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-400">4.9/5 Rating • 500+ Happy Customers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'AC Services', path: '/services' },
                { name: 'AC Buy & Sale', path: '/ac-buy-and-sale' },
                { name: 'Blog', path: '/blog' },
                { name: 'Contact Us', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-brand-blue transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-brand-blue rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Our Services</h4>
            <ul className="space-y-3">
              {[
                'AC Installation',
                'AC Repair & Maintenance',
                'Premium AC Sales',
                'AC Gas Refilling',
                'Emergency AC Service',
                'AC Consultation'
              ].map((service) => (
                <li key={service} className="text-gray-300 flex items-center group">
                  <span className="w-2 h-2 bg-brand-red rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-6 w-6 text-brand-blue mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold">+92 312 5242182</p>
                  <p className="text-gray-400 text-sm">24/7 Emergency Service</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-6 w-6 text-brand-blue mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white">info@acservices.pk</p>
                  <p className="text-gray-400 text-sm">Get free consultation</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-brand-blue mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white">Bahria Town, Phase 8</p>
                  <p className="text-gray-400 text-sm">Rawalpindi, Pakistan</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-6 w-6 text-brand-blue mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white">Mon - Sun: 8:00 AM - 10:00 PM</p>
                  <p className="text-gray-400 text-sm">Emergency: 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-brand-blue to-brand-red rounded-2xl p-8 shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Need AC Service Right Now?</h3>
            <p className="text-xl mb-6 opacity-90">
              Get instant quote and professional AC service in Islamabad & Rawalpindi
            </p>
            <a
              href="https://wa.me/923125242182?text=Hi! I need AC service. Please provide me with more details."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              WhatsApp Us Now
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              © {currentYear} AC Services & Repairs. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
