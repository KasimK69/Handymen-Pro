
import React from 'react';
import { X, ChevronLeft, ChevronRight, Star, BadgeCheck, MessageSquare, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ACUnit } from '@/types/acUnit';

interface ImageGalleryProps {
  unit: ACUnit | null;
  currentImageIndex: number;
  formatPrice: (price: number) => string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onImageSelect: (index: number) => void;
  onWhatsAppContact: () => void;
  onContactBuyer: () => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  unit,
  currentImageIndex,
  formatPrice,
  onClose,
  onPrev,
  onNext,
  onImageSelect,
  onWhatsAppContact,
  onContactBuyer
}) => {
  if (!unit) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full overflow-hidden">
        <div className="relative h-[50vh]">
          <img 
            src={unit.images[currentImageIndex]} 
            alt={unit.name} 
            className="w-full h-full object-contain"
          />
          <button 
            className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
          {unit.images.length > 1 && (
            <>
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg"
                onClick={onPrev}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg"
                onClick={onNext}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {unit.images.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${
                  index === currentImageIndex ? 'bg-brand-red' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                onClick={() => onImageSelect(index)}
              />
            ))}
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">{unit.name}</h3>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(unit.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">{unit.rating > 0 ? unit.rating : 'N/A'}</span>
              </div>
            </div>
            <div className="text-right">
              {unit.discounted && (
                <div className="text-sm text-gray-500 line-through">
                  {formatPrice(unit.price)}
                </div>
              )}
              <div className="text-2xl font-bold text-brand-blue">
                {unit.discounted 
                  ? formatPrice(unit.price * (1 - (unit.discountPercentage || 0) / 100))
                  : formatPrice(unit.price)}
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg mb-2">Features:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {unit.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <BadgeCheck className="w-5 h-5 text-brand-blue mt-0.5 mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            {unit.category === 'for-sale' ? (
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={onWhatsAppContact}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact on WhatsApp
              </Button>
            ) : (
              <Button 
                className="bg-brand-blue hover:bg-brand-blue/90"
                onClick={onContactBuyer}
              >
                <Phone className="mr-2 h-4 w-4" />
                Contact Buyer
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={onClose}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
