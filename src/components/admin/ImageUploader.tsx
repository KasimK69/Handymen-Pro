
import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  defaultImage?: string;
  label?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  defaultImage = '',
  label = 'Upload Image'
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>(defaultImage);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size should be less than 5MB.",
        variant: "destructive"
      });
      return;
    }

    // Simulate upload
    setIsUploading(true);
    setUploadProgress(0);

    const reader = new FileReader();
    reader.onload = () => {
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            // Set the preview URL and call the callback
            const imageUrl = reader.result as string;
            setPreviewUrl(imageUrl);
            onImageUpload(imageUrl);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageUpload('');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      {label && <p className="text-sm font-medium">{label}</p>}
      
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {!previewUrl && !isUploading && (
          <div 
            onClick={triggerFileInput}
            className="h-40 flex flex-col items-center justify-center gap-2 cursor-pointer bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ImageIcon className="h-8 w-8 text-gray-400" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Click to upload an image
            </p>
            <p className="text-xs text-gray-400">
              JPG, PNG or GIF (max 5MB)
            </p>
          </div>
        )}

        {isUploading && (
          <div className="h-40 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-md">
            <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 mb-4">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              Uploading... {uploadProgress}%
            </p>
          </div>
        )}

        {previewUrl && !isUploading && (
          <div className="relative">
            <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="absolute top-2 right-2 flex gap-2">
              <Button 
                size="icon" 
                variant="secondary" 
                className="h-8 w-8 rounded-full bg-white dark:bg-gray-800" 
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="secondary" 
                className="h-8 w-8 rounded-full bg-white dark:bg-gray-800" 
                onClick={triggerFileInput}
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {previewUrl ? (
        <p className="flex items-center text-xs text-green-600 dark:text-green-400">
          <Check className="h-3 w-3 mr-1" /> Image ready
        </p>
      ) : (
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={triggerFileInput} 
          className="text-xs"
        >
          <Upload className="h-3 w-3 mr-1" /> Browse files
        </Button>
      )}
    </div>
  );
};

export default ImageUploader;
