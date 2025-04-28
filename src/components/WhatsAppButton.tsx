
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/15551234567" 
      target="_blank" 
      rel="noopener noreferrer" 
      className={cn(
        "fixed bottom-6 right-6 z-40 bg-green-500 text-white rounded-full p-4",
        "shadow-lg hover:bg-green-600 transition-all duration-300",
        "flex items-center justify-center animate-fade-in"
      )}
      aria-label="Chat on WhatsApp"
    >
      <MessageSquare className="w-6 h-6" />
    </a>
  );
};

export default WhatsAppButton;
