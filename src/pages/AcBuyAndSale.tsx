
import React, { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ACUnit } from '@/types/acUnit';
import HeroSection from '@/components/ac-buy-sale/HeroSection';
import FeaturesSection from '@/components/ac-buy-sale/FeaturesSection';
import ProductsSection from '@/components/ac-buy-sale/ProductsSection';
import SellingForm from '@/components/ac-buy-sale/SellingForm';
import ImageGallery from '@/components/ac-buy-sale/ImageGallery';
import TestimonialsSection from '@/components/ac-buy-sale/TestimonialsSection';
import CTASection from '@/components/ac-buy-sale/CTASection';

const AcBuyAndSale: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'for-sale' | 'wanted'>('for-sale');
  const [selectedUnit, setSelectedUnit] = useState<ACUnit | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSellingFormOpen, setIsSellingFormOpen] = useState(false);
  const [acUnitsForSale, setAcUnitsForSale] = useState<ACUnit[]>([]);
  const [acUnitsWanted, setAcUnitsWanted] = useState<ACUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [sellingFormData, setSellingFormData] = useState({
    name: '',
    price: '',
    description: '',
    contact: '',
    condition: 'used' as 'new' | 'used',
    model: '',
    brand: '',
    images: ['', '', ''],
    location: '',
  });

  useEffect(() => {
    fetchACProducts();
  }, []);

  const fetchACProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ac_products')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Convert database records to ACUnit format
      const convertedData: ACUnit[] = (data || []).map(product => ({
        id: product.id,
        name: product.name,
        brand: product.brand,
        description: product.description || '',
        price: Number(product.price),
        originalPrice: product.original_price ? Number(product.original_price) : undefined,
        images: product.images || [],
        features: product.features || [],
        specifications: {
          tonnage: product.tonnage || '',
          energyRating: product.energy_rating || '',
        },
        condition: product.condition as 'new' | 'used',
        discounted: product.original_price ? Number(product.original_price) > Number(product.price) : false,
        discountPercentage: product.original_price 
          ? Math.round(((Number(product.original_price) - Number(product.price)) / Number(product.original_price)) * 100)
          : undefined,
        availability: 'in-stock' as const,
        featured: product.featured || false,
        rating: 4.5, // Default rating since not in DB yet
        category: product.category as 'for-sale' | 'wanted',
      }));

      // Separate products by category
      const forSale = convertedData.filter(product => product.category === 'for-sale' || product.category === undefined);
      const wanted = convertedData.filter(product => product.category === 'wanted');

      setAcUnitsForSale(forSale);
      setAcUnitsWanted(wanted);
    } catch (error) {
      console.error('Error fetching AC products:', error);
      toast({
        title: "Error",
        description: "Failed to load AC products. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const formatPrice = (price: number): string => {
    return `PKR ${price.toLocaleString()}`;
  };

  const handleWhatsAppContact = (unit: ACUnit): void => {
    const phoneNumber = '+923125242182';
    const message = `Hello! I'm interested in buying this AC: ${unit.name} (${formatPrice(unit.price)}). Can you provide more details about availability and installation?`;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    toast({
      title: "Opening WhatsApp",
      description: "Connecting you with our AC sales team.",
    });
  };

  const handleOpenGallery = (unit: ACUnit): void => {
    setSelectedUnit(unit);
    setCurrentImageIndex(0);
    
    // Update view count
    updateViewCount(unit.id);
  };

  const updateViewCount = async (productId: string) => {
    try {
      // First get the current view count, then increment it
      const { data: currentData, error: fetchError } = await supabase
        .from('ac_products')
        .select('views')
        .eq('id', productId)
        .single();

      if (fetchError) {
        console.error('Error fetching current view count:', fetchError);
        return;
      }

      const currentViews = currentData?.views || 0;
      
      const { error } = await supabase
        .from('ac_products')
        .update({ views: currentViews + 1 })
        .eq('id', productId);
      
      if (error) console.error('Error updating view count:', error);
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  };

  const handleCloseGallery = (): void => {
    setSelectedUnit(null);
  };

  const handleNextImage = (): void => {
    if (!selectedUnit) return;
    setCurrentImageIndex((prev) => 
      prev === selectedUnit.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = (): void => {
    if (!selectedUnit) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedUnit.images.length - 1 : prev - 1
    );
  };

  const handleSellingFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setSellingFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUrlChange = (index: number, value: string): void => {
    const newImages = [...sellingFormData.images];
    newImages[index] = value;
    setSellingFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleConditionChange = (checked: boolean): void => {
    setSellingFormData(prev => ({ 
      ...prev, 
      condition: checked ? 'new' : 'used' 
    }));
  };

  const handleSubmitSelling = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!sellingFormData.name || !sellingFormData.price || !sellingFormData.contact) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      const productData = {
        name: sellingFormData.name,
        brand: sellingFormData.brand || 'Generic',
        description: sellingFormData.description,
        price: Number(sellingFormData.price),
        category: 'sale',
        condition: sellingFormData.condition,
        images: sellingFormData.images.filter(img => img.trim() !== ''),
        contact_info: sellingFormData.contact,
        location: sellingFormData.location,
        status: 'active'
      };

      const { error } = await supabase
        .from('ac_products')
        .insert([productData]);

      if (error) throw error;

      toast({
        title: "AC Listed Successfully",
        description: "Your AC has been listed for sale. Our team will review it shortly.",
      });

      setIsSellingFormOpen(false);
      setSellingFormData({
        name: '',
        price: '',
        description: '',
        contact: '',
        condition: 'used',
        model: '',
        brand: '',
        images: ['', '', ''],
        location: '',
      });

      // Refresh the products list
      fetchACProducts();
    } catch (error) {
      console.error('Error submitting AC listing:', error);
      toast({
        title: "Error",
        description: "Failed to submit your AC listing. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleContactBuyer = (): void => {
    toast({
      title: "Interest Registered",
      description: "Thank you for your interest. Our team will contact you shortly.",
    });
    handleCloseGallery();
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen pt-20">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8843F2] mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading AC products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <HeroSection 
        onTabChange={setSelectedTab}
        onOpenSellingForm={() => setIsSellingFormOpen(true)}
      />
      <FeaturesSection />
      <ProductsSection 
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        acUnitsForSale={acUnitsForSale}
        acUnitsWanted={acUnitsWanted}
        onOpenGallery={handleOpenGallery}
        onWhatsAppContact={handleWhatsAppContact}
        formatPrice={formatPrice}
        onOpenSellingForm={() => setIsSellingFormOpen(true)}
      />
      <SellingForm 
        isOpen={isSellingFormOpen}
        onClose={() => setIsSellingFormOpen(false)}
        formData={sellingFormData}
        onFormChange={handleSellingFormChange}
        onImageChange={handleImageUrlChange}
        onConditionChange={handleConditionChange}
        onSubmit={handleSubmitSelling}
      />
      <ImageGallery 
        unit={selectedUnit}
        currentImageIndex={currentImageIndex}
        formatPrice={formatPrice}
        onClose={handleCloseGallery}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
        onImageSelect={(index) => setCurrentImageIndex(index)}
        onWhatsAppContact={() => {
          if (selectedUnit) {
            handleWhatsAppContact(selectedUnit);
            handleCloseGallery();
          }
        }}
        onContactBuyer={handleContactBuyer}
      />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default AcBuyAndSale;
