
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, Search, ArrowRight, Wrench, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceDetailModal from '@/components/services/ServiceDetailModal';

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
}

const ServicesPage = () => {
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
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('status', 'active')
        .order('featured', { ascending: false })
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('❌ Supabase services fetch error:', error);
        throw error;
      }

      console.log('✅ Services fetched successfully:', data?.length || 0, 'services');
      setServices(data || []);
    } catch (error) {
      console.error('❌ Error fetching services:', error);
      // Add mock data as fallback
      const mockServices: Service[] = [
        {
          id: '1',
          name: 'AC Installation & Setup',
          slug: 'ac-installation-setup',
          description: 'Professional air conditioning installation service with expert technicians, proper sizing, and warranty coverage.',
          short_description: 'Expert AC installation with warranty coverage',
          image_url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          icon: 'wrench',
          category: 'Installation',
          price_range: 'PKR 5,000 - 15,000',
          features: [
            'Professional installation by certified technicians',
            'Proper AC sizing and placement consultation',
            'Electrical connections and safety checks',
            'Complete system testing and commissioning',
            '1-year installation warranty',
            'Free follow-up service within 30 days'
          ],
          status: 'active',
          featured: true
        },
        {
          id: '2',
          name: 'AC Repair & Maintenance',
          slug: 'ac-repair-maintenance',
          description: 'Comprehensive AC repair and maintenance services to keep your air conditioner running efficiently year-round.',
          short_description: 'Keep your AC running efficiently with regular maintenance',
          image_url: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          icon: 'settings',
          category: 'Maintenance',
          price_range: 'PKR 2,000 - 8,000',
          features: [
            'Complete AC diagnosis and troubleshooting',
            'Filter cleaning and replacement',
            'Coil cleaning and maintenance',
            'Refrigerant level check and refill',
            'Electrical component inspection',
            'Performance optimization'
          ],
          status: 'active',
          featured: true
        }
      ];
      setServices(mockServices);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceClick = (service: Service) => {
    console.log('🔍 Opening service modal for:', service.name);
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(services.map(service => service.category.toLowerCase())))];
  const featuredServices = services.filter(service => service.featured);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AC Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert air conditioning installation, maintenance, and repair services across Pakistan
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
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
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">⭐ Featured Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.slice(0, 3).map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                >
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg h-full">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={service.image_url || 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex gap-2 mb-3">
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                        <Badge variant="outline">{service.category}</Badge>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                        {service.short_description || service.description}
                      </p>
                      {service.price_range && (
                        <div className="mb-4">
                          <span className="text-2xl font-bold text-blue-600">{service.price_range}</span>
                        </div>
                      )}
                      {service.features && (
                        <div className="mb-4">
                          {service.features.slice(0, 2).map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600 mb-1">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      )}
                      <Button 
                        className="w-full mt-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={() => handleServiceClick(service)}
                      >
                        <Wrench className="mr-2 h-4 w-4" />
                        Get More Info
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {selectedCategory === 'all' ? 'All Services' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Services`}
            <span className="text-lg font-normal text-gray-500 ml-3">({filteredServices.length})</span>
          </h2>
          
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                >
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg h-full">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={service.image_url || 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex gap-2 mb-3">
                        <Badge variant="outline">{service.category}</Badge>
                        {service.featured && (
                          <Badge className="bg-yellow-500 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                        {service.short_description || service.description}
                      </p>
                      {service.price_range && (
                        <div className="mb-4">
                          <span className="text-2xl font-bold text-blue-600">{service.price_range}</span>
                        </div>
                      )}
                      {service.features && (
                        <div className="mb-4">
                          {service.features.slice(0, 2).map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600 mb-1">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                              {feature}
                            </div>
                          ))}
                          {service.features.length > 2 && (
                            <p className="text-xs text-gray-500">+{service.features.length - 2} more features</p>
                          )}
                        </div>
                      )}
                      <Button 
                        className="w-full mt-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={() => handleServiceClick(service)}
                      >
                        <Wrench className="mr-2 h-4 w-4" />
                        Get More Info
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔧</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Services Found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your search terms or browse all categories.</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Show All Services
              </Button>
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-4">Need Emergency AC Service?</h3>
          <p className="text-xl mb-8 opacity-90">
            24/7 emergency AC repair and maintenance services available across Pakistan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 font-bold text-lg px-8 py-4">
              📞 Call Now: +92 312 5242182
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-blue-600 font-bold text-lg px-8 py-4">
              💬 WhatsApp Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal 
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => {
          console.log('🔒 Closing service modal');
          setIsModalOpen(false);
          setSelectedService(null);
        }}
      />
    </div>
  );
};

export default ServicesPage;
