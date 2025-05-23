
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import AdminServices from "./pages/admin/Services";
import AdminBlog from "./pages/admin/Blog";
import AdminMedia from "./pages/admin/Media";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminBookings from "./pages/admin/Bookings";
import AdminCustomers from "./pages/admin/Customers";
import AdminSmartAdport from "./pages/admin/SmartAdport";
import AdminSettings from "./pages/admin/Settings";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <AdminAuthProvider>
              <div className="min-h-screen bg-background flex flex-col w-full">
                <ScrollToTop />
                
                <Routes>
                  {/* Admin Routes */}
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/admin/*" element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="services" element={<AdminServices />} />
                    <Route path="blog" element={<AdminBlog />} />
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
