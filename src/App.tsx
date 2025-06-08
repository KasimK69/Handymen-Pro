
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Index';
import About from '@/pages/About';
import Services from '@/pages/Services';
import AcBuyAndSale from '@/pages/AcBuyAndSale';
import Blogs from '@/pages/Blogs';
import BlogDetail from '@/pages/BlogDetail';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';
import ServiceDetail from '@/pages/ServiceDetail';
import Admin from '@/pages/Admin';
import Dashboard from '@/pages/admin/Dashboard';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminBlogs from '@/pages/admin/AdminBlogs';
import AdminServices from '@/pages/admin/Services';
import GetQuote from '@/pages/GetQuote';

function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/ac-buy-and-sale" element={<AcBuyAndSale />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:slug" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/get-quote" element={<GetQuote />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/login" element={<Admin />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/blogs" element={<AdminBlogs />} />
              <Route path="/admin/services" element={<AdminServices />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </AdminAuthProvider>
  );
}

export default App;
