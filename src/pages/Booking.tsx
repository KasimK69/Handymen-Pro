import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin, User, Phone, Mail, CreditCard, Check, ClipboardList, InfoIcon } from "lucide-react";
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
  CardFooter,
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
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import PaymentMethods from '@/components/booking/PaymentMethods';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const services = [
  { id: 'plumbing', name: 'Plumbing Services' },
  { id: 'electrical', name: 'Electrical Work' },
  { id: 'ac-repair', name: 'AC Repair & Installation' },
  { id: 'painting', name: 'Painting Services' },
  { id: 'carpentry', name: 'Carpentry' },
  { id: 'home-renovation', name: 'Home Renovation' },
  { id: 'flooring', name: 'Flooring Installation' },
  { id: 'drywall', name: 'Drywall Repair' },
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
  paymentMethod: z.string().min(1, { message: 'Please select a payment method.' }),
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
      paymentMethod: 'cash-on-delivery',
    }
  });

  function onSubmit(data: BookingFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
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
      <>
        {/* Confirmation Header */}
        <section className="bg-brand-blue text-white py-24 md:py-32">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Booking Confirmed!</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Thank you for choosing Handyman Pro Services. Your service has been scheduled successfully.
            </p>
          </div>
        </section>

        {/* Booking Details */}
        <section className="py-20">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Your Booking Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">Service Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="block text-sm text-gray-500">Service Type</span>
                      <span className="block font-medium">{bookingDetails.service}</span>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">Date & Time</span>
                      <span className="block font-medium">{format(bookingDetails.date, "PPP")} at {bookingDetails.time}</span>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">Payment Method</span>
                      <span className="block font-medium">
                        {bookingDetails.paymentMethod === 'cash-on-delivery' && 'Cash on Delivery'}
                        {bookingDetails.paymentMethod === 'easypaisa' && 'EasyPaisa'}
                        {bookingDetails.paymentMethod === 'jazzcash' && 'JazzCash'}
                        {bookingDetails.paymentMethod === 'bank-transfer' && 'Bank Transfer'}
                        {bookingDetails.paymentMethod === 'card-payment' && 'Card Payment'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="block text-sm text-gray-500">Name</span>
                      <span className="block font-medium">{bookingDetails.name}</span>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">Email</span>
                      <span className="block font-medium">{bookingDetails.email}</span>
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
              
              {bookingDetails.notes && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-2">Additional Notes</h3>
                  <p className="text-gray-600 dark:text-gray-400">{bookingDetails.notes}</p>
                </div>
              )}
              
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mb-6">
                <h3 className="font-bold mb-2">What happens next?</h3>
                <p className="mb-4">Our team will review your booking and contact you shortly to confirm all details. You'll also receive a confirmation SMS and email.</p>
                <p>If you have any questions, please contact us at:</p>
                <a href="tel:+923125242182" className="block mt-2 text-brand-red hover:underline">+92 312 5242182</a>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild>
                  <Link to="/">Return to Homepage</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/services">Explore More Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0f172a] via-brand-blue to-[#1e40af] text-white py-24 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjMUQzNTU3IiB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjgiLz48Y2lyY2xlIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1vcGFjaXR5PSIuMiIgY3g9IjE1NSIgY3k9IjQ1MCIgcj0iMTEzLjUiLz48Y2lyY2xlIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1vcGFjaXR5PSIuMiIgY3g9IjQ1MCIgY3k9IjMyMCIgcj0iMTEzLjUiLz48Y2lyY2xlIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1vcGFjaXR5PSIuMiIgY3g9IjExOTUiIGN5PSIxNDUiIHI9IjExMy41Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 border border-white/20 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm mb-6">
              <span className="mr-2 bg-green-500 rounded-full w-2 h-2"></span>
              Professional Home Services Available Now
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200">Book Your Service Today</h1>
            <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
              Schedule a service appointment with our expert technicians in Rawalpindi and Islamabad. Just fill out the form below, and we'll take care of the rest.
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-16">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 left-0">
            <path fill="#ffffff" fillOpacity="1" d="M0,128L80,144C160,160,320,192,480,176C640,160,800,96,960,80C1120,64,1280,96,1360,112L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main Booking Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-xl border-0 overflow-hidden">
                  <CardHeader className="bg-white dark:bg-gray-800 p-8 border-b border-gray-100 dark:border-gray-700">
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                      <ClipboardList className="h-6 w-6 text-brand-blue" />
                      Book Your Service
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-8">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        
                        {/* Personal Information */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center text-brand-blue">
                            <User className="mr-2 h-5 w-5" /> Personal Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your name" {...field} className="h-12 rounded-lg" />
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
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your phone number" {...field} className="h-12 rounded-lg" />
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
                              <FormItem className="mt-4">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="Your email" {...field} className="h-12 rounded-lg" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <Separator />
                        
                        {/* Service Details */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center text-brand-blue">
                            <Clock className="mr-2 h-5 w-5" /> Service Details
                          </h3>
                          
                          <FormField
                            control={form.control}
                            name="service"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Service Type</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-12 rounded-lg">
                                      <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {services.map(service => (
                                      <SelectItem key={service.id} value={service.name} className="cursor-pointer">
                                        {service.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <FormField
                              control={form.control}
                              name="date"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Preferred Date</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "h-12 w-full pl-3 text-left font-normal rounded-lg",
                                            !field.value && "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
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
                                        className="rounded-md border"
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
                                  <FormLabel>Preferred Time</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="h-12 rounded-lg">
                                        <SelectValue placeholder="Select a time" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {timeSlots.map(time => (
                                        <SelectItem key={time} value={time} className="cursor-pointer">
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
                        
                        <Separator />
                        
                        {/* Location */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center text-brand-blue">
                            <MapPin className="mr-2 h-5 w-5" /> Service Location
                          </h3>
                          
                          <FormField
                            control={form.control}
                            name="area"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Area</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-12 rounded-lg">
                                      <SelectValue placeholder="Select your area" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {areas.map(area => (
                                      <SelectItem key={area.id} value={area.name} className="cursor-pointer">
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
                              <FormItem className="mt-4">
                                <FormLabel>Detailed Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="House/Flat number, Street, Block, etc." {...field} className="h-12 rounded-lg" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem className="mt-4">
                                <FormLabel>Additional Instructions (Optional)</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Please provide any additional details about the service you need" 
                                    className="min-h-[100px] resize-none rounded-lg"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <Separator />
                        
                        {/* Payment Method */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center text-brand-blue">
                            <CreditCard className="mr-2 h-5 w-5" /> Payment Method
                          </h3>
                          
                          <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <PaymentMethods 
                                    value={field.value} 
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="pt-4">
                          <Button 
                            type="submit" 
                            className="w-full h-14 text-base rounded-lg bg-brand-red hover:bg-brand-red/90 transition-all"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Processing..." : "Book Now"}
                            <Check className="ml-2 h-5 w-5" />
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
              
              {/* Side Information */}
              <div className="lg:col-span-1 space-y-6">
                {/* Why choose us card */}
                <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                  <CardHeader className="p-6 pb-2">
                    <CardTitle className="text-xl font-bold text-brand-blue">Why Choose Us</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex gap-3">
                      <div className="bg-brand-blue/10 rounded-full p-2 h-fit">
                        <Check className="h-4 w-4 text-brand-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">Expert Technicians</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Highly skilled and certified professionals</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="bg-brand-blue/10 rounded-full p-2 h-fit">
                        <Check className="h-4 w-4 text-brand-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">Same Day Service</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Quick response for urgent requirements</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="bg-brand-blue/10 rounded-full p-2 h-fit">
                        <Check className="h-4 w-4 text-brand-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">Quality Guaranteed</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">100% satisfaction or your money back</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="bg-brand-blue/10 rounded-full p-2 h-fit">
                        <Check className="h-4 w-4 text-brand-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">Transparent Pricing</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">No hidden costs or surprise fees</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* FAQ Card */}
                <Card className="shadow-lg border-0">
                  <CardHeader className="p-6 pb-2">
                    <CardTitle className="text-xl font-bold">Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="text-left">How quickly can you arrive?</AccordionTrigger>
                        <AccordionContent>
                          For most services, we can schedule a visit within 24-48 hours. For emergencies, we offer same-day service when available.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-2">
                        <AccordionTrigger className="text-left">What areas do you serve?</AccordionTrigger>
                        <AccordionContent>
                          We currently serve all areas in Islamabad and Rawalpindi. Select your specific area from the dropdown in the booking form.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-3">
                        <AccordionTrigger className="text-left">Do you provide cost estimates?</AccordionTrigger>
                        <AccordionContent>
                          Yes, we provide free estimates before beginning any work. Our technician will assess the job and provide a transparent quote.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
                
                {/* Contact Card */}
                <Card className="shadow-lg border-0 bg-gradient-to-br from-brand-blue to-blue-700 text-white">
                  <CardHeader className="p-6 pb-0">
                    <CardTitle className="text-xl font-bold">Need Urgent Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="mb-4">For emergency services or immediate assistance:</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5" />
                        <a href="tel:+923125242182" className="font-semibold hover:underline">+92 312 5242182</a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5" />
                        <a href="mailto:info@handymanpro.pk" className="font-semibold hover:underline">info@handymanpro.pk</a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Info */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Our Service Process</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="bg-brand-blue/10 dark:bg-brand-blue/20 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-brand-blue mx-auto mb-4">
                  <span>1</span>
                </div>
                <h3 className="font-bold text-lg mb-3">Book Online</h3>
                <p className="text-gray-600 dark:text-gray-400">Complete our simple booking form with your service requirements and preferred time.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="bg-brand-blue/10 dark:bg-brand-blue/20 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-brand-blue mx-auto mb-4">
                  <span>2</span>
                </div>
                <h3 className="font-bold text-lg mb-3">Confirmation</h3>
                <p className="text-gray-600 dark:text-gray-400">Receive a confirmation call from our team to finalize appointment details and pricing.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="bg-brand-blue/10 dark:bg-brand-blue/20 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-brand-blue mx-auto mb-4">
                  <span>3</span>
                </div>
                <h3 className="font-bold text-lg mb-3">Service Visit</h3>
                <p className="text-gray-600 dark:text-gray-400">Our expert technician arrives at your location to complete the work to your satisfaction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Booking;
