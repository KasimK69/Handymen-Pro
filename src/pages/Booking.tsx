
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Phone, User, AirVent, CheckCircle, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    service: '',
    acType: '',
    urgency: '',
    description: '',
    preferredDate: '',
    preferredTime: ''
  });

  const services = [
    'AC Installation',
    'AC Repair & Maintenance',
    'AC Gas Refilling',
    'AC Deep Cleaning',
    'Commercial AC Services',
    'Emergency AC Repair'
  ];

  const acTypes = [
    'Split AC',
    'Window AC',
    'Central AC',
    'Portable AC',
    'Ceiling Cassette',
    'Floor Standing'
  ];

  const urgencyLevels = [
    'Normal (2-3 days)',
    'Urgent (24 hours)',
    'Emergency (Same day)'
  ];

  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
    '5:00 PM - 7:00 PM'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `
🔧 *AC Service Booking Request*

👤 *Customer Details:*
• Name: ${formData.name}
• Phone: ${formData.phone}
• Email: ${formData.email}

📍 *Location:*
• Address: ${formData.address}
• City: ${formData.city}

🛠️ *Service Details:*
• Service Type: ${formData.service}
• AC Type: ${formData.acType}
• Urgency: ${formData.urgency}

📅 *Preferred Schedule:*
• Date: ${formData.preferredDate}
• Time: ${formData.preferredTime}

📝 *Additional Notes:*
${formData.description || 'No additional notes'}

Please confirm the booking and provide a quote.
    `.trim();

    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Booking Request Sent!",
      description: "Your AC service request has been sent via WhatsApp. Our team will contact you shortly.",
    });

    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      service: '',
      acType: '',
      urgency: '',
      description: '',
      preferredDate: '',
      preferredTime: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-red text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-6"
            >
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Calendar className="h-12 w-12 text-white" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Book Your <span className="text-yellow-300">AC Service</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl opacity-90 leading-relaxed"
            >
              Schedule professional AC services in Islamabad & Rawalpindi. 
              Quick response, expert technicians, and quality guaranteed.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-brand-blue/10 to-brand-red/10">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                    <AirVent className="mr-3 h-6 w-6 text-brand-blue" />
                    AC Service Booking Form
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                        <User className="mr-2 h-5 w-5 text-brand-blue" />
                        Personal Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                            className="mt-1"
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
                            placeholder="+92 300 1234567"
                            required
                            className="mt-1"
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
                          placeholder="your.email@example.com"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    {/* Location Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                        <MapPin className="mr-2 h-5 w-5 text-brand-red" />
                        Service Location
                      </h3>
                      
                      <div>
                        <Label htmlFor="address">Complete Address *</Label>
                        <Textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="House/Plot number, Street, Sector/Area"
                          required
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Select value={formData.city} onValueChange={(value) => handleSelectChange('city', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="islamabad">Islamabad</SelectItem>
                            <SelectItem value="rawalpindi">Rawalpindi</SelectItem>
                            <SelectItem value="other">Other (nearby areas)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                        <AirVent className="mr-2 h-5 w-5 text-brand-blue" />
                        Service Details
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="service">Service Type *</Label>
                          <Select value={formData.service} onValueChange={(value) => handleSelectChange('service', value)}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select service type" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem key={service} value={service}>
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="acType">AC Type</Label>
                          <Select value={formData.acType} onValueChange={(value) => handleSelectChange('acType', value)}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select AC type" />
                            </SelectTrigger>
                            <SelectContent>
                              {acTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="urgency">Service Urgency *</Label>
                        <Select value={formData.urgency} onValueChange={(value) => handleSelectChange('urgency', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select urgency level" />
                          </SelectTrigger>
                          <SelectContent>
                            {urgencyLevels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-brand-red" />
                        Preferred Schedule
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="preferredDate">Preferred Date</Label>
                          <Input
                            id="preferredDate"
                            name="preferredDate"
                            type="date"
                            value={formData.preferredDate}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split('T')[0]}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="preferredTime">Preferred Time</Label>
                          <Select value={formData.preferredTime} onValueChange={(value) => handleSelectChange('preferredTime', value)}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((slot) => (
                                <SelectItem key={slot} value={slot}>
                                  {slot}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div>
                      <Label htmlFor="description">Additional Information</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe the issue, specific requirements, or any other details..."
                        className="mt-1"
                        rows={4}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-brand-blue to-brand-red hover:from-brand-blue/90 hover:to-brand-red/90 text-white text-lg py-6"
                      disabled={!formData.name || !formData.phone || !formData.address || !formData.city || !formData.service || !formData.urgency}
                    >
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Send Booking Request via WhatsApp
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-brand-blue to-brand-red text-white">
                  <CardTitle className="flex items-center">
                    <Phone className="mr-2 h-5 w-5" />
                    Quick Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Emergency Hotline</p>
                      <a href="tel:+923125242182" className="text-brand-red font-bold text-lg hover:underline">
                        +92 312 5242182
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Email</p>
                      <a href="mailto:info@acservices.pk" className="text-brand-blue hover:underline">
                        info@acservices.pk
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Service Areas</p>
                      <p className="text-gray-600 dark:text-gray-400">Islamabad, Rawalpindi & surrounding areas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Service Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Why Choose Us?</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">24/7 Emergency Service</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Round-the-clock support for urgent AC issues</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Certified Technicians</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Factory-trained and experienced professionals</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Genuine Parts Only</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">We use only original AC components</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Service Warranty</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">All repairs come with service guarantee</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pricing Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Service Pricing</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">AC Checkup</span>
                      <span className="font-semibold text-brand-blue">From PKR 1,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Gas Refilling</span>
                      <span className="font-semibold text-brand-blue">From PKR 4,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">AC Installation</span>
                      <span className="font-semibold text-brand-blue">From PKR 8,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Deep Cleaning</span>
                      <span className="font-semibold text-brand-blue">From PKR 3,500</span>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        *Final pricing depends on specific requirements and AC model
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
