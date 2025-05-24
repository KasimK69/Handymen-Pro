
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Calendar, 
  Clock, 
  Phone, 
  MapPin, 
  User, 
  MessageSquare,
  CheckCircle,
  Settings,
  Wrench,
  Snowflake,
  ShieldCheck,
  Star,
  Zap
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Booking = () => {
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    preferredDate: '',
    preferredTime: '',
    acBrand: '',
    acModel: '',
    problemDescription: '',
    urgency: 'normal'
  });

  const services = [
    {
      id: 'ac-installation',
      name: 'AC Installation',
      icon: Settings,
      price: 'PKR 8,000 - 15,000',
      description: 'Professional AC installation with warranty',
      duration: '2-4 hours',
      features: ['Professional installation', 'Electrical setup', 'System testing', '1-year warranty']
    },
    {
      id: 'ac-repair',
      name: 'AC Repair',
      icon: Wrench,
      price: 'PKR 2,500 - 8,000',
      description: 'Quick repair for all AC brands',
      duration: '1-3 hours',
      features: ['Diagnosis included', 'Genuine parts', 'Same-day service', '6-month warranty']
    },
    {
      id: 'ac-gas-refilling',
      name: 'AC Gas Refilling',
      icon: Snowflake,
      price: 'PKR 3,500 - 6,000',
      description: 'Complete gas refilling with leak detection',
      duration: '1-2 hours',
      features: ['Genuine refrigerant', 'Leak detection', 'Pressure testing', '3-month warranty']
    },
    {
      id: 'ac-maintenance',
      name: 'AC Maintenance',
      icon: ShieldCheck,
      price: 'PKR 1,500 - 3,000',
      description: 'Complete cleaning and maintenance',
      duration: '1-2 hours',
      features: ['Deep cleaning', 'Filter replacement', 'Performance check', 'Preventive care']
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService) {
      toast({
        title: "Service Required",
        description: "Please select a service before booking.",
        variant: "destructive"
      });
      return;
    }

    // Create WhatsApp message with booking details
    const selectedServiceData = services.find(s => s.id === selectedService);
    const message = `
🔧 *AC Service Booking Request*

*Service:* ${selectedServiceData?.name}
*Customer:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Address:* ${formData.address}, ${formData.city}
*Preferred Date:* ${formData.preferredDate}
*Preferred Time:* ${formData.preferredTime}
*AC Brand:* ${formData.acBrand}
*AC Model:* ${formData.acModel}
*Problem Description:* ${formData.problemDescription}
*Urgency:* ${formData.urgency}

Please confirm the booking and provide availability.
    `.trim();

    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Booking Request Sent!",
      description: "Your booking request has been sent via WhatsApp. Our team will contact you shortly.",
    });
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-4 bg-brand-blue text-white px-4 py-2">
            Book AC Service
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Book Your <span className="text-brand-blue">AC Service</span> Today
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get professional AC services with same-day booking and expert technicians. 
            Serving Rawalpindi and Islamabad with quality guarantee.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Service Selection */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-brand-blue" />
                    Select Service
                  </CardTitle>
                  <CardDescription>
                    Choose the AC service you need
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {services.map((service) => {
                    const IconComponent = service.icon;
                    return (
                      <div 
                        key={service.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedService === service.id 
                            ? 'border-brand-blue bg-brand-blue/5' 
                            : 'border-gray-200 hover:border-brand-blue/50'
                        }`}
                        onClick={() => handleServiceSelect(service.id)}
                      >
                        <div className="flex items-start gap-3">
                          <IconComponent className={`h-6 w-6 mt-1 ${
                            selectedService === service.id ? 'text-brand-blue' : 'text-gray-400'
                          }`} />
                          <div className="flex-1">
                            <h3 className={`font-semibold ${
                              selectedService === service.id ? 'text-brand-blue' : 'text-gray-900 dark:text-white'
                            }`}>
                              {service.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {service.description}
                            </p>
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium text-brand-blue">{service.price}</span>
                              <span className="text-gray-500">{service.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-brand-blue" />
                    Booking Details
                  </CardTitle>
                  <CardDescription>
                    Fill in your details to book the service
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                          placeholder="+92 300 1234567"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Address */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Complete Address *</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                          placeholder="House/Flat number, Street, Area"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Select onValueChange={(value) => handleSelectChange('city', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rawalpindi">Rawalpindi</SelectItem>
                            <SelectItem value="islamabad">Islamabad</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Preferred Date & Time */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="preferredDate">Preferred Date *</Label>
                        <Input
                          id="preferredDate"
                          name="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferredTime">Preferred Time *</Label>
                        <Select onValueChange={(value) => handleSelectChange('preferredTime', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                            <SelectItem value="evening">Evening (4 PM - 7 PM)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="urgency">Urgency Level</Label>
                        <Select onValueChange={(value) => handleSelectChange('urgency', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                            <SelectItem value="emergency">Emergency</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* AC Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="acBrand">AC Brand</Label>
                        <Input
                          id="acBrand"
                          name="acBrand"
                          value={formData.acBrand}
                          onChange={handleInputChange}
                          className="mt-1"
                          placeholder="e.g., LG, Samsung, Haier"
                        />
                      </div>
                      <div>
                        <Label htmlFor="acModel">AC Model</Label>
                        <Input
                          id="acModel"
                          name="acModel"
                          value={formData.acModel}
                          onChange={handleInputChange}
                          className="mt-1"
                          placeholder="e.g., 1.5 Ton Inverter"
                        />
                      </div>
                    </div>

                    {/* Problem Description */}
                    <div>
                      <Label htmlFor="problemDescription">Problem Description</Label>
                      <Textarea
                        id="problemDescription"
                        name="problemDescription"
                        value={formData.problemDescription}
                        onChange={handleInputChange}
                        className="mt-1"
                        rows={3}
                        placeholder="Describe the issue with your AC (optional)"
                      />
                    </div>

                    {/* Selected Service Summary */}
                    {selectedServiceData && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h3 className="font-semibold text-brand-blue mb-2">Selected Service:</h3>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{selectedServiceData.name}</span>
                          <Badge className="bg-brand-blue text-white">{selectedServiceData.price}</Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedServiceData.features.map((feature, index) => (
                            <span key={index} className="text-xs bg-white dark:bg-gray-700 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        type="submit" 
                        className="flex-1 bg-brand-red hover:bg-brand-red/90 text-white py-3"
                        disabled={!selectedService}
                      >
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Book via WhatsApp
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                        onClick={() => window.open('tel:+923125242182')}
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our AC Services?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Certified Technicians</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our team consists of certified and experienced AC technicians.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-brand-red" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Same Day Service</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Quick response time with same-day service availability.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Quality Guarantee</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All our services come with warranty and quality guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
