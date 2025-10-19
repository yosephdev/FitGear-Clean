import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { wishlistAPI } from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

const initialState = {
  items: [],
  isLoading: false,
  itemCount: 0,
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_WISHLIST':
      return {
        ...state,
        items: action.payload,
        itemCount: action.payload.length,
        isLoading: false,
      };
    case 'ADD_ITEM':
      if (!state.items.find((item) => item.id === action.payload.id)) {
        const newItems = [...state.items, action.payload];
        return {
          ...state,
          items: newItems,
          itemCount: newItems.length,
        };
      }
      return state;
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter((item) => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        itemCount: filteredItems.length,
      };
    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: [],
        itemCount: 0,
      };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const { isAuthenticated } = useAuth();

  // Load wishlist when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadWishlist();
    } else {
      dispatch({ type: 'CLEAR_WISHLIST' });
    }
  }, [isAuthenticated]);

  const loadWishlist = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await wishlistAPI.getWishlist();
      dispatch({ type: 'SET_WISHLIST', payload: response.data.items });
    } catch (error) {
      console.error('Error loading wishlist:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToWishlist = async (product) => {
    try {
      await wishlistAPI.addToWishlist(product.id);
      dispatch({ type: 'ADD_ITEM', payload: product });
      toast.success('Added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add to wishlist');
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await wishlistAPI.removeFromWishlist(productId);
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
      toast.success('Removed from wishlist');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove from wishlist');
    }
  };

  const isInWishlist = (productId) => {
    return state.items.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const value = {
    items: state.items,
    isLoading: state.isLoading,
    itemCount: state.itemCount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    loadWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext;
