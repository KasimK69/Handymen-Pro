
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

// This is a placeholder with mock data - in a real app, you'd fetch this from a database
const servicesData = {
  'plumbing': {
    title: 'Plumbing Services',
    description: 'Professional plumbing solutions for all your needs',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    content: 'Our professional plumbing services cover everything from minor repairs to major installations. With years of experience and a team of certified plumbers, we provide reliable solutions for residential and commercial properties.',
    features: [
      'Leak detection and repair',
      'Pipe installation and replacement',
      'Fixture installation and repair',
      'Drain cleaning',
      'Water heater services',
      'Emergency plumbing repairs'
    ],
    faqs: [
      {
        question: 'How quickly can you respond to plumbing emergencies?',
        answer: 'We offer same-day emergency service for critical plumbing issues. Our team is available 7 days a week to handle urgent situations like burst pipes, major leaks, or sewer backups.'
      },
      {
        question: 'Do you provide free estimates for plumbing work?',
        answer: 'Yes, we provide free estimates for all plumbing projects. We\'ll assess the situation, discuss your options, and provide a detailed quote before beginning any work.'
      },
      {
        question: 'Are your plumbers licensed and insured?',
        answer: 'Absolutely. All our plumbers are fully licensed, bonded, and insured. We maintain strict standards for training and certification to ensure quality workmanship.'
      }
    ]
  },
  'electrical': {
    title: 'Electrical Services',
    description: 'Safe and reliable electrical solutions',
    image: 'https://images.unsplash.com/photo-1621905252507-1a1a6bc3eee7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    content: 'Our electrical services cover all aspects of electrical repairs, installations, and maintenance for your home or business. Our licensed electricians ensure all work meets safety codes and standards.',
    features: [
      'Electrical installations and repairs',
      'Lighting design and installation',
      'Panel upgrades',
      'Outlet and switch installation',
      'Ceiling fan installation',
      'Electrical safety inspections'
    ],
    faqs: [
      {
        question: 'How do I know if my electrical panel needs an upgrade?',
        answer: 'Common signs include frequent circuit breaker trips, flickering lights, buzzing sounds from outlets, or if your home is over 25 years old with the original panel. We can perform an inspection to determine if an upgrade is necessary.'
      },
      {
        question: 'Can you install smart home electrical devices?',
        answer: 'Yes, we specialize in smart home installations, including smart lighting systems, thermostats, outlets, and whole-home automation systems. We can integrate new smart devices with your existing setup.'
      },
      {
        question: 'Do you offer electrical safety inspections?',
        answer: 'We provide comprehensive electrical safety inspections for homes and businesses. Our thorough assessment identifies potential hazards, code violations, and efficiency improvements for your electrical system.'
      }
    ]
  },
  'ac-repair': {
    title: 'AC Repair & Installation',
    description: 'Keep your space comfortable all year round',
    image: 'https://images.unsplash.com/photo-1581275299888-536227aac860?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    content: 'Our comprehensive AC services include installation, repair, and maintenance to keep your cooling systems running efficiently. We work with all major brands and models to provide tailored solutions.',
    features: [
      'AC installation and replacement',
      'Repair and troubleshooting',
      'Preventative maintenance',
      'Duct cleaning and repair',
      'Thermostat installation',
      'Energy efficiency consultation'
    ],
    faqs: [
      {
        question: 'How often should I service my AC unit?',
        answer: 'We recommend professional AC maintenance at least once a year, ideally before the summer season. Regular maintenance extends your system\'s life, improves efficiency, and prevents costly breakdowns.'
      },
      {
        question: 'What AC size do I need for my home?',
        answer: 'The right AC size depends on your home\'s square footage, insulation, layout, and other factors. Our technicians perform a detailed load calculation to recommend the appropriate system size for optimal performance and comfort.'
      },
      {
        question: 'How long does AC installation take?',
        answer: 'A typical residential AC installation takes between 4-8 hours, depending on the complexity of the installation, whether ductwork modifications are needed, and if you\'re replacing an existing unit or installing a new system.'
      }
    ]
  },
  // Add other services as needed
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? servicesData[slug as keyof typeof servicesData] : null;

  if (!service) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
        <p className="mb-8">The service you're looking for doesn't exist or has been moved.</p>
        <Link to="/services" className="btn-primary">View All Services</Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative py-32 bg-cover bg-center" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(29, 53, 87, 0.9), rgba(29, 53, 87, 0.7)), url(${service.image})` 
        }}
      >
        <div className="container mx-auto text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            {service.description}
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                {service.content}
              </p>

              <h3 className="text-2xl font-bold mb-4">What We Offer</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-red mr-2 mt-1 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
              <div className="space-y-8">
                {service.faqs.map((faq, index) => (
                  <div key={index}>
                    <h4 className="text-xl font-bold mb-2">{faq.question}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-lg sticky top-24">
                <h3 className="text-xl font-bold mb-6">Ready to Get Started?</h3>
                <p className="mb-8 text-gray-600 dark:text-gray-400">
                  Book our {service.title.toLowerCase()} today and experience professional quality work from our expert team.
                </p>
                <div className="space-y-4">
                  <Button className="w-full bg-brand-red hover:bg-brand-red/90" asChild>
                    <Link to="/booking">Book This Service</Link>
                  </Button>
                  <Button variant="outline" className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white" asChild>
                    <Link to="/contact">Request a Quote</Link>
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold mb-2">Contact Us</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    For immediate assistance:
                  </p>
                  <a href="tel:+15551234567" className="text-brand-red hover:underline block mb-1">
                    +1 (555) 123-4567
                  </a>
                  <a href="mailto:info@prohandyman.com" className="text-brand-red hover:underline">
                    info@prohandyman.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Explore Other Services</h2>
          
          <div className="flex justify-center">
            <Link to="/services" className="btn-outline">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
