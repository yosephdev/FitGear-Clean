'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import React, { useState } from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ArrowRightIcon,
  ShieldCheckIcon,
  TruckIcon,
  ClockIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube, 
  FaTiktok,
  FaPinterest,
  FaLinkedinIn
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubscribed(true);
    setEmail('');
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const footerLinks = {
    products: [
      { name: 'Strength Training', href: '/products?category=strength', count: '24 products' },
      { name: 'Cardio Equipment', href: '/products?category=cardio', count: '18 products' },
      { name: 'Fitness Accessories', href: '/products?category=accessories', count: '32 products' },
      { name: 'Workout Apparel', href: '/products?category=apparel', count: '45 products' },
      { name: 'Nutrition & Supplements', href: '/products?category=nutrition', count: '28 products' },
    ],
    company: [
      { name: 'About Us', href: '/about', description: 'Our story and mission' },
      { name: 'Our Team', href: '/team', description: 'Meet the experts' },
      { name: 'Careers', href: '/careers', description: 'Join our team' },
      { name: 'Press Kit', href: '/press', description: 'Media resources' },
      { name: 'Store Locator', href: '/stores', description: 'Find our stores' },
    ],
    support: [
      { name: 'Help Center', href: '/help', description: 'FAQ & guides' },
      { name: 'Shipping Info', href: '/shipping', description: 'Delivery times & costs' },
      { name: 'Returns & Exchanges', href: '/returns', description: '30-day guarantee' },
      { name: 'Size Guide', href: '/size-guide', description: 'Find your perfect fit' },
      { name: 'Contact Support', href: '/contact', description: '24/7 assistance' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
      { name: 'Sitemap', href: '/sitemap' },
    ],
  };

  const trustFeatures = [
    {
      icon: ShieldCheckIcon,
      title: 'Secure Payment',
      description: '256-bit SSL encryption'
    },
    {
      icon: TruckIcon,
      title: 'Free Shipping',
      description: 'On orders over $100'
    },
    {
      icon: ClockIcon,
      title: '24/7 Support',
      description: 'Always here to help'
    },
    {
      icon: HeartIcon,
      title: '30-Day Returns',
      description: 'Hassle-free returns'
    }
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: 'https://facebook.com/fitgear', label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: FaInstagram, href: 'https://instagram.com/fitgear', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: FaTwitter, href: 'https://twitter.com/fitgear', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: FaYoutube, href: 'https://youtube.com/fitgear', label: 'YouTube', color: 'hover:text-red-500' },
    { icon: FaTiktok, href: 'https://tiktok.com/@fitgear', label: 'TikTok', color: 'hover:text-gray-900' },
    { icon: FaPinterest, href: 'https://pinterest.com/fitgear', label: 'Pinterest', color: 'hover:text-red-600' },
    { icon: FaLinkedinIn, href: 'https://linkedin.com/company/fitgear', label: 'LinkedIn', color: 'hover:text-blue-600' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Trust Bar */}
        <div className="border-b border-gray-800">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-8">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-primary-500/10 rounded-xl group-hover:bg-primary-500/20 transition-colors duration-300">
                    <feature.icon className="h-6 w-6 text-primary-400" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white group-hover:text-primary-300 transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-6 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="xl:col-span-2 space-y-6">
              <div className="flex items-center space-x-2 group">
              <div className="relative">
                  <img
                    src="/logo-fit-gear.png"
                    alt="FitGear Logo"
                    className="block object-contain"
                  />
              </div>
                {/* Logo only; brand text removed per request */}
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Your premier destination for high-quality fitness equipment and accessories. 
              We&apos;re committed to helping you achieve your fitness goals with the best gear available.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-primary-500/10 transition-colors duration-300">
                  <PhoneIcon className="h-5 w-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Call us anytime</p>
                  <p className="text-white font-semibold group-hover:text-primary-300 transition-colors duration-300">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-primary-500/10 transition-colors duration-300">
                  <EnvelopeIcon className="h-5 w-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email support</p>
                  <p className="text-white font-semibold group-hover:text-primary-300 transition-colors duration-300">
                    support@fitgear.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 group">
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-primary-500/10 transition-colors duration-300">
                  <MapPinIcon className="h-5 w-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Visit our store</p>
                  <p className="text-white font-semibold group-hover:text-primary-300 transition-colors duration-300">
                    123 Fitness Street, Gym City
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="xl:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white relative inline-block">
              Products
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary-500 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between text-gray-300 hover:text-white py-2 transition-all duration-200 hover:translate-x-1"
                  >
                    <span className="text-sm">{link.name}</span>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
                        {link.count}
                      </span>
                      <ArrowRightIcon className="h-3 w-3 text-primary-400" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="xl:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white relative inline-block">
              Company
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary-500 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group block text-gray-300 hover:text-white py-2 transition-all duration-200 hover:translate-x-1"
                  >
                    <span className="text-sm font-medium">{link.name}</span>
                    <p className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {link.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="xl:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white relative inline-block">
              Support
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary-500 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group block text-gray-300 hover:text-white py-2 transition-all duration-200 hover:translate-x-1"
                  >
                    <span className="text-sm font-medium">{link.name}</span>
                    <p className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {link.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-12 border-t border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 lg:p-12 border border-gray-700/50 shadow-2xl">
              {isSubscribed ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Welcome to the FitGear Family!</h3>
                  <p className="text-gray-300 text-lg">
                    Thank you for subscribing. Check your email for a special welcome offer.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Join the <span className="text-primary-400">FitGear</span> Community
                  </h3>
                  <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                    Get exclusive access to fitness tips, new product launches, special offers, 
                    and members-only discounts. Join 50,000+ fitness enthusiasts.
                  </p>
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <div className="flex-1">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500 h-12"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold h-12 px-8 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Subscribing...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Subscribe
                          <ArrowRightIcon className="h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </form>
                  <p className="text-gray-400 text-sm mt-4">
                    No spam ever. Unsubscribe anytime. By subscribing, you agree to our Privacy Policy.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm font-medium">Follow us:</span>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 bg-gray-800 rounded-lg text-gray-400 ${social.color} transition-all duration-200 hover:scale-110 hover:bg-gray-700`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">We accept:</span>
              <div className="flex space-x-2">
                {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((method) => (
                  <div key={method} className="px-3 py-1 bg-gray-800 rounded-md border border-gray-700">
                    <span className="text-xs text-gray-300 font-medium">{method}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} FitGear Inc. All rights reserved. • Made with{' '}
              <span className="text-red-400">♥</span>{' '}
              for fitness enthusiasts worldwide
            </p>
            <p className="text-gray-500 text-xs mt-2">
              FitGear is a registered trademark. All product names, logos, and brands are property of their respective owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;