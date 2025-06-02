
import React, { useState, useEffect } from 'react';
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
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ACProduct {
  id: string;
  name: string;
  brand: string;
  description: string | null;
  price: number;
  original_price: number | null;
  category: string;
  condition: string;
  tonnage: string | null;
  energy_rating: string | null;
  features: string[] | null;
  images: string[] | null;
  contact_info: string | null;
  location: string | null;
  status: string;
  featured: boolean | null;
  views: number | null;
  created_at: string;
  updated_at: string;
}

const AdminACProductsManager = () => {
  const [products, setProducts] = useState<ACProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ACProduct | null>(null);
  const [formData, setFormData] = useState<Partial<ACProduct>>({
    name: '',
    brand: '',
    description: '',
    price: 0,
    original_price: 0,
    category: 'sale',
    condition: 'used',
    tonnage: '',
    energy_rating: '',
    features: [''],
    images: [''],
    contact_info: '',
    location: '',
    status: 'active',
    featured: false
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('ac_products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching AC products:', error);
      toast({
        title: "Error",
        description: "Failed to fetch AC products",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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
      description: '',
      price: 0,
      original_price: 0,
      category: 'sale',
      condition: 'used',
      tonnage: '',
      energy_rating: '',
      features: [''],
      images: [''],
      contact_info: '',
      location: '',
      status: 'active',
      featured: false
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: ACProduct) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      features: product.features || [''],
      images: product.images || ['']
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.brand || !formData.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const productData = {
      name: formData.name!,
      brand: formData.brand!,
      description: formData.description || null,
      price: Number(formData.price),
      original_price: formData.original_price ? Number(formData.original_price) : null,
      category: formData.category || 'sale',
      condition: formData.condition || 'used',
      tonnage: formData.tonnage || null,
      energy_rating: formData.energy_rating || null,
      features: (formData.features || []).filter(f => f.trim() !== ''),
      images: (formData.images || []).filter(i => i.trim() !== ''),
      contact_info: formData.contact_info || null,
      location: formData.location || null,
      status: formData.status || 'active',
      featured: formData.featured || false
    };

    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('ac_products')
          .update(productData)
          .eq('id', editingProduct.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "AC product updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('ac_products')
          .insert([productData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "New AC product added successfully"
        });
      }

      fetchProducts();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving AC product:', error);
      toast({
        title: "Error",
        description: "Failed to save AC product",
        variant: "destructive"
      });
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this AC product?')) return;

    try {
      const { error } = await supabase
        .from('ac_products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "AC product deleted successfully"
      });
      
      fetchProducts();
    } catch (error) {
      console.error('Error deleting AC product:', error);
      toast({
        title: "Error",
        description: "Failed to delete AC product",
        variant: "destructive"
      });
    }
  };

  const toggleProductStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('ac_products')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Product ${status === 'active' ? 'activated' : 'deactivated'} successfully`
      });
      
      fetchProducts();
    } catch (error) {
      console.error('Error updating product status:', error);
      toast({
        title: "Error",
        description: "Failed to update product status",
        variant: "destructive"
      });
    }
  };

  const formatPrice = (price: number) => `PKR ${price.toLocaleString()}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading AC products...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#2D3559]">AC Products Management</h2>
          <p className="text-gray-600">Manage your AC marketplace listings</p>
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
              {product.images && product.images[0] ? (
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
                {product.featured && (
                  <Badge className="bg-green-500">Featured</Badge>
                )}
                <Badge variant={product.status === 'active' ? "default" : "secondary"}>
                  {product.status}
                </Badge>
                <Badge variant={product.category === 'sale' ? "default" : "outline"}>
                  {product.category}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <div className="space-y-1 text-sm text-gray-600 mb-3">
                <p>{product.brand} - {product.condition}</p>
                <p>{product.tonnage} | {product.energy_rating}</p>
                <p className="font-semibold text-[#8843F2]">{formatPrice(product.price)}</p>
                {product.location && <p>📍 {product.location}</p>}
              </div>
              <div className="flex gap-2 mb-3">
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
              <div className="flex items-center justify-between">
                <Label htmlFor={`active-${product.id}`} className="text-sm">
                  Active
                </Label>
                <Switch
                  id={`active-${product.id}`}
                  checked={product.status === 'active'}
                  onCheckedChange={(checked) => 
                    toggleProductStatus(product.id, checked ? 'active' : 'inactive')
                  }
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No AC products found.</p>
          <Button onClick={openCreateDialog} className="mt-4">
            Add your first AC product
          </Button>
        </div>
      )}

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
                <Label htmlFor="tonnage">Tonnage</Label>
                <Select value={formData.tonnage || ''} onValueChange={(value) => handleInputChange('tonnage', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tonnage" />
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
                <Select value={formData.energy_rating || ''} onValueChange={(value) => handleInputChange('energy_rating', value)}>
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
              <div>
                <Label htmlFor="condition">Condition</Label>
                <Select value={formData.condition || 'used'} onValueChange={(value) => handleInputChange('condition', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Brand New</SelectItem>
                    <SelectItem value="used">Used</SelectItem>
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
                  value={formData.original_price || ''}
                  onChange={(e) => handleInputChange('original_price', e.target.value)}
                  placeholder="150000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category || 'sale'} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="wanted">Wanted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Islamabad"
                />
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

            <div>
              <Label htmlFor="contactInfo">Contact Information</Label>
              <Input
                id="contactInfo"
                value={formData.contact_info || ''}
                onChange={(e) => handleInputChange('contact_info', e.target.value)}
                placeholder="+92 300 1234567"
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
                  checked={formData.status === 'active'}
                  onCheckedChange={(checked) => handleInputChange('status', checked ? 'active' : 'inactive')}
                />
                <Label htmlFor="isActive">Active (visible on website)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured || false}
                  onCheckedChange={(checked) => handleInputChange('featured', checked)}
                />
                <Label htmlFor="featured">Featured Product</Label>
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

export default AdminACProductsManager;
