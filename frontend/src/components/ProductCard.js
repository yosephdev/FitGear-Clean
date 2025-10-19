import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../services/api';
import {
  StarIcon,
  HeartIcon as HeartIconOutline,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import { getProductImage } from '../services/imageService';
import { Button } from './ui/button.tsx';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async () => {
    await addToCart(product.id, 1);
  };

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to use wishlist');
      return;
    }

    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product);
    }
  };

  const isWishlisted = isInWishlist(product.id);

  const imageSrc =
    getProductImage(product.images[0]) ||
    product.images[0] ||
    'https://via.placeholder.com/300x300?text=No+Image';

  if (viewMode === 'list') {
    return (
      <div className="bg-card rounded-lg shadow-md p-4 flex space-x-4 hover:shadow-lg transition-shadow duration-200">
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-foreground hover:text-primary">
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </h3>
              <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-muted'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  ({product.reviews_count})
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary mb-2">
                {formatPrice(product.price)}
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleWishlistToggle} variant="ghost" size="icon">
                  {isWishlisted ? (
                    <HeartIconSolid className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartIconOutline className="h-5 w-5" />
                  )}
                </Button>
                <Button asChild>
                  <Link to={`/products/${product.id}`}>View</Link>
                </Button>
                <Button onClick={handleAddToCart}>Add to Cart</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-elevated product-card relative group transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl">
      {/* Wishlist Button */}
      <Button
        onClick={handleWishlistToggle}
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 z-10 bg-card rounded-full shadow-md"
      >
        {isWishlisted ? (
          <HeartIconSolid className="h-5 w-5 text-red-500" />
        ) : (
          <HeartIconOutline className="h-5 w-5 text-muted-foreground hover:text-red-500" />
        )}
      </Button>

      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-muted">
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-64 object-cover object-center product-image group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 h-10">
          {product.description}
        </p>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-muted'}`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-muted-foreground">
            ({product.reviews_count} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
          <span className="text-sm font-medium text-secondary-foreground bg-secondary px-2 py-1 rounded">
            {product.brand}
          </span>
        </div>

        <div className="flex space-x-2">
          <Button asChild>
            <Link to={`/products/${product.id}`}>View Details</Link>
          </Button>
          <Button onClick={handleAddToCart}>
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
