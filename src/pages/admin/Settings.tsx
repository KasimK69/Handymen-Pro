
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { 
  Save, 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Database, 
  Shield, 
  Bell, 
  UserCog,
  Key,
  RefreshCw,
  Palette,
  Brush,
  Trash2,
  AlertTriangle,
  Copy,
  Download,
  Upload
} from 'lucide-react';

// Define form schema for validation
const generalFormSchema = z.object({
  siteName: z.string().min(2, { message: "Site name must be at least 2 characters." }),
  tagline: z.string().min(5, { message: "Tagline must be at least 5 characters." }),
  description: z.string().min(10, { message: "Description should be more detailed." }),
  maintenanceMode: z.boolean().default(false),
  siteLanguage: z.string(),
  timezone: z.string(),
  dateFormat: z.string(),
});

const contactFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(7, { message: "Please enter a valid phone number." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  whatsapp: z.string(),
  supportHours: z.string(),
  googleMapsEmbed: z.string(),
});

const Settings = () => {
  // State for the different settings sections
  const [activeBackupTab, setActiveBackupTab] = useState("automatic");
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [colorScheme, setColorScheme] = useState("system");
  const [emailProvider, setEmailProvider] = useState("smtp");
  const [lastBackupDate, setLastBackupDate] = useState("May 15, 2025 09:34 AM");
  const [backupSchedule, setBackupSchedule] = useState("daily");
  
  // Form hooks
  const generalForm = useForm({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      siteName: "AC Service & Repair",
      tagline: "Professional AC Services & Solutions",
      description: "Leading AC repair and maintenance services for homes and businesses",
      maintenanceMode: false,
      siteLanguage: "english",
      timezone: "Asia/Karachi",
      dateFormat: "MM/DD/YYYY",
    },
  });

  const contactForm = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "contact@acservice.com",
      phone: "+1 (555) 123-4567",
      address: "123 AC Street, Coolville, CA 90210",
      whatsapp: "+1 (555) 987-6543", 
      supportHours: "Mon-Fri 9AM-5PM",
      googleMapsEmbed: "<iframe src='https://www.google.com/maps/embed?...'></iframe>",
    },
  });

  // API Keys (simulated)
  const [apiKeys] = useState([
    { name: "Google Maps API", key: "AIza*************JKLM", status: "Active", lastUsed: "Today" },
    { name: "SMS Gateway", key: "sms_*************9876", status: "Active", lastUsed: "Yesterday" },
    { name: "Payment Gateway", key: "live_*************54321", status: "Active", lastUsed: "3 days ago" },
  ]);

  // Handle save functionality
  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setHasChanges(false);
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      });
    }, 800);
  };

  // Handle form changes
  const handleFormChange = () => {
    setHasChanges(true);
  };

  // Handle backup now
  const handleBackupNow = () => {
    setIsLoading(true);
    // Simulate backup process
    setTimeout(() => {
      setIsLoading(false);
      setLastBackupDate(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
      toast({
        title: "Backup created",
        description: "Your website data has been backed up successfully.",
      });
    }, 1500);
  };

  // Handle color scheme change
  const handleColorSchemeChange = (value: string) => {
    setColorScheme(value);
    setHasChanges(true);
  };

  // Handle email provider change
  const handleEmailProviderChange = (value: string) => {
    setEmailProvider(value);
    setHasChanges(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Action Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-1">
            <SettingsIcon className="h-8 w-8 text-brand-blue" />
            Website Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
            Configure your website's appearance, functionality, and system preferences. Changes will be applied site-wide.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {hasChanges && (
            <span className="text-sm text-amber-600 dark:text-amber-400 flex items-center">
              <AlertTriangle size={14} className="mr-1" />
              Unsaved changes
            </span>
          )}
          <Button 
            className="bg-brand-blue hover:bg-brand-blue/90" 
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Settings Area */}
      <Tabs defaultValue="general" className="w-full">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-1 mb-6 sticky top-0 z-10 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1">
            <TabsTrigger value="general" className="gap-1">
              <SettingsIcon size={16} />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-1">
              <Palette size={16} />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-1">
              <Mail size={16} />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="gap-1">
              <Database size={16} />
              <span className="hidden sm:inline">Advanced</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-1">
              <Shield size={16} />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-1">
              <Bell size={16} />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="backup" className="gap-1">
              <Download size={16} />
              <span className="hidden sm:inline">Backup</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="gap-1">
              <Key size={16} />
              <span className="hidden sm:inline">API Keys</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* General Settings Section */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-brand-blue" />
                General Settings
              </CardTitle>
              <CardDescription>
                Basic configuration for your AC service website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form onChange={handleFormChange} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={generalForm.control}
                      name="siteName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            This is the name displayed in the browser tab and across your site.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="tagline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tagline</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            A short slogan displayed under your website name.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={generalForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website Description</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Used for SEO and when sharing your site on social media.
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={generalForm.control}
                      name="siteLanguage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Language</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="urdu">Urdu</SelectItem>
                              <SelectItem value="arabic">Arabic</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="timezone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timezone</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Asia/Karachi">Pakistan (GMT+5)</SelectItem>
                              <SelectItem value="America/New_York">Eastern Time (GMT-4)</SelectItem>
                              <SelectItem value="UTC">UTC (GMT+0)</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="dateFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date Format</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row justify-between gap-4 mt-8 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                    <div>
                      <h3 className="text-lg font-medium text-amber-800 dark:text-amber-400">Maintenance Mode</h3>
                      <p className="text-sm text-amber-700 dark:text-amber-500">
                        When enabled, your website will display a maintenance message to visitors.
                        Administrators will still be able to access the site.
                      </p>
                    </div>
                    
                    <FormField
                      control={generalForm.control}
                      name="maintenanceMode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2 mt-2 md:mt-0">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer">
                            {field.value ? "Enabled" : "Disabled"}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings Section */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-brand-blue" />
                Appearance Settings
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Theme</h3>
                  <RadioGroup 
                    defaultValue={colorScheme}
                    onValueChange={handleColorSchemeChange}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light" className="flex items-center cursor-pointer">
                        <Sun className="h-5 w-5 mr-2 text-amber-500" />
                        Light Mode
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark" className="flex items-center cursor-pointer">
                        <Moon className="h-5 w-5 mr-2 text-indigo-400" />
                        Dark Mode
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system" className="flex items-center cursor-pointer">
                        <div className="relative mr-2">
                          <Sun className="h-5 w-5 text-amber-500 absolute opacity-50" />
                          <Moon className="h-5 w-5 text-indigo-400 ml-1 opacity-50" />
                        </div>
                        System Default
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Brand Colors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input id="primary-color" type="text" defaultValue="#0077CC" />
                        <div className="w-10 h-10 rounded bg-brand-blue border border-gray-200 dark:border-gray-800" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="secondary-color">Secondary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input id="secondary-color" type="text" defaultValue="#FF5733" />
                        <div className="w-10 h-10 rounded bg-red-500 border border-gray-200 dark:border-gray-800" />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Theme Settings</h3>
                    <Button variant="outline" size="sm">
                      <Brush className="mr-2 h-4 w-4" />
                      Customize Theme
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between border rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <div className="w-16 h-16 rounded bg-gradient-to-r from-blue-500 to-purple-500 shrink-0"></div>
                        <div>
                          <h4 className="font-medium">Modern</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Clean, minimalist design
                          </p>
                        </div>
                      </div>
                      <div>
                        <Switch checked={true} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between border rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <div className="w-16 h-16 rounded bg-gradient-to-r from-green-500 to-teal-500 shrink-0"></div>
                        <div>
                          <h4 className="font-medium">Eco</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Nature-inspired theme
                          </p>
                        </div>
                      </div>
                      <div>
                        <Switch checked={false} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between border rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <div className="w-16 h-16 rounded bg-gradient-to-r from-amber-500 to-red-500 shrink-0"></div>
                        <div>
                          <h4 className="font-medium">Bold</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            High-contrast design
                          </p>
                        </div>
                      </div>
                      <div>
                        <Switch checked={false} />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Homepage Layout</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 hover:border-brand-blue cursor-pointer transition-all">
                      <div className="bg-gray-100 dark:bg-gray-800 h-32 rounded-md mb-3 p-2 flex flex-col space-y-2">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                        <div className="flex-1 grid grid-cols-2 gap-2">
                          <div className="bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="bg-gray-300 dark:bg-gray-600 rounded"></div>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-center">Two Column</p>
                    </div>

                    <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20 border-brand-blue cursor-pointer transition-all">
                      <div className="bg-gray-100 dark:bg-gray-800 h-32 rounded-md mb-3 p-2 flex flex-col space-y-2">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                        <div className="flex-1 grid grid-cols-3 gap-2">
                          <div className="bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="bg-gray-300 dark:bg-gray-600 rounded"></div>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-center">Three Column</p>
                    </div>

                    <div className="border rounded-lg p-4 hover:border-brand-blue cursor-pointer transition-all">
                      <div className="bg-gray-100 dark:bg-gray-800 h-32 rounded-md mb-3 p-2 flex flex-col space-y-2">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                        <div className="flex-1 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                      </div>
                      <p className="text-sm font-medium text-center">Full Width</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-brand-blue" />
                Footer Customization
              </CardTitle>
              <CardDescription>
                Configure the footer section of your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="footer-text">Copyright Text</Label>
                  <Input id="footer-text" defaultValue="© 2025 AC Service & Repair. All rights reserved." />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="display-social" defaultChecked={true} />
                  <Label htmlFor="display-social">Display Social Media Links</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="display-payment" defaultChecked={true} />
                  <Label htmlFor="display-payment">Display Payment Methods</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Information Section */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-brand-blue" />
                Contact Information
              </CardTitle>
              <CardDescription>
                Your business contact details shown on the website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...contactForm}>
                <form onChange={handleFormChange} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={contactForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={contactForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={contactForm.control}
                      name="whatsapp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>WhatsApp Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={contactForm.control}
                      name="supportHours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Support Hours</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={contactForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={contactForm.control}
                    name="googleMapsEmbed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Maps Embed Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Paste the HTML embed code from Google Maps to display your location.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-brand-blue" />
                Email Configuration
              </CardTitle>
              <CardDescription>
                Configure how emails are sent from your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Email Provider</h3>
                  <RadioGroup 
                    defaultValue={emailProvider}
                    onValueChange={handleEmailProviderChange}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="smtp" id="smtp" />
                      <Label htmlFor="smtp" className="cursor-pointer">
                        SMTP Server
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sendgrid" id="sendgrid" />
                      <Label htmlFor="sendgrid" className="cursor-pointer">
                        SendGrid
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mailchimp" id="mailchimp" />
                      <Label htmlFor="mailchimp" className="cursor-pointer">
                        Mailchimp
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {emailProvider === 'smtp' && (
                  <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="smtp-host">SMTP Host</Label>
                        <Input id="smtp-host" placeholder="smtp.example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="smtp-port">SMTP Port</Label>
                        <Input id="smtp-port" type="number" placeholder="587" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="smtp-username">Username</Label>
                        <Input id="smtp-username" placeholder="username@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="smtp-password">Password</Label>
                        <Input id="smtp-password" type="password" placeholder="•••••••••••••" />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="smtp-ssl" defaultChecked />
                      <Label htmlFor="smtp-ssl">Use SSL/TLS encryption</Label>
                    </div>
                  </div>
                )}

                {emailProvider === 'sendgrid' && (
                  <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border">
                    <div className="space-y-2">
                      <Label htmlFor="sendgrid-key">SendGrid API Key</Label>
                      <Input id="sendgrid-key" type="password" placeholder="SG.••••••••••••••••••••••••••" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sendgrid-sender">Sender Email</Label>
                      <Input id="sendgrid-sender" placeholder="contact@acservice.com" />
                    </div>
                  </div>
                )}

                {emailProvider === 'mailchimp' && (
                  <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border">
                    <div className="space-y-2">
                      <Label htmlFor="mailchimp-key">Mailchimp API Key</Label>
                      <Input id="mailchimp-key" type="password" placeholder="••••••••••••••••••••••••••" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mailchimp-server">Server Prefix</Label>
                      <Input id="mailchimp-server" placeholder="us1" />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email-template">Email Template</Label>
                  <Select defaultValue="template1">
                    <SelectTrigger id="email-template">
                      <SelectValue placeholder="Select email template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="template1">Modern Blue</SelectItem>
                      <SelectItem value="template2">Minimal White</SelectItem>
                      <SelectItem value="template3">Professional Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Button variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Test Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings Section */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-brand-blue" />
                Advanced Settings
              </CardTitle>
              <CardDescription>
                Additional configuration options for your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="font-medium">Page Caching</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Enable caching to improve page loading speed
                    </p>
                  </div>
                  <div>
                    <Switch id="cache" defaultChecked />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="font-medium">Google Analytics</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Track visitors and site performance
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 sm:items-end">
                    <Switch id="analytics" defaultChecked />
                    <Input 
                      id="analytics-id" 
                      defaultValue="UA-123456789-1" 
                      className="w-full sm:w-48"
                      placeholder="UA-XXXXXXXXX-X" 
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="font-medium">Testimonials Display</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Show testimonials on the homepage
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 sm:items-end">
                    <Switch id="testimonials" defaultChecked />
                    <Select defaultValue="slider">
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Display format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slider">Slider (Carousel)</SelectItem>
                        <SelectItem value="grid">Grid Layout</SelectItem>
                        <SelectItem value="cards">Card Layout</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="font-medium">CDN Integration</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Content delivery network for faster loading
                    </p>
                  </div>
                  <div>
                    <Switch id="cdn" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="font-medium">GDPR Cookie Consent</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Display cookie consent banner for EU users
                    </p>
                  </div>
                  <div>
                    <Switch id="cookie-consent" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                These actions can have permanent consequences
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-lg border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="font-medium text-red-700 dark:text-red-400">Reset All Settings</h3>
                    <p className="text-sm text-red-600 dark:text-red-400/70">
                      Reset all website settings to default values
                    </p>
                  </div>
                  <div>
                    <Button variant="destructive" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reset Settings
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-lg border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="font-medium text-red-700 dark:text-red-400">Clear Cache & Data</h3>
                    <p className="text-sm text-red-600 dark:text-red-400/70">
                      Clear all cached data and temporary files
                    </p>
                  </div>
                  <div>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear Cache
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Section */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-brand-blue" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security options for your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Login Security</h3>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-lg border">
                    <div className="mb-3 sm:mb-0">
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Require 2FA for all admin accounts
                      </p>
                    </div>
                    <div>
                      <Switch id="two-factor" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-lg border">
                    <div className="mb-3 sm:mb-0">
                      <h4 className="font-medium">Login Rate Limiting</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Block repeated login attempts
                      </p>
                    </div>
                    <div>
                      <Switch id="rate-limit" defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Automatically log out after inactivity
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password Policy</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="min-length">Minimum Length</Label>
                      <Input id="min-length" type="number" defaultValue="8" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="max-age">Maximum Age (days)</Label>
                      <Input id="max-age" type="number" defaultValue="90" />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="require-lowercase" defaultChecked />
                    <Label htmlFor="require-lowercase">Require lowercase letters</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="require-uppercase" defaultChecked />
                    <Label htmlFor="require-uppercase">Require uppercase letters</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="require-number" defaultChecked />
                    <Label htmlFor="require-number">Require numbers</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="require-special" defaultChecked />
                    <Label htmlFor="require-special">Require special characters</Label>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Security Headers</h3>
                    <Button variant="outline" size="sm">
                      Test Security
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="content-security" defaultChecked />
                    <Label htmlFor="content-security">
                      Content Security Policy (CSP)
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="xss-protection" defaultChecked />
                    <Label htmlFor="xss-protection">
                      Cross-Site Scripting (XSS) Protection
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="frame-options" defaultChecked />
                    <Label htmlFor="frame-options">
                      X-Frame-Options (Clickjacking Protection)
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="hsts" defaultChecked />
                    <Label htmlFor="hsts">
                      HTTP Strict Transport Security (HSTS)
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Section */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-brand-blue" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure when and how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h4 className="font-medium">New Booking</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        When a customer makes a new booking
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h4 className="font-medium">Contact Form Submission</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        When a visitor submits the contact form
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h4 className="font-medium">Customer Reviews</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        When a customer leaves a review
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h4 className="font-medium">Security Alerts</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Login attempts and security warnings
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">SMS Notifications</h3>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h4 className="font-medium">Urgent Bookings</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Bookings marked as urgent or emergency
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h4 className="font-medium">Same-Day Appointments</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Bookings scheduled for today
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div>
                    <div className="space-y-2">
                      <Label htmlFor="phone-recipients">SMS Recipients</Label>
                      <Input id="phone-recipients" placeholder="+1234567890, +9876543210" />
                      <p className="text-xs text-gray-500">
                        Comma-separated list of phone numbers
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Browser Notifications</h3>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h4 className="font-medium">Enable Browser Notifications</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive notifications in your browser
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup & Restore Section */}
        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-brand-blue" />
                Backup & Restore
              </CardTitle>
              <CardDescription>
                Manage website data backups and restoration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium text-blue-700 dark:text-blue-400 mb-1">Last Backup</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-500">
                        {lastBackupDate}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={handleBackupNow}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Backing up...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Backup Now
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Backup Schedule</h3>
                  
                  <div className="border rounded-lg">
                    <div className="grid grid-cols-2">
                      <button 
                        className={`py-2 px-4 text-center font-medium text-sm ${activeBackupTab === 'automatic' 
                          ? 'bg-brand-blue text-white' 
                          : 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800'}`} 
                        onClick={() => setActiveBackupTab('automatic')}
                      >
                        Automatic
                      </button>
                      <button 
                        className={`py-2 px-4 text-center font-medium text-sm ${activeBackupTab === 'manual' 
                          ? 'bg-brand-blue text-white' 
                          : 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800'}`} 
                        onClick={() => setActiveBackupTab('manual')}
                      >
                        Manual
                      </button>
                    </div>
                    
                    <div className="p-4">
                      {activeBackupTab === 'automatic' && (
                        <div className="space-y-4">
                          <p className="text-sm">Choose how often your website should be automatically backed up.</p>
                          
                          <RadioGroup 
                            defaultValue={backupSchedule}
                            onValueChange={setBackupSchedule}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="daily" id="daily" />
                              <Label htmlFor="daily">Daily</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="weekly" id="weekly" />
                              <Label htmlFor="weekly">Weekly</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="monthly" id="monthly" />
                              <Label htmlFor="monthly">Monthly</Label>
                            </div>
                          </RadioGroup>
                          
                          <div className="space-y-2">
                            <Label htmlFor="retention">Retention Period (days)</Label>
                            <Input id="retention" type="number" defaultValue="30" />
                            <p className="text-xs text-gray-500">
                              How long to keep automatic backups before deleting them
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {activeBackupTab === 'manual' && (
                        <div className="space-y-4">
                          <p className="text-sm">Download or restore from manually created backups.</p>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" className="w-full">
                              <Download className="mr-2 h-4 w-4" />
                              Download Backup
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Upload className="mr-2 h-4 w-4" />
                              Upload & Restore
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Recent Backups</h3>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>May 15, 2025 09:34 AM</TableCell>
                          <TableCell>24.3 MB</TableCell>
                          <TableCell>Automatic</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <Download size={14} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <RefreshCw size={14} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>May 14, 2025 09:32 AM</TableCell>
                          <TableCell>24.1 MB</TableCell>
                          <TableCell>Automatic</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <Download size={14} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <RefreshCw size={14} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>May 10, 2025 02:15 PM</TableCell>
                          <TableCell>23.8 MB</TableCell>
                          <TableCell>Manual</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <Download size={14} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <RefreshCw size={14} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Section */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-brand-blue" />
                API Keys
              </CardTitle>
              <CardDescription>
                Manage API keys for third-party integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>API Name</TableHead>
                        <TableHead>Key</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Used</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apiKeys.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{item.key}</span>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Copy size={14} />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                              {item.status}
                            </span>
                          </TableCell>
                          <TableCell>{item.lastUsed}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <RefreshCw size={14} className="mr-1" /> Regenerate
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Button variant="outline">
                  <Key className="mr-2 h-4 w-4" />
                  Add New API Key
                </Button>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border">
                  <h3 className="text-md font-medium mb-2">API Documentation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Learn how to integrate your website with other services using our API.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        View Documentation
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        API Status
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
