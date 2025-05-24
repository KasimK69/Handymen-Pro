
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag, Clock, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Offer {
  id: number;
  title: string;
  description: string;
  cta: string;
  link: string;
  icon: React.ReactNode;
  bgColor: string;
}

const offers: Offer[] = [
  {
    id: 1,
    title: 'Summer Special Discount',
    description: 'Get 10% off on all AC installation and repair services',
    cta: 'Book Now',
    link: '/booking',
    icon: <Percent className="h-8 w-8 text-white" />,
    bgColor: 'bg-gradient-to-r from-orange-500 to-red-500',
  },
  {
    id: 2,
    title: 'Urgent Repair Services',
    description: 'Emergency repairs within 2 hours in Rawalpindi and Islamabad',
    cta: 'Call Now',
    link: 'tel:+923125242182',
    icon: <Clock className="h-8 w-8 text-white" />,
    bgColor: 'bg-gradient-to-r from-blue-600 to-indigo-600',
  },
  {
    id: 3,
    title: 'AC Pre-Summer Checkup',
    description: 'Ensure your AC is ready for summer - special maintenance package',
    cta: 'Learn More',
    link: '/services/ac-repair',
    icon: <Tag className="h-8 w-8 text-white" />,
    bgColor: 'bg-gradient-to-r from-emerald-500 to-teal-500',
  },
];

const SmartAdport = () => {
  const [currentOffer, setCurrentOffer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900 w-full">
      <div className="w-full px-4">
        <div 
          className={`rounded-lg p-6 shadow-lg overflow-hidden relative max-w-7xl mx-auto ${offers[currentOffer].bgColor} animate-fade-in`}
          key={offers[currentOffer].id}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="p-4 bg-white/20 rounded-full mr-5">
                {offers[currentOffer].icon}
              </div>
              <div className="text-white">
                <h3 className="text-xl md:text-2xl font-bold">{offers[currentOffer].title}</h3>
                <p className="text-white/90">{offers[currentOffer].description}</p>
              </div>
            </div>
            <Button 
              size="lg" 
              className="bg-white text-gray-800 hover:bg-white/90"
              asChild
            >
              <Link to={offers[currentOffer].link} className="flex items-center">
                {offers[currentOffer].cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="flex justify-center mt-4">
            {offers.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentOffer(index)}
                className={`h-2 w-2 mx-1 rounded-full ${currentOffer === index ? 'bg-white' : 'bg-white/50'}`}
                aria-label={`View offer ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartAdport;
