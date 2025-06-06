
import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Search, 
  Upload, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  CheckCircle,
  Plus,
  Filter,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import ImageUploader from '@/components/admin/ImageUploader';

// Mock data for initial images
const initialImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1579099613958-7d8ffc6bc386?auto=format&fit=crop&w=500', name: 'AC Unit 1.jpg', size: '342 KB', date: '2023-05-10', type: 'service' },
  { id: 2, url: 'https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?auto=format&fit=crop&w=500', name: 'AC Repair.jpg', size: '265 KB', date: '2023-05-09', type: 'service' },
  { id: 3, url: 'https://images.unsplash.com/photo-1660489081825-5fcb9c75e78a?auto=format&fit=crop&w=500', name: 'AC Installation.jpg', size: '412 KB', date: '2023-05-08', type: 'service' },
  { id: 4, url: 'https://images.unsplash.com/photo-1591273681666-afb79a476e56?auto=format&fit=crop&w=500', name: 'Banner Image.jpg', size: '520 KB', date: '2023-05-07', type: 'banner' },
  { id: 5, url: 'https://images.unsplash.com/photo-1627434293421-871f73db5073?auto=format&fit=crop&w=500', name: 'Team Member.jpg', size: '235 KB', date: '2023-05-06', type: 'team' },
  { id: 6, url: 'https://images.unsplash.com/photo-1513366173304-65a31f2be6b4?auto=format&fit=crop&w=500', name: 'Blog Post.jpg', size: '380 KB', date: '2023-05-05', type: 'blog' }
];

// Additional sample image for the hero section
const heroImage = '/lovable-uploads/8e189df9-3491-4f13-929a-cbb549c7ef80.png';

interface ImageItem {
  id: number;
  url: string;
  name: string;
  size: string;
  date: string;
  type: string;
}

