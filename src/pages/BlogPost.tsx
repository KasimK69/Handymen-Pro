
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  author: string;
  category: string;
  tags: string[] | null;
  read_time: number;
  status: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data: postData, error: postError } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'active')
        .single();
      
      if (postError) throw postError;
      
      setPost(postData);

      // Fetch related posts from same category
      if (postData) {
        const { data: relatedData, error: relatedError } = await supabase
          .from('blogs')
          .select('*')
          .eq('status', 'active')
          .eq('category', postData.category)
          .neq('id', postData.id)
          .limit(3);
        
        if (!relatedError) {
          setRelatedPosts(relatedData || []);
        }
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const shareOnWhatsApp = () => {
    const url = window.location.href;
    const text = `Check out this article: ${post?.title}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnTwitter = () => {
    const url = window.location.href;
    const text = `Check out: ${post?.title}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-brand-blue hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <article className="py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link 
            to="/blog" 
            className="inline-flex items-center text-brand-blue hover:text-brand-blue/80 mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline">{post.category}</Badge>
              {post.featured && <Badge className="bg-brand-blue">Featured</Badge>}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {post.excerpt}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.read_time} min read</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share:
              </span>
              <Button variant="outline" size="sm" onClick={shareOnWhatsApp} className="text-green-600">
                WhatsApp
              </Button>
              <Button variant="outline" size="sm" onClick={shareOnFacebook} className="text-blue-600">
                <Facebook className="h-4 w-4 mr-1" />
                Facebook
              </Button>
              <Button variant="outline" size="sm" onClick={shareOnTwitter} className="text-blue-400">
                <Twitter className="h-4 w-4 mr-1" />
                Twitter
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          {post.image_url && (
            <div className="mb-8">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
              <div 
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-brand-blue hover:text-white transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      {relatedPost.image_url && (
                        <img
                          src={relatedPost.image_url}
                          alt={relatedPost.title}
                          className="w-full h-32 object-cover"
                        />
                      )}
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">
                          <Link 
                            to={`/blog/${relatedPost.slug}`} 
                            className="hover:text-brand-blue transition-colors"
                          >
                            {relatedPost.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{relatedPost.read_time} min read</span>
                          <Link 
                            to={`/blog/${relatedPost.slug}`}
                            className="text-brand-blue hover:underline"
                          >
                            Read more
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="mt-12 bg-gradient-to-r from-brand-blue to-blue-700 rounded-lg p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Need AC Services?</h3>
              <p className="mb-6">Get professional AC installation, repair, and maintenance services</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-blue" asChild>
                  <Link to="/services">View Services</Link>
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
