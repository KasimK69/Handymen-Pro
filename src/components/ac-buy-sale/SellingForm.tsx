
import React from 'react';
import { X, Camera, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface SellingFormProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    name: string;
    price: string;
    description: string;
    contact: string;
    condition: 'new' | 'used';
    model: string;
    brand: string;
    images: string[];
    location: string;
  };
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onImageChange: (index: number, value: string) => void;
  onConditionChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SellingForm: React.FC<SellingFormProps> = ({
  isOpen,
  onClose,
  formData,
  onFormChange,
  onImageChange,
  onConditionChange,
  onSubmit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Sell Your AC Unit</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">AC Name/Title</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={onFormChange} 
                  placeholder="e.g., Haier Inverter AC 1.5 Ton"
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Asking Price (PKR)</Label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number"
                  value={formData.price} 
                  onChange={onFormChange} 
                  placeholder="e.g., 50000"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input 
                  id="brand" 
                  name="brand" 
                  value={formData.brand} 
                  onChange={onFormChange} 
                  placeholder="e.g., Haier, Gree, etc."
                  required
                />
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Input 
                  id="model" 
                  name="model" 
                  value={formData.model} 
                  onChange={onFormChange} 
                  placeholder="e.g., HSU-12LTC/012"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={onFormChange} 
                placeholder="Provide details about the condition, age, features, etc."
                className="min-h-[100px]"
                required
              />
            </div>
            
            <div>
              <Label className="block mb-2">AC Condition</Label>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="condition" 
                  checked={formData.condition === 'new'}
                  onCheckedChange={onConditionChange}
                />
                <Label htmlFor="condition">
                  {formData.condition === 'new' ? 'New' : 'Used'}
                </Label>
              </div>
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                name="location" 
                value={formData.location} 
                onChange={onFormChange} 
                placeholder="e.g., Rawalpindi, F-8 Islamabad, etc."
                required
              />
            </div>
            
            <div>
              <Label htmlFor="contact">Contact Number</Label>
              <Input 
                id="contact" 
                name="contact" 
                value={formData.contact} 
                onChange={onFormChange} 
                placeholder="e.g., 0300-1234567"
                required
              />
            </div>
            
            <div>
              <Label className="mb-2 block">Upload Images (Up to 3)</Label>
              <div className="space-y-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <Input 
                      value={image} 
                      onChange={(e) => onImageChange(index, e.target.value)} 
                      placeholder={`Image URL ${index + 1}`}
                    />
                    {image && (
                      <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={image} 
                          alt={`Preview ${index + 1}`} 
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Error';
                          }}
                        />
                      </div>
                    )}
                    {!image && (
                      <div className="h-12 w-12 border rounded flex items-center justify-center bg-gray-100 text-gray-400 flex-shrink-0">
                        <Camera className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-start gap-2 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
              <div className="mt-1 text-blue-500">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <p className="font-semibold">Submission Process:</p>
                <p>Our team will review your submission and contact you to verify the details. Once approved, your listing will appear on our website. We may request additional information or photos if needed.</p>
              </div>
            </div>
            
            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-brand-red hover:bg-brand-red/90">
                Submit Listing
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellingForm;
