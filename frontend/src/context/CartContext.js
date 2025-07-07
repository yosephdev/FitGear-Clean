import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
  isLoading: false,
  itemCount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        itemCount: action.payload.items.reduce((acc, item) => acc + item.quantity, 0),
        isLoading: false,
      };
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.product_id === action.payload.product_id);
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.product_id === action.payload.product_id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        const newTotal = updatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        return {
          ...state,
          items: updatedItems,
          total: newTotal,
          itemCount: updatedItems.reduce((acc, item) => acc + item.quantity, 0),
        };
      } else {
        const newItems = [...state.items, action.payload];
        const newTotal = newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        return {
          ...state,
          items: newItems,
          total: newTotal,
          itemCount: newItems.reduce((acc, item) => acc + item.quantity, 0),
        };
      }
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.product_id !== action.payload);
      const newTotal = filteredItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      return {
        ...state,
        items: filteredItems,
        total: newTotal,
        itemCount: filteredItems.reduce((acc, item) => acc + item.quantity, 0),
      };
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.product_id === action.payload.product_id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const updatedTotal = updatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      return {
        ...state,
        items: updatedItems,
        total: updatedTotal,
        itemCount: updatedItems.reduce((acc, item) => acc + item.quantity, 0),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated } = useAuth();

  // Load cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await cartAPI.getCart();
      dispatch({ type: 'SET_CART', payload: response.data });
    } catch (error) {
      console.error('Error loading cart:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await cartAPI.addToCart(productId, quantity);
      await loadCart(); // Reload cart to get updated data
      toast.success('Item added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await cartAPI.removeFromCart(productId);
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }
      
      await cartAPI.updateCartItem(productId, quantity);
      dispatch({ type: 'UPDATE_QUANTITY', payload: { product_id: productId, quantity } });
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.product_id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return state.items.some(item => item.product_id === productId);
  };

  const value = {
    items: state.items,
    total: state.total,
    isLoading: state.isLoading,
    itemCount: state.itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
    loadCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;