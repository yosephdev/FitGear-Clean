import React, { useState, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../services/api';
import { MinusIcon, PlusIcon, TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { TAX_RATE } from '../config';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog.tsx';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card.tsx';
import { Button } from '../components/ui/button.tsx';

const Cart = () => {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [itemToRemove, setItemToRemove] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Memoized calculations
  const { shippingCost, tax, finalTotal } = useMemo(() => {
    const shippingCost = total >= 100 ? 0 : 9.99;
    const tax = total * TAX_RATE;
    const finalTotal = total + shippingCost + tax;
    return { shippingCost, tax, finalTotal };
  }, [total]);

  // Memoized cart item count
  const itemCount = useMemo(() => 
    items.reduce((sum, item) => sum + item.quantity, 0), 
    [items]
  );

  // Optimized event handlers
  const handleQuantityChange = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) {
      setItemToRemove(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  }, [updateQuantity]);

  const handleRemoveItem = useCallback(() => {
    if (itemToRemove === 'all') {
      clearCart();
    } else if (itemToRemove) {
      removeFromCart(itemToRemove);
    }
    setItemToRemove(null);
  }, [itemToRemove, clearCart, removeFromCart]);

  const handleCheckout = useCallback(() => {
    navigate('/checkout');
  }, [navigate]);

  const handleApplyCoupon = useCallback(async () => {
    if (!couponCode.trim()) return;
    
    setIsApplyingCoupon(true);
    try {
      // Add your coupon validation logic here
      console.log('Applying coupon:', couponCode);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsApplyingCoupon(false);
    }
  }, [couponCode]);

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <ShoppingBagIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Your cart is empty
          </h3>
          <p className="text-muted-foreground mb-6">
            Start adding some items to your cart!
          </p>
          <Link to="/products">
            <Button size="lg" className="px-8">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-8 font-heading">
              Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>Cart Items</span>
                      <span className="text-sm font-normal text-muted-foreground">
                        {items.length} {items.length === 1 ? 'item' : 'items'}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border">
                      {items.map((item) => (
                        <CartItem
                          key={item.product_id}
                          item={item}
                          onQuantityChange={handleQuantityChange}
                          onRemove={() => setItemToRemove(item.product_id)}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary
                  total={total}
                  shippingCost={shippingCost}
                  tax={tax}
                  finalTotal={finalTotal}
                  couponCode={couponCode}
                  onCouponCodeChange={setCouponCode}
                  onApplyCoupon={handleApplyCoupon}
                  isApplyingCoupon={isApplyingCoupon}
                  onCheckout={handleCheckout}
                  onClearCart={() => setItemToRemove('all')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Remove Item Confirmation Dialog */}
      <AlertDialog open={itemToRemove !== null} onOpenChange={() => setItemToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {itemToRemove === 'all' ? 'Clear Cart' : 'Remove Item'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {itemToRemove === 'all'
                ? 'Are you sure you want to remove all items from your cart? This action cannot be undone.'
                : 'Are you sure you want to remove this item from your cart?'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveItem} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {itemToRemove === 'all' ? 'Clear Cart' : 'Remove Item'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

// Extracted Cart Item Component for better readability
const CartItem = React.memo(({ item, onQuantityChange, onRemove }) => {
  const itemTotal = item.price * item.quantity;
  const imageUrl = item.product?.images?.[0] || 'https://via.placeholder.com/150x150?text=No+Image';
  const productName = item.product?.name || 'Product Name';

  return (
    <div className="p-6 hover:bg-muted/50 transition-colors">
      <div className="flex items-start space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            className="h-20 w-20 rounded-lg object-cover border"
            src={imageUrl}
            alt={productName}
            loading="lazy"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-foreground line-clamp-2">
            {productName}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Unit Price: {formatPrice(item.price)}
          </p>
          <p className="text-lg font-semibold text-foreground mt-2">
            {formatPrice(itemTotal)}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex flex-col items-end space-y-3">
          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={() => onQuantityChange(item.product_id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <MinusIcon className="h-3 w-3" />
            </Button>

            <span className="w-8 text-center font-medium text-foreground text-sm">
              {item.quantity}
            </span>

            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={() => onQuantityChange(item.product_id, item.quantity + 1)}
            >
              <PlusIcon className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <TrashIcon className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';

// Extracted Order Summary Component
const OrderSummary = React.memo(({
  total,
  shippingCost,
  tax,
  finalTotal,
  couponCode,
  onCouponCodeChange,
  onApplyCoupon,
  isApplyingCoupon,
  onCheckout,
  onClearCart
}) => {
  return (
    <div className="sticky top-24">
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Price Breakdown */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{formatPrice(total)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">
                {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
              </span>
            </div>

            {shippingCost > 0 && (
              <p className="text-xs text-muted-foreground text-center">
                Add {formatPrice(100 - total)} more for free shipping!
              </p>
            )}

            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span className="font-medium">{formatPrice(tax)}</span>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-border pt-3">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
          </div>

          {/* Coupon Section */}
          <div className="pt-4">
            <label htmlFor="coupon" className="text-sm font-medium text-foreground">
              Coupon Code
            </label>
            <div className="flex space-x-2 mt-2">
              <input
                id="coupon"
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => onCouponCodeChange(e.target.value)}
                className="flex-1 border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button
                variant="outline"
                onClick={onApplyCoupon}
                disabled={!couponCode.trim() || isApplyingCoupon}
                size="sm"
              >
                {isApplyingCoupon ? 'Applying...' : 'Apply'}
              </Button>
            </div>
          </div>

          {/* Checkout Button */}
          <Button
            className="w-full mt-4"
            size="lg"
            onClick={onCheckout}
          >
            Proceed to Checkout
          </Button>
        </CardContent>
        <CardFooter className="flex-col space-y-3">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/products">
              ← Continue Shopping
            </Link>
          </Button>
          <Button 
            variant="destructive" 
            className="w-full" 
            onClick={onClearCart}
          >
            Clear Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
});

OrderSummary.displayName = 'OrderSummary';

export default Cart;