
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar, Clock, MapPin, Phone, Mail, User, AirVent, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceType: '',
    acType: '',
    preferredDate: '',
    preferredTime: '',
    description: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    {
      id: 'installation',
      title: 'AC Installation',
      description: 'Professional AC installation with 1-year warranty',
      price: 'From PKR 3,000',
      icon: '🔧'
    },
    {
      id: 'repair',
      title: 'AC Repair',
      description: 'Quick diagnosis and repair of AC issues',
      price: 'From PKR 1,500',
      icon: '⚡'
    },
    {
      id: 'maintenance',
      title: 'AC Maintenance',
      description: 'Regular cleaning and maintenance service',
      price: 'From PKR 2,500',
      icon: '🧽'
    },
    {
      id: 'gas-refill',
      title: 'Gas Refilling',
      description: 'AC gas refilling with quality refrigerant',
      price: 'From PKR 3,500',
      icon: '❄️'
    }
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

  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceType: serviceId
    }));
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({
      ...prev,
      preferredTime: time
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.serviceType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create WhatsApp message
    const selectedService = services.find(s => s.id === formData.serviceType);
    const message = `New AC Service Booking:

Customer Details:
- Name: ${formData.name}
- Phone: ${formData.phone}
- Email: ${formData.email}
- Address: ${formData.address}

Service Details:
- Service: ${selectedService?.title}
- AC Type: ${formData.acType}
- Preferred Date: ${formData.preferredDate}
- Preferred Time: ${formData.preferredTime}
- Additional Details: ${formData.description}

Please confirm the booking and provide the final quote.`;

    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitted(true);
    toast({
      title: "Booking Request Sent!",
      description: "We'll contact you shortly to confirm your appointment.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="mb-8">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Thank you for choosing our AC services. We've received your booking request and will contact you shortly to confirm the appointment details.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
              <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                  <span>Our team will call you within 30 minutes to confirm the appointment</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                  <span>We'll provide a final quote based on your specific requirements</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                  <span>Our certified technician will arrive at your scheduled time</span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  phone: '',
                  email: '',
                  address: '',
                  serviceType: '',
                  acType: '',
                  preferredDate: '',
                  preferredTime: '',
                  description: ''
                });
              }}
              variant="outline"
            >
              Book Another Service
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-red text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <AirVent className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Book Your <span className="text-yellow-300">AC Service</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Professional AC services in Islamabad & Rawalpindi with certified technicians and quality guarantee
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Calendar className="h-8 w-8 mb-2" />
                <div className="text-lg font-semibold">Same Day Service</div>
                <div className="text-sm opacity-90">Available for urgent repairs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <CheckCircle className="h-8 w-8 mb-2" />
                <div className="text-lg font-semibold">1 Year Warranty</div>
                <div className="text-sm opacity-90">On all installations</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Clock className="h-8 w-8 mb-2" />
                <div className="text-lg font-semibold">24/7 Support</div>
                <div className="text-sm opacity-90">Emergency services available</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Service Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AirVent className="mr-2 h-5 w-5" />
                    Select AC Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map(service => (
                      <div
                        key={service.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                          formData.serviceType === service.id
                            ? 'border-brand-blue bg-brand-blue/5'
                            : 'border-gray-200 hover:border-brand-blue'
                        }`}
                        onClick={() => handleServiceSelect(service.id)}
                      >
                        <div className="flex items-start">
                          <span className="text-2xl mr-3">{service.icon}</span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{service.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                            <Badge variant="outline" className="text-brand-blue border-brand-blue">
                              {service.price}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+92 xxx xxxxxxx"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="acType">AC Type/Brand</Label>
                      <Input
                        id="acType"
                        name="acType"
                        value={formData.acType}
                        onChange={handleInputChange}
                        placeholder="e.g., Samsung 1.5 Ton Split AC"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Label htmlFor="address">Complete Address *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Your complete address including area and landmarks"
                      required
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Preferred Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <Label>Preferred Time Slot</Label>
                      <RadioGroup
                        value={formData.preferredTime}
                        onValueChange={handleTimeSelect}
                        className="mt-2"
                      >
                        {timeSlots.map(time => (
                          <div key={time} className="flex items-center space-x-2">
                            <RadioGroupItem value={time} id={time} />
                            <Label htmlFor={time}>{time}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Label htmlFor="description">Additional Details</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the issue or any specific requirements..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="text-center">
                <Button 
                  type="submit" 
                  size="lg"
                  className="bg-brand-red hover:bg-brand-red/90 text-white px-12 py-4 text-lg"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Book AC Service Now
                </Button>
                <p className="text-sm text-gray-600 mt-4">
                  * We'll contact you within 30 minutes to confirm your booking
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
