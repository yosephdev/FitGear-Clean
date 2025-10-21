'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Truck, 
  Download, 
  Share2, 
  ShoppingBag,
  Clock,
  MapPin,
  Mail,
  Phone,
  CreditCard
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { apiUrl } from '@/lib/api';

const getOrderStatusColor = (status: string) => {
  const colors = {
    confirmed: 'bg-green-100 text-green-800 border-green-200',
    processing: 'bg-blue-100 text-blue-800 border-blue-200',
    shipped: 'bg-orange-100 text-orange-800 border-orange-200',
    delivered: 'bg-purple-100 text-purple-800 border-purple-200'
  };
  return colors[status as keyof typeof colors] || colors.confirmed;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Force this route to be dynamic to avoid prerendering issues
export const dynamic = 'force-dynamic';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  type OrderItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
  type OrderType = {
    id: string;
    date: string;
    status: string;
    estimatedDelivery: string;
    items: OrderItem[];
    shipping: {
      name: string;
      address: string;
      city: string;
      state: string;
      zip: string;
      email: string;
      phone: string;
    };
    payment: {
      method: string;
      last4: string;
      total: number;
    };
    tax?: number;
  };
  const [order, setOrder] = useState<OrderType | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setOrder(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(apiUrl(`/orders/${orderId}`))
      .then(res => {
        if (!res.ok) throw new Error('Order not found');
        return res.json();
      })
      .then(data => setOrder(data))
      .catch((err) => {
        console.error('Order fetch error:', err);
        setOrder(null);
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  const handleShareOrder = async () => {
    const shareData = {
      title: `Order ${order?.id}`,
      text: `Check out my order ${order?.id} from FitGear`,
      url: window.location.href,
    };
    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleDownloadInvoice = () => {
    // In a real app, this would generate/download a PDF invoice
    alert('Invoice download would start here!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-lg text-muted-foreground">Loading order details...</div>
      </div>
    );
  }

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Order ID Provided</h1>
          <p className="mb-6 text-muted-foreground">Please return to checkout and try again.</p>
          <Button asChild>
            <Link href="/checkout">
              Go to Checkout
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="mb-6 text-muted-foreground">We couldn&apos;t find an order with that ID.</p>
          <Button asChild>
            <Link href="/products">
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <CheckCircle2 className="h-24 w-24 text-green-600" />
              <div className="absolute inset-0 animate-ping opacity-20">
                <CheckCircle2 className="h-24 w-24 text-green-600" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Thank you for your purchase. Your order has been confirmed and is being processed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Order #: {order.id}
            </Badge>
            <Badge className={`text-lg px-4 py-2 border ${getOrderStatusColor(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Order Timeline */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Clock className="h-6 w-6 text-primary" />
                Order Timeline
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <div className="w-0.5 h-16 bg-green-600 mt-2" />
                  </div>
                  <div className="flex-1 pb-6">
                    <h3 className="font-semibold text-foreground">Order Confirmed</h3>
                    <p className="text-muted-foreground">Your order has been confirmed</p>
                    <p className="text-sm text-muted-foreground mt-1">{formatDate(order.date)}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
                    </div>
                    <div className="w-0.5 h-16 bg-muted mt-2" />
                  </div>
                  <div className="flex-1 pb-6">
                    <h3 className="font-semibold text-muted-foreground">Processing</h3>
                    <p className="text-muted-foreground">We&apos;re preparing your order</p>
                    <p className="text-sm text-muted-foreground mt-1">Expected: Within 24 hours</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Truck className="h-4 w-4 text-muted-foreground/50" />
                    </div>
                    <div className="w-0.5 h-16 bg-muted mt-2" />
                  </div>
                  <div className="flex-1 pb-6">
                    <h3 className="font-semibold text-muted-foreground">Shipped</h3>
                    <p className="text-muted-foreground">Your order is on the way</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Estimated: {formatDate(order.estimatedDelivery)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-muted-foreground/50" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-muted-foreground">Delivered</h3>
                    <p className="text-muted-foreground">Your order has been delivered</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Order Summary */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-3">
                    <div className="flex gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-sm flex-shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${order.tax ? order.tax.toFixed(2) : '0.00'}</span>
                </div>
                <div className="border-t border-border pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${order.payment?.total?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Shipping Information */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                Shipping Address
              </h2>
              <div className="space-y-3">
                <p className="font-semibold">{order.shipping.name}</p>
                <p className="text-muted-foreground">{order.shipping.address}</p>
                <p className="text-muted-foreground">
                  {order.shipping.city}, {order.shipping.state} {order.shipping.zip}
                </p>
                <div className="flex items-center gap-2 mt-4 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{order.shipping.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{order.shipping.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Payment Information */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-primary" />
                Payment Method
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{order.payment?.method || 'N/A'}</span>
                  <span className="text-muted-foreground">•••• {order.payment?.last4 || '****'}</span>
                </div>
                <p className="text-muted-foreground">Billing address same as shipping</p>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-lg">${order.payment?.total?.toFixed(2) || '0.00'}</p>
                  <p className="text-sm text-muted-foreground">Charged to your card</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            onClick={handleDownloadInvoice}
            variant="outline" 
            size="lg"
            className="gap-2"
          >
            <Download className="h-5 w-5" />
            Download Invoice
          </Button>
          <Button 
            onClick={handleShareOrder}
            variant="outline" 
            size="lg"
            className="gap-2"
          >
            <Share2 className="h-5 w-5" />
            {isCopied ? 'Copied!' : 'Share Order'}
          </Button>
          <Button asChild size="lg" className="gap-2">
            <Link href="/products">
              <ShoppingBag className="h-5 w-5" />
              Continue Shopping
            </Link>
          </Button>
        </div>
        {/* Support Section */}
        <Card className="bg-muted/50">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              Our customer support team is here to help with any questions about your order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link href="/contact">
                  Contact Support
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/track-order">
                  Track Your Order
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-lg text-muted-foreground">Loading order details...</div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
