
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
  Phone
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
  const { addToCart } = useCart();
  const [selectedTab, setSelectedTab] = useState<'for-sale' | 'wanted'>('for-sale');
  const [selectedUnit, setSelectedUnit] = useState<ACUnit | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSellingFormOpen, setIsSellingFormOpen] = useState(false);
  const [sellingFormData, setSellingFormData] = useState({
    name: '',
    price: '',
    description: '',
    contact: '',
    condition: 'used',
    model: '',
    brand: '',
    images: ['', '', ''],
    location: '',
  });
  
  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };

  const handleAddToCart = (product: ACUnit) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
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

  const handleSellingFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSellingFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newImages = [...sellingFormData.images];
    newImages[index] = value;
    setSellingFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleSubmitSelling = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "AC Listing Submitted",
      description: "Thank you! Your AC listing has been submitted for review. Our team will contact you shortly.",
    });
    setIsSellingFormOpen(false);
    setSellingFormData({
      name: '',
      price: '',
      description: '',
      contact: '',
      condition: 'used',
      model: '',
      brand: '',
      images: ['', '', ''],
      location: '',
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-blue to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">AC Buy & Sale</h1>
              <p className="text-lg opacity-90 mb-6">
                Find top-quality air conditioners for your home or office, or sell your used AC units to interested buyers. 
                All transactions are secure and convenient.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <Button 
                  size="lg" 
                  className="bg-brand-red hover:bg-brand-red/90 text-white"
                  onClick={() => setSelectedTab('for-sale')}
                >
                  Browse ACs For Sale
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => setSelectedTab('wanted')}
                >
                  View Buying Requests
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => setIsSellingFormOpen(true)}
                >
                  Sell Your AC
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="Air Conditioner" 
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="text-brand-blue font-bold text-xl">Premium Quality</div>
                  <div className="text-gray-600">Guaranteed Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<BadgeCheck className="h-8 w-8 text-brand-red" />} 
              title="Quality Assured" 
              description="All our AC units are thoroughly tested for quality and performance before listing."
            />
            <FeatureCard 
              icon={<Truck className="h-8 w-8 text-brand-red" />} 
              title="Fast Delivery" 
              description="Free delivery within 24-48 hours in Rawalpindi and Islamabad areas."
            />
            <FeatureCard 
              icon={<ShieldCheck className="h-8 w-8 text-brand-red" />} 
              title="Warranty Coverage" 
              description="All new units come with manufacturer warranty plus our service guarantee."
            />
            <FeatureCard 
              icon={<Clock className="h-8 w-8 text-brand-red" />} 
              title="Expert Installation" 
              description="Professional installation by certified technicians included with every purchase."
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
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Sell Your AC Unit</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsSellingFormOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <form onSubmit={handleSubmitSelling} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">AC Name/Title</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={sellingFormData.name} 
                      onChange={handleSellingFormChange} 
                      placeholder="e.g., Haier Inverter AC 1.5 Ton"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Asking Price (PKR)</Label>
                    <Input 
                      id="price" 
                      name="price" 
                      type="number"
                      value={sellingFormData.price} 
                      onChange={handleSellingFormChange} 
                      placeholder="e.g., 50000"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input 
                      id="brand" 
                      name="brand" 
                      value={sellingFormData.brand} 
                      onChange={handleSellingFormChange} 
                      placeholder="e.g., Haier, Gree, etc."
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Model</Label>
                    <Input 
                      id="model" 
                      name="model" 
                      value={sellingFormData.model} 
                      onChange={handleSellingFormChange} 
                      placeholder="e.g., HSU-12LTC/012"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={sellingFormData.description} 
                    onChange={handleSellingFormChange} 
                    placeholder="Provide details about the condition, age, features, etc."
                    className="min-h-[100px]"
                    required
                  />
                </div>
                
                <div>
                  <Label className="block mb-2">AC Condition</Label>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="condition" 
                      checked={sellingFormData.condition === 'new'}
                      onCheckedChange={(checked) => 
                        setSellingFormData(prev => ({ ...prev, condition: checked ? 'new' : 'used' }))
                      }
                    />
                    <Label htmlFor="condition">
                      {sellingFormData.condition === 'new' ? 'New' : 'Used'}
                    </Label>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location" 
                    value={sellingFormData.location} 
                    onChange={handleSellingFormChange} 
                    placeholder="e.g., Rawalpindi, F-8 Islamabad, etc."
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input 
                    id="contact" 
                    name="contact" 
                    value={sellingFormData.contact} 
                    onChange={handleSellingFormChange} 
                    placeholder="e.g., 0300-1234567"
                    required
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">Upload Images (Up to 3)</Label>
                  <div className="space-y-4">
                    {sellingFormData.images.map((image, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <Input 
                          value={image} 
                          onChange={(e) => handleImageUrlChange(index, e.target.value)} 
                          placeholder={`Image URL ${index + 1}`}
                        />
                        {image && (
                          <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={image} 
                              alt={`Preview ${index + 1}`} 
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Error';
                              }}
                            />
                          </div>
                        )}
                        {!image && (
                          <div className="h-12 w-12 border rounded flex items-center justify-center bg-gray-100 text-gray-400 flex-shrink-0">
                            <Camera className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-start gap-2 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                  <div className="mt-1 text-blue-500">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    <p className="font-semibold">Submission Process:</p>
                    <p>Our team will review your submission and contact you to verify the details. Once approved, your listing will appear on our website. We may request additional information or photos if needed.</p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsSellingFormOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-brand-red hover:bg-brand-red/90">
                    Submit Listing
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Image Gallery Modal */}
      {selectedUnit && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full overflow-hidden">
            <div className="relative h-[50vh]">
              <img 
                src={selectedUnit.images[currentImageIndex]} 
                alt={selectedUnit.name} 
                className="w-full h-full object-contain"
              />
              <button 
                className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg"
                onClick={closeGallery}
              >
                <X className="h-6 w-6" />
              </button>
              {selectedUnit.images.length > 1 && (
                <>
                  <button 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {selectedUnit.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full ${
                      index === currentImageIndex ? 'bg-brand-red' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{selectedUnit.name}</h3>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(selectedUnit.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{selectedUnit.rating > 0 ? selectedUnit.rating : 'N/A'}</span>
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
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Features:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedUnit.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <BadgeCheck className="w-5 h-5 text-brand-blue mt-0.5 mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                {selectedUnit.category === 'for-sale' ? (
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
                ) : (
                  <Button 
                    className="bg-brand-blue hover:bg-brand-blue/90"
                    onClick={() => {
                      toast({
                        title: "Interest Registered",
                        description: "Thank you for your interest. Our team will contact you shortly.",
                      });
                      closeGallery();
                    }}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Buyer
                  </Button>
                )}
                <Button 
                  variant="outline" 
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
          <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="I bought a used inverter AC from them and couldn't be happier. It works like new and the price was extremely reasonable."
              author="Asim Khan"
              role="Rawalpindi"
            />
            <TestimonialCard 
              quote="Their team was very professional during installation. The AC I purchased is energy efficient and keeping my home cool even in peak summer."
              author="Sania Ahmed"
              role="Islamabad"
            />
            <TestimonialCard 
              quote="I was able to sell my old AC unit quickly through their platform. The process was smooth and I got a fair price."
              author="Fahad Mehmood"
              role="Rawalpindi"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Superior Comfort?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Whether you're looking to buy a new AC, sell your current one, or find a specific model, 
            we're here to help you with all your air conditioning needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-brand-red hover:bg-brand-red/90"
            >
              <Link to="/cart">View Cart</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
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
      {product.discounted && (
        <div className="absolute top-4 right-4 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          {product.discountPercentage}% OFF
        </div>
      )}
      <div 
        className="relative h-56 overflow-hidden cursor-pointer" 
        onClick={onImageClick}
      >
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 text-brand-blue dark:text-white px-4 py-2 rounded-full transform -translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            View Details
          </div>
        </div>
        <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 text-xs px-2 py-1 rounded-full shadow-md">
          {product.condition === 'new' ? (
            <span className="text-green-600 font-semibold">New</span>
          ) : (
            <span className="text-amber-600 font-semibold">Used</span>
          )}
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center mb-2">
          {product.rating > 0 && (
            <>
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
            </>
          )}
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{product.name}</h3>
        <div className="mb-4">
          <span className="text-2xl font-bold text-brand-blue">
            {product.discounted 
              ? formatPrice(product.price * (1 - (product.discountPercentage || 0) / 100))
              : formatPrice(product.price)}
          </span>
          {product.discounted && (
            <span className="text-sm text-gray-500 line-through ml-2">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <div className="space-y-2 mb-4">
          {product.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-start">
              <BadgeCheck className="w-4 h-4 text-brand-blue mt-1 mr-2 shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{feature}</span>
            </div>
          ))}
          {product.features.length > 3 && (
            <div className="text-sm text-gray-600 dark:text-gray-400 pl-6">
              +{product.features.length - 3} more features
            </div>
          )}
        </div>
        <Button 
          className="w-full bg-brand-red hover:bg-brand-red/90 transition-colors" 
          onClick={onAddToCart}
        >
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
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
        WANTED
      </div>
      <div className="relative h-56 overflow-hidden bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="bg-white dark:bg-gray-800 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
            <ShoppingCart className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="font-bold text-xl mb-2">{request.name.replace('Looking for: ', '')}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Max Budget: {formatPrice(request.price)}
          </p>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4">Buyer Requirements:</h3>
        <div className="space-y-2 mb-4">
          {request.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <BadgeCheck className="w-4 h-4 text-purple-600 mt-1 mr-2 shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
            </div>
          ))}
        </div>
        <Button 
          className="w-full bg-purple-600 hover:bg-purple-700 transition-colors"
          onClick={() => {
            toast({
              title: "Inquiry Sent",
              description: "Thank you for your interest. Our team will contact you shortly.",
            });
          }}
        >
          I Have This AC
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
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md relative">
      <div className="text-gray-400 dark:text-gray-500 text-4xl font-serif absolute top-4 left-6">"</div>
      <div className="pt-6">
        <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
          {quote}
        </p>
        <div className="flex items-center">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center mr-3">
            <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcBuyAndSale;
