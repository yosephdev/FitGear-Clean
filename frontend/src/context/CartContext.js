import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartAPI, productsAPI } from '../services/api';
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
  console.log('cartReducer action:', action.type, 'payload:', action.payload);
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_CART':
      const newCartState = {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        itemCount: action.payload.items.reduce((acc, item) => acc + item.quantity, 0),
        isLoading: false,
      };
      console.log('newCartState after SET_CART:', newCartState);
      return newCartState;
    case 'ADD_ITEM':
      const existingItem = state.items.find(
        (item) => item.product_id === action.payload.product_id
      );
      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.product_id === action.payload.product_id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        const newTotal = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const newAddItemState = {
          ...state,
          items: updatedItems,
          total: newTotal,
          itemCount: updatedItems.reduce((acc, item) => acc + item.quantity, 0),
        };
        console.log('newAddItemState (existing item):', newAddItemState);
        return newAddItemState;
      } else {
        const newItems = [...state.items, action.payload];
        const newTotal = newItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const newAddItemState = {
          ...state,
          items: newItems,
          total: newTotal,
          itemCount: newItems.reduce((acc, item) => acc + item.quantity, 0),
        };
        console.log('newAddItemState (new item):', newAddItemState);
        return newAddItemState;
      }
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter((item) => item.product_id !== action.payload);
      const newTotal = filteredItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const newRemoveItemState = {
        ...state,
        items: filteredItems,
        total: newTotal,
        itemCount: filteredItems.reduce((acc, item) => acc + item.quantity, 0),
      };
      console.log('newRemoveItemState:', newRemoveItemState);
      return newRemoveItemState;
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map((item) =>
        item.product_id === action.payload.product_id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const updatedTotal = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const newUpdateQuantityState = {
        ...state,
        items: updatedItems,
        total: updatedTotal,
        itemCount: updatedItems.reduce((acc, item) => acc + item.quantity, 0),
      };
      console.log('newUpdateQuantityState:', newUpdateQuantityState);
      return newUpdateQuantityState;
    case 'CLEAR_CART':
      const newClearCartState = {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
      };
      console.log('newClearCartState:', newClearCartState);
      return newClearCartState;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadCart();
  }, [isAuthenticated]);

  const extractErrorMessage = (error) => {
    if (typeof error === 'string') return error;
    if (error.response?.data?.detail) return error.response.data.detail;
    if (error.response?.data?.message) return error.response.data.message;
    if (error.message) return error.message;
    if (error.toString) return error.toString();
    return 'An unexpected error occurred';
  };

  const loadCart = async () => {
    if (isAuthenticated) {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await cartAPI.getCart();
        dispatch({ type: 'SET_CART', payload: response.data });
      } catch (error) {
        console.error('Error loading cart:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
        toast.error(extractErrorMessage(error));
      }
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
      // Fetch full product details for each item in the local cart
      const detailedItems = await Promise.all(
        localCart.items.map(async (item) => {
          try {
            const productResponse = await productsAPI.getProduct(item.product_id);
            return { ...item, product: productResponse.data };
          } catch (error) {
            console.error(`Error fetching product details for ${item.product_id}:`, error);
            return item; // Return item without full details if fetch fails
          }
        })
      );
      const total = detailedItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      dispatch({ type: 'SET_CART', payload: { items: detailedItems, total } });
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (isAuthenticated) {
      try {
        await cartAPI.addToCart(productId, quantity);
        const productResponse = await productsAPI.getProduct(productId);
        const product = productResponse.data;
        dispatch({
          type: 'ADD_ITEM',
          payload: {
            product_id: productId,
            quantity,
            price: product.price,
            product,
          },
        });
        toast.success('Item added to cart successfully!');
      } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error(`Failed to add item to cart: ${extractErrorMessage(error)}`);
      }
    } else {
      try {
        console.log('Adding to guest cart, current state:', state);
        const productResponse = await productsAPI.getProduct(productId);
        const product = productResponse.data;

        const { items } = state;
        const existingItem = items.find((item) => item.product_id === productId);
        const newItems = existingItem
          ? items.map((item) =>
              item.product_id === productId ? { ...item, quantity: item.quantity + quantity } : item
            )
          : [...items, { product_id: productId, quantity, price: product.price, product: product }];

        const newTotal = newItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const newCart = { items: newItems, total: newTotal };

        localStorage.setItem('cart', JSON.stringify(newCart));
        dispatch({ type: 'SET_CART', payload: newCart });
        console.log('Dispatched SET_CART for guest, newCart:', newCart);
        toast.success('Item added to cart successfully!');
      } catch (error) {
        console.error('Error fetching product for guest cart:', error);
        toast.error(`Failed to add item to cart: ${extractErrorMessage(error)}`);
      }
    }
  };

  const removeFromCart = async (productId) => {
    if (isAuthenticated) {
      try {
        await cartAPI.removeFromCart(productId);
        dispatch({ type: 'REMOVE_ITEM', payload: productId });
        toast.success('Item removed from cart');
      } catch (error) {
        console.error('Error removing from cart:', error);
        toast.error(extractErrorMessage(error));
      }
    } else {
      const { items } = state;
      const newItems = items.filter((item) => item.product_id !== productId);
      const newTotal = newItems.reduce(
        (acc, item) => acc + (item.product?.price || 0) * item.quantity,
        0
      );
      const newCart = { items: newItems, total: newTotal };

      localStorage.setItem('cart', JSON.stringify(newCart));
      dispatch({ type: 'SET_CART', payload: newCart });
      toast.success('Item removed from cart');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (isAuthenticated) {
      try {
        if (quantity <= 0) {
          await removeFromCart(productId);
          return;
        }

        await cartAPI.updateCartItem(productId, quantity);
        dispatch({ type: 'UPDATE_QUANTITY', payload: { product_id: productId, quantity } });
      } catch (error) {
        console.error('Error updating quantity:', error);
        toast.error(extractErrorMessage(error));
      }
    } else {
      const { items } = state;
      const newItems = items.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      );
      const newTotal = newItems.reduce(
        (acc, item) => acc + (item.product?.price || 0) * item.quantity,
        0
      );
      const newCart = { items: newItems, total: newTotal };

      localStorage.setItem('cart', JSON.stringify(newCart));
      dispatch({ type: 'SET_CART', payload: newCart });
    }
  };

  const clearCart = () => {
    if (isAuthenticated) {
      // You might want to call an API to clear the cart on the backend as well
    } else {
      localStorage.removeItem('cart');
    }
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemQuantity = (productId) => {
    const item = state.items.find((i) => i.product_id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return state.items.some((i) => i.product_id === productId);
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart,
    getItemQuantity,
    isInCart,
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
