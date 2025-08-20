
import React, { useState, useEffect } from 'react';
import Hero from '@/components/home/Hero';
import SmartAdport from '@/components/home/SmartAdport';
import PremiumACCollection from '@/components/home/PremiumACCollection';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';
import InquiryForm from '@/components/InquiryForm';
import MapLocation from '@/components/MapLocation';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import AIChatAgent from '@/components/AIChatAgent';
import WhatsAppButton from '@/components/WhatsAppButton';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const [isInquiryFormOpen, setIsInquiryFormOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Delay the appearance of the quick inquiry button for a better UX
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const openInquiryForm = () => {
    setIsInquiryFormOpen(true);
  };
  
  return (
    <>
      <SEOHead 
        title="AC Services & Repairs Pakistan | Professional AC Installation, Repair & Sales"
        description="Professional AC services in Islamabad & Rawalpindi. Expert AC installation, repair, maintenance, and premium air conditioner sales. 24/7 emergency service available."
        keywords="ac service, ac repair, ac installation, air conditioner, islamabad, rawalpindi, ac maintenance, ac gas filling, ac sale"
      />
      <Hero />
      <SmartAdport />
      <PremiumACCollection />
      <Features />
      <Testimonials />
      <MapLocation />
      <CTA />
      
      {/* Quick Inquiry Button */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Button 
              onClick={openInquiryForm}
              className="fixed left-6 bottom-24 z-50 bg-gradient-to-r from-[#FF467E] to-[#8843F2] hover:from-[#F03A6E] hover:to-[#7335E8] text-white shadow-lg flex items-center gap-2 px-4 py-6 rounded-full font-['Inter']"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="font-medium">Request Service</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* AI Chat Agent */}
      <AIChatAgent />
      
      {/* WhatsApp Button */}
      <WhatsAppButton />
      
      {/* Inquiry Form Modal */}
      <InquiryForm 
        isOpen={isInquiryFormOpen}
        onClose={() => setIsInquiryFormOpen(false)}
      />
    </>
  );
};

export default Home;
