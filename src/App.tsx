
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import AcBuyAndSale from "./pages/AcBuyAndSale";
import GetQuote from "./pages/GetQuote";
import AdminLogin from "./pages/Admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BlogAdminPage from "./pages/admin/Blog";
import ServicesAdminPage from "./pages/admin/Services";
import ModernHeader from "./components/ModernHeader";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/blogs" 
                  element={
                    <ProtectedRoute>
                      <BlogAdminPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/services" 
                  element={
                    <ProtectedRoute>
                      <ServicesAdminPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Public Routes */}
                <Route 
                  path="/*" 
                  element={
                    <>
                      <ModernHeader />
                      <main className="flex-1">
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/services" element={<Services />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/get-quote" element={<GetQuote />} />
                          <Route path="/blog" element={<Blog />} />
                          <Route path="/blog/:slug" element={<BlogDetail />} />
                          <Route path="/ac-buy-and-sale" element={<AcBuyAndSale />} />
                        </Routes>
                      </main>
                      <Footer />
                    </>
                  } 
                />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AdminAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
