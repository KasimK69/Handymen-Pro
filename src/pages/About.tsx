
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, Calendar, Award } from 'lucide-react';

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-blue text-white py-24 md:py-32">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About ProHandyman</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              We're a team of skilled professionals dedicated to delivering quality handyman services for your home and business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Founded in 2010, ProHandyman began with a simple mission: to provide exceptional home repair and improvement services that homeowners can trust. Our founder, Ahmed Khan, noticed a gap in the market for reliable, professional handyman services that deliver consistent quality.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Starting with just three employees and a small workshop in Islamabad, we've grown to a team of over 30 skilled professionals serving the entire Islamabad-Rawalpindi region. Our growth has been built on a foundation of quality workmanship, reliability, and exceptional customer service.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Today, we're proud to be one of the most trusted handyman service providers in the region, with thousands of successful projects completed and a loyal customer base that continues to grow through recommendations and repeat business.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1577401239170-897942555fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80" 
                alt="ProHandyman team at work" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-red">Since 2010</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Serving with Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Mission & Values</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              The principles that guide our work and our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                To enhance the comfort, safety, and beauty of our clients' homes through expert handyman services delivered with integrity, professionalism, and a genuine commitment to customer satisfaction.
              </p>
              <ul className="space-y-3">
                <ValueItem>Quality service at fair prices</ValueItem>
                <ValueItem>Solutions tailored to client needs</ValueItem>
                <ValueItem>Building lasting relationships</ValueItem>
              </ul>
            </div>

            {/* Values */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Our Core Values</h3>
              <ul className="space-y-3">
                <ValueItem>Professional integrity in everything we do</ValueItem>
                <ValueItem>Excellence in craftsmanship and service</ValueItem>
                <ValueItem>Respect for clients' homes and time</ValueItem>
                <ValueItem>Continuous improvement and learning</ValueItem>
                <ValueItem>Transparency in pricing and processes</ValueItem>
                <ValueItem>Commitment to safety standards</ValueItem>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-brand-blue text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <Users className="h-12 w-12 mx-auto mb-4 text-brand-red" />
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-80">Satisfied Clients</div>
            </div>
            <div className="p-6">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-brand-red" />
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-lg opacity-80">Years of Experience</div>
            </div>
            <div className="p-6">
              <Award className="h-12 w-12 mx-auto mb-4 text-brand-red" />
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-lg opacity-80">Professional Staff</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Skilled professionals committed to delivering exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember
              name="Ahmed Khan"
              position="Founder & CEO"
              image="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            />
            <TeamMember
              name="Fatima Ali"
              position="Operations Manager"
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            />
            <TeamMember
              name="Malik Hassan"
              position="Lead Technician"
              image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            />
            <TeamMember
              name="Sara Mahmood"
              position="Customer Service"
              image="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Our Premium Service?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your home improvement needs or schedule a service appointment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-brand-red hover:bg-brand-red/90" asChild>
              <Link to="/booking">Book a Service</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

const ValueItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start">
    <CheckCircle className="w-5 h-5 text-brand-red mr-2 shrink-0 mt-0.5" />
    <span>{children}</span>
  </li>
);

const TeamMember = ({ name, position, image }: { name: string; position: string; image: string }) => (
  <div className="text-center">
    <div className="relative mb-6 mx-auto w-48 h-48 overflow-hidden rounded-full border-4 border-white shadow-lg">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover"
      />
    </div>
    <h3 className="text-xl font-bold mb-1">{name}</h3>
    <p className="text-brand-red">{position}</p>
  </div>
);

export default About;