const Media = () => {
  const [images, setImages] = useState<ImageItem[]>([
    ...initialImages,
    { 
      id: 7, 
      url: heroImage, 
      name: 'Hero AC Service.jpg', 
      size: '720 KB', 
      date: '2023-05-04', 
      type: 'hero' 
    }
  ]);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingImage, setEditingImage] = useState<ImageItem | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<ImageItem | null>(null);

  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         image.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || image.type === filter;
    return matchesSearch && matchesFilter;
  });

  const handleImageUpload = (newImageUrl: string) => {
    if (newImageUrl) {
      // Extract filename from URL or use timestamp
      const filename = newImageUrl.startsWith('data:') 
        ? `Image-${Date.now()}.jpg` 
        : newImageUrl.split('/').pop() || `Image-${Date.now()}.jpg`;
        
      const newImage = {
        id: Date.now(),
        url: newImageUrl,
        name: filename,
        size: 'New',
        date: new Date().toISOString().split('T')[0],
        type: 'upload'
      };
      
      setImages(prev => [newImage, ...prev]);
      
      toast({
        title: "Image uploaded successfully",
        description: "The image has been added to your media library.",
      });
      
      setIsUploadDialogOpen(false);
    }
  };

  const handlePreviewImage = (image: ImageItem) => {
    setPreviewImage(image);
    setIsPreviewOpen(true);
  };

  const handleImageSelect = (id: number) => {
    setSelectedImages(prev => 
      prev.includes(id) 
        ? prev.filter(imageId => imageId !== id) 
        : [...prev, id]
    );
  };

  const handleImageEdit = (image: ImageItem) => {
    setEditingImage(image);
  };

  const handleImageDelete = (id: number) => {
    setImageToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (imageToDelete !== null) {
      setImages(prev => prev.filter(image => image.id !== imageToDelete));
      setSelectedImages(prev => prev.filter(id => id !== imageToDelete));
      
      toast({
        title: "Image deleted",
        description: "The image has been removed from your media library.",
      });
      
      setIsDeleteDialogOpen(false);
      setImageToDelete(null);
    }
  };

  const handleBulkDelete = () => {
    if (selectedImages.length > 0) {
      setImages(prev => prev.filter(image => !selectedImages.includes(image.id)));
      
      toast({
        title: "Images deleted",
        description: `${selectedImages.length} images have been removed.`,
      });
      
      setSelectedImages([]);
    }
  };

  const handleSaveEdit = (updatedImage: Partial<ImageItem>) => {
    if (editingImage) {
      setImages(prev => prev.map(image => 
        image.id === editingImage.id 
          ? { ...image, ...updatedImage }
          : image
      ));
      
      toast({
        title: "Image updated",
        description: "The image details have been updated.",
      });
      
      setEditingImage(null);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copied",
      description: "Image URL has been copied to clipboard",
    });
  };

  const getImageCount = (type: string) => {
    return images.filter(image => type === 'all' || image.type === type).length;
  };

  const imageTypes = [
    { value: 'all', label: 'All' },
    { value: 'service', label: 'Services' },
    { value: 'blog', label: 'Blog' },
    { value: 'banner', label: 'Banners' },
    { value: 'hero', label: 'Hero' },
    { value: 'team', label: 'Team' },
    { value: 'upload', label: 'Uploads' }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Media Library</h2>
          <p className="text-muted-foreground">
            Manage your website images and media assets
          </p>
        </div>
        
        <Button 
          className="bg-brand-blue hover:bg-brand-blue/90"
          onClick={() => setIsUploadDialogOpen(true)}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload New
        </Button>
      </div>
      
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search images..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue={filter} className="w-full" onValueChange={setFilter}>
          <TabsList className="h-auto flex flex-wrap justify-start py-1">
            {imageTypes.map(type => (
              <TabsTrigger key={type.value} value={type.value} className="px-3 py-1 h-8">
                {type.label} 
                <Badge variant="secondary" className="ml-2 bg-muted text-muted-foreground">
                  {getImageCount(type.value)}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      {selectedImages.length > 0 && (
        <div className="bg-muted p-3 rounded-lg flex items-center justify-between">
          <span className="font-medium">{selectedImages.length} images selected</span>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleBulkDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected
          </Button>
        </div>
      )}
      
      {filteredImages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No images found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? `No results for "${searchQuery}"`
                : "Your media library is empty"}
            </p>
            <Button onClick={() => setIsUploadDialogOpen(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Upload New Image
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <Card key={image.id} className="overflow-hidden group hover:shadow-md transition-all">
              <div className="relative">
                <AspectRatio ratio={1} className="bg-muted/20">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="object-cover w-full h-full cursor-pointer"
                    onClick={() => handlePreviewImage(image)}
                    onError={(e) => {
                      console.error("Gallery image failed to load:", image.url);
                      e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                    }}
                  />
                </AspectRatio>
                
                <div className="absolute top-2 left-2">
                  <button
                    className={`rounded-full w-6 h-6 flex items-center justify-center transition-colors ${
                      selectedImages.includes(image.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-black/50 text-white hover:bg-black/70'
                    }`}
                    onClick={() => handleImageSelect(image.id)}
                  >
                    {selectedImages.includes(image.id) ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : null}
                  </button>
                </div>
                
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="rounded-full w-8 h-8 flex items-center justify-center bg-black/50 text-white hover:bg-black/70">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handlePreviewImage(image)}>
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem onClick={() => handleCopyUrl(image.url)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Copy URL
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem onClick={() => handleImageEdit(image)}>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit Details
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleImageDelete(image.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Image
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <CardContent className="p-3">
                <p className="font-medium truncate text-sm">{image.name}</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                  <Badge variant="outline" className="text-xs px-1 py-0">
                    {image.type}
                  </Badge>
                  <span>{image.size}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Upload dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Upload New Image</DialogTitle>
            <DialogDescription>
              Upload a new image to your media library. You can upload from your device or use an image URL.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <ImageUploader 
              onImageSelected={handleImageUpload} 
              aspectRatio="square"
            />
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Image</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The image will be permanently removed from your library.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">Are you sure you want to delete this image?</p>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Edit image dialog */}
      {editingImage && (
        <Dialog open={!!editingImage} onOpenChange={(open) => !open && setEditingImage(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Image Details</DialogTitle>
              <DialogDescription>
                Update the details for this image
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="mb-4">
                <AspectRatio ratio={1} className="overflow-hidden rounded-md bg-muted/20">
                  <img
                    src={editingImage.url}
                    alt={editingImage.name}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                    }}
                  />
                </AspectRatio>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Image Name</label>
                <Input 
                  defaultValue={editingImage.name} 
                  onChange={(e) => setEditingImage({
                    ...editingImage,
                    name: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Image Type</label>
                <select 
                  className="w-full p-2 border border-input bg-background rounded-md" 
                  defaultValue={editingImage.type}
                  onChange={(e) => setEditingImage({
                    ...editingImage,
                    type: e.target.value
                  })}
                >
                  <option value="hero">Hero</option>
                  <option value="service">Service</option>
                  <option value="blog">Blog</option>
                  <option value="banner">Banner</option>
                  <option value="team">Team</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <div className="relative">
                  <Input 
                    value={editingImage.url}
                    readOnly
                    className="pr-10"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute top-0 right-0 h-full px-3"
                    onClick={() => handleCopyUrl(editingImage.url)}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setEditingImage(null)}>Cancel</Button>
              <Button onClick={() => handleSaveEdit(editingImage)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Preview image dialog */}
      {previewImage && (
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>{previewImage.name}</DialogTitle>
            </DialogHeader>
            <div className="py-2">
              <div className="rounded-md overflow-hidden">
                <img
                  src={previewImage.url}
                  alt={previewImage.name}
                  className="w-full h-auto"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                  }}
                />
              </div>
              <div className="flex flex-col sm:flex-row items-start gap-2 sm:items-center justify-between mt-4">
                <div>
                  <Badge className="mb-2">{previewImage.type}</Badge>
                  <p className="text-sm text-muted-foreground">{previewImage.size} • {previewImage.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCopyUrl(previewImage.url)}
                  >
                    Copy URL
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => {
                      setIsPreviewOpen(false);
                      handleImageEdit(previewImage);
                    }}
                  >
                    <Edit2 className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Media;
