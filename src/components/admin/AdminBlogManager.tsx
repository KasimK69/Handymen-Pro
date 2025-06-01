
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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
import { Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
  status: 'published' | 'draft';
  readTime: number;
  createdAt: string;
  updatedAt: string;
}

const AdminBlogManager = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Top 5 Tips for Maintaining Your Air Conditioner',
      slug: 'top-5-tips-maintaining-air-conditioner',
      excerpt: 'Keep your AC running efficiently with these essential maintenance tips that will save you money and extend your unit\'s lifespan.',
      content: `# Top 5 Tips for Maintaining Your Air Conditioner

Regular maintenance is crucial for keeping your air conditioner running efficiently and extending its lifespan. Here are the top 5 tips every homeowner should follow:

## 1. Replace Air Filters Regularly

Clean air filters are essential for proper airflow and indoor air quality. Replace or clean filters every 1-3 months depending on usage.

## 2. Keep the Outdoor Unit Clean

Remove debris, leaves, and dirt from around your outdoor unit. Maintain at least 2 feet of clearance on all sides.

## 3. Check and Clean Coils

Both evaporator and condenser coils should be cleaned annually to maintain efficiency and prevent ice buildup.

## 4. Inspect Ductwork

Look for leaks, damage, or disconnected ducts that can reduce efficiency and increase energy costs.

## 5. Schedule Professional Maintenance

Have a certified technician inspect your system annually to catch potential issues early and keep your warranty valid.

Following these simple maintenance tips can improve your AC's efficiency by up to 15% and prevent costly repairs down the road.`,
      author: 'AC Services Team',
      category: 'Maintenance',
      tags: ['maintenance', 'tips', 'efficiency', 'DIY'],
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
      status: 'published',
      readTime: 5,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Best AC Models for Pakistani Summers in 2024',
      slug: 'best-ac-models-pakistani-summers-2024',
      excerpt: 'Discover the most efficient and reliable air conditioner models perfect for Pakistan\'s hot climate and load-shedding challenges.',
      content: `# Best AC Models for Pakistani Summers in 2024

Pakistan's extreme summer heat requires reliable and efficient air conditioning. Here are our top picks for 2024:

## Inverter Technology Leaders

### 1. Samsung Digital Inverter Series
- Energy efficient with up to 60% power savings
- Operates on low voltage during load-shedding
- 5-year warranty on inverter compressor

### 2. LG Dual Cool Inverter
- Fast cooling with energy efficiency
- Stabilizer-free operation
- Wi-Fi connectivity for smart control

### 3. Haier DC Inverter Series
- Made specifically for Pakistani climate
- Robust build quality for frequent power fluctuations
- Affordable pricing with good features

## Best Features for Pakistan

- **Voltage Protection**: Essential for power fluctuations
- **Fast Cooling**: Quick temperature reduction in extreme heat
- **Energy Efficiency**: Lower electricity bills
- **Copper Coils**: Better heat transfer and durability

## Size Recommendations

- **1 Ton**: Rooms up to 120 sq ft
- **1.5 Ton**: Rooms 120-160 sq ft  
- **2 Ton**: Rooms 160-200 sq ft

Choose based on room size, insulation, and sun exposure for optimal cooling performance.`,
      author: 'AC Services Team',
      category: 'Buying Guide',
      tags: ['buying guide', '2024', 'models', 'Pakistan'],
      image: 'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
      status: 'published',
      readTime: 7,
      createdAt: '2024-01-12',
      updatedAt: '2024-01-12'
    },
    {
      id: '3',
      title: 'How to Save Electricity with Your AC',
      slug: 'how-to-save-electricity-with-ac',
      excerpt: 'Learn practical strategies to reduce your air conditioning costs while staying comfortable during hot weather.',
      content: `# How to Save Electricity with Your AC

Air conditioning can account for up to 60% of your electricity bill during summer. Here's how to stay cool while keeping costs down:

## Temperature Settings

### Set the Right Temperature
- Keep thermostat at 24-26°C (75-78°F)
- Each degree lower increases energy consumption by 6-8%
- Use ceiling fans to feel cooler at higher temperatures

## Smart Usage Patterns

### Use Timer Functions
- Set AC to turn off 30 minutes before you wake up
- Pre-cool rooms before peak electricity rate hours
- Use sleep mode for gradual temperature adjustment

### Zone Cooling
- Cool only occupied rooms
- Close doors and vents in unused areas
- Use curtains and blinds to block sunlight

## Maintenance for Efficiency

### Regular Cleaning
- Clean filters monthly for optimal airflow
- Clear outdoor unit of debris
- Schedule annual professional maintenance

### Insulation Improvements
- Seal air leaks around windows and doors
- Add weatherstripping where needed
- Consider window tinting or thermal curtains

## Upgrade Considerations

### Energy-Efficient Models
- Look for 5-star energy ratings
- Consider inverter technology
- Calculate long-term savings vs. upfront costs

Following these tips can reduce your AC electricity consumption by 20-40% while maintaining comfort.`,
      author: 'Energy Expert',
      category: 'Energy Saving',
      tags: ['energy saving', 'electricity', 'tips', 'efficiency'],
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
      status: 'published',
      readTime: 6,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-10'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'AC Services Team',
    category: '',
    tags: [''],
    image: '',
    featured: false,
    status: 'draft',
    readTime: 5
  });

  const categories = ['Maintenance', 'Buying Guide', 'Energy Saving', 'Installation', 'Repair', 'General'];

  const handleInputChange = (field: keyof BlogPost, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === 'title' && typeof value === 'string') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleTagsChange = (index: number, value: string) => {
    const tags = formData.tags as string[];
    const newTags = [...tags];
    newTags[index] = value;
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    const tags = formData.tags as string[];
    setFormData(prev => ({ ...prev, tags: [...tags, ''] }));
  };

  const removeTag = (index: number) => {
    const tags = formData.tags as string[];
    const newTags = tags.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const openCreateDialog = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: 'AC Services Team',
      category: '',
      tags: [''],
      image: '',
      featured: false,
      status: 'draft',
      readTime: 5
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData(blog);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast({
        title: "Error",
        description: "Please fill in title and content",
        variant: "destructive"
      });
      return;
    }

    const blogData: BlogPost = {
      id: editingBlog?.id || Date.now().toString(),
      title: formData.title!,
      slug: formData.slug || formData.title!.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: formData.excerpt || '',
      content: formData.content!,
      author: formData.author || 'AC Services Team',
      category: formData.category || 'General',
      tags: (formData.tags || []).filter(t => t.trim() !== ''),
      image: formData.image || '',
      featured: formData.featured || false,
      status: formData.status || 'draft',
      readTime: formData.readTime || 5,
      createdAt: editingBlog?.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    if (editingBlog) {
      setBlogs(prev => prev.map(b => b.id === editingBlog.id ? blogData : b));
      toast({
        title: "Success",
        description: "Blog post updated successfully"
      });
    } else {
      setBlogs(prev => [...prev, blogData]);
      toast({
        title: "Success",
        description: "New blog post created successfully"
      });
    }

    setIsDialogOpen(false);
  };

  const deleteBlog = (id: string) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
    toast({
      title: "Success",
      description: "Blog post deleted successfully"
    });
  };

  const toggleBlogStatus = (id: string, status: 'published' | 'draft') => {
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    toast({
      title: "Success",
      description: `Blog post ${status === 'published' ? 'published' : 'saved as draft'}`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#2D3559]">Blog Management</h2>
          <p className="text-gray-600">Create and manage blog posts</p>
        </div>
        <Button onClick={openCreateDialog} className="bg-gradient-to-r from-[#8843F2] to-[#FF467E]">
          <Plus className="mr-2 h-5 w-5" />
          New Blog Post
        </Button>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Card key={blog.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-100 relative">
              {blog.image ? (
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-2">
                {blog.featured && (
                  <Badge className="bg-yellow-500">Featured</Badge>
                )}
                <Badge variant={blog.status === 'published' ? "default" : "secondary"}>
                  {blog.status}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{blog.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{blog.excerpt}</p>
              <div className="space-y-2 text-xs text-gray-500 mb-3">
                <p>By {blog.author} | {blog.readTime} min read</p>
                <p>Category: {blog.category}</p>
                <div className="flex flex-wrap gap-1">
                  {blog.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {blog.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{blog.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditDialog(blog)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteBlog(blog.id)}
                  className="text-red-500 border-red-500 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <Label htmlFor={`published-${blog.id}`} className="text-sm">
                  Published
                </Label>
                <Switch
                  id={`published-${blog.id}`}
                  checked={blog.status === 'published'}
                  onCheckedChange={(checked) => toggleBlogStatus(blog.id, checked ? 'published' : 'draft')}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Blog Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
            </DialogTitle>
            <DialogDescription>
              Fill in the details for the blog post
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Blog post title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={formData.slug || ''}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="blog-post-url"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt || ''}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="Brief description of the blog post"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content || ''}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Write your blog post content here (Markdown supported)"
                rows={10}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author || ''}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  placeholder="Author name"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category || ''} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="readTime">Read Time (minutes)</Label>
                <Input
                  id="readTime"
                  type="number"
                  value={formData.readTime || ''}
                  onChange={(e) => handleInputChange('readTime', parseInt(e.target.value))}
                  placeholder="5"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image">Featured Image URL</Label>
              <Input
                id="image"
                value={formData.image || ''}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Tags */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Tags</Label>
                <Button type="button" size="sm" variant="outline" onClick={addTag}>
                  Add Tag
                </Button>
              </div>
              <div className="space-y-2">
                {(formData.tags || []).map((tag, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={tag}
                      onChange={(e) => handleTagsChange(index, e.target.value)}
                      placeholder={`Tag ${index + 1}`}
                    />
                    {(formData.tags?.length || 0) > 1 && (
                      <Button 
                        type="button" 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => removeTag(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured || false}
                  onCheckedChange={(checked) => handleInputChange('featured', checked)}
                />
                <Label htmlFor="featured">Featured Post</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.status === 'published'}
                  onCheckedChange={(checked) => handleInputChange('status', checked ? 'published' : 'draft')}
                />
                <Label htmlFor="published">Publish Immediately</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-[#8843F2] to-[#FF467E]">
                <Save className="mr-2 h-4 w-4" />
                {editingBlog ? 'Update Post' : 'Create Post'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlogManager;
