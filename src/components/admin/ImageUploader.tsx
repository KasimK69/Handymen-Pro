
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Image as ImageIcon, Upload, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
  const [uploadError, setUploadError] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectRatioValue = {
    square: 1,
    video: 16/9,
    wide: 16/9,
    portrait: 3/4
  }[aspectRatio];

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSize}MB`,
        variant: "destructive"
      });
      setUploadError(`File too large. Maximum size is ${maxSize}MB`);
      return false;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      setUploadError("Invalid file type. Please upload an image file");
      return false;
    }

    setUploadError("");
    return true;
  };

  const processFile = (file: File): void => {
    if (!validateFile(file)) return;
    
    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setImageUrl(result);
          onImageSelected(result);
          toast({
            title: "Image uploaded",
            description: "Your image has been uploaded successfully",
          });
        }
        setIsUploading(false);
      };
      reader.onerror = () => {
        toast({
          title: "Upload failed",
          description: "There was a problem uploading your image.",
          variant: "destructive"
        });
        setUploadError("Upload failed. Please try again.");
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
      setUploadError("Upload failed. Please try again.");
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    processFile(file);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!urlInput) {
      setUploadError("Please enter a valid URL");
      return;
    }
    
    // Basic URL validation
    if (!urlInput.match(/^(http|https):\/\/[^ "]+$/)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid image URL",
        variant: "destructive"
      });
      setUploadError("Invalid URL. Please enter a valid image URL");
      return;
    }
    
    // Check if URL is an image by attempting to load it
    setIsUploading(true);
    
    const img = new Image();
    img.onload = () => {
      setImageUrl(urlInput);
      onImageSelected(urlInput);
      setUploadError("");
      setIsUploading(false);
      toast({
        title: "URL added",
        description: "Image URL has been added successfully",
      });
    };
    img.onerror = () => {
      toast({
        title: "Invalid image URL",
        description: "Could not load image from the provided URL",
        variant: "destructive"
      });
      setUploadError("Could not load image from the provided URL");
      setIsUploading(false);
    };
    img.src = urlInput;
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
      processFile(file);
    }
  };

  const clearImage = () => {
    setImageUrl("");
    setUrlInput("");
    onImageSelected("");
    setUploadError("");
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
            {imageUrl && uploadMethod === "upload" ? (
              <div className="relative">
                <AspectRatio ratio={aspectRatioValue} className="overflow-hidden rounded-md mb-2">
                  <img 
                    src={imageUrl} 
                    alt="Uploaded preview"
                    className="w-full h-full object-cover"
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
                </AspectRatio>
                <p className="text-sm text-gray-500 truncate max-w-full">{imageUrl.substring(0, 50)}{imageUrl.length > 50 ? '...' : ''}</p>
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
          
          {uploadError && (
            <div className="text-sm text-destructive flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>{uploadError}</span>
            </div>
          )}
          
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
                <AspectRatio ratio={aspectRatioValue} className="overflow-hidden rounded-md mb-2">
                  <img 
                    src={imageUrl} 
                    alt="URL preview"
                    className="w-full h-full object-cover"
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
                </AspectRatio>
              </div>
            )}
            
            <div className="flex space-x-2">
              <div className="relative flex-grow">
                <Input 
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="pr-10"
                />
                <ImageIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? 'Adding...' : 'Use URL'}
              </Button>
            </div>
            
            {uploadError && (
              <div className="text-sm text-destructive flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>{uploadError}</span>
              </div>
            )}
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImageUploader;
