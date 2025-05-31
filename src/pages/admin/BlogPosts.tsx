import React, { useState } from 'react';
import { 
  BookOpen, 
  PlusCircle, 
  Edit, 
  Trash2, 
  ChevronDown,
  ChevronUp,
  Check,
  X,
  ImagePlus,
  Star,
  Calendar,
  Clock,
  Tag,
  User
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { BlogPost, blogPosts as initialBlogPosts } from '@/data/blogPosts';

// Rich text editor component
const SimpleRichTextEditor = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
  const handleInsertHeading = (level: number) => {
    const tag = `h${level}`;
    onChange(`${value}\n<${tag}>Heading ${level}</${tag}>\n`);
  };

  const handleInsertParagraph = () => {
    onChange(`${value}\n<p>New paragraph text</p>\n`);
  };

  const handleInsertList = (type: 'ul' | 'ol') => {
    const listItems = type === 'ul' 
      ? `<li>List item 1</li>\n  <li>List item 2</li>\n  <li>List item 3</li>` 
      : `<li>First item</li>\n  <li>Second item</li>\n  <li>Third item</li>`;
    
    onChange(`${value}\n<${type}>\n  ${listItems}\n</${type}>\n`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-2">
        <Button type="button" size="sm" variant="outline" onClick={() => handleInsertHeading(2)}>H2</Button>
        <Button type="button" size="sm" variant="outline" onClick={() => handleInsertHeading(3)}>H3</Button>
        <Button type="button" size="sm" variant="outline" onClick={handleInsertParagraph}>Paragraph</Button>
        <Button type="button" size="sm" variant="outline" onClick={() => handleInsertList('ul')}>Bullet List</Button>
        <Button type="button" size="sm" variant="outline" onClick={() => handleInsertList('ol')}>Numbered List</Button>
      </div>
      <Textarea 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className="min-h-[300px] font-mono text-sm"
        placeholder="Enter HTML content here. Use the buttons above to insert common elements."
      />
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
        <h4 className="text-sm font-medium mb-2">Preview (simplified):</h4>
        <div className="prose prose-sm max-w-none dark:prose-invert overflow-auto max-h-[200px] bg-white dark:bg-gray-900 p-4 rounded-md">
          <div dangerouslySetInnerHTML={{ __html: value }} />
        </div>
      </div>
    </div>
  );
};

const BlogPostsAdmin = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const [formData, setFormData] = useState<BlogPost>({
    id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min read',
    image: '',
    tags: [''],
    featured: false
  });

  // Filter and sort blog posts
  const filteredPosts = blogPosts
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return sortDirection === 'asc' 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      }
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    setFormData(prev => ({ ...prev, tags: [...prev.tags, ''] }));
  };

  const removeTag = (index: number) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSortChange = (newSortBy: 'date' | 'title') => {
    if (sortBy === newSortBy) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortDirection('desc');
    }
  };

  const openNewPostDialog = () => {
    setEditMode(false);
    setFormData({
      id: Date.now().toString(),
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: '',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      image: '',
      tags: [''],
      featured: false
    });
    setIsDialogOpen(true);
  };

  const openEditPostDialog = (post: BlogPost) => {
    setEditMode(true);
    setFormData({
      ...post,
      tags: [...post.tags]
    });
    setCurrentPost(post);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (post: BlogPost) => {
    setCurrentPost(post);
    setIsDeleteDialogOpen(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({ 
      ...prev, 
      title,
      slug: generateSlug(title)
    }));
  };

  const calculateReadTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
    return `${readingTimeMinutes} min read`;
  };

  const handleContentChange = (content: string) => {
    const readTime = calculateReadTime(content);
    setFormData(prev => ({ 
      ...prev, 
      content,
      readTime
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive"
      });
      return;
    }

    if (!formData.excerpt.trim()) {
      toast({
        title: "Error",
        description: "Excerpt is required",
        variant: "destructive"
      });
      return;
    }

    if (!formData.content.trim()) {
      toast({
        title: "Error",
        description: "Content is required",
        variant: "destructive"
      });
      return;
    }

    if (!formData.image.trim()) {
      toast({
        title: "Error",
        description: "Featured image URL is required",
        variant: "destructive"
      });
      return;
    }

    // Filter out empty tags
    const filteredTags = formData.tags.filter(tag => tag.trim() !== '');
    if (filteredTags.length === 0) {
      toast({
        title: "Error",
        description: "At least one tag is required",
        variant: "destructive"
      });
      return;
    }

    const updatedFormData = {
      ...formData,
      tags: filteredTags
    };

    if (editMode) {
      // Update existing post
      setBlogPosts(prev => 
        prev.map(post => post.id === updatedFormData.id ? updatedFormData : post)
      );
      toast({
        title: "Success",
        description: "Blog post updated successfully"
      });
    } else {
      // Add new post
      setBlogPosts(prev => [...prev, updatedFormData]);
      toast({
        title: "Success",
        description: "New blog post added successfully"
      });
    }

    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (currentPost) {
      setBlogPosts(prev => prev.filter(post => post.id !== currentPost.id));
      setIsDeleteDialogOpen(false);
      toast({
        title: "Success",
        description: "Blog post deleted successfully"
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl flex items-center">
              <BookOpen className="mr-2 h-6 w-6" />
              Blog Posts Management
            </CardTitle>
            <CardDescription>
              Create, edit, and manage your blog posts
            </CardDescription>
          </div>
          <Button onClick={openNewPostDialog} className="bg-brand-blue hover:bg-brand-blue/90">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Post
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Input
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    Sort By: {sortBy === 'date' ? 'Date' : 'Title'}
                    {sortDirection === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleSortChange('date')}>
                    Date {sortBy === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSortChange('title')}>
                    Title {sortBy === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No blog posts found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'Try a different search term' : 'Create your first blog post to get started'}
              </p>
              {searchTerm && (
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead className="text-center">Featured</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-full h-full object-cover"
                              onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/100x100?text=AC+Blog')}
                            />
                          </div>
                          <div>
                            <div className="font-semibold line-clamp-1">{post.title}</div>
                            <div className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                          {post.date}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <Clock className="mr-1 h-3 w-3" />
                          {post.readTime}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4 text-gray-500" />
                          {post.author}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{post.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {post.featured ? (
                          <Badge className="bg-yellow-500 hover:bg-yellow-600">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            Featured
                          </Badge>
                        ) : (
                          <span className="text-gray-500 text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => openEditPostDialog(post)}
                            className="text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => openDeleteDialog(post)}
                            className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Blog Post Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editMode ? 'Edit Blog Post' : 'Add New Blog Post'}</DialogTitle>
            <DialogDescription>
              {editMode 
                ? 'Make changes to the blog post and save when you\'re done.' 
                : 'Fill in the details to create a new blog post.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="Enter post title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">Slug (URL) *</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="post-url-slug"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Auto-generated from title, but you can customize it
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="excerpt">Excerpt (Summary) *</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    placeholder="Brief summary of the post"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Author name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="date">Publication Date *</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">Featured Image URL *</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.image && (
                    <div className="mt-2 rounded-md overflow-hidden border">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-full h-40 object-cover"
                        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Image+Preview')}
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Tags *</Label>
                    <Button type="button" size="sm" variant="outline" onClick={addTag}>
                      Add Tag
                    </Button>
                  </div>
                  
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
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
                          className="text-red-500 hover:text-red-600"
                          onClick={() => removeTag(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleSwitchChange('featured', checked)}
                  />
                  <Label htmlFor="featured">Featured Post</Label>
                </div>
              </div>
              
              <div>
                <Label htmlFor="content">Content *</Label>
                <SimpleRichTextEditor 
                  value={formData.content} 
                  onChange={handleContentChange} 
                />
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
              Are you sure you want to delete <strong>{currentPost?.title}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
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

export default BlogPostsAdmin;

// Missing Search icon component
const Search = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
};
