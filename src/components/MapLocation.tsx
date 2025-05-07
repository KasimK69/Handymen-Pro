
import React from 'react';

interface MapLocationProps {
  title?: string;
  subtitle?: string;
}

const MapLocation: React.FC<MapLocationProps> = ({ 
  title = "Find Us",
  subtitle = "Visit our location in Bahria Town Phase 8, Rawalpindi"
}) => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-brand-blue">{title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">{subtitle}</p>
        </div>
        
        <div className="relative h-[450px] rounded-xl overflow-hidden shadow-xl">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13324.734904860364!2d72.99433293697576!3d33.52846351263108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfec1a8dec6b6b%3A0x3c6cf9d57411eb08!2sBahria%20Town%20Phase%208%2C%20Rawalpindi%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1695275536535!5m2!1sen!2s" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title="AC Services Location"
          ></iframe>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">Address</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Office #123, Block A<br />
              Bahria Town Phase 8<br />
              Rawalpindi, Pakistan
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">Working Hours</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Monday - Friday: 8:00 AM - 6:00 PM<br />
              Saturday: 9:00 AM - 4:00 PM<br />
              Sunday: Closed (Emergency Service Available)
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">Contact Info</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Phone: <a href="tel:+923125242182" className="text-brand-red">+92 312 5242182</a><br />
              Email: <a href="mailto:info@acservices.pk" className="text-brand-red">info@acservices.pk</a><br />
              WhatsApp: <a href="https://wa.me/923125242182" className="text-brand-red">+92 312 5242182</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapLocation;
