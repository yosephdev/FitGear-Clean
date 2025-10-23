'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  HeartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import {
  ShoppingBagIcon,
  CubeIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/solid';

// Placeholder types for now, will be properly defined when contexts are migrated
type User = { first_name?: string; is_admin?: boolean; email?: string };
type AuthContextType = { user: User | null; isAuthenticated: boolean; logout: () => void };
type WishlistContextType = { itemCount: number };

// Mock hooks for now, replace with actual context hooks later
const useAuth = (): AuthContextType => ({ 
  user: { first_name: 'Guest', is_admin: false, email: 'guest@example.com' }, 
  isAuthenticated: false, 
  logout: () => console.log('Logout') 
});
const useWishlist = (): WishlistContextType => ({ itemCount: 0 });

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartIsAnimated, setCartIsAnimated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const { itemCount: wishlistCount } = useWishlist();
  const router = useRouter();
  const pathname = usePathname();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize full-screen ad only on home page and lock body scroll when visible
  useEffect(() => {
    setShowAd(pathname === '/');
  }, [pathname]);

  useEffect(() => {
    if (showAd) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [showAd]);

  // Cart animation
  useEffect(() => {
    if (itemCount > 0) {
      setCartIsAnimated(true);
      const timer = setTimeout(() => setCartIsAnimated(false), 600);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push('/');
  };

  type NavLink = { name: string; href: string; badge?: string | number };
  const navLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Deals', href: '/deals', badge: 'HOT' },
    { name: 'Blog', href: '/blog' },
  ];

  const categories = [
     { name: 'Strength Training', href: '/products?category=Strength%20Training', icon: CubeIcon },
     { name: 'Cardio Equipment', href: '/products?category=Cardio%20Equipment', icon: DevicePhoneMobileIcon },
     { name: 'Fitness Accessories', href: '/products?category=Fitness%20Accessories', icon: ShoppingBagIcon },
     { name: 'Yoga & Pilates', href: '/products?category=Yoga%20%26%20Pilates', icon: ComputerDesktopIcon },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-white border-b border-gray-100'
    }`}>
      <div className="container mx-auto">
        {/* Full-screen Ad Banner (only on home page) */}
        {showAd && (
          <div className="fixed inset-0 z-[60] bg-gradient-to-br from-primary-600 to-primary-700 text-white flex items-center justify-center p-6">
            <button
              aria-label="Close advertisement"
              onClick={() => setShowAd(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <div className="max-w-3xl text-center space-y-6">
              <Image
                src="/logo-fit-gear.png"
                alt="FitGear Logo"
                width={120}
                height={120}
                priority
                className="mx-auto object-contain drop-shadow-md"
              />
              <h2 className="text-4xl md:text-5xl font-extrabold">Big Savings Event</h2>
              <p className="text-lg md:text-xl text-white/90">Free shipping on orders over $100. Limited time only.</p>
              <div className="flex items-center justify-center gap-3">
                <Link
                  href="/products"
                  className="px-6 py-3 rounded-lg bg-white text-primary-700 font-semibold hover:bg-white/90 transition"
                  onClick={() => setShowAd(false)}
                >
                  Shop Now
                </Link>
                <button
                  onClick={() => setShowAd(false)}
                  className="px-6 py-3 rounded-lg border border-white/40 hover:bg-white/10 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

  <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center group"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="relative">
                <img
                  src="/logo-fit-gear.png"
                  alt="FitGear Logo"
                  className="block object-contain drop-shadow"
                />
              </div>
              {/* Logo only; brand text removed per request */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActiveLink(link.href)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
                {link.badge && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
                {isActiveLink(link.href) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full" />
                )}
              </Link>
            ))}
            
            {/* Categories Dropdown */}
            <div className="relative" ref={categoryMenuRef}>
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-all duration-200"
              >
                <span>Categories</span>
                <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${
                  isCategoryMenuOpen ? 'rotate-180' : ''
                }`} />
              </button>
              
              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 group"
                      onClick={() => setIsCategoryMenuOpen(false)}
                    >
                      <category.icon className="h-5 w-5 text-gray-400 group-hover:text-primary-500" />
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands, and more..."
                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 shadow-sm"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <div className="h-6 w-6 bg-primary-500 rounded-lg flex items-center justify-center opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                  <MagnifyingGlassIcon className="h-4 w-4 text-white" />
                </div>
              </button>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Wishlist */}
            {isAuthenticated && (
              <Link
                href="/profile?tab=wishlist"
                className="relative p-2.5 rounded-xl text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-all duration-200 group"
              >
                <HeartIcon className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className={`relative p-2.5 rounded-xl text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-all duration-200 group ${
                cartIsAnimated ? 'animate-bounce' : ''
              }`}
            >
              <ShoppingCartIcon className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm font-medium">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-xl text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
                      <UserIcon className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden sm:block text-sm font-medium max-w-24 truncate">
                      {user?.first_name}
                    </span>
                    <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user?.first_name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                      
                      <Link
                        href="/profile"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <UserIcon className="h-5 w-5" />
                        <span>My Profile</span>
                      </Link>
                      
                      <Link
                        href="/orders"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <ShoppingBagIcon className="h-5 w-5" />
                        <span>My Orders</span>
                      </Link>

                      {user?.is_admin && (
                        <Link
                          href="/admin"
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <CubeIcon className="h-5 w-5" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                      
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <XMarkIcon className="h-5 w-5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/login"
                    className="hidden sm:block text-gray-700 hover:text-primary-600 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 px-6 py-2.5 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="px-4 pt-4 pb-6 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                />
              </form>

              {/* Mobile Navigation */}
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 ${
                      isActiveLink(link.href)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Mobile Categories */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Categories
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="flex items-center space-x-2 px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <category.icon className="h-5 w-5" />
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Auth Links */}
              {!isAuthenticated && (
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <Link
                    href="/login"
                    className="block w-full text-center text-gray-700 hover:text-primary-600 hover:bg-gray-100 px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full text-center bg-primary-500 text-white hover:bg-primary-600 px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 shadow-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce {
          animation: bounce 0.6s ease-in-out;
        }
      `}</style>
    </header>
  );
};

export default Header;