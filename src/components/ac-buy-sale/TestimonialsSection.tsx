
import React from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="I bought a used inverter AC from them and couldn't be happier. It works like new and the price was extremely reasonable."
            author="Asim Khan"
            role="Rawalpindi"
          />
          <TestimonialCard 
            quote="Their team was very professional during installation. The AC I purchased is energy efficient and keeping my home cool even in peak summer."
            author="Sania Ahmed"
            role="Islamabad"
          />
          <TestimonialCard 
            quote="I was able to sell my old AC unit quickly through their platform. The process was smooth and I got a fair price."
            author="Fahad Mehmood"
            role="Rawalpindi"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
