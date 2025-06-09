
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, Calendar, Award, AirVent, Wrench, Shield, Clock, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const handleWhatsAppContact = () => {
    const message = `Hello! I would like to know more about your AC services and your company. Please provide me with detailed information about your services, experience, and pricing. Thank you!`;
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-32 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div 
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center justify-center p-4 bg-white/20 rounded-2xl mb-8 backdrop-blur-sm"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <AirVent className="h-12 w-12 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 font-['Inter']">About AC Services</h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed mb-8">
              Pakistan's most trusted air conditioning service provider, delivering excellence in installation, repair, and maintenance since 2015.
            </p>
            <div className="flex items-center justify-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>24/7 Service</span>
              </div>
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Licensed & Insured</span>
              </div>
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
              <span>Bahria Town Based</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-['Inter']">Our Story</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              </div>
              <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                <p>
                  Founded in 2015 in Bahria Town, Rawalpindi Phase 8, AC Services began with a simple mission: to provide exceptional air conditioning solutions that Pakistani families and businesses can trust. Our founder, Engineer Ahmad Khan, recognized the growing need for professional AC services in the rapidly developing regions of Islamabad and Rawalpindi.
                </p>
                <p>
                  Starting with a small team of 3 certified technicians and a commitment to excellence, we've grown to become one of the most trusted AC service providers in the twin cities. Our workshop in Bahria Town Phase 8 has become a hub of innovation, where we service everything from residential split units to large commercial HVAC systems.
                </p>
                <p>
                  Today, we proudly serve over 5,000+ satisfied customers across Islamabad and Rawalpindi, with a team of 25+ certified technicians and engineers. Our growth has been built on three pillars: technical expertise, customer satisfaction, and transparent pricing.
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="AC Services team at work" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent"></div>
              </div>
              <motion.div 
                className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">Since 2015</div>
                  <div className="text-sm text-gray-600">Serving with Excellence</div>
                  <div className="text-xs text-gray-500 mt-1">Bahria Town, Phase 8</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-['Inter']">Our Mission & Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and our unwavering commitment to cooling Pakistan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                  <AirVent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 font-['Inter']">Our Mission</h3>
              </div>
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                To enhance the comfort, health, and productivity of our clients through expert air conditioning services delivered with integrity, innovation, and a genuine commitment to customer satisfaction across Pakistan.
              </p>
              <ul className="space-y-4">
                <ValueItem>Quality service at transparent, fair prices</ValueItem>
                <ValueItem>Customized solutions for every client's needs</ValueItem>
                <ValueItem>Building lasting relationships through trust</ValueItem>
                <ValueItem>Contributing to energy efficiency in Pakistan</ValueItem>
              </ul>
            </motion.div>

            {/* Values */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 font-['Inter']">Our Core Values</h3>
              </div>
              <ul className="space-y-4">
                <ValueItem>Professional integrity in everything we do</ValueItem>
                <ValueItem>Excellence in craftsmanship and service delivery</ValueItem>
                <ValueItem>Respect for clients' homes, time, and investment</ValueItem>
                <ValueItem>Continuous learning and technology adoption</ValueItem>
                <ValueItem>Transparent pricing with no hidden charges</ValueItem>
                <ValueItem>Strict adherence to safety and quality standards</ValueItem>
                <ValueItem>Environmental responsibility and energy efficiency</ValueItem>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="p-6"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
              <div className="text-5xl font-bold mb-2">5000+</div>
              <div className="text-lg opacity-90">Satisfied Customers</div>
            </motion.div>
            <motion.div 
              className="p-6"
              whileHover={{ scale: 1.05 }}
            >
              <Calendar className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
              <div className="text-5xl font-bold mb-2">9+</div>
              <div className="text-lg opacity-90">Years Experience</div>
            </motion.div>
            <motion.div 
              className="p-6"
              whileHover={{ scale: 1.05 }}
            >
              <Wrench className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
              <div className="text-5xl font-bold mb-2">25+</div>
              <div className="text-lg opacity-90">Certified Technicians</div>
            </motion.div>
            <motion.div 
              className="p-6"
              whileHover={{ scale: 1.05 }}
            >
              <Award className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Emergency Service</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-['Inter']">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Certified professionals committed to delivering exceptional AC services across Pakistan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember
              name="Engineer Ahmad Khan"
              position="Founder & CEO"
              experience="12+ Years Experience"
              image="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              index={0}
            />
            <TeamMember
              name="Fatima Ali"
              position="Operations Manager"
              experience="8+ Years Experience"
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              index={1}
            />
            <TeamMember
              name="Muhammad Hassan"
              position="Lead Technician"
              experience="10+ Years Experience"
              image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              index={2}
            />
            <TeamMember
              name="Sara Mahmood"
              position="Customer Relations"
              experience="6+ Years Experience"
              image="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              index={3}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 font-['Inter']">Ready to Experience Premium AC Service?</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers across Islamabad & Rawalpindi. Contact us today for expert consultation, 
              transparent pricing, and exceptional service quality.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={handleWhatsAppContact}
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl"
                >
                  <MessageCircle className="mr-3 h-6 w-6" />
                  WhatsApp Us Now
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-10 py-4 rounded-2xl text-lg font-semibold" 
                  asChild
                >
                  <Link to="/contact">
                    <Phone className="mr-3 h-6 w-6" />
                    Contact Us
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

const ValueItem = ({ children }: { children: React.ReactNode }) => (
  <motion.li 
    className="flex items-start gap-3"
    whileHover={{ x: 5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
    <span className="text-gray-700 leading-relaxed">{children}</span>
  </motion.li>
);

const TeamMember = ({ name, position, experience, image, index }: { 
  name: string; 
  position: string; 
  experience: string;
  image: string;
  index: number;
}) => (
  <motion.div 
    className="text-center group"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ y: -10 }}
  >
    <div className="relative mb-6 mx-auto w-48 h-48 overflow-hidden rounded-3xl border-4 border-white shadow-xl group-hover:shadow-2xl transition-all duration-300">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-900 font-['Inter']">{name}</h3>
    <p className="text-blue-600 font-semibold mb-1">{position}</p>
    <p className="text-sm text-gray-500">{experience}</p>
  </motion.div>
);

export default About;
