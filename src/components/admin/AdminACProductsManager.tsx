
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ACProduct | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState('sale');
  const [condition, setCondition] = useState('used');
  const [tonnage, setTonnage] = useState('');
  const [energyRating, setEnergyRating] = useState('');
  const [features, setFeatures] = useState('');
  const [images, setImages] = useState('');
  const [location, setLocation] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [status, setStatus] = useState('active');
  const [featured, setFeatured] = useState(false);

  const { toast } = useToast();

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
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to fetch AC products.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setBrand('');
    setDescription('');
    setPrice('');
    setOriginalPrice('');
    setCategory('sale');
    setCondition('used');
    setTonnage('');
    setEnergyRating('');
    setFeatures('');
    setImages('');
    setLocation('');
    setContactInfo('');
    setStatus('active');
    setFeatured(false);
    setEditingProduct(null);
    setIsCreating(false);
  };

  const handleSaveProduct = async () => {
    if (!name || !brand || !price) {
      toast({
        title: "Error",
        description: "Please fill in name, brand, and price.",
        variant: "destructive",
      });
      return;
    }

    const featuresArray = features ? features.split(',').map(f => f.trim()) : [];
    const imagesArray = images ? images.split(',').map(i => i.trim()) : [];

    const productData = {
      name,
      brand,
      description: description || null,
      price: parseFloat(price),
      original_price: originalPrice ? parseFloat(originalPrice) : null,
      category,
      condition,
      tonnage: tonnage || null,
      energy_rating: energyRating || null,
      features: featuresArray.length > 0 ? featuresArray : null,
      images: imagesArray.length > 0 ? imagesArray : null,
      location: location || null,
      contact_info: contactInfo || null,
      status,
      featured,
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
          description: "AC product updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from('ac_products')
          .insert([productData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "AC product created successfully.",
        });
      }

      fetchProducts();
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: "Failed to save AC product.",
        variant: "destructive",
      });
    }
  };

  const handleEditProduct = (product: ACProduct) => {
    setEditingProduct(product);
    setName(product.name);
    setBrand(product.brand);
    setDescription(product.description || '');
    setPrice(product.price.toString());
    setOriginalPrice(product.original_price?.toString() || '');
    setCategory(product.category);
    setCondition(product.condition);
    setTonnage(product.tonnage || '');
    setEnergyRating(product.energy_rating || '');
    setFeatures(product.features ? product.features.join(', ') : '');
    setImages(product.images ? product.images.join(', ') : '');
    setLocation(product.location || '');
    setContactInfo(product.contact_info || '');
    setStatus(product.status);
    setFeatured(product.featured || false);
    setIsCreating(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this AC product?')) return;

    try {
      const { error } = await supabase
        .from('ac_products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "AC product deleted successfully.",
      });
      
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete AC product.",
        variant: "destructive",
      });
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">AC Products Management</CardTitle>
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-brand-blue hover:bg-brand-blue/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add AC Product
          </Button>
        </CardHeader>
        <CardContent>
          {isCreating ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {editingProduct ? 'Edit AC Product' : 'Create New AC Product'}
              </h3>
              
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter product name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      placeholder="Enter brand name"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="price">Price (PKR)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="125000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Original Price</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      placeholder="150000"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tonnage">Tonnage</Label>
                    <Input
                      id="tonnage"
                      placeholder="1.5 Ton"
                      value={tonnage}
                      onChange={(e) => setTonnage(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="energyRating">Energy Rating</Label>
                    <Input
                      id="energyRating"
                      placeholder="5 Star"
                      value={energyRating}
                      onChange={(e) => setEnergyRating(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      className="w-full p-2 border border-input bg-background rounded-md"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="sale">For Sale</option>
                      <option value="rent">For Rent</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="condition">Condition</Label>
                    <select
                      className="w-full p-2 border border-input bg-background rounded-md"
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                    >
                      <option value="new">Brand New</option>
                      <option value="used">Used</option>
                      <option value="refurbished">Refurbished</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Islamabad, Pakistan"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="features">Features (comma separated)</Label>
                  <Textarea
                    id="features"
                    placeholder="WiFi Control, Energy Efficient, Fast Cooling"
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="images">Image URLs (comma separated)</Label>
                  <Textarea
                    id="images"
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    value={images}
                    onChange={(e) => setImages(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="contactInfo">Contact Information</Label>
                  <Input
                    id="contactInfo"
                    placeholder="+92 312 5242182"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={featured}
                      onCheckedChange={setFeatured}
                    />
                    <Label htmlFor="featured">Featured Product</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={status === 'active'}
                      onCheckedChange={(checked) => setStatus(checked ? 'active' : 'inactive')}
                    />
                    <Label htmlFor="active">Active</Label>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={handleSaveProduct} className="bg-brand-blue hover:bg-brand-blue/90">
                    {editingProduct ? 'Update Product' : 'Create Product'}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search AC products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Products List */}
              <div className="grid gap-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            {product.featured && <Badge variant="secondary">Featured</Badge>}
                            <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                              {product.status}
                            </Badge>
                            <Badge variant="outline">{product.condition}</Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                            <div>Brand: <span className="font-medium">{product.brand}</span></div>
                            <div>Price: <span className="font-medium">PKR {product.price.toLocaleString()}</span></div>
                            <div>Tonnage: <span className="font-medium">{product.tonnage || 'N/A'}</span></div>
                            <div>Rating: <span className="font-medium">{product.energy_rating || 'N/A'}</span></div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                          <div className="text-xs text-gray-500">
                            Views: {product.views || 0} | Created: {new Date(product.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 ml-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => window.open(`/ac-buy-and-sale`, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredProducts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No AC products found.
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminACProductsManager;
