import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI, formatDate } from '../services/api';
import { MagnifyingGlassIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const params = {};
      if (selectedCategory) {
        params.category = selectedCategory;
      }

      const response = await blogAPI.getPosts(params);
      setPosts(response.data.posts || []);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setPosts([]);
      setIsLoading(false);
    }
  };

  const filteredPosts = (posts || []).filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ['Strength Training', 'Home Gym', 'Nutrition', 'Cardio', 'Recovery'];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-heading">FitGear Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the latest fitness tips, workout routines, and equipment guides to help you
            reach your goals.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="blog-card bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={
                      post.featured_image ||
                      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'
                    }
                    alt={post.title}
                    className="w-full h-48 object-cover object-center"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                    <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-3 font-heading">
                    <Link
                      to={`/blog/${post.id}`}
                      className="hover:text-primary-600 transition-colors duration-200"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.content.substring(0, 150)}...
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        <span>{formatDate(post.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-primary-600 hover:text-primary-800 font-medium text-sm"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
