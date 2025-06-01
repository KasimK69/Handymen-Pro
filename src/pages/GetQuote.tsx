
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator, Clock, Shield, Award, Phone, MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const GetQuote = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    serviceType: '',
    acType: '',
    roomSize: '',
    urgency: '',
    budget: '',
    additionalServices: [] as string[],
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: checked 
        ? [...prev.additionalServices, service]
        : prev.additionalServices.filter(s => s !== service)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.serviceType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Quote Request Submitted!",
      description: "We'll send you a detailed quote within 2-4 hours.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      serviceType: '',
      acType: '',
      roomSize: '',
      urgency: '',
      budget: '',
      additionalServices: [],
      description: ''
    });
  };

  const handleWhatsAppQuote = () => {
    const message = `Hello! I would like to get a quote for AC services.

Personal Information:
Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Location: ${formData.location || 'Not provided'}

Service Details:
Service Type: ${formData.serviceType || 'Not specified'}
AC Type: ${formData.acType || 'Not specified'}
Room Size: ${formData.roomSize || 'Not specified'}
Urgency: ${formData.urgency || 'Not specified'}
Budget Range: ${formData.budget || 'Not specified'}
Additional Services: ${formData.additionalServices.join(', ') || 'None'}

Description: ${formData.description || 'No additional details provided'}

Please provide me with a detailed quote. Thank you!`;
    
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const serviceTypes = [
    'AC Installation',
    'AC Repair',
    'AC Maintenance',
    'AC Cleaning',
    'AC Gas Refilling',
    'Emergency Service'
  ];

  const acTypes = [
    'Split AC',
    'Window AC',
    'Central AC',
    'Portable AC',
    'Cassette AC',
    'Floor Standing AC'
  ];

  const roomSizes = [
    'Small (up to 150 sq ft)',
    'Medium (150-300 sq ft)',
    'Large (300-500 sq ft)',
    'Very Large (500+ sq ft)'
  ];

  const urgencyLevels = [
    'Emergency (Same Day)',
    'Urgent (Within 24 hours)',
    'Standard (2-3 days)',
    'Flexible (Within a week)'
  ];

  const budgetRanges = [
    'Under PKR 10,000',
    'PKR 10,000 - 25,000',
    'PKR 25,000 - 50,000',
    'PKR 50,000 - 100,000',
    'Above PKR 100,000'
  ];

  const additionalServices = [
    'Free AC Inspection',
    'Electrical Work',
    'Duct Installation',
    'Pipe Installation',
    'Warranty Extension',
    'Annual Maintenance Contract'
  ];

  const features = [
    {
      icon: Calculator,
      title: 'Accurate Pricing',
      description: 'Transparent and competitive quotes',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'Quote delivered within 2-4 hours',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Shield,
      title: 'No Hidden Charges',
      description: 'What you see is what you pay',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Award,
      title: 'Expert Technicians',
      description: 'Certified and experienced professionals',
      color: 'from-orange-400 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#2D3559] font-['Inter']">
            Get Your <span className="bg-gradient-to-r from-[#8843F2] to-[#FF467E] bg-clip-text text-transparent">Quote</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get a detailed, accurate quote for your AC service needs. Our expert team will provide you with transparent pricing and professional recommendations.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#8843F2] to-[#FF467E] mx-auto mt-8"></div>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2D3559] mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quote Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-[#2D3559] text-center">Request Your Quote</CardTitle>
              <p className="text-gray-600 text-center">Fill out the form below for a detailed quote tailored to your needs</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-semibold text-[#2D3559] mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-[#2D3559] font-medium">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                        className="mt-1 border-gray-300 focus:border-[#8843F2] focus:ring-[#8843F2]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-[#2D3559] font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                        className="mt-1 border-gray-300 focus:border-[#8843F2] focus:ring-[#8843F2]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-[#2D3559] font-medium">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+92 XXX XXXXXXX"
                        required
                        className="mt-1 border-gray-300 focus:border-[#8843F2] focus:ring-[#8843F2]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-[#2D3559] font-medium">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="City, Area"
                        className="mt-1 border-gray-300 focus:border-[#8843F2] focus:ring-[#8843F2]"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div>
                  <h3 className="text-xl font-semibold text-[#2D3559] mb-4">Service Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-[#2D3559] font-medium">Service Type *</Label>
                      <Select value={formData.serviceType} onValueChange={(value) => handleSelectChange('serviceType', value)}>
                        <SelectTrigger className="mt-1 border-gray-300 focus:border-[#8843F2] focus:ring-[#8843F2]">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-[#2D3559] font-medium">AC Type</Label>
                      <Select value={formData.acType} onValueChange={(value) => handleSelectChange('acType', value)}>
                        <SelectTrigger className="mt-1 border-gray-300 focus:border-[#8843F2] focus:ring-[#8843F2]">
                          <SelectValue placeholder="Select AC type" />
                        </SelectTrigger>
                        <SelectContent>
                          {acTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-[#2D3559] font-medium">Room Size</Label>
                      <Select value={formData.roomSize} onValueChange={(value) => handleSelectChange('roomSize', value)}>
                        <SelectTrigger className="mt-1 border-gray-300 focus:border-[#8843F2] focus:ring-[#8843F2]">
                          <SelectValue placeholder="Select room size" />
                        </SelectTrigger>
                        <SelectContent>
                          {roomSizes.map((size) => (
                            <SelectItem key={size} value={size}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-[#2D3559] font-medium">Urgency Level</Label>
                      <Select value={formData.urgency} onValueChange={(value) => handleSelectChange('urgency', value)}>
                        <SelectTrigger className="mt-1 border-gray-300 focus:border-[#8843F2] focus:ring-[#8843F2]">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          {urgencyLevels.map((level) => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Budget and Additional Services */}
                <div>
                  <h3 className="text-xl font-semibold text-[#2D3559] mb-4">Budget & Additional Services</h3>
                  <div className="mb-6">
                    <Label className="text-[#2D3559] font-medium">Budget Range</Label>
                    <Select value={formData.budget} onValueChange={(value) => handleSelectChange('budget', value)}>
                      <SelectTrigger className="mt-1 border-gray-300 focus:border-[#8843F2] focus:ring-[#8843F2]">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-[#2D3559] font-medium mb-3 block">Additional Services</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {additionalServices.map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                            id={service}
                            checked={formData.additionalServices.includes(service)}
                            onCheckedChange={(checked) => handleCheckboxChange(service, checked as boolean)}
                          />
                          <Label htmlFor={service} className="text-sm text-gray-700">{service}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-[#2D3559] font-medium">Additional Details</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your specific requirements, current issues, or any special considerations..."
                    rows={4}
                    className="mt-1 border-gray-300 focus:border-[#8843F2] focus:ring-[#8843F2]"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#8843F2] to-[#FF467E] hover:from-[#7335E8] hover:to-[#F03A6E] text-white font-medium py-4 text-lg"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Get My Quote
                  </Button>
                  <Button 
                    type="button"
                    onClick={handleWhatsAppQuote}
                    variant="outline"
                    className="flex-1 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white py-4 text-lg"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp Quote
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-gradient-to-r from-[#8843F2] to-[#FF467E] text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h3>
              <p className="mb-6">For urgent AC services or to discuss your requirements directly with our experts</p>
              <Button 
                onClick={() => window.open('tel:+923125242182', '_self')}
                variant="secondary"
                className="bg-white text-[#8843F2] hover:bg-gray-100 text-lg px-8 py-3"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now: +92 312 5242182
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default GetQuote;
