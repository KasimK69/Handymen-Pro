
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

interface ACProduct {
  id: string;
  name: string;
  brand: string;
  model: string;
  capacity: string;
  price: number;
  originalPrice?: number;
  energyRating: string;
  features: string[];
  images: string[];
  description: string;
  condition: 'new' | 'used';
  category: 'for-sale' | 'wanted';
  isActive: boolean;
  showOnHomepage: boolean;
  createdAt: string;
}

const AdminProductsManager = () => {
  const [products, setProducts] = useState<ACProduct[]>([
    {
      id: '1',
      name: 'Samsung Digital Inverter AC',
      brand: 'Samsung',
      model: 'AR18TYHYC',
      capacity: '1.5 Ton',
      price: 135000,
      originalPrice: 150000,
      energyRating: '5 Star',
      features: ['WiFi Control', 'Energy Efficient', 'Fast Cooling', '5 Year Warranty'],
      images: [
        'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1631545806609-e6b76ea61e5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      description: 'Premium Samsung inverter AC with advanced cooling technology.',
      condition: 'new',
      category: 'for-sale',
      isActive: true,
      showOnHomepage: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'LG Eco Inverter AC',
      brand: 'LG',
      model: 'LW8017ERSM',
      capacity: '1 Ton',
      price: 115000,
      energyRating: '4 Star',
      features: ['Low Power Consumption', 'Dual Protection', 'WiFi Enabled'],
      images: [
        'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      description: 'LG eco-friendly inverter AC with superior energy efficiency.',
      condition: 'new',
      category: 'for-sale',
      isActive: true,
      showOnHomepage: false,
      createdAt: '2024-01-10'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ACProduct | null>(null);
  const [formData, setFormData] = useState<Partial<ACProduct>>({
    name: '',
    brand: '',
    model: '',
    capacity: '',
    price: 0,
    originalPrice: 0,
    energyRating: '',
    features: [''],
    images: [''],
    description: '',
    condition: 'new',
    category: 'for-sale',
    isActive: true,
    showOnHomepage: false
  });

  const handleInputChange = (field: keyof ACProduct, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: 'features' | 'images', index: number, value: string) => {
    const array = formData[field] as string[];
    const newArray = [...array];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: 'features' | 'images') => {
    const array = formData[field] as string[];
    setFormData(prev => ({ ...prev, [field]: [...array, ''] }));
  };

  const removeArrayItem = (field: 'features' | 'images', index: number) => {
    const array = formData[field] as string[];
    const newArray = array.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const openCreateDialog = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      brand: '',
      model: '',
      capacity: '',
      price: 0,
      originalPrice: 0,
      energyRating: '',
      features: [''],
      images: [''],
      description: '',
      condition: 'new',
      category: 'for-sale',
      isActive: true,
      showOnHomepage: false
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: ACProduct) => {
    setEditingProduct(product);
    setFormData(product);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.brand || !formData.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const productData: ACProduct = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name!,
      brand: formData.brand!,
      model: formData.model || '',
      capacity: formData.capacity || '',
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      energyRating: formData.energyRating || '',
      features: (formData.features || []).filter(f => f.trim() !== ''),
      images: (formData.images || []).filter(i => i.trim() !== ''),
      description: formData.description || '',
      condition: formData.condition || 'new',
      category: formData.category || 'for-sale',
      isActive: formData.isActive !== false,
      showOnHomepage: formData.showOnHomepage || false,
      createdAt: editingProduct?.createdAt || new Date().toISOString().split('T')[0]
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? productData : p));
      toast({
        title: "Success",
        description: "AC product updated successfully"
      });
    } else {
      setProducts(prev => [...prev, productData]);
      toast({
        title: "Success",
        description: "New AC product added successfully"
      });
    }

    setIsDialogOpen(false);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Success",
      description: "AC product deleted successfully"
    });
  };

  const toggleProductStatus = (id: string, isActive: boolean) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isActive } : p));
    toast({
      title: "Success",
      description: `Product ${isActive ? 'activated' : 'deactivated'} successfully`
    });
  };

  const formatPrice = (price: number) => `PKR ${price.toLocaleString()}`;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#2D3559]">AC Products Management</h2>
          <p className="text-gray-600">Manage your AC inventory and listings</p>
        </div>
        <Button onClick={openCreateDialog} className="bg-gradient-to-r from-[#8843F2] to-[#FF467E]">
          <Plus className="mr-2 h-5 w-5" />
          Add New AC Product
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-100 relative">
              {product.images[0] ? (
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-2">
                {product.showOnHomepage && (
                  <Badge className="bg-green-500">Homepage</Badge>
                )}
                <Badge variant={product.isActive ? "default" : "secondary"}>
                  {product.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <div className="space-y-1 text-sm text-gray-600 mb-3">
                <p>{product.brand} - {product.model}</p>
                <p>{product.capacity} | {product.energyRating}</p>
                <p className="font-semibold text-[#8843F2]">{formatPrice(product.price)}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditDialog(product)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteProduct(product.id)}
                  className="text-red-500 border-red-500 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <Label htmlFor={`active-${product.id}`} className="text-sm">
                  Active
                </Label>
                <Switch
                  id={`active-${product.id}`}
                  checked={product.isActive}
                  onCheckedChange={(checked) => toggleProductStatus(product.id, checked)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingProduct ? 'Edit AC Product' : 'Add New AC Product'}
            </DialogTitle>
            <DialogDescription>
              Fill in the details for the AC product listing
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Samsung Digital Inverter AC"
                  required
                />
              </div>
              <div>
                <Label htmlFor="brand">Brand *</Label>
                <Input
                  id="brand"
                  value={formData.brand || ''}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="e.g., Samsung"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={formData.model || ''}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  placeholder="e.g., AR18TYHYC"
                />
              </div>
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Select value={formData.capacity || ''} onValueChange={(value) => handleInputChange('capacity', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.75 Ton">0.75 Ton</SelectItem>
                    <SelectItem value="1 Ton">1 Ton</SelectItem>
                    <SelectItem value="1.5 Ton">1.5 Ton</SelectItem>
                    <SelectItem value="2 Ton">2 Ton</SelectItem>
                    <SelectItem value="2.5 Ton">2.5 Ton</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="energyRating">Energy Rating</Label>
                <Select value={formData.energyRating || ''} onValueChange={(value) => handleInputChange('energyRating', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 Star">1 Star</SelectItem>
                    <SelectItem value="2 Star">2 Star</SelectItem>
                    <SelectItem value="3 Star">3 Star</SelectItem>
                    <SelectItem value="4 Star">4 Star</SelectItem>
                    <SelectItem value="5 Star">5 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="price">Price (PKR) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="135000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="originalPrice">Original Price (if discounted)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice || ''}
                  onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                  placeholder="150000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="condition">Condition</Label>
                <Select value={formData.condition || 'new'} onValueChange={(value) => handleInputChange('condition', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Brand New</SelectItem>
                    <SelectItem value="used">Used</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category || 'for-sale'} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="for-sale">For Sale</SelectItem>
                    <SelectItem value="wanted">Wanted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Detailed description of the AC unit"
                rows={3}
              />
            </div>

            {/* Features */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Features</Label>
                <Button type="button" size="sm" variant="outline" onClick={() => addArrayItem('features')}>
                  Add Feature
                </Button>
              </div>
              <div className="space-y-2">
                {(formData.features || []).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleArrayChange('features', index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                    />
                    {(formData.features?.length || 0) > 1 && (
                      <Button 
                        type="button" 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => removeArrayItem('features', index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Product Images (URLs)</Label>
                <Button type="button" size="sm" variant="outline" onClick={() => addArrayItem('images')}>
                  Add Image
                </Button>
              </div>
              <div className="space-y-2">
                {(formData.images || []).map((image, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={image}
                      onChange={(e) => handleArrayChange('images', index, e.target.value)}
                      placeholder={`Image URL ${index + 1}`}
                    />
                    {(formData.images?.length || 0) > 1 && (
                      <Button 
                        type="button" 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => removeArrayItem('images', index)}
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
                  id="isActive"
                  checked={formData.isActive !== false}
                  onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                />
                <Label htmlFor="isActive">Active (visible on website)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="showOnHomepage"
                  checked={formData.showOnHomepage || false}
                  onCheckedChange={(checked) => handleInputChange('showOnHomepage', checked)}
                />
                <Label htmlFor="showOnHomepage">Show on Homepage</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-[#8843F2] to-[#FF467E]">
                <Save className="mr-2 h-4 w-4" />
                {editingProduct ? 'Update Product' : 'Add Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProductsManager;
