
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  category: string;
  tags: string[];
  read_time: number;
  created_at: string;
  updated_at: string;
}

interface BlogDetailProps {
  blog: BlogPost | null;
  error?: string;
}

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchBlog(slug);
    }
  }, [slug]);

  const fetchBlog = async (blogSlug: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', blogSlug)
        .eq('status', 'active')
        .single();

      if (error) {
        console.error('Error fetching blog:', error);
        setError('Blog post not found');
        return;
      }

      setBlog(data);
    } catch (error) {
      console.error('Error in fetchBlog:', error);
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The blog post you are looking for does not exist.'}</p>
          <Button>
            <Link to="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="outline">
            <Link to="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
          </Button>
        </div>

        {/* Blog Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {blog.image_url && (
            <div className="aspect-video w-full">
              <img 
                src={blog.image_url} 
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                {blog.category}
              </Badge>
              {blog.tags?.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(blog.created_at), 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{blog.read_time} min read</span>
              </div>
            </div>
            
            {blog.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed">
                {blog.excerpt}
              </p>
            )}
          </div>
        </div>

        {/* Blog Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Share Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Found this helpful?</h3>
          <div className="flex justify-center gap-4">
            <Button>
              <Link to="/contact">
                Get AC Services
              </Link>
            </Button>
            <Button variant="outline">
              <Link to="/blogs">
                Read More Blogs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
