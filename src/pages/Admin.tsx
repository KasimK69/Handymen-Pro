
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Admin = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-24">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
            Please log in to access the admin dashboard.
          </p>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-3 border rounded-md"
                placeholder="admin@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full p-3 border rounded-md"
                placeholder="••••••••"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 mr-2"
                />
                <label htmlFor="remember" className="text-sm">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-brand-red hover:underline">
                Forgot password?
              </a>
            </div>
            
            <Button className="w-full bg-brand-blue hover:bg-brand-blue/90">
              Sign In
            </Button>
          </form>
          
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Need help? <Link to="/contact" className="text-brand-red hover:underline">Contact support</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Admin;
