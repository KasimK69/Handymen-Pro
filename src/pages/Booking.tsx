
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin, User, Phone, Mail, Check, ClipboardList, Star } from "lucide-react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const services = [
  { id: 'ac-installation', name: 'AC Installation' },
  { id: 'ac-repair', name: 'AC Repair' },
  { id: 'ac-maintenance', name: 'AC Maintenance' },
  { id: 'ac-gas-refilling', name: 'AC Gas Refilling' },
  { id: 'ac-cleaning', name: 'AC Deep Cleaning' },
  { id: 'ac-replacement', name: 'AC Replacement' },
];

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', 
  '12:00 PM', '1:00 PM', '2:00 PM', 
  '3:00 PM', '4:00 PM', '5:00 PM'
];

const areas = [
  { id: 'bahria-town', name: 'Bahria Town' },
  { id: 'dha', name: 'DHA Islamabad' },
  { id: 'gulberg', name: 'Gulberg' },
  { id: 'f-sectors', name: 'F Sectors (Islamabad)' },
  { id: 'g-sectors', name: 'G Sectors (Islamabad)' },
  { id: 'i-sectors', name: 'I Sectors (Islamabad)' },
  { id: 'rawalpindi-city', name: 'Rawalpindi City' },
  { id: 'saddar', name: 'Saddar' },
  { id: 'satellite-town', name: 'Satellite Town' },
  { id: 'chaklala', name: 'Chaklala' },
  { id: 'other', name: 'Other Area' },
];

const bookingFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  service: z.string().min(1, { message: 'Please select a service.' }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string().min(1, { message: 'Please select a time slot.' }),
  area: z.string().min(1, { message: 'Please select your area.' }),
  address: z.string().min(5, { message: 'Please enter your complete address.' }),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const Booking = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingFormValues | null>(null);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      area: '',
      address: '',
      notes: '',
    }
  });

  function onSubmit(data: BookingFormValues) {
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log(data);
      toast({
        title: "Booking Request Submitted!",
        description: `We've received your booking for ${data.service} on ${format(data.date, "PPP")} at ${data.time}.`,
      });
      setBookingDetails(data);
      setBookingComplete(true);
      setIsSubmitting(false);
    }, 1500);
  }

  if (bookingComplete && bookingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        {/* Success Header */}
        <section className="pt-24 pb-16">
          <div className="w-full px-4 mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500 mb-6">
                <Check className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                Booking Confirmed!
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Thank you for choosing AC Services. Your appointment has been scheduled successfully.
              </p>
            </div>
          </div>
        </section>

        {/* Booking Details */}
        <section className="pb-20">
          <div className="w-full px-4 mx-auto">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-brand-blue text-white rounded-t-lg">
                  <CardTitle className="text-2xl">Your Booking Details</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-brand-blue">Service Information</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="block text-sm text-gray-500">Service Type</span>
                          <span className="block font-medium">{bookingDetails.service}</span>
                        </div>
                        <div>
                          <span className="block text-sm text-gray-500">Date & Time</span>
                          <span className="block font-medium">{format(bookingDetails.date, "PPP")} at {bookingDetails.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-brand-blue">Contact Information</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="block text-sm text-gray-500">Name</span>
                          <span className="block font-medium">{bookingDetails.name}</span>
                        </div>
                        <div>
                          <span className="block text-sm text-gray-500">Phone</span>
                          <span className="block font-medium">{bookingDetails.phone}</span>
                        </div>
                        <div>
                          <span className="block text-sm text-gray-500">Address</span>
                          <span className="block font-medium">
                            {bookingDetails.address}, {bookingDetails.area}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
                    <h3 className="font-bold mb-2 text-brand-blue">What happens next?</h3>
                    <p className="mb-4">Our team will contact you within 2 hours to confirm your appointment details.</p>
                    <p>Emergency contact: <a href="tel:+923125242182" className="text-brand-red hover:underline font-medium">+92 312 5242182</a></p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button asChild className="bg-brand-blue hover:bg-brand-blue/90">
                      <Link to="/">Return to Homepage</Link>
                    </Button>
                    <Button variant="outline" asChild className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white">
                      <Link to="/services">Explore More Services</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="w-full px-4 mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 border border-brand-blue/20 rounded-full text-sm font-medium bg-brand-blue/10 backdrop-blur-sm mb-6">
              <Star className="mr-2 h-4 w-4 text-brand-blue" />
              Professional AC Services in Rawalpindi & Islamabad
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Book Your <span className="text-brand-blue">AC Service</span> Now
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Schedule professional AC installation, repair, or maintenance with our expert technicians. Quick response, quality service guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="pb-20">
        <div className="w-full px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-0 overflow-hidden">
              <CardHeader className="bg-brand-blue text-white p-8">
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <ClipboardList className="h-7 w-7" />
                  Book Your AC Service
                </CardTitle>
                <p className="text-blue-100 mt-2">Fill out the form below and we'll contact you within 2 hours</p>
              </CardHeader>
              
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-xl font-semibold mb-6 flex items-center text-brand-blue">
                        <User className="mr-3 h-6 w-6" /> Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} className="h-12 text-base" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your phone number" {...field} className="h-12 text-base" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="mt-6">
                            <FormLabel className="text-base font-medium">Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email address" {...field} className="h-12 text-base" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Service Details */}
                    <div>
                      <h3 className="text-xl font-semibold mb-6 flex items-center text-brand-blue">
                        <Clock className="mr-3 h-6 w-6" /> Service Details
                      </h3>
                      
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem className="mb-6">
                            <FormLabel className="text-base font-medium">Select AC Service</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12 text-base">
                                  <SelectValue placeholder="Choose the service you need" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {services.map(service => (
                                  <SelectItem key={service.id} value={service.name} className="cursor-pointer text-base">
                                    {service.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className="text-base font-medium">Preferred Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "h-12 w-full pl-3 text-left font-normal text-base",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Select a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date < new Date()
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="time"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">Preferred Time</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-12 text-base">
                                    <SelectValue placeholder="Choose time slot" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {timeSlots.map(time => (
                                    <SelectItem key={time} value={time} className="cursor-pointer text-base">
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* Location */}
                    <div>
                      <h3 className="text-xl font-semibold mb-6 flex items-center text-brand-blue">
                        <MapPin className="mr-3 h-6 w-6" /> Service Location
                      </h3>
                      
                      <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                          <FormItem className="mb-6">
                            <FormLabel className="text-base font-medium">Select Your Area</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12 text-base">
                                  <SelectValue placeholder="Choose your area" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {areas.map(area => (
                                  <SelectItem key={area.id} value={area.name} className="cursor-pointer text-base">
                                    {area.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="mb-6">
                            <FormLabel className="text-base font-medium">Complete Address</FormLabel>
                            <FormControl>
                              <Input placeholder="House/Flat number, Street, Block, etc." {...field} className="h-12 text-base" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Additional Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any specific requirements or details about your AC service needs" 
                                className="min-h-[100px] resize-none text-base"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="pt-6">
                      <Button 
                        type="submit" 
                        className="w-full h-14 text-lg bg-brand-red hover:bg-brand-red/90 transition-all font-semibold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Processing Your Booking...
                          </>
                        ) : (
                          <>
                            <Check className="mr-3 h-5 w-5" />
                            Book AC Service Now
                          </>
                        )}
                      </Button>
                      <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                        We'll call you within 2 hours to confirm your appointment
                      </p>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="w-full px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Why Choose Our <span className="text-brand-blue">AC Services</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="bg-brand-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="font-bold text-lg mb-3">Expert Technicians</h3>
                <p className="text-gray-600 dark:text-gray-400">Certified professionals with 10+ years experience</p>
              </div>
              
              <div className="text-center p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="bg-brand-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="font-bold text-lg mb-3">Same Day Service</h3>
                <p className="text-gray-600 dark:text-gray-400">Quick response for urgent AC repairs and installations</p>
              </div>
              
              <div className="text-center p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="bg-brand-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="font-bold text-lg mb-3">100% Satisfaction</h3>
                <p className="text-gray-600 dark:text-gray-400">Quality guaranteed or your money back</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
