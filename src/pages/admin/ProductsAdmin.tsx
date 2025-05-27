
import React, { useState } from 'react';
import { 
  Package, 
  PlusCircle, 
  Edit, 
  Trash2, 
  ChevronDown,
  ChevronUp,
  Check,
  X,
  ImagePlus,
  Star
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

// Sample product data for demonstration
const initialProducts = [
  {
    id: 'samsung-1.5ton',
    name: 'Samsung Pro Inverter AC - 1.5 Ton',
    brand: 'Samsung',
    price: 135000,
    originalPrice: 150000,
    rating: 4.8,
    features: [
      'Energy efficient inverter technology',
      'Smart connectivity features',
      'Fast cooling with turbo mode',
      'Anti-bacterial filter',
      '5-year warranty'
    ],
    images: [
      'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    condition: 'new',
    category: 'for-sale',
    discounted: true,
    discountPercentage: 10,
    active: true,
    description: 'Premium Samsung inverter AC with advanced cooling technology and energy efficiency.'
  },
  {
    id: 'lg-1ton',
    name: 'LG Eco Inverter AC - 1 Ton',
    brand: 'LG',
    price: 115000,
    rating: 4.7,
    features: [
      'Low power consumption',
      'Dual protection technology',
      'WiFi enabled smart controls',
      '3-year comprehensive warranty'
    ],
    images: [
      'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    condition: 'new',
    category: 'for-sale',
    discounted: false,
    discountPercentage: 0,
    active: true,
    description: 'LG eco-friendly inverter AC with superior energy efficiency and smart home integration.'
  }
];

const ProductsAdmin = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  
  // New product form state
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    brand: '',
    price: '',
    originalPrice: '',
    rating: '0',
    features: [''],
    images: [''],
    condition: 'new',
    category: 'for-sale',
    discounted: false,
    discountPercentage: '',
    active: true,
    description: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: updatedFeatures }));
  };
  
  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };
  
  const removeFeature = (index: number) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures.splice(index, 1);
    setFormData(prev => ({ ...prev, features: updatedFeatures }));
  };
  
  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData(prev => ({ ...prev, images: updatedImages }));
  };
  
  const addImage = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  };
  
  const removeImage = (index: number) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData(prev => ({ ...prev, images: updatedImages }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSortChange = (newSortBy: 'name' | 'price') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };
  
  const openNewProductDialog = () => {
    setEditMode(false);
    setCurrentProduct(null);
    setFormData({
      id: '',
      name: '',
      brand: '',
      price: '',
      originalPrice: '',
      rating: '0',
      features: [''],
      images: [''],
      condition: 'new',
      category: 'for-sale',
      discounted: false,
      discountPercentage: '',
      active: true,
      description: ''
    });
    setIsDialogOpen(true);
  };
  
  const openEditProductDialog = (product: any) => {
    setEditMode(true);
    setCurrentProduct(product);
    setFormData({
      ...product,
      price: product.price.toString(),
      originalPrice: product.originalPrice ? product.originalPrice.toString() : '',
      rating: product.rating.toString(),
      discountPercentage: product.discountPercentage ? product.discountPercentage.toString() : ''
    });
    setIsDialogOpen(true);
  };
  
  const openDeleteDialog = (product: any) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      id: formData.id || `product-${Date.now()}`,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      rating: parseFloat(formData.rating),
      discountPercentage: formData.discounted ? parseFloat(formData.discountPercentage) : 0
    };
    
    if (editMode) {
      // Update existing product
      setProducts(prev => 
        prev.map(product => 
          product.id === currentProduct.id ? productData : product
        )
      );
      toast({
        title: "Product Updated",
        description: `${productData.name} has been updated successfully.`,
      });
    } else {
      // Add new product
      setProducts(prev => [...prev, productData]);
      toast({
        title: "Product Added",
        description: `${productData.name} has been added successfully.`,
      });
    }
    
    setIsDialogOpen(false);
  };
  
  const handleDelete = () => {
    setProducts(prev => prev.filter(product => product.id !== currentProduct.id));
    toast({
      title: "Product Deleted",
      description: `${currentProduct.name} has been deleted successfully.`,
      variant: "destructive"
    });
    setIsDeleteDialogOpen(false);
  };
  
  const toggleProductStatus = (id: string, active: boolean) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === id ? { ...product, active } : product
      )
    );
    
    toast({
      title: active ? "Product Activated" : "Product Deactivated",
      description: `Product has been ${active ? 'activated' : 'deactivated'} successfully.`,
    });
  };
  
  // Filter products based on active tab
  const filteredProducts = products.filter(product => {
    if (activeTab === 'all') return true;
    if (activeTab === 'for-sale') return product.category === 'for-sale';
    if (activeTab === 'wanted') return product.category === 'wanted';
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortOrder === 'asc' 
        ? a.price - b.price
        : b.price - a.price;
    }
  });
  
  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };
  
  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">AC Products Management</h1>
          <p className="text-muted-foreground text-lg">Manage your AC listings for buy & sale on the website</p>
        </div>
        
        <Button onClick={openNewProductDialog} size="lg" className="bg-brand-blue hover:bg-brand-blue/90">
          <PlusCircle className="mr-2 h-5 w-5" />
          Add New AC Product
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
            <div>
              <CardTitle className="text-2xl">AC Products</CardTitle>
              <CardDescription className="text-lg">
                You have {products.length} AC products in total
              </CardDescription>
            </div>
            
            <div className="flex flex-col md:flex-row gap-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="all">All Products</TabsTrigger>
                  <TabsTrigger value="for-sale">For Sale</TabsTrigger>
                  <TabsTrigger value="wanted">Wanted</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Status</TableHead>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortChange('name')}>
                    <div className="flex items-center">
                      Product Name
                      {sortBy === 'name' && (
                        sortOrder === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortChange('price')}>
                    <div className="flex items-center">
                      Price
                      {sortBy === 'price' && (
                        sortOrder === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProducts.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex justify-center">
                        <Switch
                          checked={product.active}
                          onCheckedChange={(checked) => toggleProductStatus(product.id, checked)}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.images[0] ? (
                        <div className="relative w-20 h-20 rounded overflow-hidden">
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          {product.images.length > 1 && (
                            <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 text-white text-xs px-1">
                              +{product.images.length - 1}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded bg-gray-200 flex items-center justify-center">
                          <Package className="h-10 w-10 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-lg">{product.name}</div>
                      {product.rating > 0 && (
                        <div className="flex items-center text-sm text-amber-500">
                          <Star className="h-4 w-4 fill-amber-500 mr-1" />
                          {product.rating}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-brand-blue border-brand-blue">
                        {product.brand}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={product.category === 'for-sale' ? 'bg-blue-500' : 'bg-purple-500'}>
                        {product.category === 'for-sale' ? 'For Sale' : 'Wanted'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={product.condition === 'new' ? 'bg-green-500' : 'bg-amber-500'}>
                        {product.condition === 'new' ? 'New' : 'Used'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {product.discounted && product.originalPrice ? (
                        <div>
                          <div className="font-bold text-lg text-green-600">{formatPrice(product.price)}</div>
                          <div className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</div>
                          <div className="text-sm text-red-500 font-semibold">-{product.discountPercentage}%</div>
                        </div>
                      ) : (
                        <div className="font-bold text-lg">{formatPrice(product.price)}</div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openEditProductDialog(product)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openDeleteDialog(product)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Product
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editMode ? 'Edit AC Product' : 'Add New AC Product'}
            </DialogTitle>
            <DialogDescription className="text-lg">
              {editMode 
                ? 'Update the details of your AC product listing.' 
                : 'Add a new AC product to your listings for the website.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="name" className="text-lg font-semibold">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 py-3"
                />
              </div>
              <div>
                <Label htmlFor="brand" className="text-lg font-semibold">Brand</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="mt-2 py-3"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <Label htmlFor="price" className="text-lg font-semibold">Price (PKR)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="mt-2 py-3"
                />
              </div>
              <div>
                <Label htmlFor="originalPrice" className="text-lg font-semibold">Original Price (if discounted)</Label>
                <Input
                  id="originalPrice"
                  name="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="mt-2 py-3"
                />
              </div>
              <div>
                <Label htmlFor="rating" className="text-lg font-semibold">Rating</Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                  className="mt-2 py-3"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <Label htmlFor="category" className="text-lg font-semibold">Category</Label>
                <Select
                  name="category"
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="mt-2 py-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="for-sale">For Sale</SelectItem>
                    <SelectItem value="wanted">Wanted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="condition" className="text-lg font-semibold">Condition</Label>
                <Select
                  name="condition"
                  value={formData.condition}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, condition: value }))}
                >
                  <SelectTrigger className="mt-2 py-3">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="used">Used</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-4 mt-8">
                <Switch
                  id="discounted"
                  checked={formData.discounted}
                  onCheckedChange={(checked) => handleSwitchChange('discounted', checked)}
                />
                <Label htmlFor="discounted" className="text-lg font-semibold">Apply Discount</Label>
              </div>
            </div>
            
            {formData.discounted && (
              <div className="mb-6">
                <Label htmlFor="discountPercentage" className="text-lg font-semibold">Discount Percentage (%)</Label>
                <Input
                  id="discountPercentage"
                  name="discountPercentage"
                  type="number"
                  min="1"
                  max="99"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  required={formData.discounted}
                  className="mt-2 py-3"
                />
              </div>
            )}
            
            <div className="mb-6">
              <Label htmlFor="description" className="text-lg font-semibold">Product Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-2"
              />
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-semibold">Product Features</Label>
                <Button type="button" size="sm" variant="outline" onClick={addFeature}>
                  Add Feature
                </Button>
              </div>
              
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 mb-3">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                    className="py-3"
                  />
                  {formData.features.length > 1 && (
                    <Button 
                      type="button" 
                      size="sm" 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => removeFeature(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-semibold">Product Images (URLs)</Label>
                <Button type="button" size="sm" variant="outline" onClick={addImage}>
                  <ImagePlus className="mr-2 h-4 w-4" />
                  Add Image URL
                </Button>
              </div>
              
              {formData.images.map((imageUrl, index) => (
                <div key={index} className="flex items-start gap-4 mb-4">
                  <div className="flex-grow">
                    <Input
                      value={imageUrl}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder={`Image URL ${index + 1}`}
                      className="py-3"
                    />
                  </div>
                  {imageUrl && (
                    <div className="w-16 h-16 rounded overflow-hidden border">
                      <img 
                        src={imageUrl} 
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/100')}
                      />
                    </div>
                  )}
                  {formData.images.length > 1 && (
                    <Button 
                      type="button" 
                      size="sm" 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-600 mt-2"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => handleSwitchChange('active', checked)}
              />
              <Label htmlFor="active" className="text-lg font-semibold">Product Active (visible on website)</Label>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-brand-blue hover:bg-brand-blue/90">
                {editMode ? 'Update Product' : 'Add Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-lg">
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

export default ProductsAdmin;
