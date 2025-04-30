
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

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
      content: 'Hi there! 👋 How can I help you with your handyman service needs today?',
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
    
    // Basic responses based on keywords
    if (normalizedInput.includes('price') || normalizedInput.includes('cost') || normalizedInput.includes('fee')) {
      return "Our service prices vary depending on the specific job and requirements. For plumbing services, prices start at ₨1,500, electrical work starts at ₨1,200, and AC repair services start at ₨2,500. Would you like a personalized quote for your specific needs?";
    } 
    
    if (normalizedInput.includes('location') || normalizedInput.includes('service area') || normalizedInput.includes('where')) {
      return "We currently serve Rawalpindi and Islamabad areas, with special focus on Bahria Town, DHA, and surrounding localities. Do you live within our service area?";
    }
    
    if (normalizedInput.includes('hours') || normalizedInput.includes('time') || normalizedInput.includes('available')) {
      return "We're available 7 days a week from 9:00 AM to 8:00 PM. For emergencies, we also offer 24/7 service with an additional fee. When would you like to schedule a visit?";
    }
    
    if (normalizedInput.includes('booking') || normalizedInput.includes('appointment') || normalizedInput.includes('schedule')) {
      return "You can easily book our services by clicking the 'Book a Service' button on our homepage or going to the Booking page. Would you like me to guide you through the booking process?";
    }
    
    if (normalizedInput.includes('ac') || normalizedInput.includes('air condition')) {
      return "We offer comprehensive AC services including installation, repair, maintenance, and cleaning. We also sell new and used AC units. Would you like more information about a specific AC service?";
    }
    
    if (normalizedInput.includes('plumbing')) {
      return "Our plumbing services include fixing leaks, installing fixtures, drain cleaning, water heater repairs, and complete bathroom renovations. Do you have a specific plumbing issue we can help with?";
    }
    
    if (normalizedInput.includes('electrical')) {
      return "Our electrical services include wiring, installations, repairs, circuit breaker replacement, light fixture installation, and electrical safety inspections. What electrical work do you need help with?";
    }
    
    // Default responses for general inquiries
    const generalResponses = [
      "I'd be happy to help with that. Could you provide more details so I can give you the most accurate information?",
      "Thanks for your question. To best assist you, could you tell me more about your specific requirements?",
      "I can definitely help you with that. Would you like me to connect you with one of our service specialists for a more personalized response?",
      "We offer professional services for that. Would you like to schedule an appointment with one of our experts?",
      "That's something our team specializes in. Would you like me to provide more information or help you book a service?"
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-24 right-6 z-50 bg-brand-blue hover:bg-brand-blue/90 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Chat with AI Assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-brand-blue text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-white">
                <span className="text-brand-blue font-bold text-sm">AI</span>
              </Avatar>
              <div>
                <h3 className="font-medium">Handyman Assistant</h3>
                <p className="text-xs opacity-80">Online | Replies instantly</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-brand-blue/80" onClick={toggleChat}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
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
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
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
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatAgent;
