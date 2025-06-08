
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Wrench, Settings, Droplets, Wind, MessageCircle, Phone, Star, Clock, Shield, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import ServiceDetailModal from '@/components/services/ServiceDetailModal';

type Service = Database['public']['Tables']['services']['Row'];

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
      console.log('🔄 Fetching services from Supabase...');
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('status', 'active')
        .order('sort_order', { ascending: true });
      
      if (error) {
        console.error('❌ Supabase services fetch error:', error);
        throw error;
      }

      console.log('✅ Services fetched successfully:', data?.length || 0, 'services');
      setServices(data || []);
    } catch (error) {
      console.error('❌ Error fetching services:', error);
      setServices([]);
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

  const handleGetQuote = (serviceName: string) => {
    const message = `Hi! I'm interested in your ${serviceName} service.

Service Details:
- Service: ${serviceName}

Please provide detailed information about:
1. Service charges
2. Available time slots
3. What's included in the service
4. Any additional requirements

Thank you!`;
    
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || service.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(services.map(service => service.category.toLowerCase())))];
  const featuredServices = services.filter(service => service.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Settings className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AC Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From installation to maintenance, we provide comprehensive AC services to keep your home comfortable year-round
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-xl mb-4">
              <Users className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-xl mb-4">
              <Star className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">4.9</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-xl mb-4">
              <Clock className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-xl mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">1 Year</div>
            <div className="text-gray-600">Service Warranty</div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-4 text-lg border-0 bg-gray-50/50 focus:bg-white transition-all rounded-xl"
              />
            </div>
            <div className="flex gap-3 flex-wrap lg:flex-nowrap">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={`capitalize px-6 py-4 rounded-xl font-medium transition-all ${
                    selectedCategory === category 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'bg-white/50 hover:bg-white border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Services */}
        {featuredServices.length > 0 && selectedCategory === 'all' && searchTerm === '' && (
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Services</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.slice(0, 3).map((service, index) => {
                const IconComponent = getIconComponent(service.icon);
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                    whileHover={{ y: -8 }}
                  >
                    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-lg h-full bg-white/80 backdrop-blur-sm">
                      <div onClick={() => handleServiceClick(service)}>
                        {service.image_url && (
                          <div className="relative aspect-video overflow-hidden">
                            <img 
                              src={service.image_url} 
                              alt={service.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 px-3 py-1">
                                Featured
                              </Badge>
                            </div>
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-white/90 text-gray-800 border-0">
                                {service.category}
                              </Badge>
                            </div>
                          </div>
                        )}
                        <CardHeader className="text-center">
                          <div className="mx-auto rounded-full bg-blue-100 p-4 w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <IconComponent className="h-8 w-8 text-blue-600 group-hover:text-white" />
                          </div>
                          <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                            {service.name}
                          </CardTitle>
                          <div className="text-sm text-gray-600">
                            {service.short_description || service.description.substring(0, 80) + '...'}
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 text-center">
                          {service.price_range && (
                            <div className="text-2xl font-bold text-blue-600 mb-4">{service.price_range}</div>
                          )}
                          <div className="space-y-2">
                            <Button 
                              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleGetQuote(service.name);
                              }}
                            >
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Get Quote on WhatsApp
                            </Button>
                            <Button 
                              variant="outline" 
                              className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all py-3 rounded-xl"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open('tel:+923125242182', '_self');
                              }}
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              Call Now
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* All Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Services' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Services`}
            </h2>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {filteredServices.length} services
            </Badge>
          </div>
          
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service, index) => {
                const IconComponent = getIconComponent(service.icon);
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + (index * 0.05) }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md h-full bg-white/80 backdrop-blur-sm">
                      <div onClick={() => handleServiceClick(service)}>
                        {service.image_url && (
                          <div className="relative aspect-video overflow-hidden">
                            <img 
                              src={service.image_url} 
                              alt={service.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-white/90 text-gray-800 border-0 text-xs">
                                {service.category}
                              </Badge>
                            </div>
                            {service.featured && (
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-xs">
                                  Featured
                                </Badge>
                              </div>
                            )}
                          </div>
                        )}
                        <CardHeader className="text-center pb-2">
                          <div className="mx-auto rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <IconComponent className="h-6 w-6 text-blue-600 group-hover:text-white" />
                          </div>
                          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                            {service.name}
                          </CardTitle>
                          <div className="text-sm text-gray-600 line-clamp-2">
                            {service.short_description || service.description.substring(0, 60) + '...'}
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 text-center">
                          {service.price_range && (
                            <div className="text-lg font-bold text-blue-600 mb-3">{service.price_range}</div>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGetQuote(service.name);
                            }}
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Get Quote
                          </Button>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">🔧</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Services Found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Try adjusting your search terms or browse all categories to find the perfect AC service for your needs.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl"
              >
                Show All Services
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedService(null);
        }}
      />
    </div>
  );
};

export default Services;
