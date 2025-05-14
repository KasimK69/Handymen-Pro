
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, Tag, ArrowRight, Filter, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

// Mock blog data
const blogPosts = [
  {
    id: '1',
    slug: 'home-maintenance-checklist',
    title: 'Ultimate Home Maintenance Checklist for Every Season',
    excerpt: 'Keep your home in top condition year-round with this comprehensive seasonal maintenance checklist.',
    date: 'April 15, 2023',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Maintenance',
    author: 'Ahmed Khan',
    readTime: '5 min read'
  },
  {
    id: '2',
    slug: 'diy-plumbing-tips',
    title: '5 DIY Plumbing Tips Every Homeowner Should Know',
    excerpt: 'Learn simple plumbing techniques to handle common issues before calling a professional.',
    date: 'March 22, 2023',
    image: 'https://images.unsplash.com/photo-1558618666-176827a41dec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Plumbing',
    author: 'Sara Mahmood',
    readTime: '4 min read'
  },
  {
    id: '3',
    slug: 'energy-saving-home',
    title: 'Energy-Saving Tips for a More Efficient Home',
    excerpt: 'Practical ways to reduce your energy consumption and save money on utility bills.',
    date: 'February 10, 2023',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Energy Efficiency',
    author: 'Malik Hassan',
    readTime: '7 min read'
  },
  {
    id: '4',
    slug: 'kitchen-renovation-guide',
    title: 'Complete Guide to Kitchen Renovation on a Budget',
    excerpt: 'Transform your kitchen without breaking the bank with these smart renovation strategies.',
    date: 'January 5, 2023',
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Renovation',
    author: 'Fatima Ali',
    readTime: '10 min read'
  },
  {
    id: '5',
    slug: 'ac-maintenance-tips',
    title: 'Essential AC Maintenance Tips for Summer',
    excerpt: 'Keep your air conditioner running efficiently during the hot summer months with these maintenance tips.',
    date: 'December 12, 2022',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'AC',
    author: 'Ahmed Khan',
    readTime: '6 min read'
  },
  {
    id: '6',
    slug: 'bathroom-upgrade-ideas',
    title: 'Simple Bathroom Upgrade Ideas That Make a Big Impact',
    excerpt: 'Transform your bathroom with these simple upgrades that don\'t require a full renovation.',
    date: 'November 8, 2022',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Renovation',
    author: 'Sara Mahmood',
    readTime: '8 min read'
  }
];

