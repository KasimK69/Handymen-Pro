
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MessageSquare, ArrowRight, Snowflake, AirVent, Info, ShoppingCart, ThermometerSnowflake, Wind, Zap, Timer, Shield, Sparkles, BarChart4 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    name: 'Samsung WindFree Inverter AC - 1.5 Ton',
    brand: 'Samsung',
    price: 135000,
    originalPrice: 150000,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/5824901/pexels-photo-5824901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    condition: 'new',
    features: ['Energy Efficient', 'Smart Control', 'Fast Cooling', '5 Year Warranty'],
    discount: 10,
    description: 'Premium Samsung WindFree inverter AC with advanced cooling technology and energy efficiency. Perfect for medium-sized rooms with smart connectivity features.'
  },
  {
    id: '2',
    name: 'LG DUALCOOL Inverter AC - 1 Ton',
    brand: 'LG',
    price: 115000,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/5824527/pexels-photo-5824527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    condition: 'new',
    features: ['Low Power Consumption', 'Dual Protection', 'WiFi Enabled', '3 Year Warranty'],
    description: 'LG DUALCOOL eco-friendly inverter AC with superior energy efficiency and smart home integration. Ideal for small to medium rooms.'
  },
  {
    id: '3',
    name: 'Haier Titan Series AC - 2 Ton',
    brand: 'Haier',
    price: 175000,
    originalPrice: 190000,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/5824516/pexels-photo-5824516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    condition: 'new',
    features: ['Heavy Duty Cooling', 'Turbo Mode', 'Self Cleaning', '7 Year Warranty'],
    discount: 8,
    description: 'Haier Titan Series AC with heavy-duty cooling capacity. Perfect for large rooms and commercial spaces with self-cleaning technology.'
  },
  {
    id: '4',
    name: 'Gree G10 Inverter AC - 1.5 Ton',
    brand: 'Gree',
    price: 95000,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/5824526/pexels-photo-5824526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    condition: 'used',
    features: ['Good Condition', 'Regular Service Done', 'Affordable Price', '1 Year Warranty'],
    description: 'Well-maintained Gree G10 Inverter AC in excellent condition. Perfect budget option with reliable cooling performance and warranty coverage.'
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
  const [isHoveredIndex, setIsHoveredIndex] = useState<number | null>(null);
  const [showFloatingIcons, setShowFloatingIcons] = useState(false);
  
  // Show floating icons with a delay after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFloatingIcons(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

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
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Floating AC Icons Background */}
        <AnimatePresence>
          {showFloatingIcons && (
            <>
              <motion.div 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 0.4, y: -20 }}
                transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute top-40 left-10 text-blue-300 dark:text-blue-600 hidden lg:block"
              >
                <Snowflake className="h-24 w-24" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 0.3, y: 20 }}
                transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', delay: 2 }}
                className="absolute bottom-40 right-10 text-blue-200 dark:text-blue-700 hidden lg:block"
              >
                <ThermometerSnowflake className="h-32 w-32" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 0.2, x: 0 }}
                transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
                className="absolute top-1/3 right-1/4 text-blue-300 dark:text-blue-600 hidden lg:block"
              >
                <Wind className="h-16 w-16" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 0.3, x: 0 }}
                transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', delay: 3 }}
                className="absolute bottom-1/3 left-1/4 text-blue-200 dark:text-blue-700 hidden lg:block"
              >
                <AirVent className="h-20 w-20" />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="flex items-center justify-center mb-8"
            >
              <div className="relative">
                <div className="p-5 bg-gradient-to-r from-brand-blue to-brand-red rounded-full shadow-xl">
                  <AirVent className="h-16 w-16 text-white" />
                </div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-3 rounded-full border-4 border-dashed border-blue-300 dark:border-blue-600 opacity-60"
                />
              </div>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8"
            >
              Premium <span className="bg-gradient-to-r from-brand-blue to-brand-red bg-clip-text text-transparent">AC Collection</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto mb-12"
            >
              Discover our curated selection of premium air conditioners with advanced cooling technology, energy efficiency, and smart features for your home or office.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <div className="flex items-center bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                <Zap className="h-5 w-5 text-brand-blue mr-2" />
                <span className="text-gray-700 dark:text-gray-300">Energy Efficient</span>
              </div>
              <div className="flex items-center bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                <Shield className="h-5 w-5 text-brand-blue mr-2" />
                <span className="text-gray-700 dark:text-gray-300">Extended Warranty</span>
              </div>
              <div className="flex items-center bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                <Timer className="h-5 w-5 text-brand-blue mr-2" />
                <span className="text-gray-700 dark:text-gray-300">Fast Installation</span>
              </div>
              <div className="flex items-center bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                <BarChart4 className="h-5 w-5 text-brand-blue mr-2" />
                <span className="text-gray-700 dark:text-gray-300">Smart Controls</span>
              </div>
            </motion.div>
          </div>

          {/* Featured AC Units */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {premiumACs.map((ac, index) => (
              <motion.div
                key={ac.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * index, type: "spring", stiffness: 100 }}
                onMouseEnter={() => setIsHoveredIndex(index)}
                onMouseLeave={() => setIsHoveredIndex(null)}
                className="relative"
              >
                {/* Animated Highlight Effect when hovered */}
                <AnimatePresence>
                  {isHoveredIndex === index && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="absolute -inset-3 bg-gradient-to-r from-blue-100/40 to-blue-300/40 dark:from-blue-900/20 dark:to-blue-700/20 rounded-2xl blur-xl z-0"
                    />
                  )}
                </AnimatePresence>
                
                <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-white dark:bg-gray-800 hover:scale-[1.03] relative z-10">
                  <div className="relative overflow-hidden">
                    <img 
                      src={ac.image} 
                      alt={ac.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {ac.discount && (
                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + (0.1 * index), duration: 0.5 }}
                      >
                        <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-lg px-3 py-1 shadow-md">
                          {ac.discount}% OFF
                        </Badge>
                      </motion.div>
                    )}
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + (0.1 * index), duration: 0.5 }}
                    >
                      <Badge className={`absolute top-4 right-4 text-white text-sm px-3 py-1 shadow-md ${ac.condition === 'new' ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-amber-500 to-amber-600'}`}>
                        {ac.condition === 'new' ? 'New' : 'Used'}
                      </Badge>
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <Badge variant="outline" className="mb-3 text-brand-blue border-brand-blue text-sm px-3 py-1 font-medium">
                        {ac.brand}
                      </Badge>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-brand-blue transition-colors duration-300">
                        {ac.name}
                      </h3>
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + (0.1 * i) + (0.1 * index), duration: 0.3 }}
                          >
                            <Star 
                              className={`h-5 w-5 ${i < Math.floor(ac.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          </motion.div>
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
                        {ac.features.map((feature, idx) => (
                          <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + (0.1 * idx) + (0.05 * index), duration: 0.3 }}
                            className="text-sm text-gray-600 dark:text-gray-400 flex items-center"
                          >
                            {idx === 0 && <Zap className="h-4 w-4 text-brand-blue mr-2" />}
                            {idx === 1 && <Shield className="h-4 w-4 text-brand-blue mr-2" />}
                            {idx === 2 && <Snowflake className="h-4 w-4 text-brand-blue mr-2" />}
                            {idx === 3 && <Timer className="h-4 w-4 text-brand-blue mr-2" />}
                            {feature}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 text-lg font-semibold shadow-lg group relative overflow-hidden"
                        onClick={() => handleBuyNow(ac)}
                      >
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-gradient-to-r from-green-700 to-green-800 group-hover:translate-x-full group-hover:scale-102" />
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-gradient-to-r from-green-600 to-green-700 group-hover:translate-x-full group-hover:scale-102" />
                        <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-300 ease-out transform translate-x-0 bg-green-600 group-hover:translate-x-full" />
                        <span className="absolute bottom-0 right-0 w-full h-1 transition-all duration-300 ease-out transform translate-x-full bg-green-800 group-hover:translate-x-0" />
                        <span className="relative flex items-center justify-center">
                          <ShoppingCart className="mr-2 h-5 w-5" />
                          Buy Now
                        </span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white py-3 text-lg font-semibold transition-all duration-300 relative overflow-hidden group"
                        onClick={() => handleGetMoreInfo(ac)}
                      >
                        <span className="absolute inset-0 w-0 bg-brand-blue transition-all duration-300 group-hover:w-full" />
                        <span className="relative flex items-center justify-center z-10 group-hover:text-white">
                          <Info className="mr-2 h-5 w-5" />
                          Get More Info
                        </span>
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
            transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-brand-blue via-purple-600 to-brand-red rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
              {/* Animated Background Elements */}
              <motion.div 
                className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mt-32 -mr-32"
                animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full -mb-20 -ml-20"
                animate={{ scale: [1, 1.3, 1], rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.8 }}
                >
                  <h3 className="text-4xl md:text-5xl font-bold mb-6">
                    Looking for More Options?
                  </h3>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    Explore our complete collection of premium air conditioners with detailed specifications and expert recommendations.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="flex justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.8, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button asChild size="lg" className="bg-white text-brand-blue hover:bg-gray-100 py-4 px-8 text-xl font-bold shadow-xl relative overflow-hidden group">
                    <Link to="/ac-buy-and-sale" className="flex items-center">
                      <span className="relative z-10">View Complete AC Collection</span>
                      <motion.div 
                        className="ml-3 relative z-10"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      >
                        <ArrowRight className="h-6 w-6" />
                      </motion.div>
                      <span className="absolute inset-0 w-0 bg-gray-100 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Get More Info Modal */}
      <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
        <DialogContent className="sm:max-w-md bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 border-0 shadow-2xl">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-brand-blue to-brand-red rounded-full shadow-lg">
                <AirVent className="h-8 w-8 text-white" />
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-brand-blue to-brand-red bg-clip-text text-transparent">
              Get AC Information
            </DialogTitle>
            <DialogDescription className="text-lg text-center">
              Please provide your contact details to receive detailed information about the {selectedAC?.name}.
            </DialogDescription>
          </DialogHeader>
          
          {selectedAC && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
              <div className="flex items-center gap-4">
                <img 
                  src={selectedAC.image} 
                  alt={selectedAC.name} 
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{selectedAC.name}</h4>
                  <p className="text-brand-blue font-semibold">{formatPrice(selectedAC.price)}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-lg font-semibold flex items-center gap-2">
                <span>Name *</span>
              </Label>
              <Input
                id="name"
                value={userInfo.name}
                onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your full name"
                className="mt-2 py-3 border-brand-blue/30 focus:border-brand-blue focus:ring-brand-blue"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-lg font-semibold flex items-center gap-2">
                <span>Phone Number *</span>
              </Label>
              <Input
                id="phone"
                value={userInfo.phone}
                onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+92 xxx xxxxxxx"
                className="mt-2 py-3 border-brand-blue/30 focus:border-brand-blue focus:ring-brand-blue"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-lg font-semibold flex items-center gap-2">
                <span>Email (Optional)</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
                className="mt-2 py-3 border-brand-blue/30 focus:border-brand-blue focus:ring-brand-blue"
              />
            </div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button 
                onClick={handleSubmitInfo} 
                className="w-full bg-gradient-to-r from-brand-blue to-brand-red hover:from-brand-blue/90 hover:to-brand-red/90 py-4 text-lg font-semibold shadow-lg"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Send My Information
              </Button>
            </motion.div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              We respect your privacy. Your information will only be used to contact you about this AC unit.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PremiumACSection;
