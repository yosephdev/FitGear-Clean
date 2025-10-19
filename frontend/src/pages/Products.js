import { Button } from '../components/ui/button.tsx';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'name',
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    setFilters((prevFilters) => ({ ...prevFilters, category, search }));
    fetchProducts({ ...filters, category, search });
    fetchCategories();
    // eslint-disable-next-line
  }, [searchParams]);

  const fetchProducts = async (currentFilters) => {
    setIsLoading(true);
    try {
      const params = {
        category: currentFilters.category === 'all' ? '' : currentFilters.category,
        search: currentFilters.search,
        minPrice: currentFilters.minPrice,
        maxPrice: currentFilters.maxPrice,
        sortBy: currentFilters.sortBy,
      };
      const response = await productsAPI.getProducts(params);
      console.log('Products Response:', response);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await productsAPI.getCategories();
      console.log('Categories Response:', response);
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const updateFilters = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    navigate(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      search: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name',
    });
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Premium Fitness Equipment
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Discover our curated collection of{' '}
            <span className="text-secondary font-semibold">professional-grade</span> fitness gear
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`lg:w-72 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-card rounded-lg p-6 sticky top-24 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                <Button onClick={clearFilters} size="sm" variant="ghost">
                  Clear All
                </Button>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">Search</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground">
                    🔍
                  </span>
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => updateFilters('search', e.target.value)}
                    placeholder="Search products..."
                    className="pl-10 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-muted"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => updateFilters('category', e.target.value)}
                  className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-muted"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Price Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => updateFilters('minPrice', e.target.value)}
                    placeholder="Min"
                    className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-muted"
                  />
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => updateFilters('maxPrice', e.target.value)}
                    placeholder="Max"
                    className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-muted"
                  />
                </div>
              </div>
            </div>
          </aside>
          <div className="flex-1">
            <div className="bg-card rounded-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => setShowFilters(!showFilters)}
                    size="sm"
                    variant="outline"
                    className="lg:hidden flex items-center space-x-2"
                  >
                    <span className="h-5 w-5">☰</span>
                    <span>Filters</span>
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {products.length} products found
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateFilters('sortBy', e.target.value)}
                    className="px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-muted"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                  <div className="flex rounded-md overflow-hidden">
                    <Button
                      onClick={() => setViewMode('grid')}
                      size="icon"
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    >
                      <span className="h-5 w-5">▦</span>
                    </Button>
                    <Button
                      onClick={() => setViewMode('list')}
                      size="icon"
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                    >
                      <span className="h-5 w-5">≡</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {isLoading ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {[...Array(6)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">
                  No products found matching your criteria.
                </p>
                <Button onClick={clearFilters} variant="outline" className="mt-4">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
