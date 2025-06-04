
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Phone, Calendar, Star, X } from 'lucide-react';
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

  const handleBookService = () => {
    const message = `Hi! I would like to book your ${service.name} service. Please let me know the availability and next steps.`;
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Service Image */}
          {service.image_url && (
            <div className="aspect-video w-full bg-gray-100">
              <img 
                src={service.image_url} 
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-6 md:p-8">
            <DialogHeader className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  {service.category}
                </Badge>
                {service.featured && (
                  <Badge className="bg-yellow-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              
              <DialogTitle className="text-3xl md:text-4xl font-bold text-gray-900 text-left mb-4">
                {service.name}
              </DialogTitle>
              
              {service.short_description && (
                <p className="text-xl text-gray-600 leading-relaxed text-left">
                  {service.short_description}
                </p>
              )}
            </DialogHeader>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Service Details */}
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900">Service Overview</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">What's Included</h3>
                    <div className="space-y-3">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Pricing & Action */}
              <div className="space-y-6">
                {/* Price */}
                {service.price_range && (
                  <div className="bg-blue-50 p-6 rounded-2xl">
                    <h3 className="font-semibold text-blue-900 mb-2 text-lg">Service Price</h3>
                    <p className="text-3xl font-bold text-blue-600">{service.price_range}</p>
                    <p className="text-sm text-blue-700 mt-2">*Final price may vary based on specific requirements</p>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="space-y-4">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold rounded-xl"
                    onClick={handleBookService}
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Book This Service Now
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-4 text-lg font-semibold rounded-xl"
                    onClick={handleWhatsAppContact}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Get Quote via WhatsApp
                  </Button>
                  
                  <div className="text-center pt-4 border-t">
                    <p className="text-sm text-gray-500 mb-2">
                      Need immediate help?
                    </p>
                    <a 
                      href="tel:+923125242182" 
                      className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
                    >
                      📞 +92 312 5242182
                    </a>
                  </div>
                </div>
                
                {/* Additional Info */}
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Why Choose Us?</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>✅ 24/7 Emergency Service Available</li>
                    <li>✅ Certified & Experienced Technicians</li>
                    <li>✅ 100% Satisfaction Guarantee</li>
                    <li>✅ Free Consultation & Estimates</li>
                    <li>✅ Same-Day Service Available</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;
