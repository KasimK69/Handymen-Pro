
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-brand-blue pt-32 pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-brand-red" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-red" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Professional AC Services in Rawalpindi & Islamabad
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed max-w-xl">
              From expert installations to speedy repairs, we provide premium AC services to keep your home cool and comfortable in Bahria Town and surrounding areas.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <FeatureItem>Same Day Service</FeatureItem>
              <FeatureItem>Certified Technicians</FeatureItem>
              <FeatureItem>Warranty on Services</FeatureItem>
              <FeatureItem>Free Consultations</FeatureItem>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-brand-red hover:bg-brand-red/90 text-white" asChild>
                <Link to="/booking">Book a Service</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/ac-buy-and-sale">Shop AC Units</Link>
              </Button>
            </div>
            
            {/* Contact Info */}
            <div className="mt-8 flex items-center text-white/80">
              <a href="tel:+923125242182" className="hover:text-white transition-colors">
                +92 312 5242182
              </a>
              <span className="mx-2">•</span>
              <span>Bahria Town, Phase 8, Rawalpindi</span>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative animate-fade-in-slow">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/lovable-uploads/cf10ab83-7dc8-43ab-ab86-4d1edaf5a9d3.png" 
                alt="Professional AC service in Rawalpindi" 
                className="w-full h-auto rounded-lg object-cover"
                loading="eager"
              />
              
              {/* Stats Overlay */}
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-red">12+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-red">4000+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">AC Services Done</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center">
    <CheckCircle className="w-5 h-5 text-brand-red mr-2 shrink-0" />
    <span>{children}</span>
  </div>
);

export default Hero;
