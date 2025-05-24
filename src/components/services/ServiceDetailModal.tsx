
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Phone, Calendar, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

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

interface ServiceDetailModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, isOpen, onClose }) => {
  if (!service) return null;

  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in your ${service.name}. Can you provide more details and pricing?`;
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-blue flex items-center gap-2">
            {service.name}
            {service.featured && (
              <Badge className="bg-brand-red text-white">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Image */}
          <div className="space-y-4">
            {service.image_url && (
              <div className="aspect-video rounded-lg overflow-hidden">
                <img 
                  src={service.image_url} 
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Price */}
            {service.price_range && (
              <div className="bg-brand-blue/10 p-4 rounded-lg">
                <h3 className="font-semibold text-brand-blue mb-2">Service Price</h3>
                <p className="text-2xl font-bold text-brand-blue">{service.price_range}</p>
              </div>
            )}
          </div>
          
          {/* Service Details */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Service Overview</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
            
            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">What's Included</h3>
                <div className="space-y-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Category */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Service Category</h3>
              <Badge variant="outline" className="text-brand-blue border-brand-blue">
                {service.category}
              </Badge>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t">
              <Button 
                className="w-full bg-brand-red hover:bg-brand-red/90 text-white"
                asChild
              >
                <Link to="/booking">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book This Service
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                onClick={handleWhatsAppContact}
              >
                <Phone className="mr-2 h-4 w-4" />
                Get Quote via WhatsApp
              </Button>
              
              <div className="text-center pt-2">
                <p className="text-sm text-gray-500">
                  Need immediate help? Call us at{' '}
                  <a href="tel:+923125242182" className="text-brand-red hover:underline font-medium">
                    +92 312 5242182
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;
