
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ImageUploader from '@/components/admin/ImageUploader';

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string | null;
  image_url: string | null;
  icon: string | null;
  category: string;
  price_range: string | null;
  features: string[] | null;
  status: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const ServicesAdminPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  
  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [icon, setIcon] = useState("");
  const [category, setCategory] = useState("general");
  const [priceRange, setPriceRange] = useState("");
  const [features, setFeatures] = useState("");
  const [status, setStatus] = useState("active");
  const [featured, setFeatured] = useState(false);
  const [sortOrder, setSortOrder] = useState(0);

  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error",
        description: "Failed to fetch services.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setShortDescription("");
    setImageUrl("");
    setIcon("");
    setCategory("general");
    setPriceRange("");
    setFeatures("");
    setStatus("active");
    setFeatured(false);
    setSortOrder(0);
    setEditingService(null);
    setIsCreating(false);
  };

  const handleSaveService = async () => {
    if (!name || !description) {
      toast({
        title: "Error",
        description: "Please fill in name and description.",
        variant: "destructive",
      });
      return;
    }

    const slug = generateSlug(name);
    const featuresArray = features ? features.split(',').map(f => f.trim()) : [];

    const serviceData = {
      name,
      slug,
      description,
      short_description: shortDescription || null,
      image_url: imageUrl || null,
      icon: icon || null,
      category,
      price_range: priceRange || null,
      features: featuresArray,
      status,
      featured,
      sort_order: sortOrder,
    };

    try {
      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Service updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from('services')
          .insert([serviceData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Service created successfully.",
        });
      }

      fetchServices();
      resetForm();
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: "Error",
        description: "Failed to save service.",
        variant: "destructive",
      });
    }
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setName(service.name);
    setDescription(service.description);
    setShortDescription(service.short_description || "");
    setImageUrl(service.image_url || "");
    setIcon(service.icon || "");
    setCategory(service.category);
    setPriceRange(service.price_range || "");
    setFeatures(service.features ? service.features.join(', ') : "");
    setStatus(service.status);
    setFeatured(service.featured);
    setSortOrder(service.sort_order);
    setIsCreating(true);
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Service deleted successfully.",
      });
      
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error",
        description: "Failed to delete service.",
        variant: "destructive",
      });
    }
  };

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
          <CardTitle className="text-2xl font-bold">Services Management</CardTitle>
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-brand-blue hover:bg-brand-blue/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </CardHeader>
        <CardContent>
          {isCreating ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {editingService ? 'Edit Service' : 'Create New Service'}
              </h3>
              
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Service Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter service name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      className="w-full p-2 border border-input bg-background rounded-md"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="installation">Installation</option>
                      <option value="repair">Repair</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="cleaning">Cleaning</option>
                      <option value="general">General</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="shortDesc">Short Description</Label>
                  <Input
                    id="shortDesc"
                    placeholder="Brief description for cards"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Full Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed service description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
                
                <div>
                  <Label>Service Image</Label>
                  <ImageUploader onImageSelected={setImageUrl} />
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Service"
                      className="mt-2 rounded-md max-w-xs"
                    />
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="icon">Icon Name</Label>
                    <Input
                      id="icon"
                      placeholder="lucide icon name"
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="priceRange">Price Range</Label>
                    <Input
                      id="priceRange"
                      placeholder="PKR 1,000 - 5,000"
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sortOrder">Sort Order</Label>
                    <Input
                      id="sortOrder"
                      type="number"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="features">Features (comma separated)</Label>
                  <Textarea
                    id="features"
                    placeholder="Feature 1, Feature 2, Feature 3"
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={featured}
                      onCheckedChange={setFeatured}
                    />
                    <Label htmlFor="featured">Featured Service</Label>
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
                  <Button onClick={handleSaveService} className="bg-brand-blue hover:bg-brand-blue/90">
                    {editingService ? 'Update Service' : 'Create Service'}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {services.map((service) => (
                <Card key={service.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{service.name}</h3>
                          {service.featured && <Badge variant="secondary">Featured</Badge>}
                          <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
                            {service.status}
                          </Badge>
                          <Badge variant="outline">{service.category}</Badge>
                        </div>
                        
                        {service.image_url && (
                          <img
                            src={service.image_url}
                            alt={service.name}
                            className="w-20 h-20 object-cover rounded mb-2 float-left mr-4"
                          />
                        )}
                        
                        <p className="text-sm text-gray-600 mb-2">{service.short_description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{service.price_range}</span>
                          <span>Order: {service.sort_order}</span>
                          <span>{new Date(service.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => window.open(`/services/${service.slug}`, '_blank')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditService(service)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {services.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No services found.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesAdminPage;
