
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

const services: Service[] = [
  {
    id: 'ac-installation',
    title: 'AC Installation',
    description: 'Professional installation services for all AC brands and models. Our certified technicians ensure proper setup, positioning, and configuration for optimal cooling efficiency and longevity of your AC unit.',
    icon: '❄️',
    image: 'https://images.unsplash.com/photo-1581275299888-536227aac860?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ac-repair',
    title: 'AC Repair',
    description: 'Expert AC repair services for all makes and models. From minor issues to major malfunctions, our technicians diagnose and fix problems quickly to restore your comfort with minimal disruption.',
    icon: '🔧',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gas-refill',
    title: 'AC Gas Refill',
    description: 'Professional refrigerant refill services to restore optimal cooling performance. Our technicians check for leaks, repair if needed, and refill your AC system with the correct type and amount of refrigerant.',
    icon: '💨',
    image: 'https://images.unsplash.com/photo-1617992462188-361a6e46f47d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ac-maintenance',
    title: 'AC Maintenance',
    description: 'Preventative maintenance services to keep your AC running efficiently. Regular servicing helps prevent breakdowns, extends the lifespan of your unit, and ensures optimal cooling performance year-round.',
    icon: '🛠️',
    image: 'https://images.unsplash.com/photo-1621905252507-1a1a6bc3eee7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ac-troubleshooting',
    title: 'AC Troubleshooting',
    description: 'Comprehensive diagnostic services to identify AC issues. Our skilled technicians use advanced tools and techniques to accurately diagnose and resolve complex problems with your air conditioning system.',
    icon: '🔍',
    image: 'https://images.unsplash.com/photo-1595877244574-e90ce41a1e5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'commercial-ac',
    title: 'Commercial AC Services',
    description: 'Specialized AC services for businesses and commercial properties. We provide installation, maintenance, and repair for commercial AC systems, ensuring minimal disruption to your operations.',
    icon: '🏢',
    image: 'https://images.unsplash.com/photo-1495434942214-9b582186bad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  }
];

const Services = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-blue text-white py-24 md:py-32">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Professional AC Services</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Comprehensive air conditioning solutions for all your cooling needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 rounded-full p-3 shadow-md">
          <span className="text-2xl" role="img" aria-label={service.title}>{service.icon}</span>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
        <Link 
          to={`/services/${service.id}`}
          className="flex items-center text-brand-red hover:text-brand-red/80 font-medium transition-colors"
        >
          Learn More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default Services;
