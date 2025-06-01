
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, MapPin, Clock, User } from 'lucide-react';
import { ACUnit } from '@/types/acUnit';

interface WantedCardProps {
  request: ACUnit;
  formatPrice: (price: number) => string;
}

const WantedCard: React.FC<WantedCardProps> = ({ request, formatPrice }) => {
  const handleContact = () => {
    const message = `I have an AC that matches your requirement:
Your Request: ${request.name}
Budget: ${formatPrice(request.price)}

I would like to offer my AC unit for sale. Please let me know if you're interested.`;
    const whatsappUrl = `https://wa.me/923125242182?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#8843F2]/30 bg-white">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <Badge className="bg-gradient-to-r from-[#FF467E] to-[#8843F2] text-white font-semibold">
            WANTED
          </Badge>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#2D3559]">
              {formatPrice(request.price)}
            </div>
            <div className="text-sm text-gray-500">Budget</div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 text-[#2D3559] group-hover:text-[#8843F2] transition-colors duration-300">
          {request.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {request.description || "Looking for a reliable AC unit. Please contact if you have something matching my requirements."}
        </p>

        {/* Requirements */}
        <div className="space-y-2 mb-6">
          <h4 className="font-semibold text-sm text-[#2D3559] mb-2">Requirements:</h4>
          {request.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-gradient-to-r from-[#8843F2] to-[#FF467E] rounded-full mr-3 flex-shrink-0"></div>
              <span>{feature}</span>
            </div>
          ))}
          {request.features.length > 3 && (
            <div className="text-xs text-[#8843F2] font-medium ml-5">
              +{request.features.length - 3} more requirements
            </div>
          )}
        </div>

        {/* Buyer Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>Verified Buyer</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>Islamabad</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>2 days ago</span>
          </div>
        </div>

        {/* Contact Button */}
        <Button 
          onClick={handleContact}
          className="w-full bg-gradient-to-r from-[#8843F2] to-[#FF467E] hover:from-[#7335E8] hover:to-[#F03A6E] text-white py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Contact Buyer
        </Button>
      </CardContent>
    </Card>
  );
};

export default WantedCard;
