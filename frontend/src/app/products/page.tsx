"use client"

import { useState, useEffect, Suspense, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Search, SlidersHorizontal, Grid3x3, List, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { useCart } from "@/context/CartContext"
import { toast } from "sonner"
import { apiUrl } from "@/lib/api"

interface Product {
  id: string
  name: string
  price: number
  category: string
  images: string[]
  rating: number
  reviews_count: number
  inventory: number
}

function ProductsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { addToCart } = useCart()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "all",
    search: searchParams.get("search") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sortBy: searchParams.get("sortBy") || "name",
  })

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(apiUrl('/products'))
      const data = await response.json()
      let fetchedProducts = data.products || []      // Apply filters
      if (filters.category && filters.category !== "all") {
        fetchedProducts = fetchedProducts.filter((p: Product) => p.category === filters.category)
      }
      if (filters.search) {
        fetchedProducts = fetchedProducts.filter((p: Product) =>
          p.name.toLowerCase().includes(filters.search.toLowerCase())
        )
      }
      if (filters.minPrice) {
        fetchedProducts = fetchedProducts.filter(
          (p: Product) => p.price >= Number.parseFloat(filters.minPrice)
        )
      }
      if (filters.maxPrice) {
        fetchedProducts = fetchedProducts.filter(
          (p: Product) => p.price <= Number.parseFloat(filters.maxPrice)
        )
      }

      // Apply sorting
      if (filters.sortBy === "price_low") {
        fetchedProducts.sort((a: Product, b: Product) => a.price - b.price)
      } else if (filters.sortBy === "price_high") {
        fetchedProducts.sort((a: Product, b: Product) => b.price - a.price)
      } else if (filters.sortBy === "rating") {
        fetchedProducts.sort((a: Product, b: Product) => b.rating - a.rating)
      } else {
        fetchedProducts.sort((a: Product, b: Product) => a.name.localeCompare(b.name))
      }

      setProducts(fetchedProducts)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(apiUrl('/categories'))
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [fetchProducts, fetchCategories])

  const updateFilters = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    // Update URL params
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v)
    })
    router.push(`/products?${params.toString()}`, { scroll: false })
  }

  const clearFilters = () => {
    setFilters({
      category: "all",
      search: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "name",
    })
    router.push("/products", { scroll: false })
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      ...(product.images[0] && { image: product.images[0] })
    });
    toast.success(`${product.name} added to cart!`, {
      description: `Price: $${product.price.toFixed(2)}`,
      duration: 3000,
    });
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group overflow-hidden border-border hover:border-primary transition-all duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted" style={{ minHeight: '300px' }}>
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.inventory <= 0 && <Badge className="absolute top-3 right-3 bg-destructive">Out of Stock</Badge>}
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews_count})</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-foreground">${product.price}</span>
            <Badge variant="secondary">{product.category}</Badge>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          disabled={product.inventory <= 0}
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart(product);
          }}
        >
          {product.inventory > 0 ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  )

  const ProductListItem = ({ product }: { product: Product }) => (
    <Card className="group overflow-hidden border-border hover:border-primary transition-all duration-300">
      <div className="flex flex-col sm:flex-row">
        <Link href={`/products/${product.id}`} className="relative w-full sm:w-48 aspect-square sm:aspect-auto" style={{ minHeight: '200px' }}>
          <Image 
            src={product.images[0] || "/placeholder.svg"} 
            alt={product.name} 
            fill
            sizes="(max-width: 768px) 100vw, 192px"
            className="object-cover" 
          />
        </Link>
        <div className="flex-1 p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <Link href={`/products/${product.id}`}>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">{product.category}</Badge>
                {product.inventory <= 0 && <Badge className="bg-destructive">Out of Stock</Badge>}
              </div>
              <div className="flex items-center gap-1 mb-4">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews_count} reviews)</span>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-3">
              <span className="text-3xl font-bold text-foreground">${product.price}</span>
              <Button
                disabled={product.inventory <= 0}
                className="w-full sm:w-auto"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(product);
                }}
              >
                {product.inventory > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Premium Fitness Equipment
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Discover our curated collection of professional-grade fitness gear
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-72 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary hover:text-primary/80">
                  Clear All
                </Button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    value={filters.search}
                    onChange={(e) => updateFilters("search", e.target.value)}
                    placeholder="Search products..."
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <Select value={filters.category} onValueChange={(value) => updateFilters("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">Price Range</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => updateFilters("minPrice", e.target.value)}
                    placeholder="Min"
                  />
                  <Input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => updateFilters("maxPrice", e.target.value)}
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Products Section */}
          <div className="flex-1">
            {/* Controls */}
            <div className="bg-card border border-border rounded-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <span className="text-sm text-muted-foreground">{products.length} products found</span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <Select value={filters.sortBy} onValueChange={(value) => updateFilters("sortBy", value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Sort by Name</SelectItem>
                      <SelectItem value="price_low">Price: Low to High</SelectItem>
                      <SelectItem value="price_high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode */}
                  <div className="flex border border-border rounded-md">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="icon"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="icon"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {isLoading ? (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {[...Array(6)].map((_, i) => (
                  <Card key={i}>
                    <Skeleton className="aspect-square w-full" />
                    <CardContent className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-3" />
                      <Skeleton className="h-8 w-1/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
                <Button variant="outline" onClick={clearFilters} className="mt-4 bg-transparent">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {products.map((product) =>
                  viewMode === "grid" ? (
                    <ProductCard key={product.id} product={product} />
                  ) : (
                    <ProductListItem key={product.id} product={product} />
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
