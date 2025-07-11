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

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    
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
  
  const imageSrc = getProductImage(product.images[0]) || product.images[0] || 'https://via.placeholder.com/300x300?text=No+Image';

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 flex space-x-4 hover:shadow-lg transition-shadow duration-200">
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
              <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600">
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">({product.reviews_count})</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600 mb-2">
                {formatPrice(product.price)}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleWishlistToggle}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  {isWishlisted ? (
                    <HeartIconSolid className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartIconOutline className="h-5 w-5" />
                  )}
                </button>
                <Link
                  to={`/products/${product.id}`}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors duration-200"
                >
                  View
                </Link>
                <button
                  onClick={handleAddToCart}
                  className="bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition-colors duration-200"
                >
                  Add to Cart
                </button>
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
      <button
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
      >
        {isWishlisted ? (
          <HeartIconSolid className="h-5 w-5 text-red-500" />
        ) : (
          <HeartIconOutline className="h-5 w-5 text-gray-400 hover:text-red-500" />
        )}
      </button>

      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-64 object-cover object-center product-image group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-primary-600">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">{product.description}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.reviews_count} reviews)</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.brand}</span>
        </div>
        
        <div className="flex space-x-2">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300 text-center font-semibold"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center font-semibold"
          >
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;