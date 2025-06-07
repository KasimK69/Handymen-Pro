
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import PremiumACCollection from '@/components/home/PremiumACCollection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <PremiumACCollection />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Index;
