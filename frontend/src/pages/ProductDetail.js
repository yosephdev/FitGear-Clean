import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsAPI, formatPrice } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import ReviewSection from '../components/ReviewSection';
import {
  StarIcon,
  HeartIcon,
  ShareIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import { getProductImage } from '../services/imageService';
import { Button } from '../components/ui/button.tsx';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);

  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const response = await productsAPI.getProduct(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    await addToCart(product.id, quantity);
  };

  const handleBuyNow = async () => {
    await addToCart(product.id, quantity);
    // Navigate to checkout
    window.location.href = '/checkout';
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground">Product not found</h2>
          <p className="mt-2 text-muted-foreground">
            The product you're looking for doesn't exist.
          </p>
          <Link to="/products">
            <Button className="mt-4">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images.map(getProductImage)
      : ['https://via.placeholder.com/600x600?text=No+Image'];

  const inStock = product.inventory > 0;
  const currentCartQuantity = getItemQuantity(product.id);

  return (
    <div className="min-h-screen bg-background">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <span className="text-muted-foreground">/</span>
            </li>
            <li>
              <Link to="/products" className="text-muted-foreground hover:text-foreground">
                Products
              </Link>
            </li>
            <li>
              <span className="text-muted-foreground">/</span>
            </li>
            <li>
              <span className="text-foreground font-medium">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-card rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover object-center"
                />
              </div>
            </div>

            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <Button
                    key={index}
                    variant={selectedImage === index ? 'default' : 'outline'}
                    onClick={() => setSelectedImage(index)}
                    className="aspect-w-1 aspect-h-1 p-0 h-20 overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div>
            <div className="bg-card rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground font-heading">
                    {product.name}
                  </h1>
                  <p className="text-lg text-muted-foreground mt-1">{product.brand}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="icon" variant="ghost" onClick={handleWishlistToggle}>
                    {isInWishlist(product.id) ? (
                      <HeartIconSolid className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartIcon className="h-6 w-6" />
                    )}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      navigator.share
                        ? navigator.share({ title: product.name, url: window.location.href })
                        : toast.info('Share feature not available')
                    }
                  >
                    <ShareIcon className="h-6 w-6" />
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.rating} ({product.reviews_count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-primary">{formatPrice(product.price)}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Free shipping on orders over $100
                </p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-foreground mb-2">Description</h3>
                <p className="text-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Specifications */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">Specifications</h3>
                  <dl className="grid grid-cols-1 gap-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <dt className="text-muted-foreground capitalize">
                          {key.replace('_', ' ')}:
                        </dt>
                        <dd className="text-foreground font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <label htmlFor="quantity" className="text-sm font-medium text-foreground">
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="border border-input rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  >
                    {[...Array(Math.min(10, product.inventory))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>

                  {inStock ? (
                    <span className="text-sm font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                      {product.inventory} in stock
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-destructive bg-destructive/10 px-3 py-1 rounded-full">
                      Out of stock
                    </span>
                  )}
                </div>

                {currentCartQuantity > 0 && (
                  <div className="mb-4 p-3 bg-secondary/10 border border-secondary/20 rounded-md">
                    <p className="text-sm text-secondary">
                      {currentCartQuantity} item(s) already in cart
                    </p>
                  </div>
                )}

                <div className="flex space-x-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    size="lg"
                    className="flex-1"
                  >
                    {inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    disabled={!inStock}
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <TruckIcon className="h-6 w-6 text-primary-600" />
                    <div>
                      <p className="font-medium text-gray-900">Free Shipping</p>
                      <p className="text-sm text-gray-600">On orders over $100</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ShieldCheckIcon className="h-6 w-6 text-primary-600" />
                    <div>
                      <p className="font-medium text-gray-900">Quality Guarantee</p>
                      <p className="text-sm text-gray-600">30-day return policy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection productId={id} />

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 font-heading">Related Products</h2>
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg">Related products coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
