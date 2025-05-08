
import React, { useState } from 'react';
import { X, Send, PhoneCall, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface InquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const InquiryForm: React.FC<InquiryFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'AC Installation',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (!formData.name || !formData.phone) {
      toast({
        title: "Required Fields",
        description: "Please fill in your name and phone number.",
        variant: "destructive"
      });
      return;
    }
    setStep(2);
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Inquiry Submitted",
        description: "Thank you! We'll contact you shortly about your AC service request.",
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'AC Installation',
        message: '',
      });
      setStep(1);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 30 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden"
          >
            {/* Progress Bar */}
            <div className="h-1.5 bg-gray-100 dark:bg-gray-700 w-full">
              <div 
                className="h-full bg-gradient-to-r from-brand-blue via-brand-red to-brand-blue bg-size-200 animate-gradient-x" 
                style={{ width: step === 1 ? '50%' : '100%' }}
              ></div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 text-gray-500 z-10"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <div className="p-6 pt-10">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1 text-brand-blue">AC Service Inquiry</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Tell us about your AC service needs and we'll get back to you promptly.
                </p>
              </div>
              
              <form onSubmit={handleSubmit}>
                {step === 1 ? (
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <label htmlFor="name" className="text-sm font-medium mb-1 block">Your Name *</label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="text-sm font-medium mb-1 block">Phone Number *</label>
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="text-sm font-medium mb-1 block">Email (Optional)</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                      />
                    </div>
                    
                    <Button 
                      type="button"
                      className="w-full bg-brand-blue hover:bg-brand-blue/90"
                      onClick={nextStep}
                    >
                      Continue
                    </Button>
                    
                    <div className="mt-4 flex items-center justify-center">
                      <div className="flex items-center text-brand-blue">
                        <PhoneCall className="w-4 h-4 mr-2" />
                        <a href="tel:+923125242182" className="text-sm hover:underline">
                          Or call us directly: +92 312 5242182
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <label htmlFor="service" className="text-sm font-medium mb-1 block">AC Service Type *</label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        required
                      >
                        <option value="AC Installation">AC Installation</option>
                        <option value="AC Repair">AC Repair</option>
                        <option value="AC Gas Refill">AC Gas Refill</option>
                        <option value="AC Maintenance">AC Maintenance</option>
                        <option value="AC Troubleshooting">AC Troubleshooting</option>
                        <option value="Commercial AC">Commercial AC Services</option>
                        <option value="AC Buy/Sell">AC Buy & Sell</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="text-sm font-medium mb-1 block">Your Message *</label>
                      <Textarea
                        id="message"
                        placeholder="Describe your AC service requirement..."
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                        required
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        type="button"
                        variant="outline" 
                        className="flex-1"
                        onClick={prevStep}
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit"
                        className="flex-1 bg-brand-blue hover:bg-brand-blue/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InquiryForm;
