
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
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
      <section className="bg-brand-blue text-white py-24 md:py-32">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog & Resources</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Expert advice, tips, and insights for home maintenance and improvement.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="w-full md:w-1/2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-1/4">
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

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-2">No posts found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search or filter criteria
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
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Stay updated with our latest articles, tips, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="w-full sm:w-auto" 
              />
              <Button className="bg-brand-red hover:bg-brand-red/90">
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
      <div className="relative h-56 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-brand-blue text-white text-xs px-3 py-1 rounded-full">
          {post.category}
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span>{post.date}</span>
          <span>{post.author}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">
          <Link to={`/blog/${post.slug}`} className="hover:text-brand-red transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <Link 
          to={`/blog/${post.slug}`}
          className="text-brand-red hover:text-brand-red/80 font-medium inline-block"
        >
          Read More
        </Link>
      </CardContent>
    </Card>
  );
};

export default Blog;
