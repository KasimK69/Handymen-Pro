
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { SidebarProvider } from '@/components/ui/sidebar';

const AdminLayout = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <AdminSidebar />
        <div className="flex flex-col min-h-screen ml-0 md:ml-64 transition-all">
          <AdminHeader />
          <main className="flex-1 p-4 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
