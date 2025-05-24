
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wrench, 
  Snowflake, 
  Settings, 
  ShieldCheck, 
  Zap, 
  Users, 
  Phone, 
  Calendar,
  CheckCircle,
  Star,
  MapPin
} from 'lucide-react';
import ServiceDetailModal from '@/components/services/ServiceDetailModal';

const Services = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    {
      id: 'ac-installation',
      name: 'AC Installation',
      slug: 'ac-installation',
      description: 'Professional air conditioning installation service with warranty coverage and expert technicians for residential and commercial properties.',
      short_description: 'Expert AC installation with warranty',
      image_url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'Settings',
      category: 'Installation',
      price_range: 'PKR 8,000 - 15,000',
      features: [
        'Professional installation by certified technicians',
        'Complete electrical setup and wiring',
        'Indoor and outdoor unit mounting',
        'Refrigerant charging and testing',
        'System performance optimization',
        '1-year installation warranty',
        'Free 30-day maintenance check'
      ],
      status: 'active',
      featured: true
    },
    {
      id: 'ac-repair',
      name: 'AC Repair & Maintenance',
      slug: 'ac-repair',
      description: 'Fast and reliable AC repair services for all brands. Our technicians diagnose and fix cooling issues, electrical problems, and component failures.',
      short_description: 'Quick AC repair for all brands',
      image_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'Wrench',
      category: 'Repair',
      price_range: 'PKR 2,500 - 8,000',
      features: [
        'Emergency repair services',
        'All major brands supported',
        'Genuine spare parts only',
        'Same-day service available',
        'Free diagnostic check',
        '6-month repair warranty',
        '24/7 customer support'
      ],
      status: 'active',
      featured: true
    },
    {
      id: 'ac-gas-refilling',
      name: 'AC Gas Refilling',
      slug: 'ac-gas-refilling',
      description: 'Complete AC gas refilling service with leak detection and pressure testing. We use genuine refrigerants for optimal cooling performance.',
      short_description: 'Professional gas refilling service',
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'Snowflake',
      category: 'Maintenance',
      price_range: 'PKR 3,500 - 6,000',
      features: [
        'Genuine refrigerant gas (R410A, R22)',
        'Complete leak detection',
        'Pressure testing and optimization',
        'System performance check',
        'Cooling efficiency improvement',
        '3-month service warranty',
        'Free follow-up inspection'
      ],
      status: 'active',
      featured: false
    },
    {
      id: 'ac-deep-cleaning',
      name: 'AC Deep Cleaning',
      slug: 'ac-deep-cleaning',
      description: 'Comprehensive AC cleaning service including coil cleaning, filter replacement, and sanitization for improved air quality and efficiency.',
      short_description: 'Complete AC cleaning & sanitization',
      image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'ShieldCheck',
      category: 'Cleaning',
      price_range: 'PKR 2,000 - 4,500',
      features: [
        'Indoor and outdoor unit cleaning',
        'Evaporator and condenser coil cleaning',
        'Filter cleaning and replacement',
        'Drain cleaning and sanitization',
        'Anti-bacterial treatment',
        'Improved air quality',
        'Enhanced cooling efficiency'
      ],
      status: 'active',
      featured: false
    },
    {
      id: 'ac-maintenance',
      name: 'Preventive Maintenance',
      slug: 'ac-maintenance',
      description: 'Regular AC maintenance plans to keep your air conditioning system running efficiently and prevent costly breakdowns.',
      short_description: 'Regular maintenance plans',
      image_url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'Settings',
      category: 'Maintenance',
      price_range: 'PKR 1,500 - 3,000',
      features: [
        'Monthly/quarterly service plans',
        'Complete system inspection',
        'Filter cleaning and replacement',
        'Performance optimization',
        'Early problem detection',
        'Priority service booking',
        'Discounted repair rates'
      ],
      status: 'active',
      featured: false
    },
    {
      id: 'commercial-ac',
      name: 'Commercial AC Services',
      slug: 'commercial-ac',
      description: 'Specialized commercial air conditioning services for offices, shops, and large spaces with industrial-grade solutions.',
      short_description: 'Commercial AC solutions',
      image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'Users',
      category: 'Commercial',
      price_range: 'PKR 15,000 - 50,000',
      features: [
        'Industrial-grade installations',
        'Large capacity systems',
        'Energy-efficient solutions',
        'Customized maintenance plans',
        'Emergency service priority',
        'Extended warranty options',
        'Professional consultation'
      ],
      status: 'active',
      featured: true
    }
  ];

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleWhatsAppContact = (service: any) => {
    const message = `Hi! I'm interested in your ${service.name}. Can you provide more details and pricing?`;
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-brand-blue text-white px-4 py-2">
              Professional AC Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Expert <span className="text-brand-blue">Air Conditioning</span> Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Professional AC installation, repair, and maintenance services in Rawalpindi and Islamabad. 
              Quality service with warranty coverage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-brand-red hover:bg-brand-red/90">
                <Calendar className="mr-2 h-5 w-5" />
                Book Service Now
              </Button>
              <Button size="lg" variant="outline" onClick={() => handleWhatsAppContact(services[0])}>
                <Phone className="mr-2 h-5 w-5" />
                Get Quote on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Our AC Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Comprehensive air conditioning solutions for your comfort needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card 
                key={service.id} 
                className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg overflow-hidden"
                onClick={() => handleServiceClick(service)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={service.image_url || ''} 
                    alt={service.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {service.featured && (
                    <Badge className="absolute top-3 right-3 bg-brand-red text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-brand-blue border-brand-blue">
                      {service.category}
                    </Badge>
                    {service.price_range && (
                      <span className="text-sm font-semibold text-brand-blue">
                        {service.price_range}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl group-hover:text-brand-blue transition-colors">
                    {service.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {service.short_description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {service.features[0]}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {service.features[1]}
                      </span>
                    </div>
                    
                    <Button 
                      className="w-full mt-4 bg-brand-blue hover:bg-brand-blue/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceClick(service);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Choose Our AC Services?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Certified Technicians</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All our technicians are certified and experienced in handling all major AC brands.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-brand-red" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Same Day Service</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Emergency AC repair services available with same-day response in most cases.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Local Coverage</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Serving Rawalpindi, Islamabad, and surrounding areas with reliable service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-red">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Need AC Service Right Now?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us for immediate assistance and professional AC solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-brand-blue hover:bg-gray-100"
              onClick={() => handleWhatsAppContact(services[0])}
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now: +92 312 5242182
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-brand-blue"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Service
            </Button>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <ServiceDetailModal 
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Services;
