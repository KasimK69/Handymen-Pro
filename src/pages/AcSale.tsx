
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BadgeCheck, 
  Truck, 
  ShieldCheck, 
  Clock, 
  Star,
  ShoppingCart,
  X,
  ChevronLeft,
  ChevronRight,
  Banknote,
  CreditCard
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ACUnit {
  id: string;
  name: string;
  price: number;
  rating: number;
  features: string[];
  images: string[];
  discounted?: boolean;
  discountPercentage?: number;
}

const acUnits: ACUnit[] = [
  {
    id: 'inverter-1ton',
    name: 'Pro Inverter AC - 1 Ton',
    price: 125000,
    rating: 4.8,
    features: [
      'Energy efficient inverter technology',
      'Cooling capacity: 12,000 BTU',
      'Low noise operation: 26dB',
      'Smart connectivity features',
      'Anti-bacterial filter',
      '5-year warranty'
    ],
    images: [
      'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'inverter-1.5ton',
    name: 'Pro Inverter AC - 1.5 Ton',
    price: 150000,
    rating: 4.9,
    features: [
      'Energy efficient inverter technology',
      'Cooling capacity: 18,000 BTU',
      'Low noise operation: 28dB',
      'Smart connectivity features',
      'Anti-bacterial filter',
      '5-year warranty'
    ],
    images: [
      'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    discounted: true,
    discountPercentage: 10
  },
  {
    id: 'inverter-2ton',
    name: 'Pro Inverter AC - 2 Ton',
    price: 175000,
    rating: 4.7,
    features: [
      'Energy efficient inverter technology',
      'Cooling capacity: 24,000 BTU',
      'Low noise operation: 30dB',
      'Smart connectivity features',
      'Anti-bacterial filter',
      '5-year warranty'
    ],
    images: [
      'https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'standard-1ton',
    name: 'Standard AC - 1 Ton',
    price: 85000,
    rating: 4.5,
    features: [
      'Efficient cooling',
      'Cooling capacity: 12,000 BTU',
      'Low noise operation',
      'Auto restart feature',
      'Dust filter',
      '2-year warranty'
    ],
    images: [
      'https://images.unsplash.com/photo-1563351672-62b74891a28a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'standard-1.5ton',
    name: 'Standard AC - 1.5 Ton',
    price: 110000,
    rating: 4.3,
    features: [
      'Efficient cooling',
      'Cooling capacity: 18,000 BTU',
      'Low noise operation',
      'Auto restart feature',
      'Dust filter',
      '2-year warranty'
    ],
    images: [
      'https://images.unsplash.com/photo-1580821810660-5486b8e980a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'standard-2ton',
    name: 'Standard AC - 2 Ton',
    price: 135000,
    rating: 4.4,
    features: [
      'Efficient cooling',
      'Cooling capacity: 24,000 BTU',
      'Low noise operation',
      'Auto restart feature',
      'Dust filter',
      '2-year warranty'
    ],
    images: [
      'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    discounted: true,
    discountPercentage: 15
  }
];

const AcSale = () => {
  const [selectedUnit, setSelectedUnit] = useState<ACUnit | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cart, setCart] = useState<{unit: ACUnit, quantity: number}[]>([]);
  
  const totalPrice = cart.reduce((sum, item) => {
    const price = item.unit.discounted 
      ? item.unit.price * (1 - (item.unit.discountPercentage || 0) / 100)
      : item.unit.price;
    return sum + (price * item.quantity);
  }, 0);

  const addToCart = (unit: ACUnit) => {
    const existingItem = cart.find(item => item.unit.id === unit.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.unit.id === unit.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, {unit, quantity: 1}]);
    }
    toast({
      title: "Added to cart",
      description: `${unit.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (unitId: string) => {
    setCart(cart.filter(item => item.unit.id !== unitId));
  };

  const updateQuantity = (unitId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.unit.id === unitId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  const openGallery = (unit: ACUnit) => {
    setSelectedUnit(unit);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedUnit(null);
  };

  const nextImage = () => {
    if (!selectedUnit) return;
    setCurrentImageIndex((prev) => 
      prev === selectedUnit.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!selectedUnit) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedUnit.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-blue text-white py-24 md:py-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Premium AC Units For Your Comfort</h1>
              <p className="text-xl opacity-90 leading-relaxed mb-8">
                Explore our collection of high-quality air conditioners with expert installation and maintenance services. Free delivery within Rawalpindi and Islamabad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-brand-red hover:bg-brand-red/90">
                  Shop Now
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to="/services/ac-repair">AC Services</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Modern AC Unit"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<BadgeCheck className="h-8 w-8 text-brand-red" />} 
              title="Premium Quality" 
              description="All our AC units meet rigorous quality standards for performance and durability."
            />
            <FeatureCard 
              icon={<Truck className="h-8 w-8 text-brand-red" />} 
              title="Free Delivery" 
              description="Free delivery on all AC units within Islamabad and Rawalpindi."
            />
            <FeatureCard 
              icon={<ShieldCheck className="h-8 w-8 text-brand-red" />} 
              title="Extended Warranty" 
              description="All units come with manufacturer warranty plus our service guarantee."
            />
            <FeatureCard 
              icon={<Clock className="h-8 w-8 text-brand-red" />} 
              title="Expert Installation" 
              description="Professional installation by our certified technicians."
            />
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="section-title text-center">Our AC Units</h2>
          <p className="section-subtitle text-center max-w-3xl mx-auto">
            Browse our selection of premium air conditioning units for your home or office
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {acUnits.map(unit => (
              <ProductCard 
                key={unit.id} 
                product={unit} 
                onImageClick={() => openGallery(unit)}
                onAddToCart={() => addToCart(unit)}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto">
            <h2 className="section-title mb-8">Your Cart</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-4">Product</th>
                        <th className="text-center py-4">Price</th>
                        <th className="text-center py-4">Quantity</th>
                        <th className="text-center py-4">Total</th>
                        <th className="text-right py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map(item => {
                        const itemPrice = item.unit.discounted 
                          ? item.unit.price * (1 - (item.unit.discountPercentage || 0) / 100)
                          : item.unit.price;
                        return (
                          <tr key={item.unit.id} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-4">
                              <div className="flex items-center">
                                <img 
                                  src={item.unit.images[0]} 
                                  alt={item.unit.name}
                                  className="w-16 h-16 object-cover rounded mr-4" 
                                />
                                <span>{item.unit.name}</span>
                              </div>
                            </td>
                            <td className="text-center py-4">{formatPrice(itemPrice)}</td>
                            <td className="text-center py-4">
                              <div className="flex items-center justify-center">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => updateQuantity(item.unit.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </Button>
                                <span className="mx-2">{item.quantity}</span>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => updateQuantity(item.unit.id, item.quantity + 1)}
                                >
                                  +
                                </Button>
                              </div>
                            </td>
                            <td className="text-center py-4">{formatPrice(itemPrice * item.quantity)}</td>
                            <td className="text-right py-4">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => removeFromCart(item.unit.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Total: {formatPrice(totalPrice)}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Includes free delivery in Rawalpindi and Islamabad
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0">
                    <h4 className="font-semibold mb-2">Available Payment Methods:</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-xs font-medium">
                        <Banknote className="h-3.5 w-3.5 mr-1" />
                        Cash on Delivery
                      </span>
                      <span className="inline-flex items-center px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-xs font-medium">
                        <CreditCard className="h-3.5 w-3.5 mr-1" />
                        Bank Transfer
                      </span>
                      <span className="inline-flex items-center px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-xs font-medium">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Easypaisa.svg" alt="EasyPaisa" className="h-3.5 w-3.5 mr-1" />
                        EasyPaisa
                      </span>
                      <span className="inline-flex items-center px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-xs font-medium">
                        <img src="https://upload.wikimedia.org/wikipedia/en/b/b4/JazzCash_logo.png" alt="JazzCash" className="h-3.5 w-3.5 mr-1" />
                        JazzCash
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    className="w-full md:w-auto bg-brand-red hover:bg-brand-red/90"
                    size="lg"
                    onClick={() => {
                      toast({
                        title: "Order Placed Successfully!",
                        description: "Our team will contact you shortly to confirm your order.",
                      });
                      setCart([]);
                    }}
                  >
                    Checkout Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Why Choose Our AC Units?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Our air conditioning units are selected from top manufacturers known for quality and efficiency. 
                When you purchase an AC from us, you're not just getting a cooling device - you're getting a complete comfort solution.
              </p>

              <div className="space-y-6">
                <BenefitItem 
                  title="Energy Efficiency" 
                  description="Our AC units are designed to provide maximum cooling while minimizing power consumption."
                />
                <BenefitItem 
                  title="Quiet Operation" 
                  description="Experience cool comfort without the noise - our units operate at whisper-quiet levels."
                />
                <BenefitItem 
                  title="Smart Features" 
                  description="Many of our premium units include smart controls and connectivity options."
                />
                <BenefitItem 
                  title="Long-Term Support" 
                  description="We provide ongoing maintenance and support for all purchased units."
                />
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Modern home with AC"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-brand-blue text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Comfort?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss which AC unit is right for your space and schedule a consultation or installation in Rawalpindi or Islamabad.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-brand-red hover:bg-brand-red/90">
              Buy Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Image Gallery Modal */}
      {selectedUnit && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full overflow-hidden">
            <div className="relative">
              <img 
                src={selectedUnit.images[currentImageIndex]} 
                alt={selectedUnit.name} 
                className="w-full h-auto object-contain" 
                style={{ maxHeight: "70vh" }}
              />
              <button 
                className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={closeGallery}
              >
                <X className="h-6 w-6" />
              </button>
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{selectedUnit.name}</h3>
                  <div className="flex items-center mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(selectedUnit.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{selectedUnit.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  {selectedUnit.discounted && (
                    <div className="text-sm text-gray-500 line-through">
                      {formatPrice(selectedUnit.price)}
                    </div>
                  )}
                  <div className="text-2xl font-bold text-brand-blue">
                    {selectedUnit.discounted 
                      ? formatPrice(selectedUnit.price * (1 - (selectedUnit.discountPercentage || 0) / 100))
                      : formatPrice(selectedUnit.price)}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold">Features:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedUnit.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <BadgeCheck className="w-5 h-5 text-brand-blue mt-0.5 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex gap-4 mt-6">
                <Button 
                  className="bg-brand-red hover:bg-brand-red/90"
                  onClick={() => {
                    addToCart(selectedUnit);
                    closeGallery();
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                  onClick={closeGallery}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
    <div className="mx-auto mb-4 flex justify-center">
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const ProductCard = ({ 
  product, 
  onImageClick,
  onAddToCart,
  formatPrice
}: { 
  product: ACUnit;
  onImageClick: () => void;
  onAddToCart: () => void;
  formatPrice: (price: number) => string;
}) => {
  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full">
      {product.discounted && (
        <div className="absolute top-4 right-4 bg-brand-red text-white text-xs px-3 py-1 rounded-full">
          {product.discountPercentage}% Off
        </div>
      )}
      <div className="relative h-48 overflow-hidden cursor-pointer" onClick={onImageClick}>
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <div className="mb-4">
          <span className="text-2xl font-bold text-brand-blue">
            {product.discounted 
              ? formatPrice(product.price * (1 - (product.discountPercentage || 0) / 100))
              : formatPrice(product.price)}
          </span>
          {product.discounted && (
            <span className="text-lg text-gray-500 line-through ml-2">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <div className="space-y-2 mb-4">
          {product.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-start">
              <BadgeCheck className="w-4 h-4 text-brand-blue mt-1 mr-2 shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
            </div>
          ))}
          {product.features.length > 3 && (
            <div className="text-sm text-gray-600 dark:text-gray-400 pl-6">
              +{product.features.length - 3} more features
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button className="w-full bg-brand-blue hover:bg-brand-blue/90" onClick={onAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const BenefitItem = ({ 
  title, 
  description 
}: { 
  title: string; 
  description: string; 
}) => (
  <div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">
      {description}
    </p>
  </div>
);

export default AcSale;
