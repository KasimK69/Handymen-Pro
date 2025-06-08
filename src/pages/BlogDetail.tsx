
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, User, Share2, MessageCircle, Calendar, Eye, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

// This would normally come from Supabase in a real implementation
const mockBlogPost = {
  id: '1',
  title: 'Complete Guide to AC Maintenance in Pakistan',
  slug: 'complete-guide-ac-maintenance-pakistan',
  excerpt: 'Learn essential AC maintenance tips to keep your air conditioner running efficiently in Pakistan\'s challenging climate.',
  content: `
    <div class="prose prose-lg max-w-none">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Why AC Maintenance is Crucial in Pakistan</h2>
      <p class="text-gray-700 leading-relaxed mb-6">Pakistan's extreme weather conditions, with temperatures soaring above 45°C in summer, put tremendous stress on air conditioning systems. Regular maintenance is not just recommended—it's essential for optimal performance and longevity.</p>
      
      <div class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
        <h3 class="text-lg font-semibold text-blue-900 mb-2">💡 Pro Tip</h3>
        <p class="text-blue-800">Regular maintenance can extend your AC's lifespan by up to 10 years and reduce energy costs by 40%.</p>
      </div>
      
      <h3 class="text-xl font-bold text-gray-900 mb-4">Essential Monthly Maintenance Tasks</h3>
      <ul class="space-y-3 mb-8">
        <li class="flex items-start">
          <span class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
          <div>
            <strong class="text-gray-900">Filter Cleaning:</strong>
            <span class="text-gray-700"> Clean or replace air filters monthly during peak usage periods. Dirty filters can reduce efficiency by up to 15%.</span>
          </div>
        </li>
        <li class="flex items-start">
          <span class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
          <div>
            <strong class="text-gray-900">Coil Inspection:</strong>
            <span class="text-gray-700"> Check evaporator and condenser coils for dirt buildup. Clean coils improve heat transfer efficiency.</span>
          </div>
        </li>
        <li class="flex items-start">
          <span class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
          <div>
            <strong class="text-gray-900">Drainage Check:</strong>
            <span class="text-gray-700"> Ensure condensate drains are clear and functioning to prevent water damage and humidity issues.</span>
          </div>
        </li>
      </ul>
      
      <h3 class="text-xl font-bold text-gray-900 mb-4">Seasonal Maintenance Checklist</h3>
      <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-8">
        <h4 class="font-semibold text-gray-900 mb-3">Before Summer Season (March-April):</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul class="space-y-2">
            <li class="flex items-center text-gray-700">
              <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Professional refrigerant level inspection
            </li>
            <li class="flex items-center text-gray-700">
              <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Electrical connections tightening
            </li>
          </ul>
          <ul class="space-y-2">
            <li class="flex items-center text-gray-700">
              <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Ductwork inspection for leaks
            </li>
            <li class="flex items-center text-gray-700">
              <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Fan motor lubrication
            </li>
          </ul>
        </div>
      </div>
      
      <h3 class="text-xl font-bold text-gray-900 mb-4">⚠️ Signs Your AC Needs Professional Service</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div class="bg-red-50 border border-red-200 p-4 rounded-lg">
          <h4 class="font-semibold text-red-900 mb-2">Performance Issues</h4>
          <ul class="space-y-1 text-red-800 text-sm">
            <li>• Reduced cooling efficiency</li>
            <li>• Frequent cycling on/off</li>
            <li>• Higher electricity bills</li>
          </ul>
        </div>
        <div class="bg-orange-50 border border-orange-200 p-4 rounded-lg">
          <h4 class="font-semibold text-orange-900 mb-2">Physical Signs</h4>
          <ul class="space-y-1 text-orange-800 text-sm">
            <li>• Unusual noises or vibrations</li>
            <li>• Poor air quality or strange odors</li>
            <li>• Water leaks around the unit</li>
          </ul>
        </div>
      </div>
      
      <blockquote class="border-l-4 border-blue-500 bg-blue-50 p-6 my-8 rounded-r-lg">
        <p class="text-lg text-blue-900 italic mb-2">"A well-maintained AC unit can last 15-20 years and save up to 40% on energy costs compared to a neglected system."</p>
        <footer class="text-blue-700 font-medium">— AC Experts Pakistan</footer>
      </blockquote>
      
      <h3 class="text-xl font-bold text-gray-900 mb-4">💰 Cost-Effective Maintenance Packages</h3>
      <p class="text-gray-700 mb-6">Regular maintenance can save you thousands of rupees in repair costs and significantly extend your AC's lifespan. Our professional maintenance packages start from PKR 3,000 and include comprehensive inspection and cleaning.</p>
      
      <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
        <h4 class="font-semibold text-green-900 mb-3">Our Maintenance Package Includes:</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul class="space-y-2">
            <li class="flex items-center text-green-800">
              <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Complete system inspection
            </li>
            <li class="flex items-center text-green-800">
              <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Filter cleaning/replacement
            </li>
            <li class="flex items-center text-green-800">
              <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Coil cleaning and maintenance
            </li>
          </ul>
          <ul class="space-y-2">
            <li class="flex items-center text-green-800">
              <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Refrigerant level check
            </li>
            <li class="flex items-center text-green-800">
              <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Performance optimization
            </li>
            <li class="flex items-center text-green-800">
              <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              3-month service warranty
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  image_url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  author: 'AC Experts Team',
  category: 'Maintenance',
  tags: ['AC Maintenance', 'Summer Tips', 'Energy Saving', 'Pakistan'],
  read_time: 8,
  views: 1524,
  likes: 89,
  created_at: '2024-01-15T10:00:00Z'
};

const BlogDetail = () => {
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
    const message = `Hi! I read your blog post "${mockBlogPost.title}" and I'm interested in your AC maintenance services. Can you provide more information about your services and pricing?`;
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm">
                {mockBlogPost.category}
              </Badge>
              {mockBlogPost.tags.slice(0, 3).map(tag => (
                <Badge key={tag} className="bg-white/10 text-white border-white/20 px-3 py-1 text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              {mockBlogPost.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/90 mb-8">
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <User className="h-5 w-5 mr-2" />
                <span className="font-medium">{mockBlogPost.author}</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{new Date(mockBlogPost.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <Clock className="h-5 w-5 mr-2" />
                <span>{mockBlogPost.read_time} min read</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <Eye className="h-5 w-5 mr-2" />
                <span>{mockBlogPost.views.toLocaleString()} views</span>
              </div>
            </div>

            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/blogs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
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
              <div className="mb-12 relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={mockBlogPost.image_url} 
                  alt={mockBlogPost.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Article Stats */}
              <div className="flex items-center justify-between mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
                <div className="flex items-center gap-6">
                  <div className="flex items-center text-gray-600">
                    <ThumbsUp className="h-5 w-5 mr-2 text-blue-600" />
                    <span className="font-medium">{mockBlogPost.likes} likes</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Eye className="h-5 w-5 mr-2 text-green-600" />
                    <span className="font-medium">{mockBlogPost.views.toLocaleString()} views</span>
                  </div>
                </div>
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
                    onClick={() => handleShare('copy')}
                    className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Article Content */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-white/20 mb-12">
                <div 
                  dangerouslySetInnerHTML={{ __html: mockBlogPost.content }}
                  className="text-gray-700 leading-relaxed"
                />
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-4">Need Professional AC Services?</h3>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    Our expert technicians are ready to help with installation, repair, and maintenance services in Islamabad & Rawalpindi.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={handleBookService}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Get AC Service Quote
                    </Button>
                    <Button 
                      asChild
                      className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold text-lg px-8 py-4 rounded-xl backdrop-blur-sm transition-all"
                    >
                      <Link to="/ac-buy-and-sale">
                        Browse AC Collection
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
