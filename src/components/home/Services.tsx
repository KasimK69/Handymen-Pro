
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    description: 'Professional installation services for all AC brands and models with expert setup and configuration.',
    icon: '❄️',
    image: 'https://images.unsplash.com/photo-1581275299888-536227aac860?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ac-repair',
    title: 'AC Repair',
    description: 'Fast and reliable repair services to fix any AC issues and restore optimal cooling performance.',
    icon: '🔧',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gas-refill',
    title: 'AC Gas Refill',
    description: 'Expert refrigerant refill services to ensure your AC maintains maximum cooling efficiency.',
    icon: '💨',
    image: 'https://images.unsplash.com/photo-1617992462188-361a6e46f47d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  }
];

const Services = () => {
  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Our AC Services</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Expert AC installation, repair, and maintenance services delivered by certified professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white" asChild>
            <Link to="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative h-52 overflow-hidden">
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
