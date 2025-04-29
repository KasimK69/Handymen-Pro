
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AcBuyAndSale from "./pages/AcBuyAndSale";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

// Admin pages
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { CartProvider } from "./context/CartContext";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import ServicesAdmin from "./pages/admin/Services";
import ProductsAdmin from "./pages/admin/Products";
import OrdersAdmin from "./pages/admin/Orders";
import BlogAdmin from "./pages/admin/Blog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <AdminAuthProvider>
            <Routes>
              {/* Public Routes with Header and Footer */}
              <Route
                path="/"
                element={
                  <>
                    <Header />
                    <main className="min-h-screen pt-16">
                      <Routes>
                        <Route index element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="services" element={<Services />} />
                        <Route path="services/:slug" element={<ServiceDetail />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="booking" element={<Booking />} />
                        <Route path="blog" element={<Blog />} />
                        <Route path="blog/:slug" element={<BlogPost />} />
                        <Route path="ac-buy-and-sale" element={<AcBuyAndSale />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="checkout" element={<Checkout />} />
                      </Routes>
                    </main>
                    <Footer />
                    <WhatsAppButton />
                    <ScrollToTop />
                  </>
                }
              />

              {/* Admin Login (no layout) */}
              <Route path="/admin" element={<Admin />} />

              {/* Admin Routes with Admin Layout */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="services" element={<ServicesAdmin />} />
                <Route path="products" element={<ProductsAdmin />} />
                <Route path="orders" element={<OrdersAdmin />} />
                <Route path="blog" element={<BlogAdmin />} />
                {/* Additional admin routes will be added here */}
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdminAuthProvider>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
