import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Clock, User, ArrowRight, Calendar, Eye, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type BlogPost = Database['public']['Tables']['blogs']['Row'];

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
      // Fallback mock data for demo
      const mockBlogs: BlogPost[] = [
        {
          id: '1',
          title: 'Complete Guide to AC Maintenance in Pakistan',
          slug: 'complete-guide-ac-maintenance-pakistan',
          excerpt: 'Learn essential AC maintenance tips to keep your air conditioner running efficiently in Pakistan\'s challenging climate.',
          content: '',
          image_url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          author: 'AC Experts Team',
          category: 'Maintenance',
          tags: ['AC Maintenance', 'Summer Tips', 'Energy Saving', 'Pakistan'],
          read_time: 8,
          status: 'active',
          featured: true,
          created_at: '2024-01-15T10:00:00Z',
          updated_at: '2024-01-15T10:00:00Z'
        },
        {
          id: '2',
          title: 'Best AC Brands for Pakistani Climate',
          slug: 'best-ac-brands-pakistani-climate',
          excerpt: 'Discover which air conditioner brands perform best in Pakistan\'s extreme weather conditions.',
          content: '',
          image_url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          author: 'AC Experts Team',
          category: 'Reviews',
          tags: ['AC Brands', 'Reviews', 'Buying Guide'],
          read_time: 6,
          status: 'active',
          featured: false,
          created_at: '2024-01-10T10:00:00Z',
          updated_at: '2024-01-10T10:00:00Z'
        },
        {
          id: '3',
          title: 'Energy Efficient AC Tips for Lower Bills',
          slug: 'energy-efficient-ac-tips-lower-bills',
          excerpt: 'Simple strategies to reduce your electricity bills while keeping your home cool.',
          content: '',
          image_url: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          author: 'Energy Expert',
          category: 'Tips',
          tags: ['Energy Saving', 'Cost Reduction', 'Efficiency'],
          read_time: 5,
          status: 'active',
          featured: true,
          created_at: '2024-01-08T10:00:00Z',
          updated_at: '2024-01-08T10:00:00Z'
        }
      ];
      setBlogs(mockBlogs);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <MessageCircle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            AC <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Expert Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert tips, guides, and insights for all your air conditioning needs in Pakistan
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-4 text-lg border-0 bg-gray-50/50 focus:bg-white transition-all rounded-xl"
              />
            </div>
            <div className="flex gap-3 flex-wrap lg:flex-nowrap">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={`capitalize px-6 py-4 rounded-xl font-medium transition-all ${
                    selectedCategory === category 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'bg-white/50 hover:bg-white border-gray-200 hover:border-blue-300'
                  }`}
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
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Articles</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBlogs.slice(0, 3).map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-lg h-full bg-white/80 backdrop-blur-sm">
                    <Link to={`/blogs/${blog.slug}`}>
                      <div className="relative aspect-video overflow-hidden">
                        <img 
                          src={blog.image_url || 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 px-3 py-1">
                            Featured
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/90 text-gray-800 border-0">
                            {blog.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6 flex flex-col h-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow leading-relaxed">
                          {blog.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            <span>{blog.author}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{blog.read_time} min</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        </div>
                        
                        <Button 
                          className="w-full mt-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Read Full Article
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Articles' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Articles`}
            </h2>
            <Badge variant="secondary" className="text-lg px-4 py-2">
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
                  whileHover={{ y: -5 }}
                >
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md h-full bg-white/80 backdrop-blur-sm">
                    <Link to={`/blogs/${blog.slug}`}>
                      <div className="relative aspect-video overflow-hidden">
                        <img 
                          src={blog.image_url || 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white/90 text-gray-800 border-0">
                            {blog.category}
                          </Badge>
                        </div>
                        {blog.featured && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6 flex flex-col h-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                          {blog.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            <span>{blog.author}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{blog.read_time} min</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
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
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Articles Found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Try adjusting your search terms or browse all categories to find helpful AC tips and guides.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl"
              >
                Show All Articles
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogsPage;
