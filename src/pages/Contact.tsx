
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import MapLocation from '@/components/MapLocation';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We've received your message and will respond soon."
    });
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-20 bg-brand-blue text-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg opacity-90">
              Get in touch with our AC service experts for any inquiries, bookings, or support. 
              We're here to help with all your air conditioning needs.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Info Cards */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ContactCard 
              icon={<Phone className="h-6 w-6 text-brand-red" />}
              title="Phone"
              content="+92 312 5242182"
              action="Call Now"
              link="tel:+923125242182"
            />
            <ContactCard 
              icon={<Mail className="h-6 w-6 text-brand-red" />}
              title="Email"
              content="info@acservices.pk"
              action="Email Us"
              link="mailto:info@acservices.pk"
            />
            <ContactCard 
              icon={<MapPin className="h-6 w-6 text-brand-red" />}
              title="Location"
              content="Bahria Town, Phase 8, Rawalpindi"
              action="Get Directions"
              link="https://goo.gl/maps/93jxzXUUZtQdKVf77"
            />
            <ContactCard 
              icon={<Clock className="h-6 w-6 text-brand-red" />}
              title="Working Hours"
              content="Mon-Fri: 8am-6pm | Sat: 9am-4pm"
              action="Book Service"
              link="/booking"
              isInternal={true}
            />
          </div>
        </div>
      </section>
      
      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <Input id="name" name="name" required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <Input id="phone" name="phone" required />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input id="email" name="email" type="email" required />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input id="subject" name="subject" required />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    required
                    placeholder="Please describe how we can help you..."
                  />
                </div>
                
                <Button type="submit" className="bg-brand-red hover:bg-brand-red/90">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">Service Areas</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                We provide AC services across Rawalpindi and Islamabad, with special focus on:
              </p>
              
              <ul className="space-y-4 mb-8">
                <ServiceAreaItem area="Bahria Town (All Phases)" />
                <ServiceAreaItem area="DHA Islamabad" />
                <ServiceAreaItem area="Gulberg Greens & Residencia" />
                <ServiceAreaItem area="PWD Housing Scheme" />
                <ServiceAreaItem area="Islamabad Sectors F, G, H, I" />
                <ServiceAreaItem area="Rawalpindi Cantt Area" />
                <ServiceAreaItem area="Chaklala Scheme" />
              </ul>
              
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-600">
                <h3 className="font-bold text-lg mb-3">Emergency Services</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We offer 24/7 emergency AC repair services across our service area.
                  For urgent assistance, call our emergency hotline:
                </p>
                <a 
                  href="tel:+923125242182" 
                  className="block w-full py-3 px-4 bg-brand-red text-white text-center rounded-md font-medium hover:bg-brand-red/90 transition-colors"
                >
                  +92 312 5242182
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map */}
      <MapLocation />
    </>
  );
};

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  action: string;
  link: string;
  isInternal?: boolean;
}

const ContactCard = ({ icon, title, content, action, link, isInternal = false }: ContactCardProps) => {
  const CardContent = () => (
    <>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 mb-4 inline-block">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{content}</p>
      <span className="text-brand-red font-medium hover:underline inline-flex items-center">
        {action}
        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </>
  );

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-800 text-center hover:shadow-lg transition-shadow">
      {isInternal ? (
        <a href={link} className="block h-full">
          <CardContent />
        </a>
      ) : (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
          <CardContent />
        </a>
      )}
    </div>
  );
};

const ServiceAreaItem = ({ area }: { area: string }) => (
  <li className="flex items-center">
    <svg className="w-5 h-5 text-brand-red mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.75 12.75L10 15.25L16.25 8.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span>{area}</span>
  </li>
);

export default Contact;
