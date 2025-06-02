
import React, { useState, useEffect } from 'react';
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus, Star, StarOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  content: string;
  rating: number | null;
  image_url: string | null;
  status: string;
  featured: boolean | null;
  created_at: string;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
    image_url: '',
    status: 'active',
    featured: false
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: "Error",
        description: "Failed to fetch testimonials",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const openCreateDialog = () => {
    setEditingTestimonial(null);
    setFormData({
      name: '',
      role: '',
      content: '',
      rating: 5,
      image_url: '',
      status: 'active',
      featured: false
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role || '',
      content: testimonial.content,
      rating: testimonial.rating || 5,
      image_url: testimonial.image_url || '',
      status: testimonial.status,
      featured: testimonial.featured || false
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.content) {
      toast({
        title: "Error",
        description: "Please fill in name and content",
        variant: "destructive"
      });
      return;
    }

    const testimonialData = {
      name: formData.name,
      role: formData.role || null,
      content: formData.content,
      rating: formData.rating,
      image_url: formData.image_url || null,
      status: formData.status,
      featured: formData.featured
    };

    try {
      if (editingTestimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update(testimonialData)
          .eq('id', editingTestimonial.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Testimonial updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([testimonialData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "New testimonial added successfully"
        });
      }

      fetchTestimonials();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to save testimonial",
        variant: "destructive"
      });
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ featured: !featured })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Status updated",
        description: "Testimonial featured status has been updated",
      });
      
      fetchTestimonials();
    } catch (error) {
      console.error('Error updating testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to update testimonial",
        variant: "destructive"
      });
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Testimonial deleted",
        description: "The testimonial has been removed successfully",
      });
      
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading testimonials...</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage customer testimonials and reviews
          </p>
        </div>
        <Button onClick={openCreateDialog} className="bg-gradient-to-r from-[#8843F2] to-[#FF467E]">
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Testimonials</CardTitle>
          <CardDescription>
            You have {testimonials.length} testimonials in total. Featured testimonials appear on the homepage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No testimonials found.</p>
              <Button onClick={openCreateDialog} className="mt-4">
                Add your first testimonial
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Testimonial</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {testimonial.image_url && (
                          <img
                            src={testimonial.image_url}
                            alt={testimonial.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <div className="font-medium">{testimonial.name}</div>
                          {testimonial.role && (
                            <div className="text-sm text-gray-500">{testimonial.role}</div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="truncate">{testimonial.content}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex">
                        {Array(5).fill(0).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < (testimonial.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(testimonial.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={testimonial.featured ? "default" : "outline"}>
                        {testimonial.featured ? "Featured" : "Regular"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => toggleFeatured(testimonial.id, testimonial.featured || false)}
                        >
                          {testimonial.featured ? 
                            <StarOff className="h-4 w-4 text-yellow-500" /> : 
                            <Star className="h-4 w-4" />
                          }
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openEditDialog(testimonial)}
                        >
                          <Pencil className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => deleteTestimonial(testimonial.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
            </DialogTitle>
            <DialogDescription>
              Fill in the testimonial details
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Customer Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Smith"
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">Role/Title</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  placeholder="Homeowner, Business Owner, etc."
                />
              </div>
            </div>

            <div>
              <Label htmlFor="content">Testimonial Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Share the customer's experience..."
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="image_url">Profile Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://example.com/profile.jpg"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                />
                <Label htmlFor="featured">Featured testimonial</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.status === 'active'}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, status: checked ? 'active' : 'inactive' }))}
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-[#8843F2] to-[#FF467E]">
                {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminTestimonials;
