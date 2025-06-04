
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Professional AC Services in Pakistan
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Expert installation, repair, and maintenance services for all your air conditioning needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Phone className="mr-2 h-5 w-5" />
              Call Now: +92 312 5242182
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/services" className="flex items-center">
                Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">AC Installation</h3>
              <p className="text-gray-600 mb-4">Professional installation with warranty</p>
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">AC Repair</h3>
              <p className="text-gray-600 mb-4">Fast and reliable repair services</p>
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">AC Maintenance</h3>
              <p className="text-gray-600 mb-4">Regular maintenance for peak performance</p>
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Contact us today for professional AC services</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link to="/contact">
              Get Free Quote
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
