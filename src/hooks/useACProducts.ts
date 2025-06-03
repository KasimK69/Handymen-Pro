
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ACProduct {
  id: string;
  name: string;
  brand: string;
  description: string | null;
  price: number;
  original_price: number | null;
  category: string;
  condition: string;
  tonnage: string | null;
  energy_rating: string | null;
  features: string[] | null;
  images: string[] | null;
  contact_info: string | null;
  location: string | null;
  status: string;
  featured: boolean | null;
  views: number | null;
  created_at: string;
  updated_at: string;
}

export const useACProducts = () => {
  const [products, setProducts] = useState<ACProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      console.log('🔄 useACProducts: Fetching products from Supabase...');
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('ac_products')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Supabase fetch error:', error);
        throw error;
      }

      console.log(`✅ Successfully fetched ${data?.length || 0} products`);
      setProducts(data || []);
    } catch (err: any) {
      console.error('❌ Error in useACProducts:', err);
      setError(err.message || 'Failed to fetch products');
      toast({
        title: "Error",
        description: "Failed to load AC products. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshProducts = () => {
    console.log('🔄 useACProducts: Manual refresh triggered');
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refreshProducts,
    fetchProducts
  };
};
