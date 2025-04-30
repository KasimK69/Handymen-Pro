
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, Star, StarOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from '@/hooks/use-toast';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  date: string;
  featured: boolean;
}

// Sample testimonials data
const initialTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "John Smith",
    role: "Homeowner",
    content: "The AC repair service was excellent. Technician was on time, professional, and fixed the issue quickly.",
    rating: 5,
    date: "2025-03-15",
    featured: true,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "Business Owner",
    content: "We had our office AC system serviced and the team did a great job. Very satisfied with the maintenance work.",
    rating: 4,
    date: "2025-03-10",
    featured: false,
  },
  {
    id: "3",
    name: "Michael Davis",
    role: "Apartment Manager",
    content: "Responsive service and fair pricing. Would recommend to anyone needing AC repairs or installations.",
    rating: 5,
    date: "2025-02-28",
    featured: true,
  },
  {
    id: "4",
    name: "Emma Wilson",
    role: "Homeowner",
    content: "The team installed a new AC unit in our home and did a fantastic job. Very professional and clean work.",
    rating: 5,
    date: "2025-02-20",
    featured: false,
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  const toggleFeatured = (id: string) => {
    setTestimonials(testimonials.map(testimonial => 
      testimonial.id === id 
        ? { ...testimonial, featured: !testimonial.featured } 
        : testimonial
    ));
    
    toast({
      title: "Status updated",
      description: "Testimonial featured status has been updated",
    });
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
    
    toast({
      title: "Testimonial deleted",
      description: "The testimonial has been removed successfully",
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage customer testimonials and reviews
          </p>
        </div>
        <Button className="bg-brand-blue hover:bg-brand-blue/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Testimonials</CardTitle>
          <CardDescription>
            You have {testimonials.length} testimonials in total. Featured testimonials appear on the homepage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Testimonial</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate">{testimonial.content}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{testimonial.date}</TableCell>
                  <TableCell>
                    <Badge variant={testimonial.featured ? "default" : "outline"}>
                      {testimonial.featured ? "Featured" : "Regular"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => toggleFeatured(testimonial.id)}>
                        {testimonial.featured ? 
                          <StarOff className="h-4 w-4 text-yellow-500" /> : 
                          <Star className="h-4 w-4" />
                        }
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteTestimonial(testimonial.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default Testimonials;
