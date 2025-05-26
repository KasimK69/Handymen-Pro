
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wrench, 
  AirVent, 
  Snowflake, 
  ShieldCheck, 
  Clock, 
  Star,
  Phone,
  MessageSquare,
  CheckCircle,
  X,
  Calendar,
  MapPin,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from '@/hooks/use-toast';

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  icon: React.ReactNode;
  features: string[];
  detailedDescription: string;
  whatsIncluded: string[];
  warranty: string;
  image: string;
}

const services: Service[] = [
  {
    id: 'ac-installation',
    title: 'AC Installation',
    description: 'Professional installation of new air conditioning units with warranty.',
    price: 'From PKR 8,000',
    duration: '2-4 hours',
    icon: <AirVent className="h-8 w-8" />,
    features: ['Professional Setup', 'Warranty Included', 'Quality Materials', 'Expert Technicians'],
    detailedDescription: 'Our certified technicians provide complete AC installation services with professional-grade materials and equipment. We ensure optimal placement, proper electrical connections, and efficient cooling performance.',
    whatsIncluded: [
      'Site inspection and measurement',
      'Professional mounting and setup',
      'Electrical connections and testing',
      'Refrigerant charging and leak testing',
      'System performance optimization',
      'Cleanup and debris removal',
      '6-month installation warranty'
    ],
    warranty: '6 months on installation work',
    image: 'https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ac-repair',
    title: 'AC Repair & Maintenance',
    description: 'Expert repair services for all AC brands with genuine parts.',
    price: 'From PKR 2,500',
    duration: '1-3 hours',
    icon: <Wrench className="h-8 w-8" />,
    features: ['All Brands', 'Genuine Parts', 'Quick Service', '24/7 Support'],
    detailedDescription: 'Comprehensive repair and maintenance services for all AC brands. Our experienced technicians diagnose and fix issues quickly using genuine parts and modern tools.',
    whatsIncluded: [
      'Complete system diagnosis',
      'Repair of faulty components',
      'Cleaning of filters and coils',
      'Refrigerant level check and top-up',
      'Electrical connections inspection',
      'Performance testing and optimization',
      '3-month repair warranty'
    ],
    warranty: '3 months on repaired parts',
    image: 'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ac-gas-refilling',
    title: 'AC Gas Refilling',
    description: 'Professional refrigerant charging for optimal cooling performance.',
    price: 'From PKR 4,000',
    duration: '1-2 hours',
    icon: <Snowflake className="h-8 w-8" />,
    features: ['Quality Refrigerant', 'Leak Detection', 'Pressure Testing', 'Performance Check'],
    detailedDescription: 'Professional refrigerant charging service to restore your AC\'s cooling efficiency. We use quality refrigerants and perform leak detection to ensure long-lasting results.',
    whatsIncluded: [
      'System pressure testing',
      'Leak detection and repair',
      'Refrigerant evacuation if needed',
      'Fresh refrigerant charging',
      'System performance testing',
      'Cooling efficiency verification',
      '1-month gas refill warranty'
    ],
    warranty: '1 month on gas refill service',
    image: 'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ac-deep-cleaning',
    title: 'AC Deep Cleaning',
    description: 'Thorough cleaning service for improved air quality and efficiency.',
    price: 'From PKR 3,500',
    duration: '2-3 hours',
    icon: <ShieldCheck className="h-8 w-8" />,
    features: ['Deep Sanitization', 'Filter Replacement', 'Coil Cleaning', 'Improved Air Quality'],
    detailedDescription: 'Complete deep cleaning service that removes dust, bacteria, and allergens from your AC system. Improves air quality and cooling efficiency significantly.',
    whatsIncluded: [
      'Complete system disassembly',
      'Deep cleaning of all components',
      'Anti-bacterial treatment',
      'Filter cleaning or replacement',
      'Coil cleaning and sanitization',
      'Drain cleaning and maintenance',
      'System reassembly and testing'
    ],
    warranty: '2 weeks on cleaning service',
    image: 'https://images.unsplash.com/photo-1563351672-62b74891a28a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'commercial-ac',
    title: 'Commercial AC Services',
    description: 'Comprehensive AC solutions for offices, shops, and commercial spaces.',
    price: 'Custom Quote',
    duration: 'Varies',
    icon: <Users className="h-8 w-8" />,
    features: ['Large Scale', 'Custom Solutions', 'Maintenance Contracts', 'Emergency Support'],
    detailedDescription: 'Specialized commercial AC services for businesses, offices, restaurants, and retail spaces. We provide installation, maintenance, and emergency support for all commercial cooling needs.',
    whatsIncluded: [
      'Site survey and consultation',
      'Custom cooling solution design',
      'Professional installation team',
      'Regular maintenance schedules',
      'Emergency repair services',
      'Energy efficiency optimization',
      'Extended warranty options'
    ],
    warranty: 'Up to 1 year based on contract',
    image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'emergency-repair',
    title: 'Emergency AC Repair',
    description: '24/7 emergency repair services for urgent AC breakdowns.',
    price: 'From PKR 3,000',
    duration: '30 min response',
    icon: <Clock className="h-8 w-8" />,
    features: ['24/7 Available', 'Quick Response', 'Same Day Service', 'Emergency Support'],
    detailedDescription: 'Round-the-clock emergency AC repair services for urgent breakdowns. Our technicians are available 24/7 to restore your comfort quickly and efficiently.',
    whatsIncluded: [
      'Immediate response within 30 minutes',
      'Emergency diagnostic service',
      'Urgent repair solutions',
      'Temporary cooling alternatives',
      'Same-day parts procurement',
      'Weekend and holiday service',
      'Emergency service warranty'
    ],
    warranty: '1 month on emergency repairs',
    image: 'https://images.unsplash.com/photo-1580821810660-5486b8e980a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  const handleWhatsAppContact = (service: Service) => {
    const message = `Hi! I'm interested in your ${service.title} service. Can you provide more information and schedule a visit?`;
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast({
      title: "Opening WhatsApp",
      description: `Connecting you with our ${service.title} team.`,
    });
  };

  const handleBookService = (service: Service) => {
    window.location.href = `/booking?service=${service.id}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue via-blue-600 to-brand-red text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 opacity-20">
            <AirVent className="h-32 w-32 text-white animate-pulse" />
          </div>
          <div className="absolute bottom-20 right-20 opacity-20">
            <Snowflake className="h-24 w-24 text-white animate-spin" style={{ animationDuration: '8s' }} />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center mb-8"
            >
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Wrench className="h-16 w-16 text-white" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Professional <span className="text-yellow-300">AC Services</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed"
            >
              Expert AC installation, repair, and maintenance services in <strong>Islamabad & Rawalpindi</strong>. 
              Professional technicians, quality parts, and reliable service guaranteed.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                <span className="ml-2 font-semibold">4.9/5 Rating • 1000+ Services Completed</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                className="bg-white text-brand-blue hover:bg-gray-100 font-semibold shadow-xl"
                onClick={() => handleWhatsAppContact(services[0])}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call for Emergency Service
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-brand-blue font-semibold"
                onClick={() => window.location.href = '/booking'}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book AC Service
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our <span className="text-brand-blue">AC Services</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Comprehensive AC solutions for homes and businesses across Islamabad and Rawalpindi. 
              Professional service, competitive pricing, and customer satisfaction guaranteed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card 
                  className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg cursor-pointer h-full"
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-sm rounded-full text-brand-blue">
                      {service.icon}
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <Badge className="bg-brand-red text-white">
                        {service.duration}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.features.slice(0, 2).map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-brand-blue">
                        {service.price}
                      </span>
                      <div className="flex items-center text-amber-500">
                        <Star className="h-4 w-4 fill-amber-500" />
                        <span className="ml-1 text-sm">4.9</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceClick(service);
                      }}
                    >
                      View Service Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose Our <span className="text-brand-blue">AC Services</span>?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                With over 10 years of experience serving Islamabad and Rawalpindi, we're the trusted choice for all your AC needs.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-2 bg-brand-blue/10 rounded-lg mr-4">
                    <CheckCircle className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Certified Technicians</h3>
                    <p className="text-gray-600 dark:text-gray-400">Our team consists of factory-trained and certified AC technicians with years of experience.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-brand-blue/10 rounded-lg mr-4">
                    <ShieldCheck className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Quality Guarantee</h3>
                    <p className="text-gray-600 dark:text-gray-400">We use only genuine parts and provide warranty on all our services and repairs.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-brand-blue/10 rounded-lg mr-4">
                    <Clock className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Quick Response</h3>
                    <p className="text-gray-600 dark:text-gray-400">Same-day service available with emergency support 24/7 across the twin cities.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-brand-blue/10 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Local Coverage</h3>
                    <p className="text-gray-600 dark:text-gray-400">Complete coverage across Islamabad, Rawalpindi, and surrounding areas.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="AC Service Team"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-brand-blue text-white p-6 rounded-lg shadow-xl">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-sm opacity-90">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-brand-blue/10 rounded-full text-brand-blue">
                    {selectedService.icon}
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold">{selectedService.title}</DialogTitle>
                    <DialogDescription className="text-lg">
                      {selectedService.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={selectedService.image} 
                    alt={selectedService.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Starting Price</div>
                      <div className="text-xl font-bold text-brand-blue">{selectedService.price}</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                      <div className="text-xl font-bold text-brand-blue">{selectedService.duration}</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Warranty</div>
                    <div className="font-semibold text-green-600">{selectedService.warranty}</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedService.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Service Details</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedService.detailedDescription}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">What's Included</h3>
                  <ul className="space-y-2">
                    {selectedService.whatsIncluded.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleWhatsAppContact(selectedService)}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  WhatsApp for Quote
                </Button>
                <Button 
                  className="flex-1 bg-brand-red hover:bg-brand-red/90 text-white"
                  onClick={() => handleBookService(selectedService)}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book This Service
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Services;
