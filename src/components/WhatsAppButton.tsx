
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '+923125242182';
  const message = 'Hello! I\'m interested in your AC services.';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Hover tooltip */}
      {isHovered && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-lg shadow-lg text-sm mb-2 whitespace-nowrap animate-fade-in">
          Chat on WhatsApp
          <div className="absolute bottom-[-6px] right-6 transform rotate-45 w-3 h-3 bg-white dark:bg-gray-800"></div>
        </div>
      )}
      
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center bg-[#25D366] p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
