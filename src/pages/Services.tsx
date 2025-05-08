
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Star, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import ServiceModal from '@/components/services/ServiceModal';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  price?: string;
  features?: string[];
}

const services: Service[] = [
  {
    id: 'ac-installation',
    title: 'AC Installation',
    description: 'Professional installation services for all AC brands and models. Our certified technicians ensure proper setup, positioning, and configuration for optimal cooling efficiency and longevity of your AC unit.',
    icon: '❄️',
    image: 'https://images.unsplash.com/photo-1581275299888-536227aac860?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    price: 'From PKR 3,000',
    features: [
      'Expert installation for all brands',
      'Copper piping & electrical work',
      '90-day installation warranty',
      'Free site inspection'
    ]
  },
  {
    id: 'ac-repair',
    title: 'AC Repair',
    description: 'Expert AC repair services for all makes and models. From minor issues to major malfunctions, our technicians diagnose and fix problems quickly to restore your comfort with minimal disruption.',
    icon: '🔧',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    price: 'From PKR 1,500',
    features: [
      'Same day emergency service',
      'All brands & models covered',
      'Genuine spare parts used',
      'Professional technicians'
    ]
  },
  {
    id: 'gas-refill',
    title: 'AC Gas Refill',
    description: 'Professional refrigerant refill services to restore optimal cooling performance. Our technicians check for leaks, repair if needed, and refill your AC system with the correct type and amount of refrigerant.',
    icon: '💨',
    image: 'https://images.unsplash.com/photo-1617992462188-361a6e46f47d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    price: 'From PKR 2,500',
    features: [
      'Complete gas charging',
      'Leak detection & repair',
      'Cooling performance test',
      'Environment friendly gases'
    ]
  },
  {
    id: 'ac-maintenance',
    title: 'AC Maintenance',
    description: 'Preventative maintenance services to keep your AC running efficiently. Regular servicing helps prevent breakdowns, extends the lifespan of your unit, and ensures optimal cooling performance year-round.',
    icon: '🛠️',
    image: 'https://images.unsplash.com/photo-1621905252507-1a1a6bc3eee7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    price: 'From PKR 2,000',
    features: [
      'Deep cleaning of all parts',
      'Filter cleaning & replacement',
      'Coil cleaning & sanitizing',
      'Annual maintenance contracts'
    ]
  },
  {
    id: 'ac-troubleshooting',
    title: 'AC Troubleshooting',
    description: 'Comprehensive diagnostic services to identify AC issues. Our skilled technicians use advanced tools and techniques to accurately diagnose and resolve complex problems with your air conditioning system.',
    icon: '🔍',
    image: 'https://images.unsplash.com/photo-1595877244574-e90ce41a1e5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    price: 'From PKR 1,000',
    features: [
      'Advanced diagnostic tools',
      'Complete system check',
      'Expert technical advice',
      'Fixed price quotes'
    ]
  },
  {
    id: 'commercial-ac',
    title: 'Commercial AC Services',
    description: 'Specialized AC services for businesses and commercial properties. We provide installation, maintenance, and repair for commercial AC systems, ensuring minimal disruption to your operations.',
    icon: '🏢',
    image: 'https://images.unsplash.com/photo-1495434942214-9b582186bad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    price: 'Custom Quotes',
    features: [
      'Business & commercial solutions',
      'Maintenance contracts available',
      'After-hours servicing',
      'Multiple unit discounts'
    ]
  }
];

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openServiceModal = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-blue/80 text-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Professional AC Services in Rawalpindi & Islamabad
            </h1>
            <p className="text-xl opacity-90 leading-relaxed mb-8">
              Comprehensive air conditioning solutions for all your cooling needs.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Search for services..."
                className="pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:ring-brand-red focus:border-brand-red rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {filteredServices.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredServices.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  onClick={() => openServiceModal(service)}
                  variants={itemVariants}
                />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-4">No services found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                We couldn't find any services matching your search criteria.
              </p>
              <Button onClick={() => setSearchTerm('')}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Ahmed Khan"
              role="Homeowner"
              image="https://randomuser.me/api/portraits/men/32.jpg"
              text="The AC technicians were professional, punctual, and did an excellent job installing my new AC unit. Very satisfied with their service!"
              rating={5}
            />
            
            <TestimonialCard
              name="Sara Ali"
              role="Business Owner"
              image="https://randomuser.me/api/portraits/women/44.jpg"
              text="They've been maintaining our office ACs for over a year now. Always reliable and knowledgeable. Highly recommend their maintenance services."
              rating={5}
            />
            
            <TestimonialCard
              name="Mohammad Tariq"
              role="Property Manager"
              image="https://randomuser.me/api/portraits/men/22.jpg"
              text="Quick response time for emergency repairs. The technicians are well-trained and fixed our AC issues efficiently. Great service overall."
              rating={4}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-brand-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Professional AC Services?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and get your AC issues resolved by certified professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-brand-red hover:bg-brand-red/90 text-white" asChild>
              <Link to="/booking">Book a Service</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <a href="tel:+923125242182">Call Us Now</a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Service Modal */}
      {selectedService && (
        <ServiceModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          service={selectedService} 
        />
      )}
    </>
  );
};

// Card components for the Service page
const ServiceCard = ({ service, onClick, variants }: { service: Service; onClick: () => void; variants: any }) => {
  return (
    <motion.div variants={variants}>
      <Card className="h-full group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
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
          {service.price && (
            <div className="absolute top-4 right-4 bg-brand-red text-white px-3 py-1 rounded-full text-sm font-medium">
              {service.price}
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2">{service.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{service.description}</p>
          
          {service.features && (
            <div className="mb-4">
              {service.features.slice(0, 2).map((feature, idx) => (
                <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <CheckCircle className="h-4 w-4 text-brand-red mr-2 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}
          
          <Button 
            variant="link" 
            className="flex items-center text-brand-red hover:text-brand-red/80 font-medium transition-colors p-0"
            onClick={onClick}
          >
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const TestimonialCard = ({ 
  name, 
  role, 
  image, 
  text, 
  rating 
}: { 
  name: string; 
  role: string; 
  image: string; 
  text: string; 
  rating: number;
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover mr-4" />
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{role}</p>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 mb-4 italic">"{text}"</p>
      
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
