
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Share2,
  MessageCircle,
  Phone,
  ChevronRight,
  BookOpen,
  ThumbsUp,
  Eye
} from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();

  // Sample blog post data - in a real app, this would come from an API
  const blogPost = {
    id: '1',
    title: 'Complete Guide to AC Maintenance: Keep Your AC Running Efficiently',
    slug: 'ac-maintenance-guide',
    content: `
      <div class="prose prose-lg max-w-none">
        <p class="text-xl text-gray-600 leading-relaxed mb-8">Air conditioning maintenance is crucial for ensuring your AC unit operates efficiently, lasts longer, and provides optimal cooling performance. Regular maintenance not only saves you money on energy bills but also prevents costly repairs and extends your AC's lifespan.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Why AC Maintenance Matters</h2>
        <p class="mb-6">Regular AC maintenance is like regular health checkups for your air conditioning system. Just as you wouldn't skip medical checkups, you shouldn't skip AC maintenance. Here's why it's so important:</p>
        
        <ul class="list-disc pl-6 mb-8 space-y-2">
          <li><strong>Energy Efficiency:</strong> A well-maintained AC uses less energy, reducing your electricity bills by up to 30%</li>
          <li><strong>Longer Lifespan:</strong> Regular maintenance can extend your AC's life by 5-10 years</li>
          <li><strong>Better Air Quality:</strong> Clean filters and coils mean cleaner air in your home</li>
          <li><strong>Fewer Breakdowns:</strong> Preventive maintenance catches problems before they become expensive repairs</li>
          <li><strong>Warranty Protection:</strong> Many manufacturers require regular maintenance to keep warranties valid</li>
        </ul>

        <div class="bg-blue-50 border-l-4 border-blue-400 p-6 my-8">
          <p class="text-blue-800 font-medium">💡 Pro Tip: The best time for AC maintenance is during spring, before the hot summer season when you'll need your AC most.</p>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Monthly AC Maintenance Tasks</h2>
        <p class="mb-4">These are simple tasks you can do yourself every month:</p>
        
        <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">1. Replace or Clean Air Filters</h3>
        <p class="mb-4">Dirty filters are the #1 cause of AC problems. Check your filters monthly and replace them when they're dirty. In dusty areas like Rawalpindi and Islamabad, you might need to change them more frequently.</p>
        
        <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">2. Check Thermostat Settings</h3>
        <p class="mb-4">Ensure your thermostat is working correctly and set to the right temperature. Consider upgrading to a programmable thermostat to save energy.</p>
        
        <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">3. Clear Debris Around Outdoor Unit</h3>
        <p class="mb-6">Remove leaves, grass, and debris from around your outdoor unit. Maintain at least 2 feet of clearance on all sides for proper airflow.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Quarterly Professional Maintenance</h2>
        <p class="mb-4">Every 3 months, have a professional technician perform these tasks:</p>
        
        <ul class="list-disc pl-6 mb-8 space-y-2">
          <li>Deep clean evaporator and condenser coils</li>
          <li>Check refrigerant levels and pressure</li>
          <li>Inspect electrical connections and tighten if needed</li>
          <li>Lubricate moving parts</li>
          <li>Check and clean condensate drain</li>
          <li>Test system controls and safety devices</li>
          <li>Measure airflow and temperature</li>
        </ul>
        
        <div class="bg-red-50 border-l-4 border-red-400 p-6 my-8">
          <p class="text-red-800 font-medium">⚠️ Warning: Never attempt to handle refrigerant or electrical components yourself. These tasks require professional expertise and specialized tools.</p>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Signs Your AC Needs Professional Attention</h2>
        <p class="mb-4">Contact a professional immediately if you notice:</p>
        
        <ul class="list-disc pl-6 mb-8 space-y-2">
          <li>Unusual noises (grinding, squealing, or banging)</li>
          <li>Strange odors coming from vents</li>
          <li>Weak airflow or warm air blowing</li>
          <li>High humidity levels indoors</li>
          <li>Frequent cycling on and off</li>
          <li>Ice formation on the unit</li>
          <li>Sudden increase in energy bills</li>
        </ul>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Local Climate Considerations</h2>
        <p class="mb-4">In Rawalpindi and Islamabad's climate:</p>
        
        <ul class="list-disc pl-6 mb-8 space-y-2">
          <li><strong>Dust and Pollution:</strong> Change filters more frequently due to high dust levels</li>
          <li><strong>Monsoon Season:</strong> Check drainage systems before and after monsoon</li>
          <li><strong>Extreme Summer Heat:</strong> Schedule pre-summer maintenance in March/April</li>
          <li><strong>Power Fluctuations:</strong> Install voltage stabilizers to protect your AC</li>
        </ul>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Cost-Saving Maintenance Tips</h2>
        
        <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">1. Keep Indoor Temperature Reasonable</h3>
        <p class="mb-4">Set your thermostat to 24-26°C (75-78°F) for optimal efficiency. Every degree lower can increase energy consumption by 6-8%.</p>
        
        <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">2. Use Ceiling Fans</h3>
        <p class="mb-4">Ceiling fans help circulate cool air, allowing you to set the thermostat a few degrees higher while maintaining comfort.</p>
        
        <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">3. Seal Air Leaks</h3>
        <p class="mb-6">Check windows, doors, and ductwork for air leaks. Seal any gaps to prevent cool air from escaping.</p>
        
        <div class="bg-green-50 border-l-4 border-green-400 p-6 my-8">
          <p class="text-green-800 font-medium">✅ Regular maintenance can save you up to PKR 15,000 annually in energy costs and prevent expensive emergency repairs!</p>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">When to Replace vs. Repair</h2>
        <p class="mb-4">Consider replacement if your AC:</p>
        
        <ul class="list-disc pl-6 mb-8 space-y-2">
          <li>Is more than 10-15 years old</li>
          <li>Needs frequent expensive repairs</li>
          <li>Uses R-22 refrigerant (being phased out)</li>
          <li>Has poor energy efficiency ratings</li>
          <li>Repair costs exceed 50% of replacement cost</li>
        </ul>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
        <p class="mb-6">Regular AC maintenance is an investment that pays for itself through energy savings, fewer repairs, and extended equipment life. While some tasks can be done yourself, professional maintenance is essential for optimal performance and safety.</p>
        
        <p class="mb-6">Don't wait for your AC to break down in the middle of summer. Schedule regular maintenance and enjoy reliable, efficient cooling year-round.</p>
      </div>
    `,
    excerpt: 'Learn essential AC maintenance tips to keep your air conditioning system running efficiently, save money on energy bills, and prevent costly repairs.',
    featured_image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    author: 'Ahmad Ali',
    author_avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    published_at: '2024-01-15',
    reading_time: '8 min read',
    category: 'AC Maintenance',
    tags: ['AC Maintenance', 'Energy Saving', 'Home Improvement', 'HVAC Tips'],
    views: 1245,
    likes: 89
  };

  const relatedPosts = [
    {
      id: '2',
      title: 'How to Choose the Right AC Size for Your Room',
      slug: 'choose-right-ac-size',
      image: 'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      reading_time: '5 min read'
    },
    {
      id: '3',
      title: 'AC Energy Saving Tips for Summer',
      slug: 'ac-energy-saving-tips',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      reading_time: '6 min read'
    },
    {
      id: '4',
      title: 'Common AC Problems and Solutions',
      slug: 'common-ac-problems',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      reading_time: '7 min read'
    }
  ];

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blogPost.title;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(title + ' - ' + url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
    }
  };

  const handleBookService = () => {
    window.location.href = '/booking';
  };

  const handleContactWhatsApp = () => {
    const message = `Hi! I read your blog post "${blogPost.title}" and I'm interested in AC maintenance services. Can you help me?`;
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Back Navigation */}
      <div className="pt-20 pb-4 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto max-w-4xl">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-brand-blue hover:text-brand-blue/80 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <article className="container mx-auto max-w-4xl px-4 py-8">
        {/* Post Meta */}
        <div className="mb-6">
          <Badge className="mb-4 bg-brand-blue text-white">
            {blogPost.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {blogPost.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center">
              <img 
                src={blogPost.author_avatar} 
                alt={blogPost.author}
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="font-medium text-gray-900 dark:text-white">{blogPost.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(blogPost.published_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {blogPost.reading_time}
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              {blogPost.views} views
            </div>
            <div className="flex items-center">
              <ThumbsUp className="h-4 w-4 mr-2" />
              {blogPost.likes} likes
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {blogPost.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-gray-600 border-gray-300">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <img 
            src={blogPost.featured_image} 
            alt={blogPost.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Share Buttons */}
        <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <span className="font-medium text-gray-900 dark:text-white">Share this article:</span>
          <div className="flex gap-3">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleShare('whatsapp')}
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              WhatsApp
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleShare('facebook')}
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              Facebook
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleShare('twitter')}
              className="text-sky-600 border-sky-600 hover:bg-sky-50"
            >
              Twitter
            </Button>
          </div>
        </div>

        {/* Post Content */}
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-brand-blue to-brand-red rounded-lg p-8 text-center text-white mb-12">
          <h3 className="text-2xl font-bold mb-4">Need Professional AC Maintenance?</h3>
          <p className="text-lg mb-6 text-blue-100">
            Don't let your AC break down when you need it most. Our certified technicians provide comprehensive AC maintenance services in Rawalpindi and Islamabad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-brand-blue hover:bg-gray-100"
              onClick={handleBookService}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book AC Maintenance
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-brand-blue"
              onClick={handleContactWhatsApp}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Get Quote on WhatsApp
            </Button>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-brand-blue" />
            Related Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Link 
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-brand-blue transition-colors mb-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.reading_time}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <img 
              src={blogPost.author_avatar} 
              alt={blogPost.author}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{blogPost.author}</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                AC maintenance expert with over 10 years of experience in HVAC systems. Specializes in energy-efficient cooling solutions for residential and commercial properties in Pakistan.
              </p>
              <div className="flex gap-3">
                <Button size="sm" variant="outline">
                  <User className="h-3 w-3 mr-1" />
                  View Profile
                </Button>
                <Button size="sm" variant="outline">
                  More Articles
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
