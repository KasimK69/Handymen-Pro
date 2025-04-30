
import React from 'react';
import Hero from '@/components/home/Hero';
import SmartAdport from '@/components/home/SmartAdport';
import Services from '@/components/home/Services';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';
import AIChatAgent from '@/components/AIChatAgent';

const Home = () => {
  return (
    <>
      <Hero />
      <SmartAdport />
      <Services />
      <Features />
      <Testimonials />
      <CTA />
      <AIChatAgent />
    </>
  );
};

export default Home;
