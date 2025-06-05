
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Phone, Calendar, Star, X, MessageCircle, WhatsApp } from 'lucide-react';
import { motion } from 'framer-motion';

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
    const message = `Hi! I'm interested in your ${service.name}. Can you provide more details and pricing? 

Service Details:
📋 Service: ${service.name}
📍 Category: ${service.category}
${service.price_range ? `💰 Price Range: ${service.price_range}` : ''}

Please let me know your availability and next steps. Thank you!`;
    
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleBookService = () => {
    const message = `Hi! I would like to book your ${service.name} service. 

📋 Service: ${service.name}
📍 Category: ${service.category}
${service.price_range ? `💰 Price Range: ${service.price_range}` : ''}

Please let me know:
1. Available time slots
2. Service duration
3. Any preparation required
4. Final pricing

Looking forward to your response!`;
    
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallNow = () => {
    window.location.href = 'tel:+923125242182';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto p-0 bg-white rounded-3xl border-0 shadow-2xl">
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm hover:bg-white/95 rounded-full shadow-lg border border-gray-200"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Service Image */}
          {service.image_url && (
            <div className="aspect-[16/9] w-full bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden rounded-t-3xl">
              <img 
                src={service.image_url} 
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <DialogHeader className="mb-8">
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="outline" className="text-blue-600 border-blue-600 px-4 py-2 text-sm font-semibold rounded-full">
                  {service.category}
                </Badge>
                {service.featured && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 text-sm font-semibold rounded-full">
                    <Star className="h-4 w-4 mr-1" />
                    Featured Service
                  </Badge>
                )}
              </div>
              
              <DialogTitle className="text-4xl md:text-5xl font-bold text-gray-900 text-left mb-6 leading-tight">
                {service.name}
              </DialogTitle>
              
              <DialogDescription className="text-xl text-gray-600 leading-relaxed text-left">
                {service.short_description || service.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              {/* Service Details */}
              <div className="space-y-8">
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Service Overview</h3>
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
                
                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-2xl font-semibold mb-6 text-gray-900">What's Included</h3>
                    <div className="bg-green-50 rounded-2xl p-6">
                      <div className="space-y-4">
                        {service.features.map((feature, index) => (
                          <motion.div 
                            key={index} 
                            className="flex items-start gap-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + (index * 0.1) }}
                          >
                            <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-lg">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Pricing & Action */}
              <div className="space-y-8">
                {/* Price */}
                {service.price_range && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-100 p-8 rounded-3xl">
                      <h3 className="font-semibold text-blue-900 mb-3 text-xl">Service Investment</h3>
                      <p className="text-4xl font-bold text-blue-600 mb-4">{service.price_range}</p>
                      <p className="text-sm text-blue-700 leading-relaxed">
                        *Final pricing may vary based on specific requirements and service scope. 
                        Free consultation and detailed quote available upon request.
                      </p>
                    </div>
                  </motion.div>
                )}
                
                {/* Action Buttons */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button 
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-6 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={handleBookService}
                  >
                    <Calendar className="mr-3 h-6 w-6" />
                    Book This Service Now
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
                      onClick={handleWhatsAppContact}
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      WhatsApp
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
                      onClick={handleCallNow}
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Call Now
                    </Button>
                  </div>
                  
                  <div className="text-center pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-3">
                      Need immediate assistance?
                    </p>
                    <a 
                      href="tel:+923125242182" 
                      className="text-blue-600 hover:text-blue-700 font-semibold text-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      +92 312 5242182
                    </a>
                  </div>
                </motion.div>
                
                {/* Additional Info */}
                <motion.div 
                  className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-3xl border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h4 className="font-semibold text-gray-900 mb-4 text-xl">Why Choose Us?</h4>
                  <div className="space-y-3">
                    {[
                      "24/7 Emergency Service Available",
                      "Certified & Experienced Technicians", 
                      "100% Satisfaction Guarantee",
                      "Free Consultation & Estimates",
                      "Same-Day Service Available",
                      "Competitive Pricing & Quality Work"
                    ].map((benefit, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + (index * 0.1) }}
                      >
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom CTA */}
            <motion.div 
              className="mt-12 pt-8 border-t border-gray-200 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h4>
              <p className="text-gray-600 mb-6 text-lg max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust us with their AC needs. 
                Book your service today and experience the difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleBookService}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Service Now
                </Button>
                <Button 
                  onClick={handleWhatsAppContact}
                  variant="outline"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300"
                >
                  <WhatsApp className="mr-2 h-5 w-5" />
                  Get Quote on WhatsApp
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;
