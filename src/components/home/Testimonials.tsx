
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  text: string;
  service: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    location: 'Islamabad',
    rating: 5,
    text: 'The team at ProHandyman was professional, timely, and did excellent work fixing my plumbing issues. I highly recommend their services to anyone needing home repairs!',
    service: 'Plumbing Repair'
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    location: 'Rawalpindi',
    rating: 5,
    text: 'I was impressed by how quickly they diagnosed and fixed my AC issues. The technician was knowledgeable and explained everything thoroughly. Great service at a fair price.',
    service: 'AC Repair'
  },
  {
    id: '3',
    name: 'Aisha Khan',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    location: 'Islamabad',
    rating: 5,
    text: 'The renovation team transformed my kitchen completely. They were professional, respectful of my home, and completed the work ahead of schedule. I couldn\'t be happier with the results!',
    service: 'Kitchen Renovation'
  },
  {
    id: '4',
    name: 'David Wilson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    location: 'Rawalpindi',
    rating: 4,
    text: 'Had them install new lighting throughout my home. The electrician was punctual, professional, and did quality work. The only reason for 4 stars is a slight delay in scheduling.',
    service: 'Electrical Installation'
  },
  {
    id: '5',
    name: 'Fatima Ahmed',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    location: 'Islamabad',
    rating: 5,
    text: 'ProHandyman painted my entire house and did an absolutely fantastic job! Their attention to detail is impressive, and they cleaned up perfectly after finishing the work.',
    service: 'Interior Painting'
  }
];

const Testimonials = () => {
  const [activePage, setActivePage] = useState(0);
  const itemsPerPage = 3;
  const pageCount = Math.ceil(testimonials.length / itemsPerPage);
  
  const displayedTestimonials = testimonials.slice(
    activePage * itemsPerPage,
    (activePage * itemsPerPage) + itemsPerPage
  );

  const nextPage = () => {
    setActivePage((prev) => (prev + 1) % pageCount);
  };

  const prevPage = () => {
    setActivePage((prev) => (prev - 1 + pageCount) % pageCount);
  };

  return (
    <section className="section-padding bg-white dark:bg-gray-950">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Read testimonials from satisfied clients who've experienced our premium handyman services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {pageCount > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={prevPage}
                className="rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex gap-2">
                {Array.from({ length: pageCount }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePage(i)}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all duration-300",
                      activePage === i 
                        ? "bg-brand-red scale-125" 
                        : "bg-gray-300 dark:bg-gray-700"
                    )}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={nextPage}
                className="rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
      <CardContent className="p-8 h-full flex flex-col">
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-5 w-5",
                i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              )}
            />
          ))}
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 italic mb-6 flex-grow">
          "{testimonial.text}"
        </p>
        
        <div className="flex items-center mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
            loading="lazy"
          />
          <div>
            <h4 className="font-bold">{testimonial.name}</h4>
            <div className="flex flex-col text-sm text-gray-500">
              <span>{testimonial.location}</span>
              <span className="text-brand-red">{testimonial.service}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Testimonials;
