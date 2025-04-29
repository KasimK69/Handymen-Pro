
import React from 'react';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import EmptyCartState from '@/components/cart/EmptyCartState';
import CartItemsList from '@/components/cart/CartItemsList';
import OrderSummary from '@/components/cart/OrderSummary';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  
  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };
  
  const calculateItemPrice = (item: any) => {
    return item.discounted 
      ? item.price * (1 - (item.discountPercentage || 0) / 100) * item.quantity
      : item.price * item.quantity;
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    toast({
      title: "Item removed",
      description: `${name} has been removed from your cart.`,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity >= 1) {
      updateQuantity(id, quantity);
      toast({
        title: "Cart updated",
        description: "The quantity has been updated.",
      });
    }
  };
  
  if (cart.length === 0) {
    return <EmptyCartState />;
  }
  
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CartItemsList 
          items={cart}
          formatPrice={formatPrice}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          calculateItemPrice={calculateItemPrice}
        />
        
        <OrderSummary 
          cartTotal={cartTotal} 
          itemCount={cart.length}
          formatPrice={formatPrice}
        />
      </div>
    </div>
  );
};

export default Cart;
