
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import {
  CreditCard,
  User,
  Home,
  Phone,
  Mail,
  Banknote,
  Check,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    notes: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect to cart if cart is empty
  React.useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before proceeding to checkout.",
      });
    }
  }, [cart, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsLoading(false);
      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your order. We will contact you shortly to confirm.",
      });
      navigate('/');
    }, 1500);
  };
  
  const validateForm = () => {
    // Simple validation
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city'];
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (emptyFields.length > 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }
    
    // Phone validation - simple check for numeric and min length
    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(formData.phone.replace(/[^0-9]/g, ''))) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };
  
  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };
  
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/cart" className="text-brand-blue hover:text-brand-blue/80 flex items-center mr-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to cart
          </Link>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Customer Information */}
              <Card className="mb-8 shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Customer Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        Email <span className="text-red-500">*</span>
                        <Mail className="h-4 w-4 text-gray-400" />
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.doe@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        Phone <span className="text-red-500">*</span>
                        <Phone className="h-4 w-4 text-gray-400" />
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="03XX-XXXXXXX"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Shipping Address */}
              <Card className="mb-8 shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <Home className="mr-2 h-5 w-5" />
                    Delivery Address
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main Street, Apartment 4B"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Islamabad"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Zip/Postal Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          placeholder="44000"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Special instructions for delivery or installation..."
                        className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Payment Method */}
              <Card className="mb-8 shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Payment Method
                  </h2>
                  
                  <div className="space-y-6">
                    <Tabs defaultValue={paymentMethod} onValueChange={setPaymentMethod}>
                      <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6 gap-2">
                        <TabsTrigger value="cash" className="data-[state=active]:bg-brand-blue data-[state=active]:text-white">Cash on Delivery</TabsTrigger>
                        <TabsTrigger value="bank" className="data-[state=active]:bg-brand-blue data-[state=active]:text-white">Bank Transfer</TabsTrigger>
                        <TabsTrigger value="easypaisa" className="data-[state=active]:bg-brand-blue data-[state=active]:text-white">EasyPaisa</TabsTrigger>
                        <TabsTrigger value="jazzcash" className="data-[state=active]:bg-brand-blue data-[state=active]:text-white">JazzCash</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="cash" className="space-y-4 border border-green-100 dark:border-green-900/30 rounded-md">
                        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20">
                          <Banknote className="h-6 w-6 text-green-500 shrink-0" />
                          <div>
                            <p className="font-medium">Cash on Delivery</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Pay with cash when your order is delivered to your doorstep</p>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="bank" className="space-y-4 border border-blue-100 dark:border-blue-900/30 rounded-md">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20">
                          <div className="flex items-center gap-3 mb-3">
                            <CreditCard className="h-6 w-6 text-blue-500 shrink-0" />
                            <p className="font-medium">Bank Transfer</p>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-md mb-3">
                            <p className="font-semibold mb-2">Bank Account Details:</p>
                            <p>Bank: HBL Bank</p>
                            <p>Account Title: AC Service Provider</p>
                            <p>Account Number: 1234-5678-9012-3456</p>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Please transfer the total amount and provide transaction reference in the order notes. Your order will be processed after payment confirmation.
                          </p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="easypaisa" className="space-y-4 border border-orange-100 dark:border-orange-900/30 rounded-md">
                        <div className="p-4 bg-orange-50 dark:bg-orange-900/20">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="h-6 w-6 flex items-center justify-center">
                              <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Easypaisa.svg" alt="EasyPaisa" className="h-5 w-5" />
                            </div>
                            <p className="font-medium">EasyPaisa</p>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-md mb-3">
                            <p className="font-semibold mb-2">EasyPaisa Account:</p>
                            <p>Account Title: AC Service Provider</p>
                            <p>Mobile Number: 0311-1234567</p>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Please transfer the total amount and provide transaction ID in the order notes. Your order will be processed after payment confirmation.
                          </p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="jazzcash" className="space-y-4 border border-red-100 dark:border-red-900/30 rounded-md">
                        <div className="p-4 bg-red-50 dark:bg-red-900/20">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="h-6 w-6 flex items-center justify-center">
                              <img src="https://upload.wikimedia.org/wikipedia/en/b/b4/JazzCash_logo.png" alt="JazzCash" className="h-5 w-5" />
                            </div>
                            <p className="font-medium">JazzCash</p>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-md mb-3">
                            <p className="font-semibold mb-2">JazzCash Account:</p>
                            <p>Account Title: AC Service Provider</p>
                            <p>Mobile Number: 0300-1234567</p>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Please transfer the total amount and provide transaction ID in the order notes. Your order will be processed after payment confirmation.
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
              
              <Button 
                type="submit" 
                className="w-full bg-brand-red hover:bg-brand-red/90 h-14 text-lg shadow-lg" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Place Order'}
              </Button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-md sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                {/* Order Items */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4">
                  {cart.map(item => {
                    const itemPrice = item.discounted 
                      ? item.price * (1 - (item.discountPercentage || 0) / 100)
                      : item.price;
                      
                    return (
                      <div key={item.id} className="flex gap-4 py-3 border-b border-gray-100 dark:border-gray-800">
                        <div className="w-16 h-16 rounded overflow-hidden shrink-0">
                          <img 
                            src={item.images[0]} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium line-clamp-1">{item.name}</h3>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Qty: {item.quantity} × {formatPrice(itemPrice)}
                          </div>
                          {item.condition === 'used' && (
                            <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-2 py-0.5 rounded">
                              Used
                            </span>
                          )}
                        </div>
                        <div className="text-right font-medium">
                          {formatPrice(itemPrice * item.quantity)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <Separator className="my-4" />
                
                {/* Order Totals */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Delivery</span>
                    <span className="text-green-500 font-medium">Free</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md space-y-2 mt-6">
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Free delivery for Rawalpindi and Islamabad</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    <span>Secure payment methods</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
