
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, Tag, ArrowRight } from 'lucide-react';
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
    author: 'Ahmed Khan'
  },
  {
    id: '2',
    slug: 'diy-plumbing-tips',
    title: '5 DIY Plumbing Tips Every Homeowner Should Know',
    excerpt: 'Learn simple plumbing techniques to handle common issues before calling a professional.',
    date: 'March 22, 2023',
    image: 'https://images.unsplash.com/photo-1558618666-176827a41dec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Plumbing',
    author: 'Sara Mahmood'
  },
  {
    id: '3',
    slug: 'energy-saving-home',
    title: 'Energy-Saving Tips for a More Efficient Home',
    excerpt: 'Practical ways to reduce your energy consumption and save money on utility bills.',
    date: 'February 10, 2023',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Energy Efficiency',
    author: 'Malik Hassan'
  },
  {
    id: '4',
    slug: 'kitchen-renovation-guide',
    title: 'Complete Guide to Kitchen Renovation on a Budget',
    excerpt: 'Transform your kitchen without breaking the bank with these smart renovation strategies.',
    date: 'January 5, 2023',
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Renovation',
    author: 'Fatima Ali'
  },
  {
    id: '5',
    slug: 'ac-maintenance-tips',
    title: 'Essential AC Maintenance Tips for Summer',
    excerpt: 'Keep your air conditioner running efficiently during the hot summer months with these maintenance tips.',
    date: 'December 12, 2022',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'AC',
    author: 'Ahmed Khan'
  },
  {
    id: '6',
    slug: 'bathroom-upgrade-ideas',
    title: 'Simple Bathroom Upgrade Ideas That Make a Big Impact',
    excerpt: 'Transform your bathroom with these simple upgrades that don\'t require a full renovation.',
    date: 'November 8, 2022',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Renovation',
    author: 'Sara Mahmood'
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

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-blue/80 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">AC Service Blog</h1>
            <p className="text-xl opacity-90 leading-relaxed max-w-xl mx-auto">
              Expert advice, tips, and insights for all your air conditioning needs and home maintenance.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center max-w-4xl mx-auto">
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
            
            <div className="w-full md:max-w-xs">
              <Select 
                value={selectedCategory} 
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 pb-2 border-b">Featured Article</h2>
              
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-3">
                  <AspectRatio ratio={16/9} className="overflow-hidden rounded-xl mb-4">
                    <Link to={`/blog/${filteredPosts[0].slug}`}>
                      <img 
                        src={filteredPosts[0].image} 
                        alt={filteredPosts[0].title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </Link>
                  </AspectRatio>
                </div>
                <div className="md:col-span-2 flex flex-col justify-center">
                  <Badge className="w-fit mb-3 bg-brand-blue text-white">{filteredPosts[0].category}</Badge>
                  <Link to={`/blog/${filteredPosts[0].slug}`}>
                    <h3 className="text-3xl font-bold mb-3 hover:text-brand-blue transition-colors">
                      {filteredPosts[0].title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                    {filteredPosts[0].excerpt}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-4">{filteredPosts[0].author}</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{filteredPosts[0].date}</span>
                  </div>
                  
                  <Link 
                    to={`/blog/${filteredPosts[0].slug}`}
                    className="text-brand-blue font-medium flex items-center hover:underline mt-2"
                  >
                    Read Article <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
            
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(1).map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
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
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
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
          </div>
        </div>
      </section>
    </>
  );
};

const BlogCard = ({ post }: { post: typeof blogPosts[0] }) => {
  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full">
      <AspectRatio ratio={16/9} className="overflow-hidden">
        <Link to={`/blog/${post.slug}`}>
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            loading="lazy"
          />
        </Link>
      </AspectRatio>
      <CardContent className="p-6">
        <Badge className="mb-2 bg-brand-blue text-white">{post.category}</Badge>
        
        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-brand-blue transition-colors">
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
          className="text-brand-blue hover:text-brand-blue/80 font-medium text-sm flex items-center mt-2"
        >
          Read More <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default Blog;
