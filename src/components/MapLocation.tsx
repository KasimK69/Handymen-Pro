
import React from 'react';
import { MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface MapLocationProps {
  title?: string;
  subtitle?: string;
}

const MapLocation: React.FC<MapLocationProps> = ({ 
  title = "Visit Our Location",
  subtitle = "Find our AC Service Center in Bahria Town Phase 8, Rawalpindi"
}) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-2 text-brand-blue">{title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">{subtitle}</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="relative h-[450px] rounded-xl overflow-hidden shadow-xl border-4 border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13324.734904860364!2d72.99433293697576!3d33.52846351263108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfec1a8dec6b6b%3A0x3c6cf9d57411eb08!2sBahria%20Town%20Phase%208%2C%20Rawalpindi%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1695275536535!5m2!1sen!2s" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="AC Services Location"
              ></iframe>
              
              <div className="absolute top-4 right-4">
                <Button 
                  className="bg-white text-brand-blue hover:bg-brand-blue hover:text-white transition-colors shadow-md"
                  size="sm"
                  onClick={() => window.open('https://maps.app.goo.gl/4CkLPCZFJcbC3ku56', '_blank')}
                >
                  <Navigation className="mr-2 h-4 w-4" />
                  Get Directions
                </Button>
              </div>
            </div>
          </motion.div>
          
          <div className="space-y-6">
            <LocationCard 
              icon={<MapPin className="h-6 w-6 text-brand-blue" />}
              iconBg="bg-brand-blue/10"
              title="Our Address"
              delay={0}
            >
              <p className="text-gray-600 dark:text-gray-400">
                AC Service Center<br />
                Block A, Bahria Town Phase 8<br />
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
            </LocationCard>
            
            <LocationCard 
              icon={<Clock className="h-6 w-6 text-brand-red" />}
              iconBg="bg-brand-red/10"
              title="Working Hours"
              delay={0.1}
            >
              <p className="text-gray-600 dark:text-gray-400">
                Monday - Friday: 8:00 AM - 6:00 PM<br />
                Saturday: 9:00 AM - 4:00 PM<br />
                Sunday: Closed (Emergency Service Available)
              </p>
            </LocationCard>
            
            <LocationCard 
              icon={<Phone className="h-6 w-6 text-green-600" />}
              iconBg="bg-green-100"
              title="Contact Info"
              delay={0.2}
            >
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                Phone: <a href="tel:+923125242182" className="text-brand-red hover:underline">+92 312 5242182</a>
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                Email: <a href="mailto:info@acservices.pk" className="text-brand-red hover:underline">info@acservices.pk</a>
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                WhatsApp: <a href="https://wa.me/923125242182" className="text-brand-red hover:underline">+92 312 5242182</a>
              </p>
            </LocationCard>
          </div>
        </div>
      </div>
    </section>
  );
};

interface LocationCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

const LocationCard: React.FC<LocationCardProps> = ({ icon, iconBg, title, children, delay = 0 }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex items-start">
        <div className={`${iconBg} p-3 rounded-full mr-4`}>
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default MapLocation;
