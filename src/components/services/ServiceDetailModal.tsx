
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Star, MessageCircle, Phone, CheckCircle, Clock, Shield, Award } from 'lucide-react';

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

  const handleGetQuote = () => {
    const message = `Hi! I'm interested in your ${service.name} service.

Service Details:
- Category: ${service.category}
- Price Range: ${service.price_range || 'Please provide quote'}

Please provide detailed information about:
1. Service charges
2. Available time slots
3. What's included in the service
4. Any additional requirements

Thank you!`;
    
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallNow = () => {
    window.open('tel:+923125242182', '_self');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden p-0 bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Header */}
              <div className="relative">
                {service.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={service.image_url}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}
                
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <DialogHeader className={`p-6 ${service.image_url ? 'absolute bottom-0 left-0 right-0 text-white' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <DialogTitle className="text-3xl font-bold mb-2">
                        {service.name}
                      </DialogTitle>
                      <div className="flex gap-2 mb-2">
                        {service.featured && (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                            Featured Service
                          </Badge>
                        )}
                        <Badge variant="secondary" className={`${service.image_url ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'}`}>
                          {service.category}
                        </Badge>
                      </div>
                      {service.price_range && (
                        <div className={`text-xl font-semibold ${service.image_url ? 'text-yellow-300' : 'text-blue-600'}`}>
                          {service.price_range}
                        </div>
                      )}
                    </div>
                  </div>
                </DialogHeader>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {/* Service Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="font-semibold text-gray-900">Quick Service</div>
                    <div className="text-sm text-gray-600">Same day available</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <div className="font-semibold text-gray-900">Warranty</div>
                    <div className="text-sm text-gray-600">Service guarantee</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <Award className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <div className="font-semibold text-gray-900">Certified</div>
                    <div className="text-sm text-gray-600">Expert technicians</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Service Description</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">What's Included</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-gray-700">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Service Process */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">How It Works</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border border-gray-200 rounded-xl">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
                      <div className="font-semibold mb-1">Book Service</div>
                      <div className="text-sm text-gray-600">Contact us via WhatsApp or call</div>
                    </div>
                    <div className="text-center p-4 border border-gray-200 rounded-xl">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
                      <div className="font-semibold mb-1">Schedule Visit</div>
                      <div className="text-sm text-gray-600">We'll arrange a convenient time</div>
                    </div>
                    <div className="text-center p-4 border border-gray-200 rounded-xl">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
                      <div className="font-semibold mb-1">Service Done</div>
                      <div className="text-sm text-gray-600">Professional service completed</div>
                    </div>
                  </div>
                </div>

                {/* Customer Rating */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Customer Rating</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-xl font-bold">4.9</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>Quality: ⭐⭐⭐⭐⭐</div>
                    <div>Punctuality: ⭐⭐⭐⭐⭐</div>
                    <div>Professionalism: ⭐⭐⭐⭐⭐</div>
                    <div>Value for Money: ⭐⭐⭐⭐⭐</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={handleGetQuote}
                  >
                    <MessageCircle className="mr-3 h-5 w-5" />
                    Get Quote on WhatsApp
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 py-4 text-lg font-bold transition-all duration-300"
                    onClick={handleCallNow}
                  >
                    <Phone className="mr-3 h-5 w-5" />
                    Call Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ServiceDetailModal;
