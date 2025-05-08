
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

const AIChatAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi there! 👋 How can I help you with your AC service needs today?',
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI thinking and response
    setTimeout(() => {
      const aiResponse = generateResponse(inputValue.trim());
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
      }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random response time between 1-2 seconds
  };

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const generateResponse = (userInput: string): string => {
    const normalizedInput = userInput.toLowerCase();
    
    // AC service specific responses based on keywords
    if (normalizedInput.includes('price') || normalizedInput.includes('cost') || normalizedInput.includes('fee')) {
      return "Our AC service prices vary depending on the service type. AC installations start from ₨3,000, repairs from ₨1,500, and gas refills from ₨2,500. Would you like a personalized quote for your specific AC needs?";
    } 
    
    if (normalizedInput.includes('location') || normalizedInput.includes('service area') || normalizedInput.includes('where')) {
      return "We currently serve Rawalpindi and Islamabad areas, with special focus on Bahria Town, DHA, and surrounding localities. Our office is located in Bahria Town Phase 8, Rawalpindi. Do you need our services in this area?";
    }
    
    if (normalizedInput.includes('hours') || normalizedInput.includes('time') || normalizedInput.includes('available')) {
      return "We're available 7 days a week from 9:00 AM to 8:00 PM. For AC emergencies, we also offer 24/7 service with a priority response. When would you like to schedule your AC service?";
    }
    
    if (normalizedInput.includes('booking') || normalizedInput.includes('appointment') || normalizedInput.includes('schedule')) {
      return "You can easily book our AC services by clicking the 'Book a Service' button on our homepage or by calling us at +92 312 5242182. Would you like me to guide you through the booking process?";
    }
    
    if (normalizedInput.includes('install') || normalizedInput.includes('installation')) {
      return "Our AC installation service includes professional mounting, copper piping, electrical work, and testing to ensure your unit works perfectly. We install all brands and models of air conditioners with a 90-day workmanship warranty. Would you like to know more details or get a quote?";
    }
    
    if (normalizedInput.includes('repair') || normalizedInput.includes('fix') || normalizedInput.includes('not working') || normalizedInput.includes('broken')) {
      return "Our AC repair services cover all common issues like cooling problems, water leakage, unusual noises, or complete breakdowns. Our technicians carry genuine parts and can fix most problems on the first visit. What specific issue are you having with your AC?";
    }
    
    if (normalizedInput.includes('gas') || normalizedInput.includes('refill') || normalizedInput.includes('cooling') || normalizedInput.includes('refrigerant')) {
      return "Our AC gas refill service includes a thorough leak check, system pressure testing, and proper refrigerant charging according to your AC specifications. We use high-quality refrigerants that are efficient and environmentally friendly. Is your AC not cooling properly?";
    }
    
    if (normalizedInput.includes('maintenance') || normalizedInput.includes('service') || normalizedInput.includes('clean')) {
      return "Regular AC maintenance includes deep cleaning of filters, coils, and fans, checking refrigerant levels, inspecting electrical connections, and ensuring optimal performance. We recommend servicing your AC unit at least twice a year for best results. Would you like to schedule a maintenance visit?";
    }
    
    if (normalizedInput.includes('brand') || normalizedInput.includes('type') || normalizedInput.includes('model')) {
      return "We service all major AC brands including Daikin, Gree, Kenwood, Haier, Orient, PEL, Dawlance, Mitsubishi, LG, Samsung, and more. Our technicians are trained to work on split ACs, window units, cassette ACs, and ducted systems. What brand or type of AC do you have?";
    }
    
    if (normalizedInput.includes('warranty') || normalizedInput.includes('guarantee')) {
      return "We provide a 90-day warranty on all our repair work and installations. If any issue occurs related to our service within this period, we'll fix it free of charge. Additionally, we honor all manufacturer warranties and can help you with warranty claims if needed. Would you like to know more about our warranty policy?";
    }
    
    // Default responses for general inquiries
    const generalResponses = [
      "I'd be happy to help with your AC needs. Could you provide more details about your air conditioning requirements?",
      "Thanks for your message. Our AC specialists can assist with installation, repair, maintenance, or gas refill services. What type of service do you need?",
      "I can definitely help you with your AC requirements. Would you like to speak with one of our AC technicians for a personalized solution?",
      "We offer professional AC services for all types and brands. Would you like to schedule an appointment or receive a quote?",
      "Our team specializes in all aspects of air conditioning. Would you like me to provide specific information about our AC installation, repair, or maintenance services?"
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button 
        onClick={toggleChat}
        className="fixed bottom-24 right-6 z-50 bg-brand-blue hover:bg-brand-blue/90 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat with AI Assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-brand-blue to-brand-blue/80 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-white">
                  <span className="text-brand-blue font-bold text-sm">AI</span>
                </Avatar>
                <div>
                  <h3 className="font-medium">AC Service Assistant</h3>
                  <p className="text-xs opacity-80">Online | Replies instantly</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20" 
                onClick={toggleChat}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-brand-blue text-white rounded-br-none'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs opacity-70 text-right mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask about our AC services..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="bg-brand-blue hover:bg-brand-blue/90"
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatAgent;
