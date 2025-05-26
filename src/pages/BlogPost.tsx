
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Share2, MessageSquare, AirVent, ArrowLeft, Facebook, Twitter } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const BlogPost = () => {
  const { slug } = useParams();

  // Mock blog post data - in a real app, this would come from an API
  const blogPost = {
    title: "Complete Guide to Choosing the Right AC for Your Home in 2024",
    excerpt: "Everything you need to know about selecting the perfect air conditioner for your space, from BTU calculations to energy efficiency ratings.",
    content: `
      <div class="prose prose-lg max-w-none">
        <img src="https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Modern AC Unit" class="w-full h-96 object-cover rounded-lg mb-8" />
        
        <p class="text-xl text-gray-600 mb-8">Choosing the right air conditioner for your home is one of the most important decisions you'll make for your comfort and energy bills. With the extreme heat in Pakistan, especially in cities like Islamabad and Rawalpindi, having an efficient cooling system isn't just a luxury—it's a necessity.</p>
        
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Understanding Your Cooling Needs</h2>
        
        <p class="mb-6">Before diving into specific AC models, it's crucial to understand your space's cooling requirements. The size of your room, ceiling height, insulation quality, and the number of occupants all play vital roles in determining the right AC capacity.</p>
        
        <h3 class="text-2xl font-bold text-gray-900 mb-4">BTU Calculation Made Simple</h3>
        
        <p class="mb-6">BTU (British Thermal Unit) is the standard measurement for cooling capacity. Here's a simple guide:</p>
        
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li><strong>Small rooms (up to 150 sq ft):</strong> 5,000-6,000 BTU (0.5 Ton)</li>
          <li><strong>Medium rooms (150-300 sq ft):</strong> 7,000-10,000 BTU (0.75-1 Ton)</li>
          <li><strong>Large rooms (300-450 sq ft):</strong> 12,000-15,000 BTU (1-1.5 Ton)</li>
          <li><strong>Extra large rooms (450-600 sq ft):</strong> 18,000-21,000 BTU (1.5-2 Ton)</li>
        </ul>
        
        <blockquote class="border-l-4 border-blue-500 pl-6 italic text-gray-700 my-8 bg-gray-50 p-6 rounded-r-lg">
          "The right-sized AC unit will cool your space efficiently without wasting energy. An oversized unit will cycle on and off frequently, while an undersized unit will struggle to maintain comfortable temperatures."
        </blockquote>
        
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Types of Air Conditioners</h2>
        
        <h3 class="text-2xl font-bold text-gray-900 mb-4">1. Inverter AC vs. Non-Inverter AC</h3>
        
        <p class="mb-6"><strong>Inverter ACs</strong> are more energy-efficient as they can adjust their cooling capacity based on the room temperature. While they have a higher upfront cost, they save significantly on electricity bills in the long run.</p>
        
        <p class="mb-6"><strong>Non-Inverter ACs</strong> are more affordable initially but consume more electricity as they operate at full capacity and then turn off completely.</p>
        
        <h3 class="text-2xl font-bold text-gray-900 mb-4">2. Split AC vs. Window AC</h3>
        
        <p class="mb-6"><strong>Split ACs</strong> offer better cooling distribution, are quieter, and have a more aesthetic appeal. They're ideal for bedrooms and living rooms.</p>
        
        <p class="mb-6"><strong>Window ACs</strong> are more affordable and easier to install but can be noisier and may not provide even cooling.</p>
        
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Energy Efficiency and Cost Savings</h2>
        
        <p class="mb-6">With rising electricity costs in Pakistan, choosing an energy-efficient AC is crucial. Look for units with high Energy Efficiency Ratio (EER) ratings and 5-star energy labels.</p>
        
        <div class="bg-blue-50 p-6 rounded-lg mb-8">
          <h4 class="text-xl font-bold text-blue-900 mb-3">💡 Pro Tip</h4>
          <p class="text-blue-800">A 5-star rated 1.5-ton inverter AC can save you up to PKR 15,000-20,000 annually compared to a 1-star non-inverter unit.</p>
        </div>
        
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Top AC Brands in Pakistan</h2>
        
        <p class="mb-6">Based on reliability, after-sales service, and performance in Pakistani climate conditions, here are the top recommendations:</p>
        
        <ol class="list-decimal list-inside mb-6 space-y-2">
          <li><strong>Haier:</strong> Excellent build quality and widespread service network</li>
          <li><strong>Gree:</strong> Good value for money with reliable performance</li>
          <li><strong>LG:</strong> Premium features and energy efficiency</li>
          <li><strong>Samsung:</strong> Advanced technology and smart features</li>
          <li><strong>Dawlance:</strong> Local brand with competitive pricing</li>
        </ol>
        
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Installation and Maintenance Tips</h2>
        
        <p class="mb-6">Proper installation is crucial for optimal performance. Always hire certified technicians and ensure:</p>
        
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li>Proper placement away from direct sunlight</li>
          <li>Adequate clearance around the outdoor unit</li>
          <li>Quality copper pipes and proper insulation</li>
          <li>Correct refrigerant charging</li>
        </ul>
        
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Regular Maintenance Schedule</h3>
        
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li><strong>Monthly:</strong> Clean or replace air filters</li>
          <li><strong>Quarterly:</strong> Clean the outdoor unit coils</li>
          <li><strong>Annually:</strong> Professional service and gas top-up if needed</li>
        </ul>
        
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Budget Considerations</h2>
        
        <p class="mb-6">AC prices in Pakistan vary significantly based on capacity, brand, and features:</p>
        
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li><strong>1 Ton Non-Inverter:</strong> PKR 45,000 - 65,000</li>
          <li><strong>1 Ton Inverter:</strong> PKR 65,000 - 95,000</li>
          <li><strong>1.5 Ton Non-Inverter:</strong> PKR 55,000 - 85,000</li>
          <li><strong>1.5 Ton Inverter:</strong> PKR 85,000 - 1,25,000</li>
        </ul>
        
        <div class="bg-yellow-50 p-6 rounded-lg mb-8">
          <h4 class="text-xl font-bold text-yellow-900 mb-3">⚠️ Important Note</h4>
          <p class="text-yellow-800">Don't compromise on quality for price. A reliable AC with good after-sales service will save you money in the long term.</p>
        </div>
        
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Conclusion</h2>
        
        <p class="mb-6">Choosing the right AC requires careful consideration of your space, budget, and long-term energy costs. Take time to research, compare options, and always buy from authorized dealers to ensure warranty coverage.</p>
        
        <p class="mb-6">Remember, the cheapest option isn't always the most economical in the long run. Invest in a quality unit that will serve you reliably for years to come.</p>
      </div>
    `,
    author: "AC Services Team",
    publishedAt: "2024-01-15",
    readingTime: "8 min read",
    tags: ["AC Guide", "Home Cooling", "Energy Efficiency", "Pakistan"],
    featuredImage: "https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blogPost.title;
    
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
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    
    toast({
      title: "Sharing post",
      description: `Opening ${platform} to share this AC guide.`,
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-brand-blue to-brand-red text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to AC Blog
            </Link>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {blogPost.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-white/20 text-white border-0">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {blogPost.title}
            </h1>
            
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              {blogPost.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {blogPost.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(blogPost.publishedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {blogPost.readingTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Social Share Buttons */}
            <div className="flex items-center justify-between mb-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="font-semibold text-gray-900 dark:text-white">Share this AC guide:</span>
              <div className="flex gap-3">
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleShare('whatsapp')}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => handleShare('facebook')}
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button 
                  size="sm" 
                  className="bg-sky-500 hover:bg-sky-600 text-white"
                  onClick={() => handleShare('twitter')}
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
              </div>
            </div>

            {/* Article Body */}
            <div 
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />

            {/* Call to Action */}
            <div className="mt-16 p-8 bg-gradient-to-r from-brand-blue to-brand-red rounded-xl text-white text-center">
              <div className="flex justify-center mb-4">
                <AirVent className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Need Help Choosing the Right AC?</h3>
              <p className="text-lg mb-6 opacity-90">
                Our AC experts are here to help you find the perfect air conditioner for your space and budget. 
                Get personalized recommendations and professional installation services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
                  <Link to="/contact">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Get AC Consultation
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-blue">
                  <Link to="/ac-buy-and-sale">
                    <AirVent className="mr-2 h-5 w-5" />
                    Browse AC Collection
                  </Link>
                </Button>
              </div>
            </div>

            {/* Related Posts Section */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related AC Guides</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="AC Maintenance"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      AC Maintenance Tips for Pakistani Climate
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Essential maintenance guide to keep your AC running efficiently in extreme heat.
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/blog/ac-maintenance-tips">Read More</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1563351672-62b74891a28a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="AC Installation"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Professional AC Installation Guide
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Why professional installation matters and what to expect during the process.
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/blog/ac-installation-guide">Read More</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
