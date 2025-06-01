
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AIChatAgent from "@/components/AIChatAgent";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import AcBuyAndSale from "./pages/AcBuyAndSale";

import AdminLayout from "./pages/admin/Admin";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import AdminServices from "./pages/admin/Services";
import AdminBlog from "./pages/admin/BlogPosts";
import AdminMedia from "./pages/admin/Media";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminBookings from "./pages/admin/Bookings";
import AdminCustomers from "./pages/admin/Customers";
import AdminSmartAdport from "./pages/admin/SmartAdport";
import AdminSettings from "./pages/admin/Settings";
import ProductsAdmin from "./pages/admin/Products";
import { useEffect, useState } from "react";

import "./App.css";

const queryClient = new QueryClient();

// Component to handle redirects from WhatsApp or direct URL access
const RedirectHandler = () => {
  const navigate = useNavigate();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    // Check if there's a stored redirect path
    const redirectPath = sessionStorage.getItem('redirectPath');
    
    if (redirectPath && !hasRedirected) {
      // Clear the stored path
      sessionStorage.removeItem('redirectPath');
      // Set flag to prevent infinite redirects
      setHasRedirected(true);
      // Navigate to the stored path
      navigate(redirectPath, { replace: true });
    }
  }, [navigate, hasRedirected]);

  return null;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <AdminAuthProvider>
              {/* Handle redirects from WhatsApp or direct URL access */}
              <RedirectHandler />
              
              <div className="min-h-screen bg-background flex flex-col w-full">
                <ScrollToTop />
                
                <Routes>
                  {/* Admin Login Route */}
                  <Route path="/admin" element={<Admin />} />
                  
                  {/* Protected Admin Routes */}
                  <Route path="/admin/*" element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="services" element={<AdminServices />} />
                    <Route path="products" element={<ProductsAdmin />} />
                    <Route path="blog-posts" element={<AdminBlog />} />
                    <Route path="media" element={<AdminMedia />} />
                    <Route path="testimonials" element={<AdminTestimonials />} />
                    <Route path="bookings" element={<AdminBookings />} />
                    <Route path="customers" element={<AdminCustomers />} />
                    <Route path="smart-adport" element={<AdminSmartAdport />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>

                  {/* Public Routes */}
                  <Route path="/*" element={
                    <>
                      <Header />
                      <main className="flex-grow w-full">
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/services" element={<Services />} />
                          <Route path="/services/:slug" element={<ServiceDetail />} />
                          <Route path="/blog" element={<Blog />} />
                          <Route path="/blog/:slug" element={<BlogPost />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/booking" element={<Booking />} />
                          <Route path="/ac-buy-and-sale" element={<AcBuyAndSale />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                      <Footer />
                      <WhatsAppButton />
                      <AIChatAgent />
                    </>
                  } />
                </Routes>
              </div>
            </AdminAuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
