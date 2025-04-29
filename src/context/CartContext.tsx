
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

// Define types for cart items
export interface CartItem {
  id: string;
  name: string;
  price: number;
  images: string[];
  quantity: number;
  discounted?: boolean;
  discountPercentage?: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  
  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Calculate cart count and total
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    const total = cart.reduce((sum, item) => {
      const itemPrice = item.discounted 
        ? item.price * (1 - (item.discountPercentage || 0) / 100)
        : item.price;
      return sum + (itemPrice * item.quantity);
    }, 0);
    
    setCartCount(count);
    setCartTotal(total);
  }, [cart]);
  
  const addToCart = (item: any) => {
    setCart(prevCart => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // If the item exists, increase its quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        };
        return updatedCart;
      } else {
        // If the item doesn't exist, add it with quantity 1
        const newItem: CartItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          images: item.images,
          quantity: 1,
          discounted: item.discounted,
          discountPercentage: item.discountPercentage
        };
        return [...prevCart, newItem];
      }
    });
  };
  
  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };
  
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCart(prevCart => {
      return prevCart.map(item => 
        item.id === itemId 
          ? { ...item, quantity } 
          : item
      );
    });
  };
  
  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };
  
  return (
    <CartContext.Provider 
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
