
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue text-white pt-16 pb-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-heading font-bold">
                <span className="text-brand-red">Pro</span>Handyman
              </span>
            </Link>
            <p className="mb-6 text-gray-300 leading-relaxed">
              Professional handyman services tailored to your needs in Rawalpindi and Islamabad. Quality workmanship guaranteed with over 15 years of industry experience.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook className="w-5 h-5" />} href="#" />
              <SocialLink icon={<Instagram className="w-5 h-5" />} href="#" />
              <SocialLink icon={<Twitter className="w-5 h-5" />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/services">Services</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/ac-sale">AC Units</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/booking">Book Now</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <FooterLink to="/services/plumbing">Plumbing</FooterLink>
              <FooterLink to="/services/electrical">Electrical</FooterLink>
              <FooterLink to="/services/ac-repair">AC Repair</FooterLink>
              <FooterLink to="/services/painting">Painting</FooterLink>
              <FooterLink to="/services/carpentry">Carpentry</FooterLink>
              <FooterLink to="/services/home-renovation">Home Renovation</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-brand-red shrink-0" />
                <a href="tel:+923125242182" className="hover:text-brand-red transition-colors">+92 312 5242182</a>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-brand-red shrink-0" />
                <span>info@prohandyman.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-brand-red shrink-0" />
                <span>Bahria Town, Phase 8, Rawalpindi, Pakistan</span>
              </li>
              <li className="flex items-start">
                <Clock className="w-5 h-5 mr-3 text-brand-red shrink-0" />
                <span>Mon-Fri: 8am-6pm<br />Sat: 9am-4pm</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-300">Service Areas: Rawalpindi and Islamabad Only</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© {currentYear} Handyman Pro Services. All rights reserved.</p>
          <div className="flex mt-4 md:mt-0">
            <Link to="/privacy-policy" className="mr-6 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link to={to} className="hover:text-brand-red transition-colors">
      {children}
    </Link>
  </li>
);

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="bg-gray-700 p-2 rounded-full hover:bg-brand-red transition-colors"
  >
    {icon}
  </a>
);

export default Footer;
