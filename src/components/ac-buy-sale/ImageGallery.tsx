
import React from 'react';
import { X, ChevronLeft, ChevronRight, Star, BadgeCheck, MessageSquare, Calendar } from 'lucide-react';
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

  const handleBookInstallation = () => {
    window.location.href = '/booking';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-5xl w-full overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="relative h-[50vh]">
          <img 
            src={unit.images[currentImageIndex]} 
            alt={unit.name} 
            className="w-full h-full object-contain"
          />
          <button 
            className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
          {unit.images.length > 1 && (
            <>
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={onPrev}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-brand-red' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                onClick={() => onImageSelect(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{unit.name}</h3>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(unit.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {unit.rating > 0 ? `${unit.rating} rating` : 'No ratings yet'}
                </span>
              </div>
            </div>
            <div className="text-right">
              {unit.discounted && (
                <div className="text-lg text-gray-500 line-through">
                  {formatPrice(unit.price)}
                </div>
              )}
              <div className="text-3xl font-bold text-brand-blue">
                {unit.discounted 
                  ? formatPrice(unit.price * (1 - (unit.discountPercentage || 0) / 100))
                  : formatPrice(unit.price)}
              </div>
              {unit.discounted && (
                <div className="text-sm text-brand-red font-semibold">
                  {unit.discountPercentage}% OFF
                </div>
              )}
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">Key Features:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {unit.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <BadgeCheck className="w-5 h-5 text-brand-blue mt-0.5 mr-3 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {unit.description && (
              <div>
                <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">Description:</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {unit.description}
                </p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {unit.category === 'for-sale' ? (
              <>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white flex-1"
                  onClick={onWhatsAppContact}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Buy This AC - WhatsApp
                </Button>
                <Button 
                  className="bg-brand-red hover:bg-brand-red/90 text-white flex-1"
                  onClick={handleBookInstallation}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book AC Installation
                </Button>
              </>
            ) : (
              <Button 
                className="bg-brand-blue hover:bg-brand-blue/90 text-white flex-1"
                onClick={onContactBuyer}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Contact Buyer
              </Button>
            )}
          </div>

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              💡 <strong>Need help choosing?</strong> Contact our AC experts for personalized recommendations and installation services.
              <br />
              📞 Call: <a href="tel:+923125242182" className="text-brand-red hover:underline font-medium">+92 312 5242182</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
