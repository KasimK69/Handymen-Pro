
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, Share2, ArrowLeft, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/hooks/use-toast';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  author: string;
  category: string;
  tags: string[] | null;
  read_time: number;
  featured: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  slug: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'active')
        .single();
      
      if (error) throw error;
      setPost(data);
      
      // Fetch related posts
      if (data) {
        const { data: related } = await supabase
          .from('blogs')
          .select('*')
          .eq('status', 'active')
          .eq('category', data.category)
          .neq('id', data.id)
          .limit(3);
        
        setRelatedPosts(related || []);
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      toast({
        title: "Error",
        description: "Failed to load blog post.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';
    
    let shareUrl = '';
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' - ' + url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  const handleGetQuote = () => {
    const message = `Hi! I read your blog post "${post?.title}" and I'm interested in your AC services. Can you provide more information?`;
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-24">
        <div className="w-full px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-24">
        <div className="w-full px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/blog" className="btn-primary">
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="pt-24 pb-8">
        <div className="w-full px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link 
              to="/blog" 
              className="inline-flex items-center text-brand-blue hover:text-brand-blue/80 mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
            
            {/* Post Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Badge className="bg-brand-blue text-white">
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge className="bg-brand-red text-white">
                    Featured
                  </Badge>
                )}
                {post.tags && post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
              
              {/* Post Meta */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(post.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{post.read_time} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image_url && (
        <section className="pb-12">
          <div className="w-full px-4 mx-auto">
            <div className="max-w-5xl mx-auto">
              <div className="aspect-video overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src={post.image_url} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="pb-16">
        <div className="w-full px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Blog Content */}
              <div className="lg:col-span-3">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div 
                    dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
                    className="text-gray-700 dark:text-gray-300 leading-relaxed"
                  />
                </div>
                
                {/* Share Buttons */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShare('whatsapp')}
                      className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShare('facebook')}
                      className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShare('twitter')}
                      className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* CTA Card */}
                  <Card className="bg-gradient-to-br from-brand-blue to-brand-red text-white border-0">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-bold text-lg mb-3">Need AC Service?</h3>
                      <p className="text-blue-100 mb-4 text-sm">
                        Get professional AC installation, repair, and maintenance services.
                      </p>
                      <div className="space-y-2">
                        <Button 
                          className="w-full bg-white text-brand-blue hover:bg-gray-100"
                          onClick={handleGetQuote}
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Get Quote
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full border-white text-white hover:bg-white hover:text-brand-blue"
                          asChild
                        >
                          <Link to="/booking">
                            Book Service
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Contact Card */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-4">Emergency Service</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-brand-red mr-2" />
                          <div>
                            <a href="tel:+923125242182" className="font-medium text-brand-red hover:underline">
                              +92 312 5242182
                            </a>
                            <p className="text-xs text-gray-500">24/7 Available</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Quick response for urgent AC repairs in Rawalpindi & Islamabad
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="w-full px-4 mx-auto">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                    {relatedPost.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={relatedPost.image_url} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <Badge className="mb-3 bg-brand-blue text-white">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-bold mb-2 line-clamp-2">
                        <Link to={`/blog/${relatedPost.slug}`} className="hover:text-brand-blue transition-colors">
                          {relatedPost.title}
                        </Link>
                      </h3>
                      {relatedPost.excerpt && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                          {relatedPost.excerpt}
                        </p>
                      )}
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {relatedPost.read_time} min read
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 bg-brand-blue text-white">
        <div className="w-full px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Book Your AC Service?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Don't wait for your AC to break down. Schedule professional maintenance and repairs today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-brand-red hover:bg-brand-red/90 text-white"
                asChild
              >
                <Link to="/booking">
                  Book Service Now
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-brand-blue"
                onClick={handleGetQuote}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Get Free Quote
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
