import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
  CreditCard,
  Camera,
  Upload,
  Phone,
  User
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartContext';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

// Type definitions
interface ACUnit {
  id: string;
  name: string;
  price: number;
  rating: number;
  features: string[];
  images: string[];
  category: 'for-sale' | 'wanted';
  condition: 'new' | 'used';
  discounted?: boolean;
  discountPercentage?: number;
  active?: boolean;
}

// Sample AC units for sale
const acUnitsForSale: ACUnit[] = [
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
    ],
    category: 'for-sale',
    condition: 'new'
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
      'https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'for-sale',
    condition: 'new',
    discounted: true,
    discountPercentage: 10
  },
  {
    id: 'used-standard-1ton',
    name: 'Used Standard AC - 1 Ton',
    price: 55000,
    rating: 4.0,
    features: [
      'Efficient cooling',
      'Cooling capacity: 12,000 BTU',
      'Auto restart feature',
      'Regular maintenance done',
      '6-month warranty from our shop'
    ],
    images: [
      'https://images.unsplash.com/photo-1563351672-62b74891a28a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'for-sale',
    condition: 'used'
  }
];

// Sample AC units wanted
const acUnitsWanted: ACUnit[] = [
  {
    id: 'wanted-inverter-1ton',
    name: 'Looking for: Inverter AC - 1 Ton',
    price: 60000,
    rating: 0,
    features: [
      'Seeking slightly used inverter AC',
      'Must be in good working condition',
      'Preferably 1-2 years old',
      'Budget: Up to PKR 60,000',
      'Location: Rawalpindi'
    ],
    images: [
      'https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'wanted',
    condition: 'used'
  },
  {
    id: 'wanted-inverter-2ton',
    name: 'Looking for: Inverter AC - 2 Ton',
    price: 85000,
    rating: 0,
    features: [
      'Seeking used inverter AC in excellent condition',
      'Must be less than 3 years old',
      'Energy efficient model preferred',
      'Budget: Up to PKR 85,000',
      'Location: Islamabad'
    ],
    images: [
      'https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'wanted',
    condition: 'used'
  }
];

// Main Component
const AcBuyAndSale = () => {
  const [selectedUnit, setSelectedUnit] = useState<ACUnit | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState<'for-sale' | 'wanted'>('for-sale');
  const [isSellingFormOpen, setIsSellingFormOpen] = useState(false);
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };

  const handleAddToCart = (unit: ACUnit) => {
    addToCart(unit);
    toast({
      title: "Added to cart",
      description: `${unit.name} has been added to your cart.`,
    });
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

  const handleSubmitSellingForm = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Form submitted",
      description: "We've received your AC selling request. Our team will contact you shortly.",
    });
    setIsSellingFormOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-blue text-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">AC Buy & Sale Marketplace</h1>
              <p className="text-xl opacity-90 leading-relaxed mb-8">
                Find quality air conditioners at competitive prices or sell your used AC units. All transactions are backed by our quality assurance and expert technical assessment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-brand-red hover:bg-brand-red/90" onClick={() => setSelectedTab('for-sale')}>
                  Buy AC Units
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => setIsSellingFormOpen(true)}>
                  Sell Your AC
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
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<BadgeCheck className="h-8 w-8 text-brand-red" />} 
              title="Quality Assurance" 
              description="All AC units are thoroughly inspected and tested by our certified technicians."
            />
            <FeatureCard 
              icon={<Truck className="h-8 w-8 text-brand-red" />} 
              title="Free Delivery" 
              description="Free delivery on all AC units within Islamabad and Rawalpindi."
            />
            <FeatureCard 
              icon={<ShieldCheck className="h-8 w-8 text-brand-red" />} 
              title="Warranty Included" 
              description="All units come with warranty and our service guarantee."
            />
            <FeatureCard 
              icon={<Clock className="h-8 w-8 text-brand-red" />} 
              title="Expert Installation" 
              description="Professional installation by our certified technicians."
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as 'for-sale' | 'wanted')}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger value="for-sale" className="text-base py-3">ACs For Sale</TabsTrigger>
                <TabsTrigger value="wanted" className="text-base py-3">ACs Wanted</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="for-sale">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">Air Conditioners For Sale</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Browse our selection of new and used air conditioning units with competitive pricing and quality assurance.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {acUnitsForSale.map(unit => (
                  <ProductCard 
                    key={unit.id} 
                    product={unit} 
                    onImageClick={() => openGallery(unit)}
                    onAddToCart={() => handleAddToCart(unit)}
                    formatPrice={formatPrice}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="wanted">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">AC Buying Requests</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  These are the current requests from people looking to buy AC units. If you have something that matches, contact us.
                </p>
                <Button 
                  className="mt-4 bg-brand-blue hover:bg-brand-blue/80"
                  onClick={() => setIsSellingFormOpen(true)}
                >
                  Sell Your AC Unit
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {acUnitsWanted.map(unit => (
                  <WantedCard 
                    key={unit.id} 
                    request={unit} 
                    formatPrice={formatPrice}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Sell Your AC Form Modal */}
      {isSellingFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Sell Your AC Unit</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setIsSellingFormOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmitSellingForm}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="Full Name" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="e.g. 0300-1234567" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  
                  <div>
                    <Label htmlFor="ac-model">AC Model/Brand</Label>
                    <Input id="ac-model" placeholder="e.g. Gree 1.5 Ton Inverter" required />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="condition">Condition</Label>
                      <select 
                        id="condition" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Select Condition</option>
                        <option value="like-new">Like New</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="age">Age (Years)</Label>
                      <Input id="age" type="number" min="0" placeholder="e.g. 2" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="asking-price">Asking Price (PKR)</Label>
                    <Input id="asking-price" type="number" min="0" placeholder="e.g. 50000" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Please provide details about your AC unit, including any issues or special features."
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Upload Images</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Camera className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Upload photos of your AC unit</p>
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Select Files
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="terms" required />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions and confirm that the information provided is accurate.
                    </Label>
                  </div>
                  
                  <div className="flex justify-end gap-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setIsSellingFormOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-brand-blue hover:bg-brand-blue/90">
                      Submit Request
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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
              {selectedUnit.images.length > 1 && (
                <>
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
                </>
              )}
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
                    <span className="ml-4 text-sm px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {selectedUnit.condition === 'new' ? 'New' : 'Used'}
                    </span>
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
                    handleAddToCart(selectedUnit);
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

      {/* Testimonials section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="I sold my 2-year-old AC unit through this service and got a fair price. The process was smooth and the team was very professional."
              author="Ahmed Khan"
              role="Seller from Rawalpindi"
            />
            <TestimonialCard 
              quote="Bought a used inverter AC at half the market price. It works perfectly and came with a 6-month warranty. Highly recommended!"
              author="Fatima Ali"
              role="Buyer from Islamabad"
            />
            <TestimonialCard 
              quote="The technical assessment they provide before listing used ACs gives buyers confidence. I've both bought and sold through them."
              author="Muhammad Usman"
              role="Regular Customer"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Buy or Sell Your AC?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Whether you're looking to upgrade your cooling system or sell your current unit, we're here to help you get the best deal.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-brand-red hover:bg-brand-red/90">
              Browse AC Units
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => setIsSellingFormOpen(true)}>
              Sell Your AC
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-brand-red" />
              <span>Quality Assured</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-brand-red" />
              <span>Warranty Included</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-brand-red" />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Banknote className="h-5 w-5 text-brand-red" />
              <span>Best Price Guarantee</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Subcomponents
const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
    <div className="mx-auto mb-4 flex justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
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
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="relative">
        {product.discounted && (
          <div className="absolute top-4 right-4 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            {product.discountPercentage}% OFF
          </div>
        )}
        
        <div 
          className="h-56 overflow-hidden cursor-pointer" 
          onClick={onImageClick}
        >
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center mb-2 gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-sm text-gray-600">{product.rating}</span>
          
          <span className="ml-auto text-sm px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {product.condition === 'new' ? 'New' : 'Used'}
          </span>
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
        
        <Button className="w-full bg-brand-blue hover:bg-brand-blue/90" onClick={onAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

const WantedCard = ({ 
  request, 
  formatPrice
}: { 
  request: ACUnit;
  formatPrice: (price: number) => string;
}) => {
  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="h-40 bg-gradient-to-r from-blue-500 to-blue-600 p-6 flex items-center justify-center relative">
        <div className="absolute top-4 left-4 bg-white text-brand-blue text-xs font-bold px-3 py-1 rounded-full">
          Wanted
        </div>
        <div className="text-white text-center">
          <h3 className="text-xl font-bold">{request.name}</h3>
          <p className="text-white/80 mt-2">{formatPrice(request.price)}</p>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="space-y-2 mb-4">
          {request.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <BadgeCheck className="w-4 h-4 text-brand-blue mt-1 mr-2 shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
            </div>
          ))}
        </div>
        
        <Button className="w-full bg-brand-blue hover:bg-brand-blue/90">
          <Phone className="mr-2 h-4 w-4" />
          Contact Buyer
        </Button>
      </CardContent>
    </Card>
  );
};

const TestimonialCard = ({
  quote,
  author,
  role
}: {
  quote: string;
  author: string;
  role: string;
}) => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="mb-4 text-brand-blue">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.942.41-2.98.82-2.77 2.93-5.73 2.93-5.73s-3.02 1.392-4.81 3.34c-1.84 1.99-2.27 4.3-1.29 6.92.92 2.48 3.29 3.17 4.75 2.49 1.17-.54 1.56-1.94 1.56-2.98zm11.08 0c0-.88-.23-1.618-.69-2.217-.326-.42-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.942.41-2.98.82-2.77 2.93-5.73 2.93-5.73s-3.02 1.392-4.81 3.34c-1.84 1.99-2.27 4.3-1.29 6.92.92 2.48 3.29 3.17 4.75 2.49 1.17-.54 1.56-1.94 1.56-2.98z" />
      </svg>
    </div>
    <p className="text-gray-700 dark:text-gray-300 mb-6">{quote}</p>
    <div>
      <p className="font-bold">{author}</p>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  </div>
);

export default AcBuyAndSale;
