'use client';

import React, { useState, useMemo } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Check, 
  Truck, 
  Shield, 
  ArrowLeft,
  Star,
  StarHalf,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const isInStock = useMemo(() => 
    product.inventory && product.inventory > 0, 
    [product.inventory]
  );

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      // quantity: quantity, // Removed to match CartItem type
      ...(product.images?.[0] && { image: product.images[0] })
    });
    
    setIsAddingToCart(false);
    
    // Enhanced toast notification
    toast({
      title: "Added to cart!",
      description: `${quantity} × ${product.name}`,
      action: (
        <ToastAction 
          altText="View cart" 
          onClick={() => router.push('/cart')}
        >
          View Cart
        </ToastAction>
      ),
      className: "bg-green-50 border-green-200",
    });
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    router.push('/cart');
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: product.description,
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
      toast({
        title: "Link copied!",
        description: "Product link copied to clipboard",
      });
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted ? "Item removed from your wishlist" : "Item added to your wishlist",
    });
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === (product.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? (product.images?.length || 1) - 1 : prev - 1
    );
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Navigation */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="gap-2 -ml-3"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted shadow-xl border">
              <Image
                src={product.images?.[selectedImageIndex] || '/images/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Image Navigation */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              
              {/* Sale Badge */}
              {product.on_sale && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-bold">
                  SALE
                </Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-primary ring-2 ring-primary/20' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6 lg:space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {product.category && (
                  <Badge variant="secondary" className="px-3 py-1 text-sm">
                    {product.category}
                  </Badge>
                )}
                {product.brand && (
                  <span className="text-sm text-muted-foreground">
                    by <span className="font-semibold text-foreground">{product.brand}</span>
                  </span>
                )}
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-lg font-semibold text-foreground">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    ({product.reviews_count || 0} reviews)
                  </span>
                  <span className="text-green-600 font-medium text-sm">
                    ● {isInStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              )}
            </div>

            {/* Price Section */}
            <div className="py-6 border-y border-border space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-foreground">
                  ${product.price.toFixed(2)}
                </span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-2xl text-muted-foreground line-through">
                    ${product.original_price.toFixed(2)}
                  </span>
                )}
                {product.on_sale && (
                  <Badge variant="destructive" className="text-sm px-2 py-1">
                    Save {((1 - product.price / product.original_price!) * 100).toFixed(0)}%
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-lg">USD • Free shipping on orders over $100</p>
            </div>

            {/* Stock Information */}
            <div className="space-y-3">
              {isInStock ? (
                <div className="flex items-center gap-3 text-green-600">
                  <Check className="h-5 w-5" />
                  <span className="font-semibold">In Stock</span>
                  <span className="text-muted-foreground">
                    ({product.inventory} units available)
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-red-600">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="font-semibold">Out of Stock</span>
                </div>
              )}
              
              {product.inventory && product.inventory < 10 && isInStock && (
                <div className="text-orange-600 text-sm font-medium">
                  ⚠️ Only {product.inventory} left in stock - order soon!
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            {isInStock && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg bg-background">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      disabled={quantity <= 1}
                      className="p-3 hover:bg-muted transition-colors disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="px-6 py-3 font-medium min-w-[4rem] text-center border-x border-border">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(prev => prev + 1)}
                      disabled={quantity >= (product.inventory || 1)}
                      className="p-3 hover:bg-muted transition-colors disabled:opacity-50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Max: {product.inventory} units
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={handleAddToCart}
                disabled={!isInStock || isAddingToCart}
                size="lg"
                className="flex-1 gap-3 h-14 text-lg font-semibold"
              >
                {isAddingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart • ${(product.price * quantity).toFixed(2)}
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleBuyNow}
                disabled={!isInStock}
                variant="outline"
                size="lg"
                className="flex-1 h-14 text-lg font-semibold"
              >
                Buy Now
              </Button>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleWishlist}
                  variant="outline"
                  size="icon"
                  className="h-14 w-14"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="icon"
                  className="h-14 w-14"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
              <div className="text-center space-y-2">
                <Truck className="h-6 w-6 mx-auto text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center space-y-2">
                <Shield className="h-6 w-6 mx-auto text-muted-foreground" />
                <p className="text-xs text-muted-foreground">2-Year Warranty</p>
              </div>
              <div className="text-center space-y-2">
                <Check className="h-6 w-6 mx-auto text-muted-foreground" />
                <p className="text-xs text-muted-foreground">30-Day Returns</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Description</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="space-y-4 pt-6">
                <h2 className="text-2xl font-semibold text-foreground">Specifications</h2>
                <div className="bg-muted/30 rounded-xl p-6 space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                      <span className="text-muted-foreground font-medium capitalize">
                        {key.replace(/_/g, ' ')}
                      </span>
                      <span className="font-semibold text-foreground text-right">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}