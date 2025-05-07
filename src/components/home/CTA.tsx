
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const CTA = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(29, 53, 87, 0.95), rgba(29, 53, 87, 0.8)), url(https://images.unsplash.com/photo-1581275299888-536227aac860?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Premium AC Services?
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
            Our certified AC technicians are available to help with installation, repair, 
            or maintenance. Get started today with a free consultation and estimate.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-brand-red hover:bg-brand-red/90 text-white" asChild>
              <Link to="/booking">
                Schedule a Service
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="tel:+923125242182" className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Call +92 312 5242182
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
