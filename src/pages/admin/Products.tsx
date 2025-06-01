
import React, { useState } from 'react';
import { 
  Package, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Star,
  AirVent,
  Zap,
  Eye,
  Save,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

interface ACProduct {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  originalPrice?: number;
  tonnage: string;
  energyRating: string;
  condition: 'new' | 'used';
  description: string;
  features: string[];
  images: string[];
  inStock: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const Products = () => {
  const [products, setProducts] = useState<ACProduct[]>([
    {
      id: '1',
      name: 'Ultra Cool Inverter AC',
      brand: 'Samsung',
      model: 'AR18TYHYC',
      price: 135000,
      originalPrice: 150000,
      tonnage: '1.5',
      energyRating: '5 Star',
      condition: 'new',
      description: 'Energy-efficient inverter AC with smart WiFi control and fast cooling technology.',
      features: ['WiFi Control', 'Energy Efficient', 'Fast Cooling', '5 Year Warranty'],
      images: ['https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      inStock: true,
      featured: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Eco Plus Window AC',
      brand: 'LG',
      model: 'LW8017ERSM',
      price: 95000,
      tonnage: '1',
      energyRating: '4 Star',
      condition: 'new',
      description: 'Affordable window AC with good cooling performance and energy efficiency.',
      features: ['Window Type', 'Energy Efficient', 'Easy Installation', '3 Year Warranty'],
      images: ['https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      inStock: true,
      featured: false,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-10'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ACProduct | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterCondition, setFilterCondition] = useState('');

  const [formData, setFormData] = useState<Partial<ACProduct>>({
    name: '',
    brand: '',
    model: '',
    price: 0,
    originalPrice: 0,
    tonnage: '',
    energyRating: '',
    condition: 'new',
    description: '',
    features: [''],
    images: [''],
    inStock: true,
    featured: false
  });

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = filterBrand === '' || product.brand === filterBrand;
    const matchesCondition = filterCondition === '' || product.condition === filterCondition;
    
    return matchesSearch && matchesBrand && matchesCondition;
  });

  // Get unique brands
  const brands = Array.from(new Set(products.map(p => p.brand)));

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: 'features' | 'images', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field]?.map((item, i) => i === index ? value : item) || []
    }));
  };

  const addArrayItem = (field: 'features' | 'images') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }));
  };

  const removeArrayItem = (field: 'features' | 'images', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field]?.filter((_, i) => i !== index) || []
    }));
  };

  const openNewProductDialog = () => {
    setEditMode(false);
    setFormData({
      name: '',
      brand: '',
      model: '',
      price: 0,
      originalPrice: 0,
      tonnage: '',
      energyRating: '',
      condition: 'new',
      description: '',
      features: [''],
      images: [''],
      inStock: true,
      featured: false
    });
    setIsDialogOpen(true);
  };

  const openEditProductDialog = (product: ACProduct) => {
    setEditMode(true);
    setCurrentProduct(product);
    setFormData({
      ...product,
      features: [...product.features],
      images: [...product.images]
    });
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (product: ACProduct) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.brand || !formData.model || !formData.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const productData: ACProduct = {
      id: editMode ? currentProduct?.id || '' : Date.now().toString(),
      name: formData.name || '',
      brand: formData.brand || '',
      model: formData.model || '',
      price: Number(formData.price) || 0,
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      tonnage: formData.tonnage || '',
      energyRating: formData.energyRating || '',
      condition: formData.condition || 'new',
      description: formData.description || '',
      features: formData.features?.filter(f => f.trim() !== '') || [],
      images: formData.images?.filter(i => i.trim() !== '') || [],
      inStock: formData.inStock || true,
      featured: formData.featured || false,
      createdAt: editMode ? currentProduct?.createdAt || new Date().toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    if (editMode) {
      setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
      toast({
        title: "Success",
        description: "Product updated successfully"
      });
    } else {
      setProducts(prev => [...prev, productData]);
      toast({
        title: "Success",
        description: "New product added successfully"
      });
    }

    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (currentProduct) {
      setProducts(prev => prev.filter(p => p.id !== currentProduct.id));
      setIsDeleteDialogOpen(false);
      toast({
        title: "Success",
        description: "Product deleted successfully"
      });
    }
  };

  const formatPrice = (price: number) => `PKR ${price.toLocaleString()}`;

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl flex items-center">
              <Package className="mr-2 h-6 w-6" />
              AC Products Management
            </CardTitle>
            <CardDescription>
              Manage your AC inventory, add new products, and update existing listings
            </CardDescription>
          </div>
          <Button onClick={openNewProductDialog} className="bg-blue-600 hover:bg-blue-700">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New AC
          </Button>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterBrand} onValueChange={setFilterBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Brands</SelectItem>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterCondition} onValueChange={setFilterCondition}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Conditions</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setFilterBrand('');
                  setFilterCondition('');
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Products Table */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filterBrand || filterCondition ? 'Try adjusting your filters' : 'Add your first AC product to get started'}
              </p>
              <Button onClick={openNewProductDialog}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add AC Product
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Product</TableHead>
                    <TableHead>Specifications</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={product.images[0] || 'https://via.placeholder.com/100x100?text=AC'} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-semibold line-clamp-1">{product.name}</div>
                            <div className="text-sm text-gray-600">{product.brand} - {product.model}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className={`text-xs ${product.condition === 'new' ? 'border-green-500 text-green-700' : 'border-orange-500 text-orange-700'}`}>
                                {product.condition}
                              </Badge>
                              {product.featured && (
                                <Badge className="bg-yellow-500 hover:bg-yellow-600 text-xs">
                                  <Star className="h-3 w-3 mr-1 fill-current" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <AirVent className="h-3 w-3 mr-1 text-blue-600" />
                            {product.tonnage} Ton
                          </div>
                          <div className="flex items-center text-sm">
                            <Zap className="h-3 w-3 mr-1 text-green-600" />
                            {product.energyRating}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-semibold text-blue-600">{formatPrice(product.price)}</div>
                          {product.originalPrice && (
                            <div className="text-xs text-gray-500 line-through">{formatPrice(product.originalPrice)}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.inStock ? "default" : "secondary"}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => openEditProductDialog(product)}
                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => openDeleteDialog(product)}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editMode ? 'Edit AC Product' : 'Add New AC Product'}</DialogTitle>
            <DialogDescription>
              {editMode ? 'Make changes to the AC product details.' : 'Fill in the details to add a new AC product.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., Ultra Cool Inverter AC"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand">Brand *</Label>
                    <Input
                      id="brand"
                      value={formData.brand || ''}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      placeholder="e.g., Samsung"
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Model *</Label>
                    <Input
                      id="model"
                      value={formData.model || ''}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                      placeholder="e.g., AR18TYHYC"
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
              </div>

              {/* Specifications & Pricing */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Specifications & Pricing</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tonnage">Tonnage</Label>
                    <Select value={formData.tonnage || ''} onValueChange={(value) => handleInputChange('tonnage', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tonnage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.75">0.75 Ton</SelectItem>
                        <SelectItem value="1">1 Ton</SelectItem>
                        <SelectItem value="1.5">1.5 Ton</SelectItem>
                        <SelectItem value="2">2 Ton</SelectItem>
                        <SelectItem value="2.5">2.5 Ton</SelectItem>
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
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price (PKR) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price || ''}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="135000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Original Price (PKR)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={formData.originalPrice || ''}
                      onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                      placeholder="150000"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="inStock"
                      checked={formData.inStock || false}
                      onCheckedChange={(checked) => handleInputChange('inStock', checked)}
                    />
                    <Label htmlFor="inStock">In Stock</Label>
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
                        className="text-red-500 hover:text-red-600"
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
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Save className="mr-2 h-4 w-4" />
                {editMode ? 'Save Changes' : 'Add Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{currentProduct?.name}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