const categories = [
  'All Categories',
  'Maintenance',
  'Plumbing',
  'Energy Efficiency',
  'Renovation',
  'AC',
  'DIY'
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [viewType, setViewType] = useState('grid');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll effect for the hero section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-blue to-blue-700 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-brand-blue to-blue-700 opacity-90"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1527092035324-6f06428eda6d?auto=format&fit=crop&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mixBlendMode: 'overlay'
            }}
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="container relative z-10 mx-auto px-4"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="inline-block">
                AC Service
                <div className="h-1 bg-white rounded mt-1"></div>
              </span>
              {' '}
              <span className="text-blue-200">Blog</span>
            </h1>
            <p className="text-xl opacity-90 leading-relaxed max-w-xl mx-auto">
              Expert advice, tips, and insights for all your air conditioning needs and home maintenance.
            </p>
          </div>
        </motion.div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,218.7C960,235,1056,245,1152,229.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          </svg>
        </div>
      </section>

      {/* Search & Filter */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className={`py-8 sticky top-16 z-20 bg-white dark:bg-gray-900 border-b transition-shadow ${isScrolled ? 'shadow-lg' : ''}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center max-w-5xl mx-auto">
            <div className="w-full md:max-w-xs relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Select 
                value={selectedCategory} 
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Tabs defaultValue={viewType} onValueChange={(value) => setViewType(value)} className="hidden md:block">
                <TabsList>
                  <TabsTrigger value="grid" className="data-[state=active]:bg-blue-50 data-[state=active]:text-brand-blue dark:data-[state=active]:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>
                  </TabsTrigger>
                  <TabsTrigger value="list" className="data-[state=active]:bg-blue-50 data-[state=active]:text-brand-blue dark:data-[state=active]:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="max-w-6xl mx-auto"
            >
              <div className="flex items-center mb-8">
                <h2 className="text-2xl font-bold">Featured Article</h2>
                <div className="h-px bg-gray-200 flex-grow ml-4"></div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="md:col-span-3 h-full">
                    <Link to={`/blog/${filteredPosts[0].slug}`} className="block h-full">
                      <AspectRatio ratio={16/9} className="h-full">
                        <img 
                          src={filteredPosts[0].image} 
                          alt={filteredPosts[0].title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </AspectRatio>
                    </Link>
                  </div>
                  <div className="md:col-span-2 flex flex-col justify-center p-6">
                    <Badge className="w-fit mb-3 bg-brand-blue text-white">{filteredPosts[0].category}</Badge>
                    <Link to={`/blog/${filteredPosts[0].slug}`}>
                      <h3 className="text-3xl font-bold mb-3 hover:text-brand-blue transition-colors">
                        {filteredPosts[0].title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                      {filteredPosts[0].excerpt}
                    </p>
                    
                    <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-4">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {filteredPosts[0].author}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {filteredPosts[0].date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {filteredPosts[0].readTime}
                      </span>
                    </div>
                    
                    <Link 
                      to={`/blog/${filteredPosts[0].slug}`}
                      className="text-brand-blue font-medium flex items-center hover:underline mt-2 group"
                    >
                      Read Article <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8">
              <h2 className="text-2xl font-bold">Latest Articles</h2>
              <div className="h-px bg-gray-200 flex-grow ml-4"></div>
            </div>
            
            {filteredPosts.length > 0 ? (
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className={viewType === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}
              >
                {(viewType === 'grid' ? filteredPosts.slice(1) : filteredPosts).map(post => (
                  <BlogCard key={post.id} post={post} viewType={viewType} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              >
                <h3 className="text-2xl font-bold mb-2">No posts found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  We couldn't find any blog posts matching your criteria. Please try adjusting your search or filter settings.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All Categories');
                  }}
                >
                  Reset Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Stay updated with our latest articles, AC maintenance tips, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="w-full sm:max-w-xs" 
              />
              <Button className="bg-brand-blue hover:bg-brand-blue/90">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

const BlogCard = ({ post, viewType }: { post: typeof blogPosts[0], viewType: string }) => {
  if (viewType === 'list') {
    return (
      <motion.div variants={fadeIn}>
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
          <div className="grid md:grid-cols-3 gap-4">
            <AspectRatio ratio={16/9} className="overflow-hidden md:h-full">
              <Link to={`/blog/${post.slug}`}>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </Link>
            </AspectRatio>
            <div className="md:col-span-2 p-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className="bg-brand-blue text-white">{post.category}</Badge>
                <span className="text-sm text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {post.readTime}
                </span>
              </div>
              
              <Link to={`/blog/${post.slug}`}>
                <h3 className="text-xl font-bold mb-2 hover:text-brand-blue transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{post.date}</span>
                </div>
                
                <Link 
                  to={`/blog/${post.slug}`}
                  className="text-brand-blue hover:text-brand-blue/80 font-medium text-sm flex items-center group"
                >
                  Read More <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }
  
  return (
    <motion.div variants={fadeIn}>
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full group">
        <AspectRatio ratio={16/9} className="overflow-hidden">
          <Link to={`/blog/${post.slug}`}>
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          </Link>
        </AspectRatio>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge className="bg-brand-blue text-white">{post.category}</Badge>
            <span className="text-xs text-gray-500 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {post.readTime}
            </span>
          </div>
          
          <Link to={`/blog/${post.slug}`}>
            <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-brand-blue transition-colors">
              {post.title}
            </h3>
          </Link>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3 pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{post.date}</span>
            </div>
          </div>
          
          <Link 
            to={`/blog/${post.slug}`}
            className="text-brand-blue hover:text-brand-blue/80 font-medium text-sm flex items-center group"
          >
            Read More <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Blog;
