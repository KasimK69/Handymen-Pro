
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Clock, User, ArrowRight, Calendar, Sparkles, TrendingUp, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type BlogPost = Database['public']['Tables']['blogs']['Row'];

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      console.log('🔄 Fetching blogs from Supabase...');
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'active')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Supabase blogs fetch error:', error);
        throw error;
      }

      console.log('✅ Blogs fetched successfully:', data?.length || 0, 'blogs');
      setBlogs(data || []);
    } catch (error) {
      console.error('❌ Error fetching blogs:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (blog.excerpt && blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || blog.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(blogs.map(blog => blog.category.toLowerCase())))];
  const featuredBlogs = blogs.filter(blog => blog.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-24 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 font-medium">Loading latest articles...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Modern Hero Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-8 shadow-xl"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <BookOpen className="h-12 w-12 text-white" />
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 font-['Inter']">
            AC Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Expert insights, maintenance tips, and comprehensive guides for all your air conditioning needs in Pakistan. 
            Stay cool with professional advice from certified AC technicians.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Weekly Updates</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Expert Tips</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>Professional Advice</span>
          </div>
        </motion.div>

        {/* Modern Search and Filter */}
        <motion.div 
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-5 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search articles about AC maintenance, repair, installation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 py-5 text-lg border-0 bg-gray-50/50 focus:bg-white transition-all rounded-2xl font-medium"
              />
            </div>
            <div className="flex gap-3 flex-wrap lg:flex-nowrap">
              {categories.map(category => (
                <motion.div
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className={`capitalize px-8 py-5 rounded-2xl font-semibold transition-all text-sm ${
                      selectedCategory === category 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl hover:shadow-2xl' 
                        : 'bg-white/70 hover:bg-white border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {category}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Articles */}
        {featuredBlogs.length > 0 && selectedCategory === 'all' && searchTerm === '' && (
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <motion.div 
                className="p-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl shadow-lg"
                whileHover={{ rotate: 5 }}
              >
                <Sparkles className="h-7 w-7 text-white" />
              </motion.div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 font-['Inter']">Featured Articles</h2>
                <p className="text-gray-600 mt-1">Hand-picked essential reads for AC owners</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBlogs.slice(0, 3).map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + (index * 0.15) }}
                  whileHover={{ y: -12 }}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-lg h-full bg-white/90 backdrop-blur-sm">
                    <Link to={`/blog/${blog.slug}`}>
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img 
                          src={blog.image_url || 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-5 left-5">
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 px-4 py-2 text-sm font-semibold">
                            ⭐ Featured
                          </Badge>
                        </div>
                        <div className="absolute top-5 right-5">
                          <Badge className="bg-white/95 text-gray-800 border-0 font-medium">
                            {blog.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-8 flex flex-col h-full">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 font-['Inter']">
                          {blog.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-6 line-clamp-3 flex-grow leading-relaxed text-base">
                          {blog.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span className="font-medium">{blog.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{blog.read_time} min read</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-8">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(blog.created_at).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}</span>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full mt-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Read Full Article
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Blog Posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 font-['Inter']">
                {selectedCategory === 'all' ? 'Latest Articles' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Articles`}
              </h2>
              <p className="text-gray-600 mt-2">Professional insights and expert guidance</p>
            </div>
            <Badge variant="secondary" className="text-lg px-6 py-3 bg-blue-50 text-blue-700 font-semibold">
              {filteredBlogs.length} articles
            </Badge>
          </div>
          
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md h-full bg-white/90 backdrop-blur-sm">
                    <Link to={`/blog/${blog.slug}`}>
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img 
                          src={blog.image_url || 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-5 left-5">
                          <Badge className="bg-white/95 text-gray-800 border-0 font-medium">
                            {blog.category}
                          </Badge>
                        </div>
                        {blog.featured && (
                          <div className="absolute top-5 right-5">
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 font-medium">
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6 flex flex-col h-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 font-['Inter']">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow leading-relaxed">
                          {blog.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span className="font-medium">{blog.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{blog.read_time} min</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(blog.created_at).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full mt-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                        >
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-8xl mb-6">📚</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 font-['Inter']">No Articles Found</h3>
              <p className="text-gray-600 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                We couldn't find any articles matching your search. Try adjusting your filters or browse all categories for helpful AC tips and guides.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold"
              >
                Show All Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
