import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin, User, Phone, Mail, CreditCard, Check } from "lucide-react";
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
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<Partial<BookingFormValues>>({});

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

  // Handle next step
  const handleNextStep = async (data: Partial<BookingFormValues>) => {
    setFormData({...formData, ...data});
    setCurrentStep(currentStep + 1);
  };

  // Handle back step
  const handleBackStep = () => {
    setCurrentStep(currentStep - 1);
  };

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

  // UI helper function to render the progress indicator
  const renderProgressBar = () => {
    const steps = [
      { name: "Personal Info", icon: <User className="h-5 w-5" /> },
      { name: "Service Details", icon: <Clock className="h-5 w-5" /> },
      { name: "Location & Notes", icon: <MapPin className="h-5 w-5" /> },
      { name: "Payment", icon: <CreditCard className="h-5 w-5" /> }
    ];
    
    return (
      <div className="mb-10">
        <div className="flex items-center justify-center mb-4">
          <div className="flex w-full max-w-3xl justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
                    index + 1 < currentStep 
                      ? "bg-green-500 text-white" 
                      : index + 1 === currentStep 
                        ? "bg-brand-blue text-white" 
                        : "bg-gray-200 text-gray-500 dark:bg-gray-700"
                  )}
                >
                  {index + 1 < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <p className={cn(
                  "mt-2 text-xs font-medium",
                  index + 1 === currentStep ? "text-brand-blue" : "text-gray-500"
                )}>
                  {step.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 transform bg-gray-200 dark:bg-gray-700"></div>
          <div 
            className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-brand-blue transition-all duration-300" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  }

  const renderFormStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="animate-fade-in space-y-6">
            <h3 className="text-xl font-bold flex items-center">
              <User className="mr-2 h-5 w-5 text-brand-blue" /> Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Your email" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end mt-8">
              <Button 
                onClick={form.handleSubmit(handleNextStep)}
                className="bg-brand-blue hover:bg-brand-blue/90 transition-all h-12 px-8 rounded-full"
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-fade-in space-y-6">
            <h3 className="text-xl font-bold flex items-center">
              <Clock className="mr-2 h-5 w-5 text-brand-blue" /> Service Details
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
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map(service => (
                        <SelectItem key={service.id} value={service.name}>
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
                    <FormLabel>Preferred Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "h-12 w-full pl-3 text-left font-normal",
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
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map(time => (
                          <SelectItem key={time} value={time}>
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

            <div className="flex justify-between mt-8">
              <Button 
                onClick={handleBackStep} 
                variant="outline"
                className="h-12 px-6 rounded-full"
              >
                Back
              </Button>
              <Button 
                onClick={form.handleSubmit(handleNextStep)}
                className="bg-brand-blue hover:bg-brand-blue/90 transition-all h-12 px-8 rounded-full"
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-fade-in space-y-6">
            <h3 className="text-xl font-bold flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-brand-blue" /> Service Location & Notes
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
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your area" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {areas.map(area => (
                        <SelectItem key={area.id} value={area.name}>
                          {area.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <p className="text-sm text-gray-500 mt-2">
                    * We currently serve Rawalpindi and Islamabad areas only
                  </p>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Address</FormLabel>
                  <FormControl>
                    <Input placeholder="House/Flat number, Street, Block, etc." {...field} className="h-12" />
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
                  <FormLabel>Additional Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please provide any additional details about the service you need" 
                      className="min-h-[100px] resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between mt-8">
              <Button 
                onClick={handleBackStep} 
                variant="outline"
                className="h-12 px-6 rounded-full"
              >
                Back
              </Button>
              <Button 
                onClick={form.handleSubmit(handleNextStep)}
                className="bg-brand-blue hover:bg-brand-blue/90 transition-all h-12 px-8 rounded-full"
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="animate-fade-in space-y-6">
            <h3 className="text-xl font-bold flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-brand-blue" /> Payment Method
            </h3>
            
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Payment Method</FormLabel>
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

            <div className="flex justify-between mt-8">
              <Button 
                onClick={handleBackStep} 
                variant="outline"
                className="h-12 px-6 rounded-full"
              >
                Back
              </Button>
              <Button 
                type="submit" 
                onClick={form.handleSubmit(onSubmit)}
                className="bg-brand-red hover:bg-brand-red/90 transition-all h-12 px-8 rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Book Service"}
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-blue to-brand-blue/90 text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjMUQzNTU3IiB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjgiLz48Y2lyY2xlIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1vcGFjaXR5PSIuMiIgY3g9IjE1NSIgY3k9IjQ1MCIgcj0iMTEzLjUiLz48Y2lyY2xlIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1vcGFjaXR5PSIuMiIgY3g9IjQ1MCIgY3k9IjMyMCIgcj0iMTEzLjUiLz48Y2lyY2xlIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1vcGFjaXR5PSIuMiIgY3g9IjExOTUiIGN5PSIxNDUiIHI9IjExMy41Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">Book Our Services</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Schedule a service appointment with our professional handyman team in Rawalpindi and Islamabad. We'll get back to you promptly to confirm your booking.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto">
          <Card className="max-w-4xl mx-auto backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden">
            <CardHeader className="bg-gray-50/80 dark:bg-gray-850/50 border-b border-gray-100 dark:border-gray-700 p-8">
              <CardTitle className="text-2xl md:text-3xl font-bold text-center">Request a Service</CardTitle>
              {renderProgressBar()}
            </CardHeader>
            
            <CardContent className="p-8">
              <Form {...form}>
                <form className="space-y-8">
                  {renderFormStep()}
                </form>
              </Form>
            </CardContent>
            
            <CardFooter className="bg-gray-50/80 dark:bg-gray-850/50 border-t border-gray-100 dark:border-gray-700 p-6 flex justify-center">
              <div className="text-center text-sm text-gray-500">
                <p>Need help? Call us at <a href="tel:+923125242182" className="font-semibold text-brand-blue">+92 312 5242182</a></p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Service Info */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">What to Expect</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="bg-brand-blue/10 dark:bg-brand-blue/20 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-brand-blue mx-auto mb-4">
                  <span>1</span>
                </div>
                <h3 className="font-bold text-lg mb-3">Submit Request</h3>
                <p className="text-gray-600 dark:text-gray-400">Complete the booking form with your service details and preferences.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="bg-brand-blue/10 dark:bg-brand-blue/20 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-brand-blue mx-auto mb-4">
                  <span>2</span>
                </div>
                <h3 className="font-bold text-lg mb-3">Confirmation</h3>
                <p className="text-gray-600 dark:text-gray-400">We'll contact you to confirm your appointment and provide a cost estimate.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="bg-brand-blue/10 dark:bg-brand-blue/20 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-brand-blue mx-auto mb-4">
                  <span>3</span>
                </div>
                <h3 className="font-bold text-lg mb-3">Service Visit</h3>
                <p className="text-gray-600 dark:text-gray-400">Our professional team arrives at your location to complete the work to your satisfaction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Booking;
