
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wrench, Settings, Droplets, Wind, Phone, Star, 
  CheckCircle, ArrowRight, MessageCircle 
} from 'lucide-react';
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

  const contactWhatsApp = (serviceName: string) => {
    const message = `Hi! I'm interested in your ${serviceName}. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const featuredServices = services.filter(service => service.featured);
  const regularServices = services.filter(service => !service.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our AC Services
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Professional air conditioning services for installation, repair, maintenance, and more
          </p>
          <div className="flex justify-center items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Certified Technicians</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>1 Year Warranty</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Services */}
        {featuredServices.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              Featured Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service) => {
                const IconComponent = getIconComponent(service.icon);
                return (
                  <Card key={service.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-lg">
                    <div className="relative">
                      {service.image_url && (
                        <img
                          src={service.image_url}
                          alt={service.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-brand-blue text-white">Featured</Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-lg">
                        <IconComponent className="h-6 w-6 text-brand-blue" />
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="mb-2">{service.category}</Badge>
                        {service.price_range && (
                          <span className="text-sm font-semibold text-brand-blue">{service.price_range}</span>
                        )}
                      </div>
                      <CardTitle className="text-xl group-hover:text-brand-blue transition-colors">
                        {service.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300">
                        {service.short_description || service.description.substring(0, 100) + '...'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {service.features && service.features.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2 text-sm">Key Features:</h4>
                          <ul className="space-y-1">
                            {service.features.slice(0, 3).map((feature, index) => (
                              <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-brand-blue hover:bg-brand-blue/90"
                          onClick={() => contactWhatsApp(service.name)}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Get Quote
                        </Button>
                        <Button variant="outline" asChild>
                          <Link to={`/services/${service.slug}`}>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Regular Services */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            {featuredServices.length > 0 ? 'All Services' : 'Our Services'}
          </h2>
          
          {regularServices.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularServices.map((service) => {
                const IconComponent = getIconComponent(service.icon);
                return (
                  <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    {service.image_url && (
                      <div className="relative overflow-hidden">
                        <img
                          src={service.image_url}
                          alt={service.name}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow">
                          <IconComponent className="h-4 w-4 text-brand-blue" />
                        </div>
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">{service.category}</Badge>
                        {service.price_range && (
                          <span className="text-xs font-semibold text-brand-blue">{service.price_range}</span>
                        )}
                      </div>
                      <CardTitle className="text-lg group-hover:text-brand-blue transition-colors">
                        {service.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {service.short_description || service.description.substring(0, 80) + '...'}
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-brand-blue hover:bg-brand-blue/90"
                          onClick={() => contactWhatsApp(service.name)}
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Contact
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/services/${service.slug}`}>
                            Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No services available at the moment.
              </p>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="mt-16 bg-gradient-to-r from-brand-blue to-blue-700 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Need Custom AC Solutions?</h3>
          <p className="mb-6 text-lg">
            Can't find what you're looking for? Contact us for custom AC solutions tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => contactWhatsApp("Custom AC Solution")}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp Us
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-brand-blue"
              asChild
            >
              <Link to="/contact">
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
