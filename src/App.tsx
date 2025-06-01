
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from "./integrations/supabase/client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AcBuyAndSale from "./pages/AcBuyAndSale";
import Contact from "./pages/Contact";
import GetQuote from "./pages/GetQuote";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminServices from "./pages/admin/Services";
import ProductsAdmin from "./pages/admin/ProductsAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionContextProvider supabaseClient={supabase}>
      <AdminAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/blogs" element={<AdminBlogs />} />
              <Route path="/admin/services" element={<AdminServices />} />
              <Route path="/admin/products" element={<ProductsAdmin />} />
              
              {/* Main Routes */}
              <Route path="/*" element={
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/services/:slug" element={<ServiceDetail />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:slug" element={<BlogPost />} />
                      <Route path="/ac-buy-and-sale" element={<AcBuyAndSale />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/get-quote" element={<GetQuote />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              } />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AdminAuthProvider>
    </SessionContextProvider>
  </QueryClientProvider>
);

export default App;
