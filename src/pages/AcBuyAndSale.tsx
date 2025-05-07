
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { acUnitsForSale, acUnitsWanted } from '@/data/acUnits';
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
  
  const formatPrice = (price: number): string => {
    return `PKR ${price.toLocaleString()}`;
  };

  const handleWhatsAppContact = (unit: ACUnit): void => {
    const phoneNumber = '+923125242182';
    const message = `Hello, I'm interested in buying this AC: ${unit.name} (${formatPrice(unit.price)})`;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    toast({
      title: "Opening WhatsApp",
      description: "Connecting you with our sales team.",
    });
  };

  const handleOpenGallery = (unit: ACUnit): void => {
    setSelectedUnit(unit);
    setCurrentImageIndex(0);
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

  const handleSubmitSelling = (e: React.FormEvent): void => {
    e.preventDefault();
    toast({
      title: "AC Listing Submitted",
      description: "Thank you! Your AC listing has been submitted for review. Our team will contact you shortly.",
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
  };

  const handleContactBuyer = (): void => {
    toast({
      title: "Interest Registered",
      description: "Thank you for your interest. Our team will contact you shortly.",
    });
    handleCloseGallery();
  };

  return (
    <div className="flex flex-col min-h-screen">
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
