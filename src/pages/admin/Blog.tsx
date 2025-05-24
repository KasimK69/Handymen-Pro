
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ImageUploader from '@/components/admin/ImageUploader';

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

const BlogAdminPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("Admin");
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState("");
  const [readTime, setReadTime] = useState(5);
  const [status, setStatus] = useState("active");
  const [featured, setFeatured] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blog posts.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const resetForm = () => {
    setTitle("");
    setExcerpt("");
    setContent("");
    setImageUrl("");
    setAuthor("Admin");
    setCategory("General");
    setTags("");
    setReadTime(5);
    setStatus("active");
    setFeatured(false);
    setEditingPost(null);
    setIsCreating(false);
  };

  const handleSavePost = async () => {
    if (!title || !content) {
      toast({
        title: "Error",
        description: "Please fill in title and content.",
        variant: "destructive",
      });
      return;
    }

    const slug = generateSlug(title);
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];

    const postData = {
      title,
      slug,
      excerpt,
      content,
      image_url: imageUrl || null,
      author,
      category,
      tags: tagsArray,
      read_time: readTime,
      status,
      featured,
    };

    try {
      if (editingPost) {
        const { error } = await supabase
          .from('blogs')
          .update(postData)
          .eq('id', editingPost.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Blog post updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([postData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Blog post created successfully.",
        });
      }

      fetchPosts();
      resetForm();
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post.",
        variant: "destructive",
      });
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setExcerpt(post.excerpt || "");
    setContent(post.content);
    setImageUrl(post.image_url || "");
    setAuthor(post.author);
    setCategory(post.category);
    setTags(post.tags ? post.tags.join(', ') : "");
    setReadTime(post.read_time);
    setStatus(post.status);
    setFeatured(post.featured);
    setIsCreating(true);
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Blog post deleted successfully.",
      });
      
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post.",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Blog Management</CardTitle>
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-brand-blue hover:bg-brand-blue/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Post
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={isCreating ? "create" : "manage"} value={isCreating ? "create" : "manage"}>
            <TabsList>
              <TabsTrigger value="manage" onClick={() => setIsCreating(false)}>Manage Posts</TabsTrigger>
              <TabsTrigger value="create" onClick={() => setIsCreating(true)}>
                {editingPost ? 'Edit Post' : 'Create Post'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="create" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      placeholder="Enter category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief description of the post"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="min-h-[60px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter content (HTML supported)"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>
                
                <div>
                  <Label>Featured Image</Label>
                  <ImageUploader onImageSelected={handleImageUpload} />
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Blog post"
                      className="mt-2 rounded-md max-w-xs"
                    />
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      placeholder="tag1, tag2, tag3"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="readTime">Read Time (minutes)</Label>
                    <Input
                      id="readTime"
                      type="number"
                      value={readTime}
                      onChange={(e) => setReadTime(parseInt(e.target.value) || 5)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={featured}
                      onCheckedChange={setFeatured}
                    />
                    <Label htmlFor="featured">Featured Post</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={status === 'active'}
                      onCheckedChange={(checked) => setStatus(checked ? 'active' : 'inactive')}
                    />
                    <Label htmlFor="active">Active</Label>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={handleSavePost} className="bg-brand-blue hover:bg-brand-blue/90">
                    {editingPost ? 'Update Post' : 'Create Post'}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="manage" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search posts..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid gap-4">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{post.title}</h3>
                            {post.featured && <Badge variant="secondary">Featured</Badge>}
                            <Badge variant={post.status === 'active' ? 'default' : 'secondary'}>
                              {post.status}
                            </Badge>
                          </div>
                          
                          {post.image_url && (
                            <img
                              src={post.image_url}
                              alt={post.title}
                              className="w-20 h-20 object-cover rounded mb-2 float-left mr-4"
                            />
                          )}
                          
                          <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>By {post.author}</span>
                            <span>{post.category}</span>
                            <span>{post.read_time} min read</span>
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 ml-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEditPost(post)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredPosts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No blog posts found.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogAdminPage;
