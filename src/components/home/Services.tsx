
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
    id: 'plumbing',
    title: 'Plumbing Services',
    description: 'Professional plumbing solutions for leaks, installations, and repairs.',
    icon: '🔧',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'electrical',
    title: 'Electrical Work',
    description: 'Safe and reliable electrical repairs, installations and maintenance.',
    icon: '⚡',
    image: 'https://images.unsplash.com/photo-1621905252507-1a1a6bc3eee7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ac-repair',
    title: 'AC Repair & Installation',
    description: 'Expert AC services to keep your home cool and comfortable.',
    icon: '❄️',
    image: 'https://images.unsplash.com/photo-1581275299888-536227aac860?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'painting',
    title: 'Painting Services',
    description: 'Transform your space with professional painting services.',
    icon: '🎨',
    image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'carpentry',
    title: 'Carpentry',
    description: 'Custom woodwork, repairs, and installations by skilled carpenters.',
    icon: '🪚',
    image: 'https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'home-renovation',
    title: 'Home Renovation',
    description: 'Complete renovation solutions to transform your living space.',
    icon: '🏠',
    image: 'https://images.unsplash.com/photo-1574359411659-15573d93bd51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  }
];

const Services = () => {
  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Professional Services</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Comprehensive home improvement and repair services delivered by skilled professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
