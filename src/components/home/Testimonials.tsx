
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { motion } from 'framer-motion';

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  content: string;
  image_url: string | null;
  rating: number | null;
  status: string;
  featured: boolean;
  created_at: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback testimonials for AC Services
  const fallbackTestimonials = [
    {
      id: '1',
      name: 'Ahmad Hassan',
      role: 'Homeowner - Islamabad',
      content: 'Excellent AC installation service! The technician was professional and installed my 1.5 ton inverter AC perfectly. Very satisfied with the quick and clean work.',
      image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      status: 'active',
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Fatima Sheikh',
      role: 'Business Owner - Rawalpindi',
      content: 'Best AC repair service in twin cities! They fixed our office AC units quickly and the pricing was very reasonable. Highly recommend their services.',
      image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b17c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      status: 'active',
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Muhammad Ali',
      role: 'Shop Owner - Blue Area',
      content: 'Professional AC maintenance service. They service our shop ACs regularly and always arrive on time. Great customer service and fair pricing.',
      image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      status: 'active',
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      name: 'Ayesha Khan',
      role: 'Apartment Resident - F-7',
      content: 'Emergency AC repair in summer heat - they came within 2 hours and fixed our AC perfectly. Lifesavers! Professional team with quality work.',
      image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      status: 'active',
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: '5',
      name: 'Saba Malik',
      role: 'Office Manager - Gulberg',
      content: 'Bought a second-hand AC from them and it works perfectly. Good quality used ACs with warranty. Honest dealer and reliable service.',
      image_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      status: 'active',
      featured: true,
      created_at: new Date().toISOString()
    }
  ];

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'active')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) {
        console.log('Using fallback testimonials');
        setTestimonials(fallbackTestimonials);
      } else if (data && data.length > 0) {
        setTestimonials(data);
      } else {
        setTestimonials(fallbackTestimonials);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials(fallbackTestimonials);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2D3559] font-['Inter']">
            What Our <span className="bg-gradient-to-r from-[#8843F2] to-[#FF467E] bg-clip-text text-transparent">Customers Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real feedback from satisfied customers who trust us with their AC needs across Pakistan.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#8843F2] to-[#FF467E] mx-auto mt-8"></div>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 h-full">
                  <CardContent className="p-6">
                    <Quote className="h-8 w-8 text-[#8843F2] mb-4 opacity-60" />
                    <p className="text-gray-700 mb-6 italic text-sm leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      {testimonial.image_url && (
                        <img
                          src={testimonial.image_url}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-[#8843F2]/20"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-bold text-[#2D3559] text-sm">
                          {testimonial.name}
                        </h4>
                        {testimonial.role && (
                          <p className="text-xs text-gray-500 mb-2">
                            {testimonial.role}
                          </p>
                        )}
                        {testimonial.rating && (
                          <div className="flex">
                            {renderStars(testimonial.rating)}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
