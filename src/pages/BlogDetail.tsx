
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, User, Share2, MessageCircle, Calendar, Eye, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type BlogPost = Database['public']['Tables']['blogs']['Row'];

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlog(slug);
    }
  }, [slug]);

  const fetchBlog = async (blogSlug: string) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', blogSlug)
        .eq('status', 'active')
        .single();

      if (error) throw error;
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blog?.title || '';
    
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
    const message = `Hi! I read your blog post "${blog?.title}" and I'm interested in your AC maintenance services. Can you provide more information about your services and pricing?`;
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
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
                {blog.category}
              </Badge>
              {blog.tags && blog.tags.slice(0, 3).map(tag => (
                <Badge key={tag} className="bg-white/10 text-white border-white/20 px-3 py-1 text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/90 mb-8">
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <User className="h-5 w-5 mr-2" />
                <span className="font-medium">{blog.author}</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{new Date(blog.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <Clock className="h-5 w-5 mr-2" />
                <span>{blog.read_time} min read</span>
              </div>
            </div>

            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/blog">
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
              {blog.image_url && (
                <div className="mb-12 relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={blog.image_url} 
                    alt={blog.title}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              )}

              {/* Article Stats */}
              <div className="flex items-center justify-between mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
                <div className="flex items-center gap-6">
                  <div className="flex items-center text-gray-600">
                    <ThumbsUp className="h-5 w-5 mr-2 text-blue-600" />
                    <span className="font-medium">Like this post</span>
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
                <div className="prose prose-lg max-w-none">
                  {blog.excerpt && (
                    <p className="text-xl text-gray-600 mb-8 font-medium leading-relaxed">
                      {blog.excerpt}
                    </p>
                  )}
                  <div 
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                    className="text-gray-700 leading-relaxed"
                  />
                </div>
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
