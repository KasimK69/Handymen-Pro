
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { 
  Wrench, 
  Snowflake, 
  Shield, 
  Clock, 
  Star, 
  ChevronRight,
  Phone,
  MessageCircle,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

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

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

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
      toast({
        title: "Error",
        description: "Failed to load services. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGetQuote = (serviceName: string) => {
    const message = `Hello! I would like to get a quote for ${serviceName}.

Please provide me with:
- Service details and pricing
- Available time slots
- Professional consultation
- Installation/repair timeline

Thank you!`;
    
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Filter services based on search and category
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesFeatured = !showFeaturedOnly || service.featured;
    
    return matchesSearch && matchesCategory && matchesFeatured;
  });

  // Get unique categories for filter
  const categories = ['all', ...Array.from(new Set(services.map(service => service.category)))];

  const heroServices = [
    {
      icon: Wrench,
      title: 'AC Installation',
      description: 'Professional installation with warranty',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Snowflake,
      title: 'AC Repair',
      description: '24/7 emergency repair services',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      icon: Shield,
      title: 'Maintenance',
      description: 'Regular maintenance for optimal performance',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Clock,
      title: 'Emergency Service',
      description: 'Quick response for urgent repairs',
      color: 'from-red-400 to-red-600'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8843F2] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#2D3559] via-[#8843F2] to-[#4CC9F0]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white font-['Inter']">
              Our <span className="bg-gradient-to-r from-[#FF467E] to-white bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Professional AC services across Pakistan with certified technicians, quality guarantees, and 24/7 support.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FF467E] to-white mx-auto mt-8"></div>
          </motion.div>

          {/* Quick Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {heroServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-white/80 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-gray-300 focus:border-[#8843F2] focus:ring-[#8843F2]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-48 border-gray-300 focus:border-[#8843F2] focus:ring-[#8843F2]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant={showFeaturedOnly ? "default" : "outline"}
                      onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                      className={showFeaturedOnly ? "bg-[#8843F2] text-white" : "border-[#8843F2] text-[#8843F2] hover:bg-[#8843F2] hover:text-white"}
                    >
                      <Star className="mr-2 h-4 w-4" />
                      Featured
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Services Grid */}
          {filteredServices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 mb-4">
                <Wrench className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No services found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm h-full flex flex-col">
                    {/* Service Image */}
                    {service.image_url && (
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <img
                          src={service.image_url}
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        {service.featured && (
                          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-[#8843F2] to-[#FF467E] text-white">
                            <Star className="mr-1 h-3 w-3" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    )}

                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold text-[#2D3559] group-hover:text-[#8843F2] transition-colors">
                            {service.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-[#8843F2] border-[#8843F2]">
                              {service.category}
                            </Badge>
                            {service.price_range && (
                              <Badge variant="secondary">
                                {service.price_range}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {service.short_description || service.description}
                      </p>

                      {/* Features */}
                      {service.features && service.features.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-[#2D3559] mb-2 text-sm">Key Features:</h4>
                          <div className="space-y-1">
                            {service.features.slice(0, 3).map((feature, idx) => (
                              <div key={idx} className="flex items-center text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#8843F2] to-[#FF467E] rounded-full mr-2 flex-shrink-0"></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                            {service.features.length > 3 && (
                              <div className="text-xs text-[#8843F2] font-medium ml-3.5">
                                +{service.features.length - 3} more features
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="mt-auto space-y-3">
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => handleGetQuote(service.name)}
                            className="flex-1 bg-gradient-to-r from-[#8843F2] to-[#FF467E] hover:from-[#7335E8] hover:to-[#F03A6E] text-white font-medium"
                          >
                            <Phone className="mr-2 h-4 w-4" />
                            Get Quote
                          </Button>
                          <Button 
                            variant="outline"
                            className="border-[#8843F2] text-[#8843F2] hover:bg-[#8843F2] hover:text-white"
                            onClick={() => window.open(`https://wa.me/923125242182?text=${encodeURIComponent(`Hi! I'm interested in ${service.name}. Please provide more details.`)}`, '_blank')}
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>
                        <Link to={`/services/${service.slug}`}>
                          <Button variant="ghost" className="w-full text-[#8843F2] hover:bg-[#8843F2]/10">
                            Learn More
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#8843F2] to-[#FF467E]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Need Immediate AC Service?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our expert technicians are available 24/7 for emergency repairs and professional installations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                variant="secondary"
                onClick={() => window.open('tel:+923125242182', '_self')}
                className="bg-white text-[#8843F2] hover:bg-gray-100 font-semibold px-8 py-4"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call: +92 312 5242182
              </Button>
              <Link to="/get-quote">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#8843F2] font-semibold px-8 py-4 w-full"
                >
                  Get Free Quote
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
