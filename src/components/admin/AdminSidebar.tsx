
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Settings,
  Package,
  FileText,
  MessageSquare,
  CalendarCheck,
  Users,
  Image,
  PanelLeft,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminSidebar = () => {
  const { open, setOpen, toggleSidebar } = useSidebar();

  const links = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Services', path: '/admin/services', icon: Package },
    { name: 'Blog', path: '/admin/blog', icon: FileText },
    { name: 'Media', path: '/admin/media', icon: Image },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
    { name: 'Bookings', path: '/admin/bookings', icon: CalendarCheck },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Smart Adport', path: '/admin/smart-adport', icon: Bell },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-30 h-screen w-64 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 transition-transform duration-300",
      open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    )}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-brand-blue">AC Services Admin</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleSidebar}
          >
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-gray-100 text-brand-blue font-medium dark:bg-gray-700 dark:text-gray-100"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                  )}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setOpen(false);
                    }
                  }}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2023 AC Services Admin
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
