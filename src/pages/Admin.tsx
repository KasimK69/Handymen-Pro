
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Loader2, Lock, AirVent } from 'lucide-react';
import { motion } from 'framer-motion';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoading, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-2 bg-gradient-to-r from-brand-blue to-brand-red"></div>
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-brand-blue/10 rounded-full mb-4">
                <AirVent className="h-8 w-8 text-brand-blue" />
              </div>
              <h1 className="text-2xl font-bold inline-flex items-center justify-center">
                <span className="mr-2 text-gray-900 dark:text-gray-100">AC</span>
                <span className="text-brand-red">Admin</span>
              </h1>
              <div className="h-1 w-12 bg-brand-red mx-auto mt-2"></div>
            </div>
            
            <h2 className="text-2xl font-bold mb-2 text-center">Admin Login</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
              Please log in to access the AC Services admin dashboard.
            </p>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  disabled={isLoading}
                  required
                  className="border-gray-300"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                  required
                  className="border-gray-300"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 mr-2 text-brand-blue focus:ring-brand-blue"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember" className="text-sm">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-brand-red hover:underline">
                  Forgot password?
                </a>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-brand-blue hover:bg-brand-blue/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-6">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Demo credentials: admin@example.com / admin123
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Admin;
