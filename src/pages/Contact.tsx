
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  });

  function onSubmit(data: ContactFormValues) {
    console.log(data);
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-blue text-white py-24 md:py-32">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Have questions or need a quote? Reach out to our team and we'll get back to you promptly.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
              
              <div className="space-y-8">
                <ContactInfo 
                  icon={<Phone className="h-6 w-6 text-brand-red" />}
                  title="Phone"
                  content={<a href="tel:+15551234567" className="hover:text-brand-red transition-colors">+1 (555) 123-4567</a>}
                />
                
                <ContactInfo 
                  icon={<Mail className="h-6 w-6 text-brand-red" />}
                  title="Email"
                  content={<a href="mailto:info@prohandyman.com" className="hover:text-brand-red transition-colors">info@prohandyman.com</a>}
                />
                
                <ContactInfo 
                  icon={<MapPin className="h-6 w-6 text-brand-red" />}
                  title="Address"
                  content={<>123 Service Street,<br />Islamabad, Pakistan</>}
                />
                
                <ContactInfo 
                  icon={<Clock className="h-6 w-6 text-brand-red" />}
                  title="Working Hours"
                  content={<>Monday-Friday: 8am-6pm<br />Saturday: 9am-4pm<br />Sunday: Closed</>}
                />
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
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
                            <Input type="email" placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Message subject" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto bg-brand-red hover:bg-brand-red/90"
                  >
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Location</h2>
          <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
            {/* This would be replaced with an actual map integration in a real project */}
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-lg">Map of Islamabad/Rawalpindi Service Area</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ContactInfo = ({ 
  icon, 
  title, 
  content 
}: { 
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) => (
  <div className="flex">
    <div className="mr-4 shrink-0">{icon}</div>
    <div>
      <h3 className="font-bold mb-1">{title}</h3>
      <div className="text-gray-600 dark:text-gray-400">{content}</div>
    </div>
  </div>
);

export default Contact;
