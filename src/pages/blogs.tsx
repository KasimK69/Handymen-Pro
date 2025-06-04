
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, User, Clock, Search, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  category: string;
  tags: string[];
  read_time: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(blogs.map(blog => blog.category.toLowerCase())))];
  const featuredBlogs = blogs.filter(blog => blog.featured);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            AC <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Expert</span> Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert tips, maintenance guides, and industry insights for your air conditioning needs
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Blogs */}
        {featuredBlogs.length > 0 && selectedCategory === 'all' && searchTerm === '' && (
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBlogs.slice(0, 3).map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                >
                  <Link to={`/blogs/${blog.slug}`}>
                    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={blog.image_url} 
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex gap-2 mb-3">
                          <Badge className="bg-yellow-500 text-white">Featured</Badge>
                          <Badge variant="outline">{blog.category}</Badge>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {blog.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {blog.read_time} min
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {format(new Date(blog.created_at), 'MMM dd')}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Blogs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {selectedCategory === 'all' ? 'All Articles' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Articles`}
            <span className="text-lg font-normal text-gray-500 ml-3">({filteredBlogs.length})</span>
          </h2>
          
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                >
                  <Link to={`/blogs/${blog.slug}`}>
                    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg h-full">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={blog.image_url} 
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex gap-2 mb-3">
                          <Badge variant="outline">{blog.category}</Badge>
                          {blog.tags?.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {blog.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {blog.read_time} min
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {format(new Date(blog.created_at), 'MMM dd')}
                          </div>
                        </div>
                        <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-700 font-medium">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Blog Posts Found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your search terms or browse all categories.</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Show All Blogs
              </Button>
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-4">Need Professional AC Services?</h3>
          <p className="text-xl mb-8 opacity-90">
            Get expert AC installation, maintenance, and repair services in Pakistan
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8 py-4">
            <Link to="/contact">
              Contact Our Experts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogsPage;
