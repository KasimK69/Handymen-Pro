
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      info: '+92 312 5242182',
      description: '24/7 Emergency Support',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Mail,
      title: 'Email',
      info: 'info@acservices.pk',
      description: 'Quick Response Guaranteed',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: MapPin,
      title: 'Location',
      info: 'Islamabad & Rawalpindi',
      description: 'Service Coverage Area',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      info: '24/7 Available',
      description: 'Emergency Services',
      color: 'from-orange-400 to-orange-600'
    }
  ];

  const handleWhatsAppContact = () => {
    const message = `Hello! I would like to contact AC Services Pakistan.

Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Service Needed: ${formData.service || 'General Inquiry'}

Message: ${formData.message || 'I would like more information about your AC services.'}

Please get back to me. Thank you!`;
    
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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
            Contact <span className="bg-gradient-to-r from-[#8843F2] to-[#FF467E] bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get in touch with Pakistan's most trusted AC service experts. We're here to help 24/7.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#8843F2] to-[#FF467E] mx-auto mt-8"></div>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${info.color} flex items-center justify-center shadow-lg`}>
                    <info.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2D3559] mb-2">{info.title}</h3>
                  <p className="text-[#8843F2] font-semibold mb-1">{info.info}</p>
                  <p className="text-sm text-gray-600">{info.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#2D3559]">Send us a Message</CardTitle>
                <p className="text-gray-600">Fill out the form below and we'll get back to you promptly.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-[#2D3559] font-medium">Name *</Label>
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
                      <Label htmlFor="email" className="text-[#2D3559] font-medium">Email *</Label>
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
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-[#2D3559] font-medium">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+92 XXX XXXXXXX"
                        className="mt-1 border-gray-300 focus:border-[#8843F2] focus:ring-[#8843F2]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="service" className="text-[#2D3559] font-medium">Service Needed</Label>
                      <Input
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        placeholder="Installation, Repair, Maintenance"
                        className="mt-1 border-gray-300 focus:border-[#8843F2] focus:ring-[#8843F2]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-[#2D3559] font-medium">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your AC service needs..."
                      rows={5}
                      required
                      className="mt-1 border-gray-300 focus:border-[#8843F2] focus:ring-[#8843F2]"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-[#8843F2] to-[#FF467E] hover:from-[#7335E8] hover:to-[#F03A6E] text-white font-medium py-3"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                    <Button 
                      type="button"
                      onClick={handleWhatsAppContact}
                      variant="outline"
                      className="flex-1 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white py-3"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      WhatsApp
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Map and Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Service Areas */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#2D3559]">Service Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gradient-to-r from-[#8843F2]/10 to-[#FF467E]/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-[#8843F2] mr-3" />
                    <div>
                      <p className="font-semibold text-[#2D3559]">Islamabad</p>
                      <p className="text-sm text-gray-600">All sectors covered</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gradient-to-r from-[#8843F2]/10 to-[#FF467E]/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-[#8843F2] mr-3" />
                    <div>
                      <p className="font-semibold text-[#2D3559]">Rawalpindi</p>
                      <p className="text-sm text-gray-600">Complete coverage</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="shadow-xl border-0 bg-gradient-to-r from-[#8843F2] to-[#FF467E] text-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Emergency Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Need immediate AC repair? We're available 24/7 for emergency services.</p>
                <Button 
                  onClick={() => window.open('tel:+923125242182', '_self')}
                  variant="secondary"
                  className="w-full bg-white text-[#8843F2] hover:bg-gray-100"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: +92 312 5242182
                </Button>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="h-64 bg-gradient-to-br from-[#8843F2]/20 to-[#FF467E]/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-[#8843F2] mx-auto mb-2" />
                    <p className="text-[#2D3559] font-semibold">Service Coverage Map</p>
                    <p className="text-sm text-gray-600">Islamabad & Rawalpindi</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
