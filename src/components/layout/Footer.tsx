
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AC Services</h3>
            <p className="text-gray-400">
              Professional AC installation, repair, and maintenance services in Pakistan.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-400 hover:text-white">Services</Link></li>
              <li><Link to="/ac-buy-and-sale" className="text-gray-400 hover:text-white">Buy & Sell</Link></li>
              <li><Link to="/blogs" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400">AC Installation</span></li>
              <li><span className="text-gray-400">AC Repair</span></li>
              <li><span className="text-gray-400">AC Maintenance</span></li>
              <li><span className="text-gray-400">AC Cleaning</span></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">+92 312 5242182</li>
              <li className="text-gray-400">info@acservices.com.pk</li>
              <li className="text-gray-400">Islamabad, Pakistan</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 AC Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
