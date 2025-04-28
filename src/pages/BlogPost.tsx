
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock blog post data
const blogPostsData = {
  'home-maintenance-checklist': {
    title: 'Ultimate Home Maintenance Checklist for Every Season',
    date: 'April 15, 2023',
    author: 'Ahmed Khan',
    category: 'Maintenance',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    content: `
      <p class="lead">Maintaining your home throughout the year not only preserves its value but also prevents costly repairs. This comprehensive checklist will help you stay on top of seasonal maintenance tasks.</p>
      
      <h2>Spring Maintenance Tasks</h2>
      <p>As the weather warms up, it's time to inspect winter damage and prepare for summer:</p>
      <ul>
        <li>Inspect and clean gutters and downspouts</li>
        <li>Check for roof damage from winter storms</li>
        <li>Examine exterior for paint damage or cracks</li>
        <li>Service your air conditioning system</li>
        <li>Clean window screens and check for damage</li>
        <li>Inspect for pest infestations as temperatures rise</li>
      </ul>
      
      <h2>Summer Maintenance Tasks</h2>
      <p>Focus on outdoor areas and keeping your home cool:</p>
      <ul>
        <li>Check irrigation systems and garden hoses</li>
        <li>Clean and repair decks, patios, and outdoor furniture</li>
        <li>Inspect pools and water features</li>
        <li>Clean AC filters monthly during heavy use periods</li>
        <li>Check weather stripping on doors and windows</li>
        <li>Trim trees and shrubs away from the house</li>
      </ul>
      
      <h2>Fall Maintenance Tasks</h2>
      <p>Prepare your home for colder weather:</p>
      <ul>
        <li>Have your heating system inspected and serviced</li>
        <li>Clean chimneys and flues if you have a fireplace</li>
        <li>Seal cracks and gaps in windows and doors</li>
        <li>Clean gutters after leaves have fallen</li>
        <li>Drain and shut off outdoor water sources</li>
        <li>Check insulation in attic and crawl spaces</li>
      </ul>
      
      <h2>Winter Maintenance Tasks</h2>
      <p>Focus on indoor projects and preventing winter damage:</p>
      <ul>
        <li>Check for ice dams and icicles</li>
        <li>Test smoke and carbon monoxide detectors</li>
        <li>Inspect holiday light cords for damage</li>
        <li>Monitor your water heater for leaks</li>
        <li>Keep paths clear of snow and ice</li>
        <li>Check for drafts around windows and doors</li>
      </ul>
      
      <h2>Monthly Maintenance Tasks</h2>
      <p>Some tasks should be performed regularly regardless of season:</p>
      <ul>
        <li>Test smoke and carbon monoxide detectors</li>
        <li>Check and replace HVAC filters</li>
        <li>Clean kitchen sink disposal</li>
        <li>Clean kitchen hood filters</li>
        <li>Inspect plumbing for leaks</li>
      </ul>
      
      <p>By following this seasonal maintenance checklist, you'll keep your home in excellent condition throughout the year and catch small issues before they become major problems.</p>
      
      <p>Remember, when in doubt about any home maintenance task, it's always best to consult with a professional.</p>
    `
  },
  // Add other blog posts as needed
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPostsData[slug as keyof typeof blogPostsData] : null;

  if (!post) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="mb-8">The article you're looking for doesn't exist or has been moved.</p>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative py-32 bg-cover bg-center" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(29, 53, 87, 0.9), rgba(29, 53, 87, 0.7)), url(${post.image})` 
        }}
      >
        <div className="container mx-auto text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4">
            <span>By {post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.category}</span>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="flex items-center text-brand-blue mb-8 hover:text-brand-red transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
            
            <div className="prose dark:prose-invert prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            
            {/* Author Bio */}
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-bold mb-4">About the Author</h3>
              <div className="flex items-start">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                  alt={post.author}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">{post.author}</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Ahmed is a home improvement specialist with over 10 years of experience in residential maintenance and repairs. 
                    He's passionate about helping homeowners maintain their properties effectively.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Share Buttons */}
            <div className="mt-8 flex items-center">
              <span className="mr-4 font-bold">Share:</span>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <span className="sr-only">Share on Facebook</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <span className="sr-only">Share on Twitter</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <span className="sr-only">Share via Email</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">You Might Also Like</h2>
          
          <div className="flex justify-center">
            <Link to="/blog" className="btn-outline">
              Read More Articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
