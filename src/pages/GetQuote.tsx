
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MessageCircle, Calculator, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const GetQuote = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
    propertyType: '',
    rooms: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service_type: formData.serviceType,
          message: `Property Type: ${formData.propertyType}\nRooms: ${formData.rooms}\nBudget: ${formData.budget}\n\nMessage: ${formData.message}`
        }]);

      if (error) throw error;

      toast({
        title: "Quote Request Submitted!",
        description: "We'll get back to you within 24 hours with a detailed quote."
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        message: '',
        propertyType: '',
        rooms: '',
        budget: ''
      });
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-8 shadow-xl"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <Calculator className="h-12 w-12 text-white" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Free Quote</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get an instant quote for your AC installation, repair, or maintenance needs. Our experts will provide you with the best solution for your budget.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Quote Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold text-gray-900">Request Your Quote</CardTitle>
                <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-base font-semibold mb-2 block">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        required
                        className="h-12 text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-base font-semibold mb-2 block">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        required
                        className="h-12 text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-base font-semibold mb-2 block">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+92 312 5242182"
                        required
                        className="h-12 text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="serviceType" className="text-base font-semibold mb-2 block">Service Type *</Label>
                      <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="installation">AC Installation</SelectItem>
                          <SelectItem value="repair">AC Repair</SelectItem>
                          <SelectItem value="maintenance">AC Maintenance</SelectItem>
                          <SelectItem value="cleaning">AC Cleaning</SelectItem>
                          <SelectItem value="gas-refill">Gas Refilling</SelectItem>
                          <SelectItem value="purchase">AC Purchase</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="propertyType" className="text-base font-semibold mb-2 block">Property Type</Label>
                      <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="shop">Shop</SelectItem>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="rooms" className="text-base font-semibold mb-2 block">Number of Rooms</Label>
                      <Select value={formData.rooms} onValueChange={(value) => handleInputChange('rooms', value)}>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Select rooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Room</SelectItem>
                          <SelectItem value="2">2 Rooms</SelectItem>
                          <SelectItem value="3">3 Rooms</SelectItem>
                          <SelectItem value="4">4 Rooms</SelectItem>
                          <SelectItem value="5+">5+ Rooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="budget" className="text-base font-semibold mb-2 block">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50k-100k">PKR 50,000 - 100,000</SelectItem>
                          <SelectItem value="100k-200k">PKR 100,000 - 200,000</SelectItem>
                          <SelectItem value="200k-300k">PKR 200,000 - 300,000</SelectItem>
                          <SelectItem value="300k+">PKR 300,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-base font-semibold mb-2 block">Additional Details</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us more about your requirements, specific issues, or any questions you have..."
                      rows={6}
                      className="text-base"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl"
                  >
                    {isSubmitting ? 'Submitting...' : 'Get My Free Quote'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Quick Contact */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Need Immediate Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-4">
                    <Phone className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">24/7 Emergency Service</h3>
                  <p className="text-lg mb-4">+92 312 5242182</p>
                  <Button 
                    asChild
                    className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                  >
                    <a href="tel:+923125242182">Call Now</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp Contact */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-green-600 to-green-700 text-white">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-4">
                    <MessageCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">WhatsApp Quote</h3>
                  <p className="mb-4">Get instant quotes via WhatsApp</p>
                  <Button 
                    asChild
                    className="w-full bg-white text-green-600 hover:bg-gray-100 font-semibold"
                  >
                    <a 
                      href="https://wa.me/923125242182?text=Hi! I'd like to get a quote for AC services. Could you please help me?"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-center">Why Choose Us?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <span>24/7 Emergency Service</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-6 w-6 text-blue-600" />
                  <span>Warranty on All Work</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GetQuote;
