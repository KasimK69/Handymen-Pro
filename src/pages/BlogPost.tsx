
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, User, Share2, MessageCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

// Mock blog data - in real app this would come from Supabase
const mockBlogPost = {
  id: '1',
  title: 'Complete Guide to AC Maintenance in Pakistan',
  slug: 'complete-guide-ac-maintenance-pakistan',
  excerpt: 'Learn essential AC maintenance tips to keep your air conditioner running efficiently in Pakistan\'s challenging climate.',
  content: `
    <div class="prose prose-lg max-w-none">
      <h2>Why AC Maintenance is Crucial in Pakistan</h2>
      <p>Pakistan's extreme weather conditions, with temperatures soaring above 45°C in summer, put tremendous stress on air conditioning systems. Regular maintenance is not just recommended—it's essential for optimal performance and longevity.</p>
      
      <h3>Essential Monthly Maintenance Tasks</h3>
      <ul>
        <li><strong>Filter Cleaning:</strong> Clean or replace air filters monthly during peak usage periods</li>
        <li><strong>Coil Inspection:</strong> Check evaporator and condenser coils for dirt buildup</li>
        <li><strong>Drainage Check:</strong> Ensure condensate drains are clear and functioning</li>
        <li><strong>Thermostat Calibration:</strong> Verify thermostat accuracy and settings</li>
      </ul>
      
      <h3>Seasonal Maintenance Checklist</h3>
      <p>Before summer season (March-April):</p>
      <ul>
        <li>Professional inspection of refrigerant levels</li>
        <li>Electrical connections tightening</li>
        <li>Ductwork inspection for leaks</li>
        <li>Fan motor lubrication</li>
      </ul>
      
      <h3>Signs Your AC Needs Professional Service</h3>
      <ul>
        <li>Reduced cooling efficiency</li>
        <li>Unusual noises or vibrations</li>
        <li>Higher electricity bills</li>
        <li>Frequent cycling on/off</li>
        <li>Poor air quality or strange odors</li>
      </ul>
      
      <h3>Cost-Effective Maintenance Tips</h3>
      <p>Regular maintenance can save you thousands of rupees in repair costs and significantly extend your AC's lifespan. Our professional maintenance packages start from PKR 3,000 and include comprehensive inspection and cleaning.</p>
      
      <blockquote>
        <p>"A well-maintained AC unit can last 15-20 years and save up to 40% on energy costs compared to a neglected system." - AC Experts Pakistan</p>
      </blockquote>
    </div>
  `,
  image_url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  author: 'AC Experts Team',
  category: 'Maintenance',
  tags: ['AC Maintenance', 'Summer Tips', 'Energy Saving', 'Pakistan'],
  read_time: 8,
  created_at: '2024-01-15T10:00:00Z'
};

const BlogPost = () => {
  const { slug } = useParams();

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = mockBlogPost.title;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      default:
        navigator.clipboard.writeText(url);
        toast({
          title: "Link Copied",
          description: "The blog post link has been copied to your clipboard.",
        });
        return;
    }
    
    window.open(shareUrl, '_blank');
  };

  const handleBookService = () => {
    const message = `Hi! I read your blog post "${mockBlogPost.title}" and I'm interested in your AC services. Can you provide more information about your services and pricing?`;
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {mockBlogPost.tags.map(tag => (
                <Badge key={tag} className="bg-white/20 text-white border-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              {mockBlogPost.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/90">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span className="font-medium">{mockBlogPost.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{new Date(mockBlogPost.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{mockBlogPost.read_time} min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Featured Image */}
              <div className="mb-12">
                <img 
                  src={mockBlogPost.image_url} 
                  alt={mockBlogPost.title}
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
              </div>

              {/* Article Content */}
              <div 
                dangerouslySetInnerHTML={{ __html: mockBlogPost.content }}
                className="text-gray-700 leading-relaxed mb-12"
              />

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Share this article</h3>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleShare('whatsapp')}
                        className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                      >
                        WhatsApp
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleShare('facebook')}
                        className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                      >
                        Facebook
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleShare('twitter')}
                        className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
                      >
                        Twitter
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleShare('copy')}
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Copy Link
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleBookService}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Book AC Service Now
                  </Button>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Need Professional AC Services?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Our expert technicians are ready to help with installation, repair, and maintenance services in Islamabad & Rawalpindi.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleBookService}
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Get AC Service Quote
                  </Button>
                  <Button 
                    asChild
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    <Link to="/ac-buy-and-sale">
                      Browse AC Collection
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <Button asChild variant="outline">
                  <Link to="/blogs">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
