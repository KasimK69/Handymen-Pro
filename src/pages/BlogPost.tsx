
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, User, Share2, MessageCircle, Calendar } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
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
    const message = `Hi! I read your blog post "${post.title}" and I'm interested in your AC services. Can you provide more information about your services and pricing?`;
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-brand-blue to-brand-red text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {post.tags.map(tag => (
                <Badge key={tag} className="bg-white/20 text-white border-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/90">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{post.readTime}</span>
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
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div 
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="text-gray-700 dark:text-gray-300 leading-relaxed"
                />
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
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
                    className="bg-brand-red hover:bg-brand-red/90 text-white"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Book AC Service Now
                  </Button>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-12 bg-gradient-to-r from-brand-blue to-brand-red rounded-xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Need Professional AC Services?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Our expert technicians are ready to help with installation, repair, and maintenance services in Islamabad & Rawalpindi.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleBookService}
                    className="bg-white text-brand-blue hover:bg-gray-100"
                  >
                    Get AC Service Quote
                  </Button>
                  <Button 
                    asChild
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-brand-blue"
                  >
                    <Link to="/ac-buy-and-sale">
                      Browse AC Collection
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <Button asChild variant="outline">
                  <Link to="/blog">
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
