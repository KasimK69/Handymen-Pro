
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
  ShieldCheck
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    zipCode: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect to cart if cart is empty
  React.useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
  
  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };
  
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Customer Information */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Customer Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Shipping Address */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Home className="mr-2 h-5 w-5" />
                  Delivery Address
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Zip/Postal Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Payment Method */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Payment Method
                </h2>
                
                <div className="space-y-4">
                  <Tabs defaultValue={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
                      <TabsTrigger value="cash">Cash on Delivery</TabsTrigger>
                      <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                      <TabsTrigger value="easypaisa">EasyPaisa</TabsTrigger>
                      <TabsTrigger value="jazzcash">JazzCash</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="cash" className="space-y-4">
                      <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-md">
                        <Banknote className="h-5 w-5 text-green-500" />
                        <span>Pay with cash when your order is delivered</span>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="bank" className="space-y-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                        <p className="mb-2 font-medium">Bank Account Details:</p>
                        <p>Bank: HBL Bank</p>
                        <p>Account Title: AC Service Provider</p>
                        <p>Account Number: 1234-5678-9012-3456</p>
                        <p className="mt-2 text-sm">
                          Please transfer the total amount and provide transaction reference in the order notes.
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="easypaisa" className="space-y-4">
                      <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-md">
                        <p className="mb-2 font-medium">EasyPaisa Account:</p>
                        <p>Account Title: AC Service Provider</p>
                        <p>Mobile Number: 0311-1234567</p>
                        <p className="mt-2 text-sm">
                          Please transfer the total amount and provide transaction ID in the order notes.
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="jazzcash" className="space-y-4">
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-md">
                        <p className="mb-2 font-medium">JazzCash Account:</p>
                        <p>Account Title: AC Service Provider</p>
                        <p>Mobile Number: 0300-1234567</p>
                        <p className="mt-2 text-sm">
                          Please transfer the total amount and provide transaction ID in the order notes.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
            
            <Button 
              type="submit" 
              className="w-full bg-brand-red hover:bg-brand-red/90" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </Button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-4">
                {cart.map(item => {
                  const itemPrice = item.discounted 
                    ? item.price * (1 - (item.discountPercentage || 0) / 100)
                    : item.price;
                    
                  return (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded overflow-hidden shrink-0">
                        <img 
                          src={item.images[0]} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="text-sm text-gray-500">
                          Qty: {item.quantity} × {formatPrice(itemPrice)}
                        </div>
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
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-500">Free</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Free delivery for Rawalpindi and Islamabad</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>Secure payment methods</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
