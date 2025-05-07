
import React from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarFooter } from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  FileText, 
  ShoppingBag, 
  Calendar, 
  CreditCard,
  MessageSquare,
  LogOut,
  Image
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active: boolean;
}

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const sidebarItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', to: '/admin/dashboard' },
    { icon: <ShoppingBag size={20} />, label: 'Services', to: '/admin/services' },
    { icon: <FileText size={20} />, label: 'Blog Posts', to: '/admin/blog' },
    { icon: <Calendar size={20} />, label: 'Bookings', to: '/admin/bookings' },
    { icon: <Users size={20} />, label: 'Customers', to: '/admin/customers' },
    { icon: <CreditCard size={20} />, label: 'Payments', to: '/admin/payments' },
    { icon: <Image size={20} />, label: 'Media', to: '/admin/media' },
    { icon: <MessageSquare size={20} />, label: 'Messages', to: '/admin/messages' },
    { icon: <Settings size={20} />, label: 'Settings', to: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="w-64 h-full border-r bg-white dark:bg-gray-900">
        <SidebarHeader className="h-14 flex items-center px-6 border-b">
          <Link to="/admin/dashboard" className="font-bold text-xl">
            <span>AC</span>
            <span className="text-brand-red">Admin</span>
          </Link>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            {sidebarItems.map((item) => (
              <SidebarItem 
                key={item.to}
                icon={item.icon}
                label={item.label}
                to={item.to}
                active={currentPath === item.to}
              />
            ))}
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter className="p-4 border-t">
          <Button 
            variant="outline" 
            className="w-full justify-start text-gray-500 hover:text-red-500"
            asChild
          >
            <Link to="/admin">
              <LogOut size={18} className="mr-2" />
              Sign Out
            </Link>
          </Button>
        </SidebarFooter>
      </Sidebar>
      
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-800">
        {children}
      </main>
    </div>
  );
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, active }) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-6 py-3 text-sm ${
        active 
        ? "bg-gray-100 dark:bg-gray-800 text-brand-blue font-medium border-l-4 border-brand-blue" 
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </Link>
  );
};

export default DashboardLayout;
