
import React, { useState } from 'react';
import Hero from '@/components/home/Hero';
import SmartAdport from '@/components/home/SmartAdport';
import Services from '@/components/home/Services';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';
import InquiryForm from '@/components/InquiryForm';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import AIChatAgent from '@/components/AIChatAgent';

const Home = () => {
  const [isInquiryFormOpen, setIsInquiryFormOpen] = useState(false);
  
  const openInquiryForm = () => {
    setIsInquiryFormOpen(true);
  };
  
  return (
    <>
      <Hero />
      <SmartAdport />
      <Services />
      <Features />
      <Testimonials />
      <CTA />
      
      {/* Quick Inquiry Button */}
      <Button 
        onClick={openInquiryForm}
        className="fixed left-6 bottom-24 z-50 bg-brand-red hover:bg-brand-red/90 text-white shadow-lg flex items-center gap-2 px-4 py-6 rounded-full"
      >
        <MessageSquare className="h-5 w-5" />
        <span className="font-medium">Quick Inquiry</span>
      </Button>
      
      {/* AI Chat Agent */}
      <AIChatAgent />
      
      {/* Inquiry Form Modal */}
      <InquiryForm 
        isOpen={isInquiryFormOpen}
        onClose={() => setIsInquiryFormOpen(false)}
      />
    </>
  );
};

export default Home;
