
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
    id: 'plumbing',
    title: 'Plumbing Services',
    description: 'Expert plumbing repairs, installations, and maintenance services for your home or business. We handle everything from fixing leaks to complete bathroom renovations.',
    icon: '🔧',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'electrical',
    title: 'Electrical Work',
    description: 'Comprehensive electrical services including repairs, installations, upgrades, and maintenance. Our certified electricians ensure your home\'s electrical systems are safe and functional.',
    icon: '⚡',
    image: 'https://images.unsplash.com/photo-1621905252507-1a1a6bc3eee7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ac-repair',
    title: 'AC Repair & Installation',
    description: 'Keep your home comfortable with our AC repair, installation, and maintenance services. We work with all major brands and models to ensure optimal cooling performance.',
    icon: '❄️',
    image: 'https://images.unsplash.com/photo-1581275299888-536227aac860?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'painting',
    title: 'Painting Services',
    description: 'Transform your space with our professional painting services. From interior rooms to exterior facades, we deliver flawless finishes with premium paints and attention to detail.',
    icon: '🎨',
    image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'carpentry',
    title: 'Carpentry',
    description: 'Custom carpentry solutions including furniture building, repairs, custom shelving, and woodwork. Our skilled carpenters create beautiful and functional wood elements for your home.',
    icon: '🪚',
    image: 'https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'home-renovation',
    title: 'Home Renovation',
    description: 'Complete home renovation services from kitchen and bathroom remodels to whole-house renovations. We handle every aspect of your project from design to final finishes.',
    icon: '🏠',
    image: 'https://images.unsplash.com/photo-1574359411659-15573d93bd51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'flooring',
    title: 'Flooring Installation',
    description: 'Expert installation of various flooring materials including hardwood, laminate, tile, vinyl, and carpet. We ensure precise fitting and beautiful results for any room.',
    icon: '🧱',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'drywall',
    title: 'Drywall Repair',
    description: 'Professional drywall installation and repair services to fix holes, cracks, water damage, and other issues. We ensure seamless finishes that match your existing walls.',
    icon: '🧰',
    image: 'https://images.unsplash.com/photo-1632392176614-91c330f4c05d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'furniture-assembly',
    title: 'Furniture Assembly',
    description: 'Let our experts handle the assembly of your furniture items. We assemble all types of furniture from various manufacturers quickly and correctly.',
    icon: '🪑',
    image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
];

const Services = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-blue text-white py-24 md:py-32">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Professional Services</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Comprehensive handyman solutions for all your home improvement and repair needs.
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
