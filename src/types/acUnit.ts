
export interface ACUnit {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  images: string[];
  features: string[];
  specifications: Record<string, string>;
  condition: 'new' | 'used';
  discounted?: boolean;
  discountPercentage?: number;
  availability: 'in-stock' | 'out-of-stock' | 'pre-order';
  featured?: boolean;
  rating?: number;
  category?: 'for-sale' | 'wanted';
  reviews?: {
    id: string;
    user: string;
    date: string;
    rating: number;
    comment: string;
  }[];
}
