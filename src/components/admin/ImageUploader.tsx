
import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImageSelected: (imageUrl: string) => void;
  defaultImage?: string;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageSelected, 
  defaultImage = '',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [previewUrl, setPreviewUrl] = useState<string>(defaultImage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive"
      });
      return;
    }
    
    // Check file type
    if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a valid image (JPEG, PNG, GIF, WEBP)",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // In a real implementation, you would upload the file to your server or cloud storage
    // For this demo, we'll just create a local object URL
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onImageSelected(result);
      setIsLoading(false);
      
      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully"
      });
    };
    
    reader.onerror = () => {
      setIsLoading(false);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your image",
        variant: "destructive"
      });
    };
    
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageUrl.trim()) return;
    
    // Basic URL validation
    if (!imageUrl.match(/^(http|https):\/\/[^ "]+$/)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid image URL",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Check if URL is an image by attempting to load it
    const img = new Image();
    img.onload = () => {
      setPreviewUrl(imageUrl);
      onImageSelected(imageUrl);
      setIsLoading(false);
      
      toast({
        title: "Image added",
        description: "Image URL has been added successfully"
      });
    };
    
    img.onerror = () => {
      setIsLoading(false);
      toast({
        title: "Invalid image",
        description: "The URL does not point to a valid image",
        variant: "destructive"
      });
    };
    
    img.src = imageUrl;
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setPreviewUrl('');
    onImageSelected('');
    setImageUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden ${className}`}>
      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Selected preview"
            className="w-full h-48 object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={clearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="data-[state=active]:bg-brand-blue data-[state=active]:text-white">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="url" className="data-[state=active]:bg-brand-blue data-[state=active]:text-white">
              <LinkIcon className="h-4 w-4 mr-2" />
              URL
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="p-4">
            <div 
              onClick={triggerFileInput}
              className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 cursor-pointer flex flex-col items-center justify-center h-36 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                disabled={isLoading}
              />
              <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                {isLoading ? "Uploading..." : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                PNG, JPG, GIF, WEBP up to 5MB
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="url" className="p-4">
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div>
                <Input
                  type="url"
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  disabled={isLoading}
                  className="mb-2"
                />
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Example: https://example.com/image.jpg
                </p>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-brand-blue hover:bg-brand-blue/90"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Add Image"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ImageUploader;
