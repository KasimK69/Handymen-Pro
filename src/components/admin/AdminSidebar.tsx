
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton,
  SidebarMenuItem, SidebarRail
} from '@/components/ui/sidebar';
import {
  Home,
  Settings,
  Package,
  FileEdit,
  MessageSquare,
  ShoppingCart,
  Users,
  CreditCard,
  Calendar,
  Gauge,
  Award
} from 'lucide-react';

const AdminSidebar = () => {
  return (
    <Sidebar className="fixed inset-y-0 left-0 z-50 w-64">
      <SidebarContent>
        <div className="px-4 py-8">
          <h2 className="text-2xl font-bold text-center">AC Service Admin</h2>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavLink to="/admin/dashboard" className="w-full">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive} tooltip="Dashboard">
                      <Home /> Dashboard
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/admin/services" className="w-full">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive} tooltip="Services">
                      <Settings /> Services
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/admin/products" className="w-full">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive} tooltip="AC Products">
                      <Package /> AC Products
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/admin/smart-adport" className="w-full">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive} tooltip="Smart Adport">
                      <Award /> Smart Adport
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/admin/testimonials" className="w-full">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive} tooltip="Testimonials">
                      <MessageSquare /> Testimonials
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/admin/blog" className="w-full">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive} tooltip="Blog Posts">
                      <FileEdit /> Blog Posts
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavLink to="/admin/bookings" className="w-full">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive} tooltip="Bookings">
                      <Calendar /> Bookings
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/admin/orders" className="w-full">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive} tooltip="Orders">
                      <ShoppingCart /> Orders
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/admin/customers" className="w-full">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive} tooltip="Customers">
                      <Users /> Customers
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/admin/payments" className="w-full">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive} tooltip="Payments">
                      <CreditCard /> Payments
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavLink to="/admin/settings" className="w-full">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive} tooltip="Settings">
                      <Settings /> Website Settings
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default AdminSidebar;
