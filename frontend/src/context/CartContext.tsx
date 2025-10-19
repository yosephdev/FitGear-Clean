'use client'; // This is a Client Component

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define a type for the cart item
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// Define the shape of the context
type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  // Add other functions like removeFromCart, updateQuantity etc.
};

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (itemToAdd: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemToAdd.id);
      if (existingItem) {
        // If item exists, just increase quantity
        return prevItems.map(item =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Otherwise, add new item with quantity 1
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Create a custom hook for easy access to the context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
