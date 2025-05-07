
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ServiceModal from '@/components/services/ServiceModal';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  details?: string;
  features?: string[];
  images?: string[];
}

const services: Service[] = [
  {
    id: 'ac-installation',
    title: 'AC Installation',
    description: 'Professional installation services for all AC brands and models with expert setup and configuration.',
    icon: '❄️',
    image: 'https://images.unsplash.com/photo-1581275299888-536227aac860?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    details: 'Our certified technicians provide comprehensive AC installation services for all brands and models. We ensure proper positioning, secure mounting, and optimal configuration to maximize cooling efficiency and minimize energy consumption.',
    features: [
      'Free pre-installation site assessment',
      'Proper unit sizing and capacity calculation',
      'Professional mounting and securing',
      'Electrical connection and safety testing',
      'System calibration and testing',
      'Cleanup and removal of packaging materials'
    ],
    images: [
      'https://images.unsplash.com/photo-1581275299888-536227aac860?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613274554329-70f997f5789f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622390631668-5cdeb9e20e95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504198266287-1659872e6590?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'ac-repair',
    title: 'AC Repair',
    description: 'Fast and reliable repair services to fix any AC issues and restore optimal cooling performance.',
    icon: '🔧',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    details: 'Our expert technicians quickly diagnose and repair all types of AC issues, from minor problems to major malfunctions. We use advanced diagnostic tools and carry genuine parts to ensure lasting repairs.',
    features: [
      'Same-day emergency repairs',
      'Comprehensive system diagnostic',
      'Genuine replacement parts',
      'Repair of all major brands and models',
      'Post-repair performance testing',
      '90-day warranty on all repairs'
    ],
    images: [
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574269910231-bc508bcb68d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'gas-refill',
    title: 'AC Gas Refill',
    description: 'Expert refrigerant refill services to ensure your AC maintains maximum cooling efficiency.',
    icon: '💨',
    image: 'https://images.unsplash.com/photo-1617992462188-361a6e46f47d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    details: 'Our professional gas refill service ensures your AC system operates at peak efficiency. We check for leaks, repair if necessary, and refill with the correct type and amount of refrigerant for your specific unit.',
    features: [
      'Leak detection and repair',
      'Environmentally friendly handling of refrigerants',
      'Precise refrigerant measurement and filling',
      'System pressure testing',
      'Performance optimization',
      'Usage of quality refrigerants only'
    ],
    images: [
      'https://images.unsplash.com/photo-1617992462188-361a6e46f47d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599696850648-820dec8f689d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541690983760-fcbcbfe770e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'ac-maintenance',
    title: 'AC Maintenance',
    description: 'Regular maintenance services to keep your AC running efficiently and extend its lifespan.',
    icon: '🛠️',
    image: 'https://images.unsplash.com/photo-1621905252507-1a1a6bc3eee7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    details: "Regular maintenance is the key to extending your AC system's lifespan and preventing costly breakdowns. Our comprehensive maintenance service includes cleaning, inspection, and tuning to ensure optimal performance.",
    features: [
      'Filter cleaning or replacement',
      'Coil cleaning (evaporator and condenser)',
      'Checking refrigerant levels',
      'Inspecting electrical components',
      'Thermostat calibration',
      'Comprehensive 20-point inspection'
    ],
    images: [
      'https://images.unsplash.com/photo-1621905252507-1a1a6bc3eee7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566752229-250ed79470f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617968763460-d5189212c822?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599696848906-82213ba65b0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'ac-troubleshooting',
    title: 'AC Troubleshooting',
    description: 'Expert diagnostics to identify and resolve complex AC issues for optimal performance.',
    icon: '🔍',
    image: 'https://images.unsplash.com/photo-1595877244574-e90ce41a1e5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    details: 'Our skilled technicians use advanced diagnostic tools and their extensive experience to identify and resolve even the most complex AC issues. We can troubleshoot unusual noises, inconsistent cooling, water leaks, and more.',
    features: [
      'Advanced electronic diagnostics',
      'Thermal imaging inspection',
      'Air flow measurement and analysis',
      'Electrical component testing',
      'Control system diagnostics',
      'Detailed problem reports with recommendations'
    ],
    images: [
      'https://images.unsplash.com/photo-1595877244574-e90ce41a1e5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1624396963238-df0e48367ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'commercial-ac',
    title: 'Commercial AC Services',
    description: 'Specialized solutions for businesses with minimal disruption to operations.',
    icon: '🏢',
    image: 'https://images.unsplash.com/photo-1495434942214-9b582186bad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    details: 'Our commercial AC services are tailored to meet the needs of businesses of all sizes. We understand the importance of maintaining a comfortable environment for employees and customers while minimizing disruption to your operations.',
    features: [
      'After-hours servicing option',
      'Specialized commercial equipment expertise',
      'Preventative maintenance contracts',
      'Energy efficiency assessments',
      'Rapid response emergency service',
      'Custom solutions for specific business needs'
    ],
    images: [
      'https://images.unsplash.com/photo-1495434942214-9b582186bad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22731c9c9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ]
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openServiceModal = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeServiceModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Our AC Services</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Expert AC installation, repair, and maintenance services delivered by certified professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service}
              onClick={() => openServiceModal(service)} 
            />
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

      {selectedService && (
        <ServiceModal 
          isOpen={isModalOpen} 
          onClose={closeServiceModal} 
          service={selectedService} 
        />
      )}
    </section>
  );
};

const ServiceCard = ({ service, onClick }: { service: Service; onClick: () => void }) => {
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
        <Button 
          variant="link" 
          className="flex items-center text-brand-red hover:text-brand-red/80 font-medium transition-colors p-0"
          onClick={onClick}
        >
          Learn More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Services;
