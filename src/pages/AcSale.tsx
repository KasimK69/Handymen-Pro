
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BadgeCheck, 
  Truck, 
  ShieldCheck, 
  Clock, 
  Star,
  ShoppingCart
} from 'lucide-react';

interface ACUnit {
  id: string;
  name: string;
  price: number;
  rating: number;
  features: string[];
  image: string;
  discounted?: boolean;
}

const acUnits: ACUnit[] = [
  {
    id: 'inverter-1ton',
    name: 'Pro Inverter AC - 1 Ton',
    price: 999.99,
    rating: 4.8,
    features: [
      'Energy efficient inverter technology',
      'Cooling capacity: 12,000 BTU',
      'Low noise operation: 26dB',
      'Smart connectivity features',
      'Anti-bacterial filter',
      '5-year warranty'
    ],
    image: 'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'inverter-1.5ton',
    name: 'Pro Inverter AC - 1.5 Ton',
    price: 1299.99,
    rating: 4.9,
    features: [
      'Energy efficient inverter technology',
      'Cooling capacity: 18,000 BTU',
      'Low noise operation: 28dB',
      'Smart connectivity features',
      'Anti-bacterial filter',
      '5-year warranty'
    ],
    image: 'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    discounted: true
  },
  {
    id: 'inverter-2ton',
    name: 'Pro Inverter AC - 2 Ton',
    price: 1599.99,
    rating: 4.7,
    features: [
      'Energy efficient inverter technology',
      'Cooling capacity: 24,000 BTU',
      'Low noise operation: 30dB',
      'Smart connectivity features',
      'Anti-bacterial filter',
      '5-year warranty'
    ],
    image: 'https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'standard-1ton',
    name: 'Standard AC - 1 Ton',
    price: 749.99,
    rating: 4.5,
    features: [
      'Efficient cooling',
      'Cooling capacity: 12,000 BTU',
      'Low noise operation',
      'Auto restart feature',
      'Dust filter',
      '2-year warranty'
    ],
    image: 'https://images.unsplash.com/photo-1563351672-62b74891a28a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'standard-1.5ton',
    name: 'Standard AC - 1.5 Ton',
    price: 899.99,
    rating: 4.3,
    features: [
      'Efficient cooling',
      'Cooling capacity: 18,000 BTU',
      'Low noise operation',
      'Auto restart feature',
      'Dust filter',
      '2-year warranty'
    ],
    image: 'https://images.unsplash.com/photo-1580821810660-5486b8e980a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'standard-2ton',
    name: 'Standard AC - 2 Ton',
    price: 1199.99,
    rating: 4.4,
    features: [
      'Efficient cooling',
      'Cooling capacity: 24,000 BTU',
      'Low noise operation',
      'Auto restart feature',
      'Dust filter',
      '2-year warranty'
    ],
    image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    discounted: true
  }
];

const AcSale = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-blue text-white py-24 md:py-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Premium AC Units For Your Comfort</h1>
              <p className="text-xl opacity-90 leading-relaxed mb-8">
                Explore our collection of high-quality air conditioners with expert installation and maintenance services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-brand-red hover:bg-brand-red/90">
                  Shop Now
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to="/services/ac-repair">AC Services</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Modern AC Unit"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<BadgeCheck className="h-8 w-8 text-brand-red" />} 
              title="Premium Quality" 
              description="All our AC units meet rigorous quality standards for performance and durability."
            />
            <FeatureCard 
              icon={<Truck className="h-8 w-8 text-brand-red" />} 
              title="Free Delivery" 
              description="Free delivery on all AC units within Islamabad and Rawalpindi."
            />
            <FeatureCard 
              icon={<ShieldCheck className="h-8 w-8 text-brand-red" />} 
              title="Extended Warranty" 
              description="All units come with manufacturer warranty plus our service guarantee."
            />
            <FeatureCard 
              icon={<Clock className="h-8 w-8 text-brand-red" />} 
              title="Expert Installation" 
              description="Professional installation by our certified technicians."
            />
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="section-title text-center">Our AC Units</h2>
          <p className="section-subtitle text-center max-w-3xl mx-auto">
            Browse our selection of premium air conditioning units for your home or office
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {acUnits.map(unit => (
              <ProductCard key={unit.id} product={unit} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Why Choose Our AC Units?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Our air conditioning units are selected from top manufacturers known for quality and efficiency. 
                When you purchase an AC from us, you're not just getting a cooling device - you're getting a complete comfort solution.
              </p>

              <div className="space-y-6">
                <BenefitItem 
                  title="Energy Efficiency" 
                  description="Our AC units are designed to provide maximum cooling while minimizing power consumption."
                />
                <BenefitItem 
                  title="Quiet Operation" 
                  description="Experience cool comfort without the noise - our units operate at whisper-quiet levels."
                />
                <BenefitItem 
                  title="Smart Features" 
                  description="Many of our premium units include smart controls and connectivity options."
                />
                <BenefitItem 
                  title="Long-Term Support" 
                  description="We provide ongoing maintenance and support for all purchased units."
                />
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Modern home with AC"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-brand-blue text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Comfort?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss which AC unit is right for your space and schedule a consultation or installation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-brand-red hover:bg-brand-red/90">
              Buy Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
    <div className="mx-auto mb-4 flex justify-center">
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const ProductCard = ({ product }: { product: ACUnit }) => {
  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full">
      {product.discounted && (
        <div className="absolute top-4 right-4 bg-brand-red text-white text-xs px-3 py-1 rounded-full">
          Special Offer
        </div>
      )}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <div className="mb-4">
          <span className="text-2xl font-bold text-brand-blue">${product.price.toLocaleString()}</span>
          {product.discounted && (
            <span className="text-lg text-gray-500 line-through ml-2">
              ${(product.price * 1.15).toFixed(2)}
            </span>
          )}
        </div>
        <div className="space-y-2 mb-4">
          {product.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-start">
              <BadgeCheck className="w-4 h-4 text-brand-blue mt-1 mr-2 shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
            </div>
          ))}
          {product.features.length > 3 && (
            <div className="text-sm text-gray-600 dark:text-gray-400 pl-6">
              +{product.features.length - 3} more features
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button className="w-full bg-brand-blue hover:bg-brand-blue/90">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const BenefitItem = ({ 
  title, 
  description 
}: { 
  title: string; 
  description: string; 
}) => (
  <div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">
      {description}
    </p>
  </div>
);

export default AcSale;
