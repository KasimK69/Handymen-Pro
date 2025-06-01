import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Clock, User, ArrowRight, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
  readTime: number;
  createdAt: string;
}

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Top 5 Tips for Maintaining Your Air Conditioner',
      slug: 'top-5-tips-maintaining-air-conditioner',
      excerpt: 'Keep your AC running efficiently with these essential maintenance tips that will save you money and extend your unit\'s lifespan.',
      author: 'AC Services Team',
      category: 'Maintenance',
      tags: ['maintenance', 'tips', 'efficiency', 'DIY'],
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
      readTime: 5,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Best AC Models for Pakistani Summers in 2024',
      slug: 'best-ac-models-pakistani-summers-2024',
      excerpt: 'Discover the most efficient and reliable air conditioner models perfect for Pakistan\'s hot climate and load-shedding challenges.',
      author: 'AC Services Team',
      category: 'Buying Guide',
      tags: ['buying guide', '2024', 'models', 'Pakistan'],
      image: 'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
      readTime: 7,
      createdAt: '2024-01-12'
    },
    {
      id: '3',
      title: 'How to Save Electricity with Your AC',
      slug: 'how-to-save-electricity-with-ac',
      excerpt: 'Learn practical strategies to reduce your air conditioning costs while staying comfortable during hot weather.',
      author: 'Energy Expert',
      category: 'Energy Saving',
      tags: ['energy saving', 'electricity', 'tips', 'efficiency'],
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
      readTime: 6,
      createdAt: '2024-01-10'
    },
    {
      id: '4',
      title: 'Signs Your AC Needs Professional Repair',
      slug: 'signs-ac-needs-professional-repair',
      excerpt: 'Don\'t ignore these warning signs that indicate your air conditioner needs immediate professional attention.',
      author: 'AC Technician',
      category: 'Repair',
      tags: ['repair', 'troubleshooting', 'warning signs', 'professional'],
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
      readTime: 4,
      createdAt: '2024-01-08'
    },
    {
      id: '5',
      title: 'AC Installation Guide for New Homes',
      slug: 'ac-installation-guide-new-homes',
      excerpt: 'Everything you need to know about installing air conditioning in your new home, from planning to execution.',
      author: 'Installation Expert',
      category: 'Installation',
      tags: ['installation', 'new home', 'planning', 'guide'],
      image: 'https://images.unsplash.com/photo-1596526131252-cbdaa2a51bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
      readTime: 8,
      createdAt: '2024-01-05'
    },
    {
      id: '6',
      title: 'Smart AC Controls: The Future of Cooling',
      slug: 'smart-ac-controls-future-cooling',
      excerpt: 'Explore how smart technology is revolutionizing air conditioning with WiFi controls, smart thermostats, and mobile apps.',
      author: 'Tech Specialist',
      category: 'Technology',
      tags: ['smart technology', 'WiFi', 'automation', 'future'],
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
      readTime: 6,
      createdAt: '2024-01-03'
    }
  ];

  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 font-['Inter']">
            AC Services <span className="bg-gradient-to-r from-[#8843F2] to-[#FF467E] bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert insights, maintenance tips, and the latest trends in air conditioning technology
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#8843F2] to-[#FF467E] mx-auto mt-8"></div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 border-gray-200 focus:border-[#8843F2] focus:ring-[#8843F2]"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="py-3 border-gray-200 focus:border-[#8843F2] focus:ring-[#8843F2]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="py-3 border-gray-200 focus:border-[#8843F2] focus:ring-[#8843F2]">
                  <SelectValue placeholder="All Tags" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedTag('all');
                }}
                className="py-3 border-gray-200 hover:bg-gray-50"
              >
                <Filter className="mr-2 h-5 w-5" />
                Clear Filters
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-[#2D3559] font-['Inter']">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <Card key={post.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-gradient-to-r from-[#8843F2] to-[#FF467E] text-white">
                        Featured
                      </Badge>
                      <Badge variant="outline" className="border-[#8843F2] text-[#8843F2]">
                        {post.category}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-[#2D3559] group-hover:text-[#8843F2] transition-colors duration-300 font-['Inter']">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime} min read
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="text-[#8843F2] hover:text-[#FF467E] group-hover:translate-x-1 transition-all duration-300"
                      >
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-[#2D3559] font-['Inter']">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="border-[#4CC9F0] text-[#4CC9F0]">
                        {post.category}
                      </Badge>
                      <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#2D3559] group-hover:text-[#8843F2] transition-colors duration-300 font-['Inter'] line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          variant="secondary" 
                          className="text-xs bg-gray-100 text-gray-600 hover:bg-[#8843F2] hover:text-white transition-colors duration-300 cursor-pointer"
                          onClick={() => setSelectedTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime} min
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-[#8843F2] hover:text-[#FF467E] group-hover:translate-x-1 transition-all duration-300"
                      >
                        Read <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <Search className="mx-auto h-16 w-16 text-gray-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-[#2D3559]">No articles found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all categories
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedTag('all');
                }}
                className="bg-gradient-to-r from-[#8843F2] to-[#FF467E] hover:from-[#7335E8] hover:to-[#F03A6E]"
              >
                View All Articles
              </Button>
            </div>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-[#2D3559] to-[#4CC9F0] rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4 font-['Inter']">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90">
              Get the latest AC tips, maintenance guides, and industry insights delivered to your inbox
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                className="bg-white text-gray-900 border-0 py-3"
              />
              <Button className="bg-gradient-to-r from-[#FF467E] to-[#8843F2] hover:from-[#F03A6E] hover:to-[#7335E8] px-8 py-3 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
