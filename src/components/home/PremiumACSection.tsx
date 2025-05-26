
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Eye, MessageSquare, ArrowRight, Snowflake, AirVent, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface ACUnit {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  condition: 'new' | 'used';
  features: string[];
  discount?: number;
  description: string;
}

const premiumACs: ACUnit[] = [
  {
    id: '1',
    name: 'Pro Inverter AC - 1.5 Ton',
    brand: 'Samsung',
    price: 135000,
    originalPrice: 150000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    condition: 'new',
    features: ['Energy Efficient', 'Smart Control', 'Fast Cooling', '5 Year Warranty'],
    discount: 10,
    description: 'Premium Samsung inverter AC with advanced cooling technology and energy efficiency. Perfect for medium-sized rooms with smart connectivity features.'
  },
  {
    id: '2',
    name: 'Eco Inverter AC - 1 Ton',
    brand: 'LG',
    price: 115000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    condition: 'new',
    features: ['Low Power Consumption', 'Dual Protection', 'WiFi Enabled', '3 Year Warranty'],
    description: 'LG eco-friendly inverter AC with superior energy efficiency and smart home integration. Ideal for small to medium rooms.'
  },
  {
    id: '3',
    name: 'Ultra Cool AC - 2 Ton',
    brand: 'Haier',
    price: 175000,
    originalPrice: 190000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    condition: 'new',
    features: ['Heavy Duty Cooling', 'Turbo Mode', 'Self Cleaning', '7 Year Warranty'],
    discount: 8,
    description: 'Haier ultra-cool AC with heavy-duty cooling capacity. Perfect for large rooms and commercial spaces with self-cleaning technology.'
  },
  {
    id: '4',
    name: 'Standard AC - 1.5 Ton',
    brand: 'Gree',
    price: 95000,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1563351672-62b74891a28a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    condition: 'used',
    features: ['Good Condition', 'Regular Service Done', 'Affordable Price', '1 Year Warranty'],
    description: 'Well-maintained Gree AC in excellent condition. Perfect budget option with reliable cooling performance and warranty coverage.'
  }
];

const PremiumACSection = () => {
  const [selectedAC, setSelectedAC] = useState<ACUnit | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const formatPrice = (price: number) => `PKR ${price.toLocaleString()}`;

  const handleWhatsAppInquiry = (ac: ACUnit) => {
    const message = `Hi! I'm interested in the ${ac.name} (${ac.brand}) priced at ${formatPrice(ac.price)}. Can you provide more details and availability?`;
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleGetMoreInfo = (ac: ACUnit) => {
    setSelectedAC(ac);
    setIsInfoModalOpen(true);
  };

  const handleSubmitInfo = () => {
    if (!userInfo.name || !userInfo.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and phone number.",
        variant: "destructive"
      });
      return;
    }

    const message = `New AC Inquiry:
Name: ${userInfo.name}
Phone: ${userInfo.phone}
Email: ${userInfo.email}

Interested AC:
- ${selectedAC?.name} (${selectedAC?.brand})
- Price: ${formatPrice(selectedAC?.price || 0)}
- Features: ${selectedAC?.features.join(', ')}

Please contact me with more details.`;

    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Information Sent",
      description: "Your inquiry has been sent. We'll contact you shortly!",
    });

    setIsInfoModalOpen(false);
    setUserInfo({ name: '', email: '', phone: '' });
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-brand-blue/10 rounded-full">
                  <AirVent className="h-8 w-8 text-brand-blue" />
                </div>
                <Snowflake className="h-6 w-6 text-brand-red animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 text-center"
            >
              Premium <span className="text-brand-blue">AC Buy & Sale</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 text-center"
            >
              Discover our curated collection of premium air conditioners. From brand new energy-efficient models to well-maintained used units, find the perfect AC for your space.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90 text-white">
                <Link to="/ac-buy-and-sale">
                  <Eye className="mr-2 h-5 w-5" />
                  Browse All ACs
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white">
                <Link to="/contact">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Sell Your AC
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Featured AC Units */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {premiumACs.map((ac, index) => (
              <motion.div
                key={ac.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img 
                      src={ac.image} 
                      alt={ac.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {ac.discount && (
                      <Badge className="absolute top-3 left-3 bg-brand-red text-white">
                        {ac.discount}% OFF
                      </Badge>
                    )}
                    <Badge className={`absolute top-3 right-3 ${ac.condition === 'new' ? 'bg-green-500' : 'bg-amber-500'} text-white`}>
                      {ac.condition === 'new' ? 'New' : 'Used'}
                    </Badge>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <Badge variant="outline" className="mb-2 text-brand-blue border-brand-blue">
                        {ac.brand}
                      </Badge>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {ac.name}
                      </h3>
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(ac.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{ac.rating}</span>
                      </div>
                      <div className="mb-3">
                        {ac.originalPrice ? (
                          <div>
                            <span className="text-2xl font-bold text-brand-blue">{formatPrice(ac.price)}</span>
                            <span className="ml-2 text-sm text-gray-500 line-through">{formatPrice(ac.originalPrice)}</span>
                          </div>
                        ) : (
                          <span className="text-2xl font-bold text-brand-blue">{formatPrice(ac.price)}</span>
                        )}
                      </div>
                      <div className="space-y-1 mb-4">
                        {ac.features.slice(0, 2).map((feature, idx) => (
                          <div key={idx} className="text-xs text-gray-600 dark:text-gray-400">
                            • {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleWhatsAppInquiry(ac)}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        WhatsApp Us
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                        onClick={() => handleGetMoreInfo(ac)}
                      >
                        <Info className="mr-2 h-4 w-4" />
                        Get More Info
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-brand-blue to-brand-red rounded-2xl p-8 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                Looking for More Options?
              </h3>
              <p className="text-lg mb-6 opacity-90 text-center">
                Explore our complete collection of premium air conditioners with detailed specifications and expert recommendations.
              </p>
              <div className="flex justify-center">
                <Button asChild size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
                  <Link to="/ac-buy-and-sale">
                    View Complete AC Collection
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Get More Info Modal */}
      <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get AC Information</DialogTitle>
            <DialogDescription>
              Please provide your contact details to receive detailed information about the {selectedAC?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={userInfo.name}
                onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your full name"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={userInfo.phone}
                onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+92 xxx xxxxxxx"
              />
            </div>
            <div>
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
              />
            </div>
            <Button onClick={handleSubmitInfo} className="w-full bg-brand-blue hover:bg-brand-blue/90">
              Send My Information
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PremiumACSection;
