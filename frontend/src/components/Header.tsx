'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  HeartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

// Placeholder types for now, will be properly defined when contexts are migrated
type User = { first_name?: string; is_admin?: boolean };
type AuthContextType = { user: User | null; isAuthenticated: boolean; logout: () => void };
type WishlistContextType = { itemCount: number };

// Mock hooks for now, replace with actual context hooks later
const useAuth = (): AuthContextType => ({ user: { first_name: 'Guest', is_admin: false }, isAuthenticated: false, logout: () => console.log('Logout') });
const useWishlist = (): WishlistContextType => ({ itemCount: 0 });

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  asChild?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

// Placeholder Button component
const Button = ({ children, onClick, asChild, className, type = 'button' }: ButtonProps) => {
  if (asChild) return children;
  return <button type={type} onClick={onClick} className={className}>{children}</button>;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartIsAnimated, setCartIsAnimated] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const { itemCount: wishlistCount } = useWishlist();
  const router = useRouter();

  useEffect(() => {
    if (itemCount > 0) {
      setCartIsAnimated(true);
      const timer = setTimeout(() => setCartIsAnimated(false), 300);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container-max mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900 font-heading">FitGear</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            {isAuthenticated && (
              <Link
                href="/profile?tab=wishlist"
                className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                <HeartIcon className="h-6 w-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className={`relative p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200 ${cartIsAnimated ? 'cart-bump' : ''}`}
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors duration-200">
                  <UserIcon className="h-6 w-6" />
                  <span className="hidden sm:block text-sm font-medium">{user?.first_name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Profile
                  </Link>
                  {user?.is_admin && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-primary-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200"
            >
              {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </form>

              {/* Mobile Navigation */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-primary-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Auth Links */}
              {!isAuthenticated && (
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-primary-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Button asChild onClick={() => setIsMenuOpen(false)}>
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </div>
              )}

              {/* Mobile User Menu */}
              {isAuthenticated && (
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <Link
                    href="/profile"
                    className="text-gray-700 hover:text-primary-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  {user?.is_admin && (
                    <Link
                      href="/admin"
                      className="text-gray-700 hover:text-primary-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left text-gray-700 hover:text-primary-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
