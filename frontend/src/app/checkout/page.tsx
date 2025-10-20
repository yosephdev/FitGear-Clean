'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, 
  CreditCard, 
  MapPin, 
  Shield, 
  Truck, 
  ArrowLeft,
  CheckCircle2,
  Lock
} from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    saveInfo: false
  });

  // Memoized calculations
  const { subtotal, shipping, tax, total, itemCount } = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    return { subtotal, shipping, tax, total, itemCount };
  }, [cartItems]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Check for missing required fields in cart items
    const missingFields = cartItems.some(item => !item.name || !item.price || !item.image);
    if (missingFields) {
      alert('Some cart items are missing required product details. Please remove and re-add them.');
      setIsProcessing(false);
      return;
    }
    try {
      // Build order payload for backend
      const orderPayload = {
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        shipping: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
        },
        payment: {
          cardNumber: formData.cardNumber,
          expiry: formData.expiry,
          cvv: formData.cvv,
        },
        total,
      };

      const res = await fetch(`${process.env['NEXT_PUBLIC_API_BASE_URL']}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Order creation failed:', errorText);
        alert('Order creation failed. Please try again or contact support.');
        setIsProcessing(false);
        return;
      }
      const data = await res.json();
      const orderId = data.id;
      clearCart();
      router.push(`/order-success?orderId=${orderId}`);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Order creation failed. Please try again or contact support.');
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    return value.replace(/\//g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
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
              Add some amazing products to your cart before checking out.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/products">
                <ShoppingBag className="h-4 w-4" />
                Explore Products
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/cart">
                <ArrowLeft className="h-4 w-4" />
                Back to Cart
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Button asChild variant="ghost" className="gap-2 mb-2 -ml-3">
              <Link href="/cart">
                <ArrowLeft className="h-4 w-4" />
                Back to Cart
              </Link>
            </Button>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Checkout
            </h1>
            <p className="text-muted-foreground mt-2">
              Complete your purchase securely
            </p>
          </div>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Indicators */}
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="flex items-center gap-2 text-primary">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <span className="font-medium">Cart</span>
              </div>
              <div className="h-0.5 w-12 bg-primary" />
              <div className="flex items-center gap-2 text-primary">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <span className="font-medium">Checkout</span>
              </div>
              <div className="h-0.5 w-12 bg-muted" />
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <span className="font-medium">Confirmation</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Information */}
              <Card className="border-l-4 border-l-primary">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Shipping Information</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Where should we deliver your order?
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="firstName" className="text-sm font-medium">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="transition-colors focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="transition-colors focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="transition-colors focus:border-primary"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="address" className="text-sm font-medium">
                      Street Address *
                    </Label>
                    <Input
                      id="address"
                      type="text"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      className="transition-colors focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="city" className="text-sm font-medium">
                        City *
                      </Label>
                      <Input
                        id="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                        className="transition-colors focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="state" className="text-sm font-medium">
                        State *
                      </Label>
                      <Input
                        id="state"
                        type="text"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="NY"
                        className="transition-colors focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="zip" className="text-sm font-medium">
                        ZIP Code *
                      </Label>
                      <Input
                        id="zip"
                        type="text"
                        required
                        value={formData.zip}
                        onChange={handleInputChange}
                        placeholder="10001"
                        className="transition-colors focus:border-primary"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="border-l-4 border-l-primary">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Payment Details</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Secure and encrypted payment processing
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="cardNumber" className="text-sm font-medium">
                      Card Number *
                    </Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        type="text"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value);
                          setFormData(prev => ({ ...prev, cardNumber: formatted }));
                        }}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="pr-12 transition-colors focus:border-primary"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="expiry" className="text-sm font-medium">
                        Expiry Date *
                      </Label>
                      <Input
                        id="expiry"
                        type="text"
                        required
                        value={formData.expiry}
                        onChange={(e) => {
                          const formatted = formatExpiry(e.target.value);
                          setFormData(prev => ({ ...prev, expiry: formatted }));
                        }}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="transition-colors focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="cvv" className="text-sm font-medium">
                        CVV *
                      </Label>
                      <Input
                        id="cvv"
                        type="text"
                        required
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={4}
                        className="transition-colors focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="rounded border-border"
                    />
                    <Label htmlFor="saveInfo" className="text-sm text-muted-foreground">
                      Save payment information for next time
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-4 py-4 border-y border-border">
                <Lock className="h-5 w-5 text-green-600" />
                <span className="text-sm text-muted-foreground">
                  Your payment information is encrypted and secure
                </span>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isProcessing}
                className="w-full h-14 text-lg font-semibold relative"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Processing Your Order...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5 mr-2" />
                    Place Order - ${total.toFixed(2)}
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cart Items */}
                <div className="space-y-4 pb-4 border-b border-border max-h-80 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start gap-3 group">
                      <div className="flex gap-3 flex-1 min-w-0">
                        <div className="relative w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || '/images/placeholder.jpg'}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                          {item.quantity > 1 && (
                            <Badge 
                              variant="secondary" 
                              className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                            >
                              {item.quantity}
                            </Badge>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                            {item.name}
                          </p>
                          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                      <p className="font-semibold text-sm flex-shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-semibold">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  {subtotal < 100 && (
                    <div className="text-xs text-green-600 bg-green-50 border border-green-200 rounded-lg p-2">
                      <strong>Spend ${(100 - subtotal).toFixed(2)} more</strong> for free shipping!
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-border">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="space-y-1">
                      <Truck className="h-6 w-6 mx-auto text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Free Shipping</p>
                    </div>
                    <div className="space-y-1">
                      <Shield className="h-6 w-6 mx-auto text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Secure Payment</p>
                    </div>
                    <div className="space-y-1">
                      <CheckCircle2 className="h-6 w-6 mx-auto text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Easy Returns</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}