
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  AirVent, 
  ShoppingBag, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Calendar,
  Users,
  Image
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar';

const AdminSidebar = () => {
  const { isOpen, toggle, close } = useSidebar();
  const location = useLocation();
  const { logout } = useAdminAuth();
  
  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { name: 'Services', href: '/admin/services', icon: AirVent },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Media', href: '/admin/media', icon: Image },
    { name: 'Blog', href: '/admin/blog', icon: FileText },
    { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={close}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen transition-transform bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700',
          'w-64',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <Link to="/admin/dashboard" className="flex items-center">
              <span className="text-xl font-bold">
                <span className="text-gray-900 dark:text-white">AC</span>
                <span className="text-brand-red">Admin</span>
              </span>
            </Link>
            <button 
              onClick={toggle}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 md:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActiveRoute = isActive(item.href);
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        'flex items-center p-3 rounded-lg transition-colors',
                        isActiveRoute
                          ? 'bg-brand-blue text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      )}
                    >
                      <item.icon className={cn(
                        'h-5 w-5 mr-3',
                        isActiveRoute ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                      )} />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
