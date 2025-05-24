
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Wrench, Settings, Droplets, Wind, Star, Phone, Calendar } from 'lucide-react';
import { Input } from "@/components/ui/input";
import ServiceDetailModal from '@/components/services/ServiceDetailModal';
import { supabase } from "@/integrations/supabase/client";

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string | null;
  image_url: string | null;
  icon: string | null;
  category: string;
  price_range: string | null;
  features: string[] | null;
  status: string;
  featured: boolean;
  sort_order: number;
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  wrench: Wrench,
  settings: Settings,
  droplets: Droplets,
  wind: Wind,
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('status', 'active')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName: string | null) => {
    if (!iconName || !iconMap[iconName]) {
      return Wrench;
    }
    return iconMap[iconName];
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleWhatsAppContact = (service: Service) => {
    const message = `Hi! I'm interested in your ${service.name}. Can you provide more details and pricing?`;
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(services.map(service => service.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="w-full px-4 mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 border border-brand-blue/20 rounded-full text-sm font-medium bg-brand-blue/10 backdrop-blur-sm mb-6">
              <Star className="mr-2 h-4 w-4 text-brand-blue" />
              Professional AC Services in Rawalpindi & Islamabad
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Our <span className="text-brand-blue">AC Services</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
              From installation to maintenance, we provide comprehensive AC services to keep your home and office comfortable year-round.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="pb-12">
        <div className="w-full px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-brand-blue hover:bg-brand-blue/90" : ""}
                  >
                    {category === 'all' ? 'All Services' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20">
        <div className="w-full px-4 mx-auto">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No services found</h3>
                <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service) => {
                  const IconComponent = getIconComponent(service.icon);
                  return (
                    <Card key={service.id} className="hover:shadow-xl transition-all duration-300 group border-0 shadow-lg cursor-pointer overflow-hidden">
                      {/* Service Image */}
                      {service.image_url && (
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={service.image_url} 
                            alt={service.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <CardHeader className="relative">
                        {service.featured && (
                          <Badge className="absolute top-4 right-4 bg-brand-red text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="rounded-full bg-brand-blue/10 p-3 group-hover:bg-brand-blue group-hover:text-white transition-all">
                            <IconComponent className="h-6 w-6 text-brand-blue group-hover:text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg group-hover:text-brand-blue transition-colors">
                              {service.name}
                            </CardTitle>
                            <Badge variant="outline" className="text-xs mt-1">
                              {service.category}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="text-sm line-clamp-2">
                          {service.short_description || service.description.substring(0, 100) + '...'}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        {service.price_range && (
                          <p className="text-brand-blue font-semibold mb-4 text-lg">{service.price_range}</p>
                        )}
                        
                        <div className="space-y-2">
                          <Button 
                            className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white"
                            onClick={() => handleServiceClick(service)}
                          >
                            View Details
                          </Button>
                          <div className="grid grid-cols-2 gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-brand-red border-brand-red hover:bg-brand-red hover:text-white"
                              onClick={() => handleWhatsAppContact(service)}
                            >
                              <Phone className="h-4 w-4 mr-1" />
                              Quote
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-brand-blue border-brand-blue hover:bg-brand-blue hover:text-white"
                              onClick={() => window.location.href = '/booking'}
                            >
                              <Calendar className="h-4 w-4 mr-1" />
                              Book
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <ServiceDetailModal 
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue text-white">
        <div className="w-full px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Immediate AC Service?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Our expert technicians are ready to help you 24/7. Get same-day service in Rawalpindi and Islamabad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-brand-red hover:bg-brand-red/90 text-white"
                onClick={() => window.location.href = '/booking'}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Service Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-brand-blue"
                onClick={() => window.open('tel:+923125242182')}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now: +92 312 5242182
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
