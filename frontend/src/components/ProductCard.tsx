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
      onAddToCart(product.id);
    }
  };

  const imageUrl = product.images?.[0] || '/images/placeholder.jpg';
  const productName = product.name || 'Product Name';

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={productName}
            width={500}
            height={500}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <div className="flex items-center gap-1 ml-auto">
            {[...Array(Math.floor(product.rating || 0))].map((_, i) => (
              <StarIcon key={i} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
            ))}
            {[...Array(5 - Math.floor(product.rating || 0))].map((_, i) => (
              <StarIcon key={`empty-${i}`} className="w-3.5 h-3.5 fill-gray-300 text-gray-300" />
            ))}
          </div>
        </div>
        <h3 className="font-semibold mb-2 text-balance flex-1">{product.name}</h3>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
          <Button size="sm" variant="ghost" asChild>
            <Link href={`/products/${product.id}`}>
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