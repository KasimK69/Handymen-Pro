
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench, Settings, Droplets, Wind, MessageCircle } from 'lucide-react';
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
        .eq('featured', true)
        .order('sort_order', { ascending: true })
        .limit(4);
      
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

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Our <span className="text-brand-blue">Professional Services</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From installation to maintenance, we provide comprehensive AC services to keep your home comfortable year-round.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service) => {
              const IconComponent = getIconComponent(service.icon);
              return (
                <Card key={service.id} className="hover:shadow-lg transition-all duration-300 group border-0 shadow-md">
                  <CardHeader className="text-center">
                    <div className="mx-auto rounded-full bg-brand-blue/10 p-4 w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-brand-blue group-hover:text-white transition-all">
                      <IconComponent className="h-8 w-8 text-brand-blue group-hover:text-white" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-brand-blue transition-colors">
                      {service.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {service.short_description || service.description.substring(0, 60) + '...'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 text-center">
                    {service.price_range && (
                      <p className="text-brand-blue font-semibold mb-3">{service.price_range}</p>
                    )}
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue transition-all"
                        onClick={() => contactWhatsApp(service.name)}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Get Quote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="text-center">
          <Button asChild className="bg-brand-blue hover:bg-brand-blue/90 group">
            <Link to="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
