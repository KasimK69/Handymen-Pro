
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Eye, MessageSquare, ArrowRight, Snowflake, AirVent, Info, ShoppingCart } from 'lucide-react';
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
    name: 'Samsung Pro Inverter AC - 1.5 Ton',
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
    name: 'LG Eco Inverter AC - 1 Ton',
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
    name: 'Haier Ultra Cool AC - 2 Ton',
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
    name: 'Gree Standard AC - 1.5 Ton',
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

  const handleBuyNow = (ac: ACUnit) => {
    const message = `I want to buy: ${ac.name} (${ac.brand})
Price: ${formatPrice(ac.price)}
Features: ${ac.features.join(', ')}

Please confirm availability and arrange delivery.`;
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
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gradient-to-r from-brand-blue to-brand-red rounded-full shadow-lg">
                  <AirVent className="h-12 w-12 text-white" />
                </div>
                <div className="text-5xl font-bold text-brand-blue">+</div>
                <div className="p-4 bg-gradient-to-r from-brand-red to-orange-500 rounded-full shadow-lg">
                  <ShoppingCart className="h-12 w-12 text-white" />
                </div>
              </div>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8"
            >
              Premium <span className="bg-gradient-to-r from-brand-blue to-brand-red bg-clip-text text-transparent">AC Buy & Sale</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto mb-12"
            >
              Discover our curated collection of premium air conditioners. From brand new energy-efficient models to well-maintained used units.
            </motion.p>
          </div>

          {/* Featured AC Units */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {premiumACs.map((ac, index) => (
              <motion.div
                key={ac.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-white dark:bg-gray-800 hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img 
                      src={ac.image} 
                      alt={ac.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {ac.discount && (
                      <Badge className="absolute top-4 left-4 bg-red-500 text-white text-lg px-3 py-1">
                        {ac.discount}% OFF
                      </Badge>
                    )}
                    <Badge className={`absolute top-4 right-4 text-white text-sm px-3 py-1 ${ac.condition === 'new' ? 'bg-green-500' : 'bg-amber-500'}`}>
                      {ac.condition === 'new' ? 'New' : 'Used'}
                    </Badge>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <Badge variant="outline" className="mb-3 text-brand-blue border-brand-blue text-sm px-3 py-1">
                        {ac.brand}
                      </Badge>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                        {ac.name}
                      </h3>
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < Math.floor(ac.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="ml-2 text-sm font-semibold text-gray-600 dark:text-gray-400">{ac.rating}</span>
                      </div>
                      <div className="mb-4">
                        {ac.originalPrice ? (
                          <div>
                            <span className="text-3xl font-bold text-brand-blue">{formatPrice(ac.price)}</span>
                            <span className="ml-2 text-lg text-gray-500 line-through">{formatPrice(ac.originalPrice)}</span>
                          </div>
                        ) : (
                          <span className="text-3xl font-bold text-brand-blue">{formatPrice(ac.price)}</span>
                        )}
                      </div>
                      <div className="space-y-2 mb-6">
                        {ac.features.slice(0, 2).map((feature, idx) => (
                          <div key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <div className="w-2 h-2 bg-brand-blue rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 text-lg font-semibold shadow-lg"
                        onClick={() => handleBuyNow(ac)}
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Buy Now
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white py-3 text-lg font-semibold"
                        onClick={() => handleGetMoreInfo(ac)}
                      >
                        <Info className="mr-2 h-5 w-5" />
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
            <div className="bg-gradient-to-r from-brand-blue via-purple-600 to-brand-red rounded-3xl p-12 text-white shadow-2xl">
              <h3 className="text-4xl md:text-5xl font-bold mb-6">
                Looking for More Options?
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Explore our complete collection of premium air conditioners with detailed specifications and expert recommendations.
              </p>
              <div className="flex justify-center">
                <Button asChild size="lg" className="bg-white text-brand-blue hover:bg-gray-100 py-4 px-8 text-xl font-bold shadow-lg">
                  <Link to="/ac-buy-and-sale">
                    View Complete AC Collection
                    <ArrowRight className="ml-3 h-6 w-6" />
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
            <DialogTitle className="text-2xl font-bold">Get AC Information</DialogTitle>
            <DialogDescription className="text-lg">
              Please provide your contact details to receive detailed information about the {selectedAC?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-lg font-semibold">Name *</Label>
              <Input
                id="name"
                value={userInfo.name}
                onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your full name"
                className="mt-2 py-3"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-lg font-semibold">Phone Number *</Label>
              <Input
                id="phone"
                value={userInfo.phone}
                onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+92 xxx xxxxxxx"
                className="mt-2 py-3"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-lg font-semibold">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
                className="mt-2 py-3"
              />
            </div>
            <Button onClick={handleSubmitInfo} className="w-full bg-brand-blue hover:bg-brand-blue/90 py-4 text-lg font-semibold">
              Send My Information
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PremiumACSection;
