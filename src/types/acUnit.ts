
export interface ACUnit {
  id: string;
  name: string;
  price: number;
  rating: number;
  features: string[];
  images: string[];
  category: 'for-sale' | 'wanted';
  condition: 'new' | 'used';
  discounted?: boolean;
  discountPercentage?: number;
  active?: boolean;
}
