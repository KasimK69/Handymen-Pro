
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Cart = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Service Request</h1>
        
        <Card className="shadow-lg border-none bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl">No Active Service Requests</CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <div className="mb-8">
              <div className="mx-auto rounded-full bg-blue-100 p-4 w-20 h-20 flex items-center justify-center mb-4 dark:bg-blue-900">
                <Calendar className="h-10 w-10 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">You have no pending service requests</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Request an AC service, repair, or installation to get started with our professional service.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button asChild className="bg-brand-blue hover:bg-brand-blue/90">
                  <Link to="/booking">
                    Schedule a Service
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/services">
                    View Services
                  </Link>
                </Button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Need immediate assistance?</p>
                <Button variant="outline" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Us
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <Button variant="ghost" asChild>
            <Link to="/" className="flex items-center text-gray-500">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
