
import React, { useState } from 'react';
import { Phone, MessageSquare, MessageCircle, Plus, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  color: string;
  action: () => void;
}

const QuickActionsButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleActions = () => {
    setIsOpen(!isOpen);
  };

  const handleCall = () => {
    window.location.href = 'tel:+923125242182';
    toast({
      title: "Calling",
      description: "Connecting you with our service team.",
    });
  };

  const handleWhatsApp = () => {
    const phoneNumber = '+923125242182';
    const message = 'Hello! I need assistance with AC services.';
    window.open(`https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
    toast({
      title: "Opening WhatsApp",
      description: "Connecting you with our service team.",
    });
  };

  const handleSMS = () => {
    window.location.href = 'sms:+923125242182?body=Hi, I need AC services.';
    toast({
      title: "Opening SMS",
      description: "Send us a text message for assistance.",
    });
  };

  const actions: QuickAction[] = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Call Now",
      color: "bg-green-500",
      action: handleCall
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "WhatsApp",
      color: "bg-[#25D366]",
      action: handleWhatsApp
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: "SMS",
      color: "bg-blue-500",
      action: handleSMS
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {/* Actions */}
      {isOpen && (
        <div className="flex flex-col space-y-3 animate-fade-in">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`${action.color} text-white rounded-full shadow-lg p-3 flex items-center transition-transform hover:scale-110`}
            >
              <span className="mr-2">{action.icon}</span>
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      )}
      
      {/* Toggle Button */}
      <button
        onClick={toggleActions}
        className={`${isOpen ? 'bg-red-500 rotate-45' : 'bg-brand-blue'} text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110`}
        aria-label={isOpen ? "Close quick actions" : "Open quick actions"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default QuickActionsButton;
