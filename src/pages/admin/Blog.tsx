import React, { useState } from 'react';
import { 
  FileText, 
  PlusCircle, 
  Edit, 
  Trash2, 
  ChevronDown,
  Eye,
  Calendar,
  Tag,
  X,
  ImagePlus,
  Upload,
  Search,  // Added Search import
  Plus     // Added Plus import
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import ImageUploader from '@/components/admin/ImageUploader';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Sample blog post data for demonstration
const initialBlogPosts = [
  {
    id: 'blog-001',
    title: 'How to Choose the Right AC for Your Home',
    slug: 'how-to-choose-the-right-ac',
    excerpt: 'Learn the key factors to consider when selecting an air conditioning unit for your home.',
    content: `
      <p>Selecting the right air conditioning unit for your home is a crucial decision that affects your comfort and energy bills. This guide will help you understand the key factors to consider.</p>
      <h2>Understand AC Capacity and Room Size</h2>
      <p>The first step is to calculate the required cooling capacity based on your room size. As a general rule:</p>
      <ul>
        <li>For rooms up to 150 sq ft: 1 ton AC</li>
        <li>For rooms between 150-250 sq ft: 1.5 ton AC</li>
        <li>For rooms between 250-400 sq ft: 2 ton AC</li>
      </ul>
      <h2>Inverter vs. Non-inverter Technology</h2>
      <p>Inverter ACs adjust their speed based on the required cooling, leading to energy savings of up to 30-50% compared to non-inverter models.</p>
      <h2>Energy Efficiency Ratings</h2>
      <p>Check the Energy Efficiency Ratio (EER) or Seasonal Energy Efficiency Ratio (SEER) ratings. Higher ratings mean better efficiency.</p>
      <h2>Additional Features to Consider</h2>
      <ul>
        <li>Air purification filters</li>
        <li>Sleep mode functionality</li>
        <li>Noise levels</li>
        <li>Smart connectivity options</li>
        <li>Warranty coverage</li>
      </ul>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    publishDate: '2023-03-15T10:00:00',
    author: 'Admin User',
    tags: ['AC Tips', 'Buying Guide', 'Energy Efficiency'],
    status: 'published',
    views: 1245
  },
  {
    id: 'blog-002',
    title: '5 AC Maintenance Tips for Summer',
    slug: 'ac-maintenance-tips-for-summer',
    excerpt: 'Regular maintenance can extend the life of your AC and improve its efficiency. Here are 5 essential tips.',
    content: `
      <p>Regular maintenance of your air conditioner not only ensures optimal performance but also extends its lifespan and reduces energy consumption. Here are five essential AC maintenance tips for the summer season.</p>
      <h2>1. Clean or Replace Air Filters Monthly</h2>
      <p>Dirty filters restrict airflow and reduce system efficiency. Clean or replace them every 1-2 months during heavy use periods.</p>
      <h2>2. Keep the Outdoor Unit Clean</h2>
      <p>Clear debris, leaves, and dirt from around the outdoor condensing unit. Ensure there's at least 2 feet of clear space around it for proper airflow.</p>
      <h2>3. Check and Clean the Evaporator Coil</h2>
      <p>The indoor evaporator coil can collect dirt over time, reducing airflow and insulating the coil, which reduces its ability to absorb heat.</p>
      <h2>4. Inspect Refrigerant Lines</h2>
      <p>Check the refrigerant lines for any signs of wear or damage. Any leaks should be addressed immediately by a professional.</p>
      <h2>5. Schedule Professional Maintenance</h2>
      <p>Have a professional HVAC technician inspect and service your unit before the summer season begins. They can identify and fix potential issues before they become major problems.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    publishDate: '2023-04-05T14:30:00',
    author: 'Admin User',
    tags: ['AC Maintenance', 'Summer Tips', 'Energy Savings'],
    status: 'published',
    views: 876
  },
  {
    id: 'blog-003',
    title: 'Benefits of Smart Air Conditioners',
    slug: 'benefits-of-smart-air-conditioners',
    excerpt: 'Smart ACs offer convenience, energy savings, and improved comfort. Discover the advantages of upgrading.',
    content: `
      <p>Smart air conditioners are revolutionizing home cooling by offering unprecedented control, automation, and energy efficiency. Here's why you might want to consider upgrading to a smart AC system.</p>
      <h2>Remote Control and Monitoring</h2>
      <p>Control your AC from anywhere using smartphone apps. Adjust temperature, set schedules, and monitor energy usage remotely.</p>
      <h2>Automated Temperature Control</h2>
      <p>Smart ACs can learn your preferences and automatically adjust settings based on time of day, occupancy, or even local weather forecasts.</p>
      <h2>Integration with Smart Home Ecosystems</h2>
      <p>Most smart ACs work with popular smart home platforms like Google Home, Amazon Alexa, and Apple HomeKit, allowing for voice control and automated routines.</p>
      <h2>Energy Savings</h2>
      <p>By optimizing cooling cycles and preventing unnecessary operation, smart ACs can reduce energy consumption by up to 25% compared to traditional units.</p>
      <h2>Maintenance Alerts and Diagnostics</h2>
      <p>Many smart AC systems can detect issues early and send maintenance alerts, helping you address problems before they lead to major failures.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1563351672-62b74891a28a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    publishDate: '2023-04-18T09:15:00',
    author: 'Admin User',
    tags: ['Smart AC', 'Technology', 'Energy Efficiency'],
    status: 'draft',
    views: 0
  }
];

const BlogAdmin = () => {
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // New blog post form state
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    author: 'Admin User',
    tags: [''],
    status: 'draft',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from title
    if (name === 'title' && !editMode) {
      const slug = value.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setFormData(prev => ({ ...prev, [name]: value, slug }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleTagChange = (index: number, value: string) => {
    const updatedTags = [...formData.tags];
    updatedTags[index] = value;
    setFormData(prev => ({ ...prev, tags: updatedTags }));
  };
  
  const addTag = () => {
    setFormData(prev => ({ ...prev, tags: [...prev.tags, ''] }));
  };
  
  const removeTag = (index: number) => {
    const updatedTags = [...formData.tags];
    updatedTags.splice(index, 1);
    setFormData(prev => ({ ...prev, tags: updatedTags }));
  };
  
  const handleImageSelected = (url: string) => {
    setFormData(prev => ({ ...prev, featuredImage: url }));
  };
  
  const openNewPostDialog = () => {
    setEditMode(false);
    setCurrentPost(null);
    setFormData({
      id: '',
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      author: 'Admin User',
      tags: [''],
      status: 'draft',
    });
    setIsDialogOpen(true);
  };
  
  const openEditPostDialog = (post: any) => {
    setEditMode(true);
    setCurrentPost(post);
    setFormData({
      ...post,
      tags: [...post.tags] // Create a copy of tags array
    });
    setIsDialogOpen(true);
  };
  
  const openDeleteDialog = (post: any) => {
    setCurrentPost(post);
    setIsDeleteDialogOpen(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = new Date().toISOString();
    const postData = {
      ...formData,
      id: formData.id || `blog-${Date.now()}`,
      publishDate: editMode ? currentPost.publishDate : now,
      views: editMode ? currentPost.views : 0
    };
    
    if (editMode) {
      // Update existing post
      setBlogPosts(prev => 
        prev.map(post => 
          post.id === currentPost.id ? postData : post
        )
      );
      toast({
        title: "Blog Post Updated",
        description: `"${postData.title}" has been updated successfully.`,
      });
    } else {
      // Add new post
      setBlogPosts(prev => [...prev, postData]);
      toast({
        title: "Blog Post Created",
        description: `"${postData.title}" has been created successfully.`,
      });
    }
    
    setIsDialogOpen(false);
  };
  
  const handleDelete = () => {
    setBlogPosts(prev => prev.filter(post => post.id !== currentPost.id));
    toast({
      title: "Blog Post Deleted",
      description: `"${currentPost.title}" has been deleted successfully.`,
      variant: "destructive"
    });
    setIsDeleteDialogOpen(false);
  };
  
  const togglePostStatus = (id: string) => {
    setBlogPosts(prev => 
      prev.map(post => 
        post.id === id ? 
          { ...post, status: post.status === 'published' ? 'draft' : 'published' } 
          : post
      )
    );
    
    const post = blogPosts.find(post => post.id === id);
    const newStatus = post?.status === 'published' ? 'draft' : 'published';
    
    toast({
      title: `Post ${newStatus === 'published' ? 'Published' : 'Unpublished'}`,
      description: `"${post?.title}" is now ${newStatus}.`,
    });
  };
  
  // Filter posts based on search query
  const filteredPosts = blogPosts.filter(post => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });
  
  // Sort posts by publish date (newest first)
  const sortedPosts = [...filteredPosts].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        
        <Button onClick={openNewPostDialog}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Post
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
            <div>
              <CardTitle>All Blog Posts</CardTitle>
              <CardDescription>
                You have {blogPosts.length} posts in total
              </CardDescription>
            </div>
            
            <div className="w-full md:w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPosts.length > 0 ? (
                  sortedPosts.map(post => (
                    <TableRow key={post.id}>
                      <TableCell>
                        {post.featuredImage ? (
                          <div className="w-16 h-16 rounded overflow-hidden">
                            <img 
                              src={post.featuredImage} 
                              alt={post.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                console.error("Image failed to load");
                                e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center">
                            <FileText className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-gray-500 truncate" style={{maxWidth: "300px"}}>
                          {post.excerpt}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-100 dark:bg-gray-800">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={post.status === 'published' ? 'bg-green-500' : 'bg-amber-500'}>
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {formatDate(post.publishDate)}
                      </TableCell>
                      <TableCell>
                        {post.views.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => togglePostStatus(post.id)}>
                              {post.status === 'published' ? (
                                <>
                                  <X className="mr-2 h-4 w-4" />
                                  Unpublish
                                </>
                              ) : (
                                <>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Publish
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditPostDialog(post)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDeleteDialog(post)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center">
                        <FileText className="h-12 w-12 text-gray-300 mb-2" />
                        <h3 className="text-lg font-medium">No blog posts found</h3>
                        <p className="text-gray-500">
                          {searchQuery 
                            ? "Try adjusting your search query" 
                            : "Create your first blog post by clicking the button above"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Add/Edit Blog Post Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editMode ? 'Edit Blog Post' : 'Create New Blog Post'}
            </DialogTitle>
            <DialogDescription>
              {editMode 
                ? 'Update the details of your blog post.' 
                : 'Fill out the form below to create a new blog post.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6 py-2">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  The slug will be used in the URL: yoursite.com/blog/{formData.slug}
                </p>
              </div>
              
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={2}
                  required
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  A brief summary of your post that will appear in blog listings
                </p>
              </div>
              
              <div>
                <Label className="mb-2 block">Featured Image</Label>
                <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-800">
                  <div className="mb-4">
                    {formData.featuredImage ? (
                      <div className="relative">
                        <AspectRatio ratio={16/9} className="bg-muted overflow-hidden rounded-md mb-2">
                          <img 
                            src={formData.featuredImage} 
                            alt="Featured preview" 
                            className="object-cover w-full h-full"
                            onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found')}
                          />
                        </AspectRatio>
                        <Button 
                          type="button"
                          variant="destructive" 
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md bg-white dark:bg-gray-900">
                        <ImagePlus className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm font-medium mb-1">No featured image selected</p>
                        <p className="text-xs text-gray-500 mb-3 text-center">
                          Upload an image or provide a URL for your featured image
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <ImageUploader
                    onImageSelected={handleImageSelected}
                    defaultImage={formData.featuredImage}
                    aspectRatio="wide"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="content">Content (HTML)</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={10}
                  required
                  className="mt-1 font-mono text-sm"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Tags</Label>
                  <Button type="button" size="sm" variant="outline" onClick={addTag}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Tag
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={tag}
                        onChange={(e) => handleTagChange(index, e.target.value)}
                        placeholder={`Tag ${index + 1}`}
                      />
                      {formData.tags.length > 1 && (
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="ghost" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeTag(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Label htmlFor="status">Publish post</Label>
                <Switch
                  id="status"
                  checked={formData.status === "published"}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, status: checked ? "published" : "draft" }))
                  }
                />
                <span className="text-sm text-muted-foreground ml-1">
                  {formData.status === "published" ? "Published" : "Draft"}
                </span>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editMode ? 'Save Changes' : 'Create Post'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the blog post <strong>"{currentPost?.title}"</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogAdmin;
