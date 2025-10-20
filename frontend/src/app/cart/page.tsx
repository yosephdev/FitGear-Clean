'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  // Memoized calculations for better performance
  const { subtotal, shipping, tax, total, itemCount } = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : subtotal > 0 ? 10 : 0; // Free shipping over $100
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    return { subtotal, shipping, tax, total, itemCount };
  }, [cartItems]);

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(id);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 200));
      updateQuantity(id, newQuantity);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleRemoveItem = async (id: string) => {
    setIsRemoving(id);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      removeFromCart(id);
    } finally {
      setIsRemoving(null);
    }
  };

  const handleClearCart = async () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      await clearCart();
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="relative">
            <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-dashed border-muted-foreground/30 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Discover amazing products and fill your cart with items you&apos;ll love.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/products">
                <ShoppingBag className="h-4 w-4" />
                Start Shopping
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Button asChild variant="ghost" className="gap-2 mb-2 -ml-3">
              <Link href="/products">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground mt-2">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          {cartItems.length > 0 && (
            <Button 
              variant="outline" 
              onClick={handleClearCart}
              className="text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card 
                key={item.id} 
                className="overflow-hidden transition-all duration-200 hover:shadow-md"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row gap-4 p-6">
                    {/* Product Image */}
                    <div className="relative w-full sm:w-32 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || '/images/placeholder.jpg'}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 128px) 100vw, 128px"
                      />
                      {item.quantity > 1 && (
                        <Badge 
                          variant="secondary" 
                          className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm"
                        >
                          ×{item.quantity}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0 space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground line-clamp-2 leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-2xl font-bold text-foreground mt-2">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center border border-border rounded-lg bg-background">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isUpdating === item.id}
                            className="p-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Decrease quantity"
                          >
                            {isUpdating === item.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Minus className="h-4 w-4" />
                            )}
                          </button>
                          <span className="px-4 py-2 font-medium min-w-[3rem] text-center border-x border-border">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={isUpdating === item.id}
                            className="p-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Increase quantity"
                          >
                            {isUpdating === item.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={isRemoving === item.id}
                          className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
                        >
                          {isRemoving === item.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                          <span className="text-sm font-medium">Remove</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Item Total */}
                    <div className="text-right sm:self-start">
                      <p className="font-bold text-xl text-foreground whitespace-nowrap">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-muted-foreground mt-1">
                          ${item.price.toFixed(2)} each
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-l-4 border-l-primary">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-semibold">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  {subtotal < 100 && (
                    <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-3">
                      <strong>Spend ${(100 - subtotal).toFixed(2)} more</strong> for free shipping!
                    </div>
                  )}
                  
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-foreground">
                      <span className="text-xl font-bold">Total</span>
                      <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button asChild className="w-full" size="lg">
                    <Link href="/checkout">
                      Proceed to Checkout
                    </Link>
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Secure checkout • Free returns • 24/7 support
                    </p>
                  </div>
                  
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link href="/products" className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}