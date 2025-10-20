'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      ...(product.images?.[0] && { image: product.images[0] })
    });
    
    // Show success and redirect to cart
    alert('Product added to cart!');
    router.push('/cart');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="sticky top-8">
                <div className="aspect-square rounded-2xl overflow-hidden bg-muted shadow-lg">
                  <img 
                    src={product.images?.[0] || '/images/placeholder.jpg'} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category & Brand */}
              <div className="flex items-center gap-3">
                {product.category && (
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                )}
                {product.brand && (
                  <span className="text-sm text-muted-foreground">
                    Brand: <span className="font-medium text-foreground">{product.brand}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`text-2xl ${i < Math.floor(product.rating || 0) ? 'text-yellow-500' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-lg font-medium text-foreground">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground">
                    ({product.reviews_count || 0} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="py-4 border-y border-border">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-muted-foreground text-lg">USD</span>
                </div>
              </div>

              {/* Stock Status */}
              <div>
                {product.inventory && product.inventory > 0 ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-semibold text-lg">In Stock</span>
                    <span className="text-muted-foreground">
                      ({product.inventory} available)
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 font-semibold text-lg">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-foreground">Description</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              {/* Add to Cart Button */}
              <div className="pt-4">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  disabled={!product.inventory || product.inventory === 0}
                >
                  {product.inventory && product.inventory > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
                </button>
              </div>

              {/* Specifications */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="pt-6 space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Specifications</h2>
                  <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                        <span className="text-muted-foreground capitalize font-medium">
                          {key.replace(/_/g, ' ')}
                        </span>
                        <span className="font-semibold text-foreground">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
