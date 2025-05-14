
import React, { useState } from 'react';
import { 
  FileText, 
  Edit2, 
  Trash2, 
  Calendar, 
  Eye, 
  ArrowUpRight,
  PenLine, 
  Layout, 
  Tag,
  X,
  ImagePlus,
  Upload,
  Search,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ImageUploader from '@/components/admin/ImageUploader';

// Sample blog posts data
const samplePosts = [
  {
    id: '1',
    title: 'Ultimate Home Maintenance Checklist for Every Season',
    content: `<p>Keep your home in top condition year-round with this comprehensive seasonal maintenance checklist.</p><p>Regular maintenance not only helps prevent costly repairs but also extends the lifespan of your home's systems and appliances.</p><h3>Spring Maintenance</h3><ul><li>Check for winter damage</li><li>Clean gutters and downspouts</li><li>Inspect roof for damage</li><li>Schedule AC maintenance</li></ul>`,
    excerpt: 'Keep your home in top condition year-round with this comprehensive seasonal maintenance checklist.',
    slug: 'home-maintenance-checklist',
    published: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    category: 'Maintenance',
    author: 'Ahmed Khan',
    date: '2023-04-15T08:00:00.000Z',
    tags: ['maintenance', 'seasonal', 'home care'],
  },
  {
    id: '2',
    title: '5 DIY Plumbing Tips Every Homeowner Should Know',
    content: `<p>Learn simple plumbing techniques to handle common issues before calling a professional.</p><p>Knowing some basic plumbing skills can save you time and money when minor issues arise.</p><h3>Must-Know Plumbing Skills</h3><ul><li>How to shut off water valves</li><li>Unclogging drains naturally</li><li>Fixing a running toilet</li><li>Dealing with leaky faucets</li></ul>`,
    excerpt: 'Learn simple plumbing techniques to handle common issues before calling a professional.',
    slug: 'diy-plumbing-tips',
    published: true,
    featured: false,
    image: 'https://images.unsplash.com/photo-1558618666-176827a41dec',
    category: 'Plumbing',
    author: 'Sara Mahmood',
    date: '2023-03-22T10:30:00.000Z',
    tags: ['plumbing', 'DIY', 'home repair'],
  }
];

// Sample categories and statuses
const categories = [
  'All Categories',
  'Maintenance',
  'Plumbing',
  'Energy Efficiency',
  'Renovation',
  'AC',
  'DIY'
];

const statuses = [
  { value: 'all', label: 'All Status' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' }
];

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  published: boolean;
  featured: boolean;
  image: string;
  category: string;
  author: string;
  date: string;
  tags: string[];
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>(samplePosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [newPostForm, setNewPostForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    published: true,
    featured: false,
    image: '',
    category: 'Maintenance',
    author: 'Admin',
    tags: '',
  });

  // Filter posts based on search, category, and status
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;
    
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'published' && post.published) ||
                         (selectedStatus === 'draft' && !post.published);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: newPostForm.title,
      content: newPostForm.content,
      excerpt: newPostForm.excerpt || newPostForm.content.substring(0, 150) + '...',
      slug: newPostForm.slug || newPostForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      published: newPostForm.published,
      featured: newPostForm.featured,
      image: newPostForm.image || 'https://via.placeholder.com/800x450?text=Blog+Image',
      category: newPostForm.category,
      author: newPostForm.author,
      date: new Date().toISOString(),
      tags: newPostForm.tags.split(',').map(tag => tag.trim()),
    };
    
    setPosts([...posts, newPost]);
    setIsCreateDialogOpen(false);
    resetNewPostForm();
    
    toast({
      title: "Blog post created",
      description: "Your blog post has been created successfully.",
    });
  };

  const handleUpdatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPost) return;
    
    const updatedPost: BlogPost = {
      ...currentPost,
      title: newPostForm.title,
      content: newPostForm.content,
      excerpt: newPostForm.excerpt || newPostForm.content.substring(0, 150) + '...',
      slug: newPostForm.slug || newPostForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      published: newPostForm.published,
      featured: newPostForm.featured,
      image: newPostForm.image,
      category: newPostForm.category,
      author: newPostForm.author,
      tags: newPostForm.tags.split(',').map(tag => tag.trim()),
    };
    
    setPosts(posts.map(post => post.id === currentPost.id ? updatedPost : post));
    setIsEditDialogOpen(false);
    setCurrentPost(null);
    
    toast({
      title: "Blog post updated",
      description: "Your blog post has been updated successfully.",
    });
  };

  const handleDeletePost = () => {
    if (!currentPost) return;
    
    setPosts(posts.filter(post => post.id !== currentPost.id));
    setIsDeleteDialogOpen(false);
    setCurrentPost(null);
    
    toast({
      title: "Blog post deleted",
      description: "Your blog post has been deleted successfully.",
    });
  };

  const handleEditClick = (post: BlogPost) => {
    setCurrentPost(post);
    setNewPostForm({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      slug: post.slug,
      published: post.published,
      featured: post.featured,
      image: post.image,
      category: post.category,
      author: post.author,
      tags: post.tags.join(', '),
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (post: BlogPost) => {
    setCurrentPost(post);
    setIsDeleteDialogOpen(true);
  };

  const handlePreviewClick = (post: BlogPost) => {
    setCurrentPost(post);
    setIsPreviewDialogOpen(true);
  };

  const resetNewPostForm = () => {
    setNewPostForm({
      title: '',
      content: '',
      excerpt: '',
      slug: '',
      published: true,
      featured: false,
      image: '',
      category: 'Maintenance',
      author: 'Admin',
      tags: '',
    });
  };

  const handleImageSelected = (imageUrl: string) => {
    setNewPostForm({
      ...newPostForm,
      image: imageUrl
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground">
            Create, edit and manage your blog posts
          </p>
        </div>
        
        <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-brand-blue hover:bg-brand-blue/90">
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search posts..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map(status => (
              <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {filteredPosts.length === 0 ? (
        <Card className="text-center p-8">
          <div className="flex flex-col items-center gap-2">
            <FileText className="h-10 w-10 text-gray-400" />
            <h3 className="text-lg font-semibold">No blog posts found</h3>
            <p className="text-muted-foreground max-w-sm">
              No posts match your current filters. Try changing your search query or filters.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/4 h-full">
                  <AspectRatio ratio={16/9} className="md:h-full bg-muted">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Blog+Image';
                      }}
                    />
                  </AspectRatio>
                </div>
                <CardContent className="p-6 md:w-3/4 space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {post.featured && (
                          <Badge className="bg-amber-500">Featured</Badge>
                        )}
                        <Badge variant={post.published ? "default" : "outline"}>
                          {post.published ? 'Published' : 'Draft'}
                        </Badge>
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                      <p className="text-muted-foreground line-clamp-1">
                        {post.excerpt}
                      </p>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <span className="sr-only">Open menu</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handlePreviewClick(post)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClick(post)}>
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                            <ArrowUpRight className="mr-2 h-4 w-4" />
                            View on site
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600 focus:text-red-600" 
                          onClick={() => handleDeleteClick(post)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="pt-4 flex flex-wrap gap-3 justify-between items-center border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    
                    <div className="flex gap-1 flex-wrap">
                      {post.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{post.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {/* Create Post Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Blog Post</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new blog post.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreatePost} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 col-span-1 md:col-span-2">
                <Label htmlFor="title">Blog Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter post title"
                  value={newPostForm.title}
                  onChange={(e) => setNewPostForm({...newPostForm, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-4 md:col-span-2">
                <Label>Featured Image</Label>
                <ImageUploader
                  onImageSelected={handleImageSelected}
                  defaultImage={newPostForm.image}
                  aspectRatio="wide"
                />
              </div>
              
              <div className="space-y-4 md:col-span-2">
                <Label htmlFor="content">Blog Content</Label>
                <Textarea 
                  id="content"
                  placeholder="Write your blog post content here..."
                  className="min-h-32"
                  value={newPostForm.content}
                  onChange={(e) => setNewPostForm({...newPostForm, content: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="excerpt">Excerpt (optional)</Label>
                <Textarea 
                  id="excerpt"
                  placeholder="Brief summary of the post"
                  value={newPostForm.excerpt}
                  onChange={(e) => setNewPostForm({...newPostForm, excerpt: e.target.value})}
                />
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="slug">URL Slug (optional)</Label>
                <div className="flex">
                  <span className="bg-gray-100 dark:bg-gray-800 px-3 py-2 text-gray-500 border border-r-0 rounded-l-md">
                    /blog/
                  </span>
                  <Input 
                    id="slug"
                    placeholder="your-post-url"
                    value={newPostForm.slug}
                    onChange={(e) => setNewPostForm({...newPostForm, slug: e.target.value})}
                    className="rounded-l-none"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={newPostForm.category} 
                  onValueChange={(value) => setNewPostForm({...newPostForm, category: value})}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c !== 'All Categories').map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="author">Author</Label>
                <Input 
                  id="author"
                  placeholder="Post author"
                  value={newPostForm.author}
                  onChange={(e) => setNewPostForm({...newPostForm, author: e.target.value})}
                />
              </div>
              
              <div className="space-y-4 md:col-span-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input 
                  id="tags"
                  placeholder="maintenance, seasonal, home care"
                  value={newPostForm.tags}
                  onChange={(e) => setNewPostForm({...newPostForm, tags: e.target.value})}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="published" 
                    checked={newPostForm.published}
                    onCheckedChange={(checked) => 
                      setNewPostForm({...newPostForm, published: checked as boolean})
                    }
                  />
                  <Label htmlFor="published" className="cursor-pointer">Published</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="featured" 
                    checked={newPostForm.featured}
                    onCheckedChange={(checked) => 
                      setNewPostForm({...newPostForm, featured: checked as boolean})
                    }
                  />
                  <Label htmlFor="featured" className="cursor-pointer">Featured</Label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Post</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Post Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>
              Make changes to your blog post below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdatePost} className="space-y-6">
            {/* Same form fields as create, but pre-filled */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 col-span-1 md:col-span-2">
                <Label htmlFor="edit-title">Blog Title</Label>
                <Input 
                  id="edit-title" 
                  placeholder="Enter post title"
                  value={newPostForm.title}
                  onChange={(e) => setNewPostForm({...newPostForm, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-4 md:col-span-2">
                <Label>Featured Image</Label>
                <ImageUploader
                  onImageSelected={handleImageSelected}
                  defaultImage={newPostForm.image}
                  aspectRatio="wide"
                />
              </div>
              
              <div className="space-y-4 md:col-span-2">
                <Label htmlFor="edit-content">Blog Content</Label>
                <Textarea 
                  id="edit-content"
                  placeholder="Write your blog post content here..."
                  className="min-h-32"
                  value={newPostForm.content}
                  onChange={(e) => setNewPostForm({...newPostForm, content: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="edit-excerpt">Excerpt (optional)</Label>
                <Textarea 
                  id="edit-excerpt"
                  placeholder="Brief summary of the post"
                  value={newPostForm.excerpt}
                  onChange={(e) => setNewPostForm({...newPostForm, excerpt: e.target.value})}
                />
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="edit-slug">URL Slug</Label>
                <div className="flex">
                  <span className="bg-gray-100 dark:bg-gray-800 px-3 py-2 text-gray-500 border border-r-0 rounded-l-md">
                    /blog/
                  </span>
                  <Input 
                    id="edit-slug"
                    placeholder="your-post-url"
                    value={newPostForm.slug}
                    onChange={(e) => setNewPostForm({...newPostForm, slug: e.target.value})}
                    className="rounded-l-none"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="edit-category">Category</Label>
                <Select 
                  value={newPostForm.category} 
                  onValueChange={(value) => setNewPostForm({...newPostForm, category: value})}
                >
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c !== 'All Categories').map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="edit-author">Author</Label>
                <Input 
                  id="edit-author"
                  placeholder="Post author"
                  value={newPostForm.author}
                  onChange={(e) => setNewPostForm({...newPostForm, author: e.target.value})}
                />
              </div>
              
              <div className="space-y-4 md:col-span-2">
                <Label htmlFor="edit-tags">Tags (comma separated)</Label>
                <Input 
                  id="edit-tags"
                  placeholder="maintenance, seasonal, home care"
                  value={newPostForm.tags}
                  onChange={(e) => setNewPostForm({...newPostForm, tags: e.target.value})}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="edit-published" 
                    checked={newPostForm.published}
                    onCheckedChange={(checked) => 
                      setNewPostForm({...newPostForm, published: checked as boolean})
                    }
                  />
                  <Label htmlFor="edit-published" className="cursor-pointer">Published</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="edit-featured" 
                    checked={newPostForm.featured}
                    onCheckedChange={(checked) => 
                      setNewPostForm({...newPostForm, featured: checked as boolean})
                    }
                  />
                  <Label htmlFor="edit-featured" className="cursor-pointer">Featured</Label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Post</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted p-3 rounded-md">
            {currentPost && (
              <>
                <h4 className="font-semibold">{currentPost.title}</h4>
                <p className="text-sm text-muted-foreground">{currentPost.excerpt}</p>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePost}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview Blog Post</DialogTitle>
          </DialogHeader>
          {currentPost && (
            <div className="mt-4 space-y-6">
              <AspectRatio ratio={21/9} className="overflow-hidden rounded-md bg-muted">
                <img
                  src={currentPost.image}
                  alt={currentPost.title}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/1200x630?text=Blog+Header+Image';
                  }}
                />
              </AspectRatio>
              
              <div className="flex flex-wrap gap-2">
                <Badge>{currentPost.category}</Badge>
                {currentPost.featured && <Badge variant="secondary">Featured</Badge>}
                <Badge variant={currentPost.published ? "default" : "outline"}>
                  {currentPost.published ? 'Published' : 'Draft'}
                </Badge>
              </div>
              
              <h1 className="text-3xl font-bold">{currentPost.title}</h1>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(currentPost.date)}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {currentPost.author}
                </div>
              </div>
              
              <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: currentPost.content }} />
              
              <div className="pt-4 border-t flex flex-wrap gap-2">
                {currentPost.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-sm">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>
              Close Preview
            </Button>
            {currentPost && (
              <Button asChild>
                <a href={`/blog/${currentPost.slug}`} target="_blank" rel="noopener noreferrer">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  View on Site
                </a>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blog;
