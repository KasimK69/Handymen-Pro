
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
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useACProducts } from '@/hooks/useACProducts';

const AdminACProductsManager = () => {
  const { products, loading, refreshProducts } = useACProducts();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    original_price: '',
    category: 'sale',
    condition: 'new',
    tonnage: '',
    energy_rating: '',
    features: [''],
    images: [''],
    contact_info: '',
    location: '',
    featured: false,
    status: 'active'
  });

  const handleInputChange = (field: string, value: any) => {
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
      price: '',
      original_price: '',
      category: 'sale',
      condition: 'new',
      tonnage: '',
      energy_rating: '',
      features: [''],
      images: [''],
      contact_info: '',
      location: '',
      featured: false,
      status: 'active'
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      brand: product.brand || '',
      description: product.description || '',
      price: product.price?.toString() || '',
      original_price: product.original_price?.toString() || '',
      category: product.category || 'sale',
      condition: product.condition || 'new',
      tonnage: product.tonnage || '',
      energy_rating: product.energy_rating || '',
      features: product.features && product.features.length > 0 ? product.features : [''],
      images: product.images && product.images.length > 0 ? product.images : [''],
      contact_info: product.contact_info || '',
      location: product.location || '',
      featured: product.featured || false,
      status: product.status || 'active'
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('💾 Submitting AC product:', formData);
    
    if (!formData.name || !formData.brand || !formData.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (Name, Brand, Price)",
        variant: "destructive"
      });
      return;
    }

    try {
      const productData = {
        name: formData.name,
        brand: formData.brand,
        description: formData.description || null,
        price: Number(formData.price),
        original_price: formData.original_price ? Number(formData.original_price) : null,
        category: formData.category,
        condition: formData.condition,
        tonnage: formData.tonnage || null,
        energy_rating: formData.energy_rating || null,
        features: formData.features.filter(f => f.trim() !== ''),
        images: formData.images.filter(i => i.trim() !== ''),
        contact_info: formData.contact_info || null,
        location: formData.location || null,
        featured: formData.featured,
        status: formData.status
      };

      console.log('📤 Sending to Supabase:', productData);

      if (editingProduct) {
        const { data, error } = await supabase
          .from('ac_products')
          .update(productData)
          .eq('id', editingProduct.id)
          .select();

        if (error) {
          console.error('❌ Update error:', error);
          throw error;
        }

        console.log('✅ Product updated successfully:', data);
        toast({
          title: "Success",
          description: "AC product updated successfully"
        });
      } else {
        const { data, error } = await supabase
          .from('ac_products')
          .insert([productData])
          .select();

        if (error) {
          console.error('❌ Insert error:', error);
          throw error;
        }

        console.log('✅ Product created successfully:', data);
        toast({
          title: "Success",
          description: "New AC product added successfully"
        });
      }

      setIsDialogOpen(false);
      refreshProducts();
    } catch (error: any) {
      console.error('❌ Error saving AC product:', error);
      toast({
        title: "Error",
        description: `Failed to save AC product: ${error.message || 'Unknown error'}`,
        variant: "destructive"
      });
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      console.log('🗑️ Deleting product:', id);
      const { error } = await supabase
        .from('ac_products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('❌ Delete error:', error);
        throw error;
      }

      console.log('✅ Product deleted successfully');
      toast({
        title: "Success",
        description: "AC product deleted successfully"
      });
      
      refreshProducts();
    } catch (error: any) {
      console.error('❌ Error deleting product:', error);
      toast({
        title: "Error",
        description: `Failed to delete product: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const toggleProductStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('ac_products')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Product ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`
      });
      
      refreshProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to update product status: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const formatPrice = (price: number) => `PKR ${price.toLocaleString()}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">AC Products Management</h2>
          <p className="text-gray-600">Manage your AC inventory and listings ({products.length} products)</p>
        </div>
        <Button onClick={openCreateDialog} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="mr-2 h-5 w-5" />
          Add New AC Product
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                  <Badge className="bg-yellow-500">Featured</Badge>
                )}
                <Badge variant={product.status === 'active' ? "default" : "secondary"}>
                  {product.status}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
              <div className="space-y-1 text-sm text-gray-600 mb-3">
                <p>{product.brand}</p>
                {product.tonnage && <p>Capacity: {product.tonnage}</p>}
                {product.energy_rating && <p>Rating: {product.energy_rating}</p>}
                <p className="font-semibold text-blue-600 text-lg">{formatPrice(product.price)}</p>
                {product.original_price && (
                  <p className="text-sm text-gray-500 line-through">
                    {formatPrice(product.original_price)}
                  </p>
                )}
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
                  onCheckedChange={(checked) => toggleProductStatus(product.id, checked ? 'active' : 'inactive')}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No AC Products Yet</h3>
          <p className="text-gray-600 mb-4">Start by adding your first AC product to the inventory.</p>
          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Product
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
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Samsung Digital Inverter AC"
                  required
                />
              </div>
              <div>
                <Label htmlFor="brand">Brand *</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="e.g., Samsung"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="tonnage">Capacity</Label>
                <Select value={formData.tonnage} onValueChange={(value) => handleInputChange('tonnage', value)}>
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
                <Label htmlFor="energy_rating">Energy Rating</Label>
                <Select value={formData.energy_rating} onValueChange={(value) => handleInputChange('energy_rating', value)}>
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
                <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
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
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="135000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="original_price">Original Price (if discounted)</Label>
                <Input
                  id="original_price"
                  type="number"
                  value={formData.original_price}
                  onChange={(e) => handleInputChange('original_price', e.target.value)}
                  placeholder="150000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="contact_info">Contact Information</Label>
                <Input
                  id="contact_info"
                  value={formData.contact_info}
                  onChange={(e) => handleInputChange('contact_info', e.target.value)}
                  placeholder="Phone number or email"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, Area"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
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
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleArrayChange('features', index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                    />
                    {formData.features.length > 1 && (
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
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={image}
                      onChange={(e) => handleArrayChange('images', index, e.target.value)}
                      placeholder={`Image URL ${index + 1}`}
                    />
                    {formData.images.length > 1 && (
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

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleInputChange('featured', checked)}
                />
                <Label htmlFor="featured">Featured Product</Label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600">
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
