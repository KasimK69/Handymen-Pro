
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, Search, Wrench, CheckCircle, Clock, Shield, Award } from 'lucide-react';
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
      // Fallback mock data for demo
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
            <Wrench className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AC Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert air conditioning installation, maintenance, and repair services across Pakistan with certified technicians and guaranteed satisfaction
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div 
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search for AC services..."
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
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Services</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-lg h-full bg-white/80 backdrop-blur-sm">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={service.image_url || 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 px-3 py-1">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-gray-800 border-0">
                          {service.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Wrench className="h-4 w-4 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {service.name}
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow leading-relaxed">
                        {service.short_description || service.description}
                      </p>
                      
                      {service.price_range && (
                        <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            {service.price_range}
                          </span>
                        </div>
                      )}
                      
                      {service.features && (
                        <div className="mb-6 space-y-2">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              <span className="line-clamp-1">{feature}</span>
                            </div>
                          ))}
                          {service.features.length > 3 && (
                            <p className="text-xs text-blue-600 font-medium">+{service.features.length - 3} more features</p>
                          )}
                        </div>
                      )}
                      
                      <div className="mt-auto space-y-3">
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center p-2 bg-blue-50 rounded-lg">
                            <Clock className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                            <span className="text-blue-600 font-medium">Quick</span>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded-lg">
                            <Shield className="h-4 w-4 mx-auto mb-1 text-green-600" />
                            <span className="text-green-600 font-medium">Warranty</span>
                          </div>
                          <div className="text-center p-2 bg-purple-50 rounded-lg">
                            <Award className="h-4 w-4 mx-auto mb-1 text-purple-600" />
                            <span className="text-purple-600 font-medium">Certified</span>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={() => handleServiceClick(service)}
                        >
                          Get More Info & Quote
                        </Button>
                      </div>
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
          transition={{ duration: 0.8, delay: 0.6 }}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md h-full bg-white/80 backdrop-blur-sm">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={service.image_url || 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-gray-800 border-0">
                          {service.category}
                        </Badge>
                      </div>
                      {service.featured && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6 flex flex-col h-full">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                        {service.short_description || service.description}
                      </p>
                      {service.price_range && (
                        <div className="mb-4">
                          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            {service.price_range}
                          </span>
                        </div>
                      )}
                      {service.features && (
                        <div className="mb-4 space-y-1">
                          {service.features.slice(0, 2).map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                              <span className="line-clamp-1">{feature}</span>
                            </div>
                          ))}
                          {service.features.length > 2 && (
                            <p className="text-xs text-blue-600 font-medium">+{service.features.length - 2} more features</p>
                          )}
                        </div>
                      )}
                      <Button 
                        className="w-full mt-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                        onClick={() => handleServiceClick(service)}
                      >
                        View Details & Get Quote
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-12 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h3 className="text-4xl font-bold mb-4">Need Emergency AC Service?</h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              24/7 emergency AC repair and maintenance services available across Pakistan with certified technicians
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                onClick={() => window.open('tel:+923125242182', '_self')}
              >
                📞 Call Now: +92 312 5242182
              </Button>
              <Button 
                size="lg" 
                className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold text-lg px-8 py-4 rounded-xl backdrop-blur-sm transition-all"
                onClick={() => window.open('https://wa.me/923125242182?text=Hi! I need emergency AC service. Please help me.', '_blank')}
              >
                💬 WhatsApp Us
              </Button>
            </div>
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
