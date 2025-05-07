
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Inquiry Submitted",
        description: "Thank you! We'll contact you shortly.",
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'AC Installation',
        message: '',
      });
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md relative overflow-hidden animate-scale-in">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 text-gray-500"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-1">Quick Inquiry</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Tell us about your AC service needs and we'll get back to you promptly.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            
            <div>
              <Input
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            
            <div>
              <Input
                type="email"
                placeholder="Email (Optional)"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            
            <div>
              <select
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
              </select>
            </div>
            
            <div>
              <Textarea
                placeholder="Describe your requirement..."
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full"
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-brand-blue hover:bg-brand-blue/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InquiryForm;
