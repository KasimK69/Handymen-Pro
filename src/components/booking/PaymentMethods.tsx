
import React from 'react';
import { Banknote, CreditCard, Landmark, Truck } from 'lucide-react';
import { 
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PaymentMethodProps {
  value: string;
  onChange: (value: string) => void;
}

const PaymentMethods = ({ value, onChange }: PaymentMethodProps) => {
  return (
    <div className="space-y-4">
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
          <Label 
            htmlFor="cash-on-delivery"
            className="flex items-center cursor-pointer"
          >
            <Truck className="h-5 w-5 mr-2 text-gray-600" />
            <div>
              <div className="font-medium">Cash on Delivery</div>
              <div className="text-sm text-gray-500">Pay when our technician visits your location</div>
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="easypaisa" id="easypaisa" />
          <Label 
            htmlFor="easypaisa"
            className="flex items-center cursor-pointer"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Easypaisa.svg" 
              alt="EasyPaisa" 
              className="h-5 w-5 mr-2"
            />
            <div>
              <div className="font-medium">EasyPaisa</div>
              <div className="text-sm text-gray-500">Transfer to our EasyPaisa account</div>
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="jazzcash" id="jazzcash" />
          <Label 
            htmlFor="jazzcash"
            className="flex items-center cursor-pointer"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/b/b4/JazzCash_logo.png" 
              alt="JazzCash" 
              className="h-5 w-5 mr-2" 
            />
            <div>
              <div className="font-medium">JazzCash</div>
              <div className="text-sm text-gray-500">Transfer to our JazzCash account</div>
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bank-transfer" id="bank-transfer" />
          <Label 
            htmlFor="bank-transfer"
            className="flex items-center cursor-pointer"
          >
            <Landmark className="h-5 w-5 mr-2 text-gray-600" />
            <div>
              <div className="font-medium">Bank Transfer</div>
              <div className="text-sm text-gray-500">Transfer to our bank account (HBL, Meezan, UBL)</div>
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="card-payment" id="card-payment" />
          <Label 
            htmlFor="card-payment"
            className="flex items-center cursor-pointer"
          >
            <CreditCard className="h-5 w-5 mr-2 text-gray-600" />
            <div>
              <div className="font-medium">Card Payment</div>
              <div className="text-sm text-gray-500">Pay with credit/debit card on service completion</div>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethods;
