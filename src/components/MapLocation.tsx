
import React from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
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
          </div>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="flex items-start">
                <div className="bg-brand-blue/10 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Our Address</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Office #123, Block A<br />
                    Bahria Town Phase 8<br />
                    Rawalpindi, Pakistan
                  </p>
                  <a 
                    href="https://maps.app.goo.gl/4CkLPCZFJcbC3ku56" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-blue hover:underline mt-2 inline-block text-sm"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="flex items-start">
                <div className="bg-brand-red/10 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-brand-red" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Working Hours</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Monday - Friday: 8:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 4:00 PM<br />
                    Sunday: Closed (Emergency Service Available)
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Contact Info</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">
                    Phone: <a href="tel:+923125242182" className="text-brand-red hover:underline">+92 312 5242182</a>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">
                    Email: <a href="mailto:info@acservices.pk" className="text-brand-red hover:underline">info@acservices.pk</a>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    WhatsApp: <a href="https://wa.me/923125242182" className="text-brand-red hover:underline">+92 312 5242182</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapLocation;
