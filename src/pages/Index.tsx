
import React from 'react';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Features />
      <Testimonials />
      <CTA />
    </>
  );
};

export default Home;
