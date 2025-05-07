
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Clock, CheckCircle } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: string;
    title: string;
    description: string;
    image: string;
    details?: string;
    features?: string[];
  };
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className="relative h-48 sm:h-64">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <DialogHeader className="absolute bottom-0 left-0 p-6 text-white">
            <DialogTitle className="text-2xl sm:text-3xl font-bold">{service.title}</DialogTitle>
          </DialogHeader>
        </div>
        
        <div className="p-6">
          <DialogDescription className="text-lg mb-6">
            {service.details || service.description}
          </DialogDescription>
          
          {service.features && (
            <div className="mb-6">
              <h4 className="font-medium mb-3">Service Includes:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-brand-red mr-2 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 flex items-center">
            <Clock className="h-5 w-5 text-brand-red mr-2 shrink-0" />
            <p className="text-sm">Available 7 days a week, 8:00 AM - 8:00 PM</p>
          </div>
        </div>
        
        <DialogFooter className="p-6 pt-0">
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Close
          </Button>
          <Button 
            className="bg-brand-red hover:bg-brand-red/90"
            asChild
          >
            <Link to="/booking">Book This Service</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
