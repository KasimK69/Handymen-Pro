
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
  DialogTrigger,
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
    id: 'inverter-1ton',
    name: 'Pro Inverter AC - 1 Ton',
    price: 125000,
    rating: 4.8,
    features: [
      'Energy efficient inverter technology',
      'Cooling capacity: 12,000 BTU',
      'Low noise operation: 26dB',
      'Smart connectivity features',
      'Anti-bacterial filter',
      '5-year warranty'
    ],
    images: [
      'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    condition: 'new',
    category: 'for-sale',
    discounted: false,
    discountPercentage: 0,
    active: true
  },
  {
    id: 'inverter-1.5ton',
    name: 'Pro Inverter AC - 1.5 Ton',
    price: 150000,
    rating: 4.9,
    features: [
      'Energy efficient inverter technology',
      'Cooling capacity: 18,000 BTU',
      'Low noise operation: 28dB',
      'Smart connectivity features',
      'Anti-bacterial filter',
      '5-year warranty'
    ],
    images: [
      'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    condition: 'new',
    category: 'for-sale',
    discounted: true,
    discountPercentage: 10,
    active: true
  },
  {
    id: 'used-standard-1ton',
    name: 'Used Standard AC - 1 Ton',
    price: 55000,
    rating: 4.0,
    features: [
      'Efficient cooling',
      'Cooling capacity: 12,000 BTU',
      'Auto restart feature',
      'Regular maintenance done',
      '6-month warranty from our shop'
    ],
    images: [
      'https://images.unsplash.com/photo-1563351672-62b74891a28a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    condition: 'used',
    category: 'for-sale',
    discounted: false,
    discountPercentage: 0,
    active: true
  },
  {
    id: 'wanted-inverter-1ton',
    name: 'Looking for: Inverter AC - 1 Ton',
    price: 60000,
    rating: 0,
    features: [
      'Seeking slightly used inverter AC',
      'Must be in good working condition',
      'Preferably 1-2 years old',
      'Budget: Up to PKR 60,000',
      'Location: Rawalpindi'
    ],
    images: [
      'https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    condition: 'used',
    category: 'wanted',
    discounted: false,
    discountPercentage: 0,
    active: true
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
    price: '',
    rating: '0',
    features: [''],
    images: [''],
    condition: 'new',
    category: 'for-sale',
    discounted: false,
    discountPercentage: '',
    active: true
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      price: '',
      rating: '0',
      features: [''],
      images: [''],
      condition: 'new',
      category: 'for-sale',
      discounted: false,
      discountPercentage: '',
      active: true
    });
    setIsDialogOpen(true);
  };
  
  const openEditProductDialog = (product: any) => {
    setEditMode(true);
    setCurrentProduct(product);
    setFormData({
      ...product,
      price: product.price.toString(),
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
          <h1 className="text-3xl font-bold">AC Products</h1>
          <p className="text-muted-foreground">Manage your AC listings for sale and purchase</p>
        </div>
        
        <Button onClick={openNewProductDialog}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
            <div>
              <CardTitle>AC Products</CardTitle>
              <CardDescription>
                You have {products.length} products in total
              </CardDescription>
            </div>
            
            <div className="flex flex-col md:flex-row gap-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
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
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortChange('name')}>
                    <div className="flex items-center">
                      Name
                      {sortBy === 'name' && (
                        sortOrder === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
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
                        <div className="relative w-16 h-16 rounded overflow-hidden">
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
                        <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center">
                          <Package className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{product.name}</div>
                      {product.rating > 0 && (
                        <div className="flex items-center text-xs text-amber-500">
                          <Star className="h-3 w-3 fill-amber-500 mr-1" />
                          {product.rating}
                        </div>
                      )}
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
                      {product.discounted ? (
                        <div>
                          <div className="font-medium">{formatPrice(product.price * (1 - product.discountPercentage / 100))}</div>
                          <div className="text-xs text-gray-500 line-through">{formatPrice(product.price)}</div>
                          <div className="text-xs text-red-500">-{product.discountPercentage}%</div>
                        </div>
                      ) : (
                        <div className="font-medium">{formatPrice(product.price)}</div>
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
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openDeleteDialog(product)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editMode ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
            <DialogDescription>
              {editMode 
                ? 'Update the details of your AC product listing.' 
                : 'Add a new AC product to your listings.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price (PKR)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  name="category"
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="for-sale">For Sale</SelectItem>
                    <SelectItem value="wanted">Wanted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="condition">Condition</Label>
                <Select
                  name="condition"
                  value={formData.condition}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, condition: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="used">Used</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="discounted">Apply Discount</Label>
                <Switch
                  id="discounted"
                  checked={formData.discounted}
                  onCheckedChange={(checked) => handleSwitchChange('discounted', checked)}
                />
              </div>
              
              {formData.discounted && (
                <div>
                  <Label htmlFor="discountPercentage">Discount Percentage (%)</Label>
                  <Input
                    id="discountPercentage"
                    name="discountPercentage"
                    type="number"
                    min="1"
                    max="99"
                    value={formData.discountPercentage}
                    onChange={handleChange}
                    required={formData.discounted}
                  />
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <Label>Product Features</Label>
                <Button type="button" size="sm" variant="outline" onClick={addFeature}>
                  Add Feature
                </Button>
              </div>
              
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
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
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <Label>Product Images</Label>
                <Button type="button" size="sm" variant="outline" onClick={addImage}>
                  Add Image URL
                </Button>
              </div>
              
              {formData.images.map((imageUrl, index) => (
                <div key={index} className="flex items-start gap-2 mb-2">
                  <div className="flex-grow">
                    <Input
                      value={imageUrl}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder={`Image URL ${index + 1}`}
                    />
                  </div>
                  {imageUrl && (
                    <div className="w-12 h-12 rounded overflow-hidden">
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
                      className="text-red-500 hover:text-red-600"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => handleSwitchChange('active', checked)}
              />
              <Label htmlFor="active">Product Active</Label>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
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
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsAdmin;
