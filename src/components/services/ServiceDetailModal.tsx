
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Phone, MessageCircle, X } from 'lucide-react';
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
}

interface ServiceDetailModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, isOpen, onClose }) => {
  const handleBookService = () => {
    if (!service) return;
    
    const message = `Hi! I'm interested in your ${service.name} service. Can you provide more information about pricing and availability?`;
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Opening WhatsApp",
      description: "Connecting you with our service team.",
    });
    
    onClose();
  };

  const handleCallNow = () => {
    window.open('tel:+923125242182', '_self');
    toast({
      title: "Calling Now",
      description: "Connecting you to our service hotline.",
    });
  };

  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {service.name}
              </DialogTitle>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">{service.category}</Badge>
                {service.featured && (
                  <Badge className="bg-yellow-500 text-white">Featured</Badge>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Image */}
          {service.image_url && (
            <div className="aspect-video overflow-hidden rounded-lg">
              <img 
                src={service.image_url} 
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Price Range */}
          {service.price_range && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Pricing</h3>
              <p className="text-2xl font-bold text-blue-600">{service.price_range}</p>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Service Description</h3>
            <DialogDescription className="text-gray-600 leading-relaxed text-base">
              {service.description}
            </DialogDescription>
          </div>

          {/* Features */}
          {service.features && service.features.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">What's Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
            <Button 
              onClick={handleBookService}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Book via WhatsApp
            </Button>
            <Button 
              onClick={handleCallNow}
              variant="outline"
              className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              size="lg"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now: +92 312 5242182
            </Button>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Why Choose Our Services?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Professional certified technicians</li>
              <li>• 24/7 emergency service available</li>
              <li>• Warranty on all services</li>
              <li>• Competitive pricing across Pakistan</li>
              <li>• Free consultation and quotes</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;
