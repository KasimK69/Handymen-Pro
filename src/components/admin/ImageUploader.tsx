
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Image, Upload, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImageSelected: (imageUrl: string) => void;
  defaultImage?: string;
  aspectRatio?: "square" | "video" | "wide" | "portrait";
  maxSize?: number; // in MB
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  defaultImage = "",
  aspectRatio = "square",
  maxSize = 5,
  className
}) => {
  const [imageUrl, setImageUrl] = useState<string>(defaultImage);
  const [uploadMethod, setUploadMethod] = useState<string>("upload");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[16/9]",
    portrait: "aspect-[3/4]"
  }[aspectRatio];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSize}MB`,
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Create a FileReader to get a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setImageUrl(result);
          onImageSelected(result);
        }
        setIsUploading(false);
      };
      reader.onerror = () => {
        toast({
          title: "Upload failed",
          description: "There was a problem uploading your image.",
          variant: "destructive"
        });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error during file upload:", error);
      toast({
        title: "Upload failed",
        description: "There was a problem processing your image.",
        variant: "destructive"
      });
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const url = formData.get('imageUrl') as string;
    
    if (!url) return;
    
    // Basic URL validation
    if (!url.match(/^(http|https):\/\/[^ "]+$/)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid image URL",
        variant: "destructive"
      });
      return;
    }
    
    setImageUrl(url);
    onImageSelected(url);
    form.reset();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive"
        });
        return;
      }
      
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `Maximum file size is ${maxSize}MB`,
          variant: "destructive"
        });
        return;
      }
      
      setIsUploading(true);
      
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result) {
            setImageUrl(result);
            onImageSelected(result);
          }
          setIsUploading(false);
        };
        reader.onerror = () => {
          toast({
            title: "Upload failed",
            description: "There was a problem uploading your image.",
            variant: "destructive"
          });
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error during file drop:", error);
        toast({
          title: "Upload failed",
          description: "There was a problem processing your image.",
          variant: "destructive"
        });
        setIsUploading(false);
      }
    }
  };

  const clearImage = () => {
    setImageUrl("");
    onImageSelected("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <Tabs defaultValue={uploadMethod} onValueChange={setUploadMethod}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="upload">Upload Image</TabsTrigger>
          <TabsTrigger value="url">Image URL</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="space-y-4">
          <div 
            className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
              isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-gray-700'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {imageUrl ? (
              <div className="relative">
                <div className={`relative ${aspectRatioClass} overflow-hidden rounded-md mb-2`}>
                  <img 
                    src={imageUrl} 
                    alt="Uploaded preview"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      console.error("Image failed to load");
                      e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                    }}
                  />
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 h-7 w-7" 
                    onClick={clearImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 truncate">{imageUrl.substring(0, 50)}{imageUrl.length > 50 ? '...' : ''}</p>
              </div>
            ) : (
              <div className="py-6">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-3 rounded-full bg-gray-100 dark:bg-gray-800 p-3">
                    <Upload className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium mb-1">
                    Drag and drop your image here
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    PNG, JPG or WebP (max {maxSize}MB)
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? 'Uploading...' : 'Choose File'}
                  </Button>
                </div>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          
          <div className="text-sm text-gray-500">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>Recommended dimensions: {aspectRatio === 'square' ? '1:1' : 
                aspectRatio === 'portrait' ? '3:4' : 
                aspectRatio === 'wide' ? '16:9' : '16:9'}</span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="url">
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            {imageUrl && uploadMethod === "url" && (
              <div className="relative">
                <div className={`relative ${aspectRatioClass} overflow-hidden rounded-md mb-2`}>
                  <img 
                    src={imageUrl} 
                    alt="URL preview"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      console.error("Image URL failed to load");
                      e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Invalid+URL';
                    }}
                  />
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 h-7 w-7" 
                    onClick={clearImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            <div className="flex space-x-2">
              <div className="relative flex-grow">
                <Input 
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  defaultValue={imageUrl && uploadMethod === "url" ? imageUrl : ""}
                />
                <Image className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <Button type="submit">Use URL</Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImageUploader;
