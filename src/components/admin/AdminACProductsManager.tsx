
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
    console.log('🔄 AdminACProductsManager: Initial load - fetching products');
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('📡 Fetching AC products from Supabase...');
      setLoading(true);
      
      const { data, error } = await supabase
        .from('ac_products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Supabase fetch error:', error);
        throw error;
      }

      console.log(`✅ Successfully fetched ${data?.length || 0} products:`, data);
      setProducts(data || []);
    } catch (error) {
      console.error('❌ Error fetching AC products:', error);
      toast({
        title: "Error",
        description: "Failed to fetch AC products. Check console for details.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof ACProduct, value: any) => {
    console.log(`📝 Form field changed: ${field} = ${value}`);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: 'features' | 'images', index: number, value: string) => {
    const array = formData[field] as string[];
    const newArray = [...array];
    newArray[index] = value;
    console.log(`📝 Array field changed: ${field}[${index}] = ${value}`);
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: 'features' | 'images') => {
    const array = formData[field] as string[];
    console.log(`➕ Adding new ${field} item`);
    setFormData(prev => ({ ...prev, [field]: [...array, ''] }));
  };

  const removeArrayItem = (field: 'features' | 'images', index: number) => {
    const array = formData[field] as string[];
    const newArray = array.filter((_, i) => i !== index);
    console.log(`➖ Removing ${field} item at index ${index}`);
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const openCreateDialog = () => {
    console.log('🆕 Opening create product dialog');
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
    console.log('✏️ Opening edit dialog for product:', product.id);
    setEditingProduct(product);
    setFormData({
      name: product.name,
      brand: product.brand,
      description: product.description,
      price: product.price,
      original_price: product.original_price,
      category: product.category,
      condition: product.condition,
      tonnage: product.tonnage,
      energy_rating: product.energy_rating,
      features: product.features || [''],
      images: product.images || [''],
      contact_info: product.contact_info,
      location: product.location,
      status: product.status,
      featured: product.featured || false
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('💾 Submitting form with data:', formData);
    
    // Validation
    if (!formData.name?.trim() || !formData.brand?.trim() || !formData.price) {
      console.error('❌ Validation failed: Missing required fields');
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Brand, Price)",
        variant: "destructive"
      });
      return;
    }

    try {
      const productData = {
        name: formData.name!.trim(),
        brand: formData.brand!.trim(),
        description: formData.description?.trim() || null,
        price: Number(formData.price),
        original_price: formData.original_price ? Number(formData.original_price) : null,
        category: formData.category || 'sale',
        condition: formData.condition || 'used',
        tonnage: formData.tonnage?.trim() || null,
        energy_rating: formData.energy_rating?.trim() || null,
        features: (formData.features || []).filter(f => f.trim() !== ''),
        images: (formData.images || []).filter(img => img.trim() !== ''),
        contact_info: formData.contact_info?.trim() || null,
        location: formData.location?.trim() || null,
        status: formData.status || 'active',
        featured: formData.featured || false
      };

      console.log('📤 Prepared data for Supabase:', productData);

      if (editingProduct) {
        console.log(`🔄 Updating existing product: ${editingProduct.id}`);
        
        const { data, error } = await supabase
          .from('ac_products')
          .update(productData)
          .eq('id', editingProduct.id)
          .select();
          
        if (error) {
          console.error('❌ Supabase update error:', error);
          throw error;
        }
        
        console.log('✅ Product updated successfully:', data);
        toast({
          title: "Success",
          description: `${productData.name} updated successfully!`,
        });
      } else {
        console.log('🆕 Creating new product');
        
        const { data, error } = await supabase
          .from('ac_products')
          .insert([productData])
          .select();
          
        if (error) {
          console.error('❌ Supabase insert error:', error);
          throw error;
        }
        
        console.log('✅ Product created successfully:', data);
        toast({
          title: "Success",
          description: `${productData.name} created successfully!`,
        });
      }
      
      setIsDialogOpen(false);
      await fetchProducts(); // Refresh the products list
      
    } catch (error: any) {
      console.error('❌ Error saving product:', error);
      toast({
        title: "Error",
        description: `Failed to save product: ${error.message || 'Unknown error'}`,
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (product: ACProduct) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }
    
    try {
      console.log(`🗑️ Deleting product: ${product.id}`);
      
      const { error } = await supabase
        .from('ac_products')
        .delete()
        .eq('id', product.id);
        
      if (error) {
        console.error('❌ Supabase delete error:', error);
        throw error;
      }
      
      console.log('✅ Product deleted successfully');
      toast({
        title: "Deleted",
        description: `${product.name} has been deleted.`,
        variant: "destructive"
      });
      
      await fetchProducts(); // Refresh the products list
    } catch (error: any) {
      console.error('❌ Error deleting product:', error);
      toast({
        title: "Error",
        description: `Failed to delete product: ${error.message || 'Unknown error'}`,
        variant: "destructive"
      });
    }
  };

  const toggleStatus = async (product: ACProduct) => {
    try {
      const newStatus = product.status === 'active' ? 'inactive' : 'active';
      console.log(`🔄 Toggling product status: ${product.id} -> ${newStatus}`);
      
      const { error } = await supabase
        .from('ac_products')
        .update({ status: newStatus })
        .eq('id', product.id);
        
      if (error) {
        console.error('❌ Supabase status update error:', error);
        throw error;
      }
      
      console.log('✅ Product status updated successfully');
      toast({
        title: "Status Updated",
        description: `${product.name} is now ${newStatus}.`,
      });
      
      await fetchProducts(); // Refresh the products list
    } catch (error: any) {
      console.error('❌ Error updating product status:', error);
      toast({
        title: "Error",
        description: `Failed to update status: ${error.message || 'Unknown error'}`,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading AC products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AC Products Management</h1>
          <p className="text-gray-600 mt-2">Manage air conditioner listings for buy & sale</p>
        </div>
        <Button onClick={openCreateDialog} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products ({products.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                        {product.status}
                      </Badge>
                      {product.featured && <Badge variant="outline">Featured</Badge>}
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Brand:</strong> {product.brand}</p>
                      <p><strong>Price:</strong> PKR {product.price.toLocaleString()}</p>
                      {product.original_price && (
                        <p><strong>Original Price:</strong> PKR {product.original_price.toLocaleString()}</p>
                      )}
                      {product.description && (
                        <p><strong>Description:</strong> {product.description.substring(0, 100)}...</p>
                      )}
                      {product.tonnage && <p><strong>Tonnage:</strong> {product.tonnage}</p>}
                      {product.energy_rating && <p><strong>Energy Rating:</strong> {product.energy_rating}</p>}
                      {product.views && <p><strong>Views:</strong> {product.views}</p>}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={product.status === 'active'}
                      onCheckedChange={() => toggleStatus(product)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(product)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {products.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No products found. Add your first AC product!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Edit AC Product' : 'Add New AC Product'}
            </DialogTitle>
            <DialogDescription>
              Fill in the product details below
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
                  placeholder="e.g., Samsung Digital Inverter AC 1.5 Ton"
                  required
                />
              </div>
              <div>
                <Label htmlFor="brand">Brand *</Label>
                <Input
                  id="brand"
                  value={formData.brand || ''}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="e.g., Samsung, LG, Haier"
                  required
                />
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
                  placeholder="e.g., 85000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="original_price">Original Price (if discounted)</Label>
                <Input
                  id="original_price"
                  type="number"
                  value={formData.original_price || ''}
                  onChange={(e) => handleInputChange('original_price', e.target.value)}
                  placeholder="e.g., 95000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category || 'sale'}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
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
                <Label htmlFor="condition">Condition</Label>
                <Select
                  value={formData.condition || 'used'}
                  onValueChange={(value) => handleInputChange('condition', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="used">Used</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status || 'active'}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="tonnage">Tonnage</Label>
                <Input
                  id="tonnage"
                  value={formData.tonnage || ''}
                  onChange={(e) => handleInputChange('tonnage', e.target.value)}
                  placeholder="e.g., 1.5 Ton"
                />
              </div>
              <div>
                <Label htmlFor="energy_rating">Energy Rating</Label>
                <Input
                  id="energy_rating"
                  value={formData.energy_rating || ''}
                  onChange={(e) => handleInputChange('energy_rating', e.target.value)}
                  placeholder="e.g., 5 Star"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Detailed product description..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="contact_info">Contact Information</Label>
                <Input
                  id="contact_info"
                  value={formData.contact_info || ''}
                  onChange={(e) => handleInputChange('contact_info', e.target.value)}
                  placeholder="Phone number or email"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City or area"
                />
              </div>
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
                <Label>Image URLs</Label>
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

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured || false}
                onCheckedChange={(checked) => handleInputChange('featured', checked)}
              />
              <Label htmlFor="featured">Featured Product</Label>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Save className="mr-2 h-4 w-4" />
                {editingProduct ? 'Update Product' : 'Create Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminACProductsManager;
