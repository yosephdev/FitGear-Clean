'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types/product';
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StarIcon, ArrowRightIcon } from "lucide-react"

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.product_id);
    }
  };

  const imageUrl = product.images?.[0] || '/images/placeholder.jpg';
  const productName = product.name || 'Product Name';

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={productName}
            width={500}
            height={500}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <div className="flex items-center gap-1 ml-auto">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />
            ))}
          </div>
        </div>
        <h3 className="font-semibold mb-2 text-balance">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">${product.price}</span>
          <Button size="sm" variant="ghost" asChild>
            <Link href={`/products/${product.slug}`}>
              View
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;