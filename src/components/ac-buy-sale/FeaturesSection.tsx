
import React from 'react';
import { BadgeCheck, Truck, ShieldCheck, Clock } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<BadgeCheck className="h-8 w-8 text-brand-red" />} 
            title="Quality Assured" 
            description="All our AC units are thoroughly tested for quality and performance before listing."
          />
          <FeatureCard 
            icon={<Truck className="h-8 w-8 text-brand-red" />} 
            title="Fast Delivery" 
            description="Free delivery within 24-48 hours in Rawalpindi and Islamabad areas."
          />
          <FeatureCard 
            icon={<ShieldCheck className="h-8 w-8 text-brand-red" />} 
            title="Warranty Coverage" 
            description="All new units come with manufacturer warranty plus our service guarantee."
          />
          <FeatureCard 
            icon={<Clock className="h-8 w-8 text-brand-red" />} 
            title="Expert Installation" 
            description="Professional installation by certified technicians included with every purchase."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
