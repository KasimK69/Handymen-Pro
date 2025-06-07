
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Basic validation
      if (!formData.name || !formData.email || !formData.message) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      // Submit to Supabase
      const { error } = await supabase
        .from('inquiries')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service_type: formData.service_type,
          message: formData.message,
          status: 'pending'
        }]);

      if (error) {
        console.error('Error submitting form:', error);
        throw error;
      }

      setIsSubmitted(true);
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service_type: '',
        message: ''
      });

    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in your AC services. Here are my details:

Name: ${formData.name || 'Not provided'}
Service Type: ${formData.service_type || 'General inquiry'}
Message: ${formData.message || 'Please contact me for AC services'}

Please get back to me at your earliest convenience.`;
    
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-white pt-20">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-8"
              >
                <CheckCircle className="h-16 w-16 text-white" />
              </motion.div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Message Sent Successfully!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Thank you for contacting AC Services. We've received your inquiry and will get back to you within 24 hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Send Another Message
                </Button>
                <Button 
                  onClick={handleWhatsAppContact}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Us Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-white pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to experience premium AC services? Contact us today for installation, repair, and maintenance solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-0 rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+92 300 1234567"
                        className="border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Service Type
                      </label>
                      <select
                        name="service_type"
                        value={formData.service_type}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3 px-3 bg-white"
                      >
                        <option value="">Select a service</option>
                        <option value="installation">AC Installation</option>
                        <option value="repair">AC Repair</option>
                        <option value="maintenance">AC Maintenance</option>
                        <option value="buying">Buy AC</option>
                        <option value="selling">Sell AC</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your AC service requirements..."
                      rows={5}
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      onClick={handleWhatsAppContact}
                      variant="outline"
                      className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      WhatsApp
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl border-0 rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-center gap-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="p-3 bg-white/20 rounded-full">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <p className="opacity-90">+92 312 5242182</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center gap-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="p-3 bg-white/20 rounded-full">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="opacity-90">info@acservices.com.pk</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center gap-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="p-3 bg-white/20 rounded-full">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Service Areas</h4>
                      <p className="opacity-90">Islamabad, Rawalpindi & surrounding areas</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center gap-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="p-3 bg-white/20 rounded-full">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Service Hours</h4>
                      <p className="opacity-90">24/7 Emergency Service Available</p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Service Badges */}
            <Card className="bg-white/80 backdrop-blur-lg shadow-xl border-0 rounded-3xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "24/7 Service",
                    "Expert Technicians", 
                    "Fair Pricing",
                    "Quality Guaranteed",
                    "Fast Response",
                    "Licensed & Insured"
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                    >
                      <Badge className="w-full justify-center py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                        {feature}
                      </Badge>
                    </motion.div>
                  ))}
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
