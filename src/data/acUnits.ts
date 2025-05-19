
import { ACUnit } from '../types/acUnit';

// Sample AC units for sale
export const acUnitsForSale: ACUnit[] = [
  {
    id: 'inverter-1ton',
    name: 'Pro Inverter AC - 1 Ton',
    brand: 'CoolAir',
    description: 'High-efficiency 1 ton inverter air conditioner',
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
    category: 'for-sale',
    condition: 'new',
    availability: 'in-stock',
    specifications: {}
  },
  {
    id: 'inverter-1.5ton',
    name: 'Pro Inverter AC - 1.5 Ton',
    brand: 'CoolAir',
    description: 'High-efficiency 1.5 ton inverter air conditioner',
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
    category: 'for-sale',
    condition: 'new',
    availability: 'in-stock',
    specifications: {},
    discounted: true,
    discountPercentage: 10
  },
  {
    id: 'used-standard-1ton',
    name: 'Used Standard AC - 1 Ton',
    brand: 'ChillMax',
    description: 'Reliable used 1 ton air conditioner in good condition',
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
    category: 'for-sale',
    condition: 'used',
    availability: 'in-stock',
    specifications: {}
  }
];

// Sample AC units wanted
export const acUnitsWanted: ACUnit[] = [
  {
    id: 'wanted-inverter-1ton',
    name: 'Looking for: Inverter AC - 1 Ton',
    brand: 'Any',
    description: 'Seeking a used 1 ton inverter AC in good condition',
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
    category: 'wanted',
    condition: 'used',
    availability: 'out-of-stock',
    specifications: {}
  },
  {
    id: 'wanted-inverter-2ton',
    name: 'Looking for: Inverter AC - 2 Ton',
    brand: 'Any',
    description: 'Seeking a used 2 ton inverter AC in excellent condition',
    price: 85000,
    rating: 0,
    features: [
      'Seeking used inverter AC in excellent condition',
      'Must be less than 3 years old',
      'Energy efficient model preferred',
      'Budget: Up to PKR 85,000',
      'Location: Islamabad'
    ],
    images: [
      'https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'wanted',
    condition: 'used',
    availability: 'out-of-stock',
    specifications: {}
  }
];
