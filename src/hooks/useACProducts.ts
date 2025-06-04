
import { useState, useEffect, useCallback } from 'react';
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

  const fetchProducts = useCallback(async () => {
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

      console.log(`✅ Successfully fetched ${data?.length || 0} products from database:`, data);
      setProducts(data || []);
    } catch (err: any) {
      console.error('❌ Error in useACProducts:', err);
      setError(err.message || 'Failed to fetch products');
      toast({
        title: "Error",
        description: "Failed to load AC products. Please check console for details.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshProducts = useCallback(() => {
    console.log('🔄 useACProducts: Manual refresh triggered');
    fetchProducts();
  }, [fetchProducts]);

  // Set up real-time subscription
  useEffect(() => {
    fetchProducts();

    // Set up real-time listener for changes
    console.log('🔄 Setting up real-time subscription for ac_products...');
    const subscription = supabase
      .channel('ac-products-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ac_products'
        },
        (payload) => {
          console.log('🔔 Real-time update received:', payload);
          
          if (payload.eventType === 'INSERT') {
            console.log('➕ New product added:', payload.new);
            setProducts(prev => [payload.new as ACProduct, ...prev]);
            toast({
              title: "New Product Added",
              description: `${(payload.new as ACProduct).name} has been added to the catalog.`,
            });
          } else if (payload.eventType === 'UPDATE') {
            console.log('📝 Product updated:', payload.new);
            setProducts(prev => 
              prev.map(product => 
                product.id === payload.new.id ? payload.new as ACProduct : product
              )
            );
          } else if (payload.eventType === 'DELETE') {
            console.log('🗑️ Product deleted:', payload.old);
            setProducts(prev => 
              prev.filter(product => product.id !== payload.old.id)
            );
            toast({
              title: "Product Removed",
              description: "A product has been removed from the catalog.",
            });
          }
        }
      )
      .subscribe((status) => {
        console.log('📡 Real-time subscription status:', status);
      });

    return () => {
      console.log('🔌 Cleaning up real-time subscription...');
      supabase.removeChannel(subscription);
    };
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refreshProducts,
    fetchProducts
  };
};
