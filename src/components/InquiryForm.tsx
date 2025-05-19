
import React, { useState } from 'react';
import { X, Send, PhoneCall, Loader2, User, Mail, ClipboardList, MessageSquare } from 'lucide-react';
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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 30 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden"
          >
            {/* Close button with hover effect */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
            
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-brand-red/30 to-brand-blue/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-brand-blue/30 to-brand-red/30 rounded-full blur-2xl"></div>
            
            <div className="p-6 pt-10">
              {/* Header with icon and modern typography */}
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-red text-white shadow-lg">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-brand-red to-brand-blue">
                      Quick Inquiry
                    </span>
                  </h2>
                  <p className="text-gray-500 dark:text-gray-300">
                    Tell us about your AC service needs and we'll get back to you promptly.
                  </p>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="h-1 bg-gray-100 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
                <motion.div 
                  initial={{ width: step === 1 ? "50%" : "100%" }}
                  animate={{ width: step === 1 ? "50%" : "100%" }}
                  transition={{ duration: 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-blue via-brand-red to-brand-blue bg-size-200 animate-gradient-x"
                ></motion.div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="space-y-4">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="name"
                            placeholder="Your name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                          />
                        </div>
                        
                        <div className="relative">
                          <PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="phone"
                            placeholder="Phone number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                          />
                        </div>
                        
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Email address (optional)"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                          />
                        </div>
                      </div>
                      
                      <Button 
                        type="button"
                        className="w-full h-11 bg-gradient-to-r from-brand-blue to-brand-red hover:from-brand-blue/90 hover:to-brand-red/90 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                        onClick={nextStep}
                      >
                        Continue
                      </Button>
                      
                      <div className="pt-2 flex items-center justify-center">
                        <div className="flex items-center text-brand-blue hover:text-brand-red transition-colors duration-300">
                          <PhoneCall className="w-4 h-4 mr-2" />
                          <a href="tel:+923125242182" className="text-sm hover:underline">
                            Or call us directly: +92 312 5242182
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="relative">
                        <ClipboardList className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full rounded-lg border pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue outline-none transition-all text-sm"
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
                      
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                        <Textarea
                          id="message"
                          placeholder="Tell us more about your requirement..."
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={3}
                          className="pl-10 resize-none bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                          required
                        />
                      </div>
                      
                      <div className="flex gap-3">
                        <Button 
                          type="button"
                          variant="outline" 
                          className="flex-1 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                          onClick={prevStep}
                        >
                          Back
                        </Button>
                        <Button 
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-brand-blue to-brand-red hover:from-brand-blue/90 hover:to-brand-red/90 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center">
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              <span>Sending...</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Send className="w-4 h-4 mr-2" />
                              <span>Submit</span>
                            </div>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
            
            {/* Footer with service guarantee */}
            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-900/50 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 mr-1 text-brand-blue" fill="currentColor">
                    <path d="M12,1L3,5v6c0,5.5,3.8,10.7,9,12c5.2-1.3,9-6.5,9-12V5L12,1z M10,17l-4-4l1.4-1.4L10,14.2l6.6-6.6L18,9L10,17z" />
                  </svg>
                  <span>Your information is secure and encrypted</span>
                </span>
              </p>
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InquiryForm;
