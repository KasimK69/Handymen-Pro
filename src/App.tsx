
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import QuickActionsButton from "./components/QuickActionsButton";
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
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

// Admin pages
import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import ServicesAdmin from "./pages/admin/Services";
import ProductsAdmin from "./pages/admin/Products";
import BlogAdmin from "./pages/admin/Blog";
import Testimonials from "./pages/admin/Testimonials";
import SmartAdport from "./pages/admin/SmartAdport";
import Settings from "./pages/admin/Settings";
import Bookings from "./pages/admin/Bookings";
import Customers from "./pages/admin/Customers";
import Media from "./pages/admin/Media";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <AdminAuthProvider>
          <Toaster />
          <Sonner />
          <ScrollToTop />
          <Routes>
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
              <Route path="blog" element={<BlogAdmin />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="smart-adport" element={<SmartAdport />} />
              <Route path="settings" element={<Settings />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="customers" element={<Customers />} />
              <Route path="media" element={<Media />} />
            </Route>

            {/* Public Routes with Header and Footer */}
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <main className="min-h-screen pt-16">
                    <Home />
                  </main>
                  <Footer />
                  <WhatsAppButton />
                  <QuickActionsButton />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <Header />
                  <main className="min-h-screen pt-16">
                    <About />
                  </main>
                  <Footer />
                  <WhatsAppButton />
                </>
              }
            />
            <Route
              path="/services"
              element={
                <>
                  <Header />
                  <main className="min-h-screen pt-16">
                    <Services />
                  </main>
                  <Footer />
                  <WhatsAppButton />
                </>
              }
            />
            <Route
              path="/services/:slug"
              element={
                <>
                  <Header />
                  <main className="min-h-screen pt-16">
                    <ServiceDetail />
                  </main>
                  <Footer />
                  <WhatsAppButton />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <Header />
                  <main className="min-h-screen pt-16">
                    <Contact />
                  </main>
                  <Footer />
                  <WhatsAppButton />
                </>
              }
            />
            <Route
              path="/booking"
              element={
                <>
                  <Header />
                  <main className="min-h-screen pt-16">
                    <Booking />
                  </main>
                  <Footer />
                  <WhatsAppButton />
                </>
              }
            />
            <Route
              path="/blog"
              element={
                <>
                  <Header />
                  <main className="min-h-screen pt-16">
                    <Blog />
                  </main>
                  <Footer />
                  <WhatsAppButton />
                </>
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <>
                  <Header />
                  <main className="min-h-screen pt-16">
                    <BlogPost />
                  </main>
                  <Footer />
                  <WhatsAppButton />
                </>
              }
            />
            <Route
              path="/ac-buy-and-sale"
              element={
                <>
                  <Header />
                  <main className="min-h-screen pt-16">
                    <AcBuyAndSale />
                  </main>
                  <Footer />
                  <WhatsAppButton />
                </>
              }
            />
            <Route
              path="/ac-sale"
              element={
                <>
                  <Header />
                  <main className="min-h-screen pt-16">
                    <AcBuyAndSale />
                  </main>
                  <Footer />
                  <WhatsAppButton />
                </>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AdminAuthProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
