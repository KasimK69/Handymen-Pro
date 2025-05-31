import React from 'react';
import { Outlet, NavLink, useLocation, Navigate } from 'react-router-dom';
import { Package, BookOpen, Settings, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AirVent } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const isAuthenticated = true; // In a real app, this would come from an auth context

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { path: '/admin/products', label: 'Products', icon: <Package className="h-5 w-5" /> },
    { path: '/admin/blog-posts', label: 'Blog Posts', icon: <BookOpen className="h-5 w-5" /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-brand-blue to-brand-red rounded-full flex items-center justify-center shadow-lg">
              <AirVent className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                <span className="text-brand-blue">AC</span>
                <span className="text-brand-red">Services</span>
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-brand-blue text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </NavLink>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button asChild variant="outline" className="w-full justify-start">
            <NavLink to="/" className="flex items-center">
              <Home className="h-5 w-5 mr-3" />
              Back to Website
            </NavLink>
          </Button>
          <Button variant="ghost" className="w-full justify-start mt-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
