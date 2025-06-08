import React from 'react';
import { Shield, Clock, Award, Wrench, Smile, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}
const features: Feature[] = [{
  id: 'quality',
  title: 'Quality Craftsmanship',
  description: 'Our skilled professionals deliver exceptional work with attention to detail on every project.',
  icon: <Award className="h-10 w-10 text-brand-red" />
}, {
  id: 'reliable',
  title: 'Reliable & Punctual',
  description: 'We respect your time and schedule with prompt arrivals and efficient service execution.',
  icon: <Clock className="h-10 w-10 text-brand-red" />
}, {
  id: 'certified',
  title: 'Licensed & Insured',
  description: 'Rest easy knowing our team is fully certified, licensed, and insured for your protection.',
  icon: <Shield className="h-10 w-10 text-brand-red" />
}, {
  id: 'tools',
  title: 'Professional Equipment',
  description: 'We use only the best professional-grade tools and quality materials for lasting results.',
  icon: <Wrench className="h-10 w-10 text-brand-red" />
}, {
  id: 'satisfaction',
  title: '100% Satisfaction',
  description: 'Your complete satisfaction is our priority, backed by our service guarantee.',
  icon: <Smile className="h-10 w-10 text-brand-red" />
}, {
  id: 'support',
  title: 'Customer Support',
  description: 'Our friendly team is available to answer questions and provide assistance anytime.',
  icon: <MessageSquare className="h-10 w-10 text-brand-red" />
}];
const Features = () => {
  return <section className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Why Choose AC SERVICES</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            We deliver exceptional handyman services with professionalism and expertise you can trust
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => <FeatureCard key={feature.id} feature={feature} index={index} />)}
        </div>
      </div>
    </section>;
};
const FeatureCard = ({
  feature,
  index
}: {
  feature: Feature;
  index: number;
}) => {
  return <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full animate-fade-in" style={{
    animationDelay: `${index * 100}ms`
  }}>
      <CardContent className="p-8 flex flex-col items-center text-center h-full">
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
          {feature.icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
        <p className="text-gray-600 dark:text-gray-400">
          {feature.description}
        </p>
      </CardContent>
    </Card>;
};
export default Features;