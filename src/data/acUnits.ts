
import { ACUnit } from '@/types/acUnit';

export const acUnitsForSale: ACUnit[] = [
  {
    id: 'samsung-1.5ton-digital',
    name: 'Samsung Digital Inverter AC - 1.5 Ton',
    brand: 'Samsung',
    price: 135000,
    originalPrice: 150000,
    rating: 4.8,
    features: [
      'Energy efficient inverter technology',
      'Smart connectivity with WiFi',
      'Fast cooling with turbo mode',
      'Anti-bacterial filter protection',
      '5-year comprehensive warranty',
      'Eco-friendly R32 refrigerant'
    ],
    images: [
      'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1631545806609-e6b76ea61e5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    condition: 'new',
    category: 'for-sale',
    discounted: true,
    discountPercentage: 10,
    description: 'Premium Samsung Digital Inverter AC with cutting-edge technology for maximum energy efficiency and comfort. Features smart controls and rapid cooling capabilities perfect for Pakistani summers.'
  },
  {
    id: 'lg-eco-1ton',
    name: 'LG Eco Inverter AC - 1 Ton',
    brand: 'LG',
    price: 115000,
    rating: 4.7,
    features: [
      'Low power consumption design',
      'Dual protection technology',
      'WiFi enabled smart controls',
      '3-year comprehensive warranty',
      'Ocean Black Protection',
      'Himalaya Cool technology'
    ],
    images: [
      'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596526131252-cbdaa2a51bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    condition: 'new',
    category: 'for-sale',
    discounted: false,
    discountPercentage: 0,
    description: 'LG Eco Inverter AC with superior energy efficiency and advanced cooling technology. Perfect for medium-sized rooms with smart home integration capabilities.'
  },
  {
    id: 'haier-pearl-2ton',
    name: 'Haier Pearl DC Inverter - 2 Ton',
    brand: 'Haier',
    price: 175000,
    originalPrice: 195000,
    rating: 4.6,
    features: [
      'DC Inverter technology',
      'Self-cleaning function',
      'Copper condensers',
      '10-year compressor warranty',
      'Turbo cooling mode',
      'Ultra-quiet operation'
    ],
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    condition: 'new',
    category: 'for-sale',
    discounted: true,
    discountPercentage: 10,
    description: 'Haier Pearl 2 Ton DC Inverter AC with advanced self-cleaning technology and copper condensers for maximum durability and performance in extreme heat.'
  },
  {
    id: 'orient-1ton-used',
    name: 'Orient 1 Ton Split AC - Used',
    brand: 'Orient',
    price: 55000,
    rating: 4.2,
    features: [
      'Reliable cooling performance',
      'Energy efficient operation',
      'Recently serviced',
      '6-month seller warranty',
      'Good working condition',
      'Suitable for small rooms'
    ],
    images: [
      'https://images.unsplash.com/photo-1596526131252-cbdaa2a51bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    condition: 'used',
    category: 'for-sale',
    discounted: false,
    discountPercentage: 0,
    description: 'Well-maintained Orient 1 Ton Split AC in excellent working condition. Recently serviced and perfect for budget-conscious buyers looking for reliable cooling.'
  },
  {
    id: 'gree-inverter-1.5ton',
    name: 'Gree Crown Inverter AC - 1.5 Ton',
    brand: 'Gree',
    price: 125000,
    rating: 4.5,
    features: [
      'Inverter technology',
      'Cold plasma technology',
      '3D airflow distribution',
      '5-year warranty',
      'Golden fin technology',
      'Smart diagnosis'
    ],
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    condition: 'new',
    category: 'for-sale',
    discounted: false,
    discountPercentage: 0,
    description: 'Gree Crown 1.5 Ton Inverter AC with cold plasma technology for air purification and 3D airflow for uniform cooling throughout the room.'
  },
  {
    id: 'daikin-emura-2ton',
    name: 'Daikin Emura Premium AC - 2 Ton',
    brand: 'Daikin',
    price: 220000,
    originalPrice: 250000,
    rating: 4.9,
    features: [
      'Premium design aesthetics',
      'Intelligent eye sensor',
      'Coanda airflow technology',
      '5-year comprehensive warranty',
      'Streamer technology',
      'Ultra-efficient operation'
    ],
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    condition: 'new',
    category: 'for-sale',
    discounted: true,
    discountPercentage: 12,
    description: 'Premium Daikin Emura 2 Ton AC with sleek design, intelligent sensors, and advanced Coanda airflow technology for superior comfort and aesthetics.'
  }
];

export const acUnitsWanted: ACUnit[] = [
  {
    id: 'wanted-samsung-1ton',
    name: 'Samsung 1 Ton Inverter AC Wanted',
    brand: 'Samsung',
    price: 100000,
    features: [
      'Must be inverter technology',
      'Good working condition',
      'With installation accessories',
      'Preferably under 3 years old',
      'Energy efficient model',
      'Original warranty papers'
    ],
    images: [''],
    condition: 'used',
    category: 'wanted',
    discounted: false,
    discountPercentage: 0,
    description: 'Looking for a Samsung 1 Ton Inverter AC in good working condition. Prefer recent models with energy efficiency. Budget up to PKR 100,000.'
  },
  {
    id: 'wanted-lg-1.5ton',
    name: 'LG 1.5 Ton AC Required Urgently',
    brand: 'LG',
    price: 80000,
    features: [
      'Any LG model acceptable',
      'Working cooling system',
      'Complete unit with remote',
      'Can arrange pickup',
      'Immediate purchase',
      'Cash payment ready'
    ],
    images: [''],
    condition: 'used',
    category: 'wanted',
    discounted: false,
    discountPercentage: 0,
    description: 'Urgently need an LG 1.5 Ton AC for new office setup. Any working condition acceptable. Can pay cash immediately and arrange pickup.'
  },
  {
    id: 'wanted-haier-2ton',
    name: 'Haier 2 Ton DC Inverter Wanted',
    brand: 'Haier',
    price: 120000,
    features: [
      'DC Inverter technology preferred',
      'Good cooling performance',
      'Copper coil preferred',
      'Installation support needed',
      'Serious buyer only',
      'Can inspect before purchase'
    ],
    images: [''],
    condition: 'new',
    category: 'wanted',
    discounted: false,
    discountPercentage: 0,
    description: 'Looking for a Haier 2 Ton DC Inverter AC for large bedroom. Prefer copper coil models with good energy efficiency. Serious buyer with immediate payment.'
  }
];
