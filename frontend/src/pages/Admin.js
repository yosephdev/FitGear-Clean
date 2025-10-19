import React, { useState, useEffect } from 'react';
import { productsAPI, blogAPI } from '../services/api';
import {
  ChartBarIcon,
  ShoppingBagIcon,
  UserIcon,
  DocumentTextIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../components/ui/button.tsx';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'blog') {
      fetchBlogPosts();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await productsAPI.getProducts({ limit: 100 });
      setProducts(response.data.products);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoading(false);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      setIsLoading(true);
      const response = await blogAPI.getPosts({ limit: 100 });
      setBlogPosts(response.data.posts);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: ChartBarIcon },
    { id: 'products', name: 'Products', icon: ShoppingBagIcon },
    { id: 'users', name: 'Users', icon: UserIcon },
    { id: 'blog', name: 'Blog', icon: DocumentTextIcon },
  ];

  const stats = [
    { name: 'Total Products', value: products.length, icon: ShoppingBagIcon, color: 'blue' },
    { name: 'Total Users', value: '1,234', icon: UserIcon, color: 'green' },
    { name: 'Total Orders', value: '567', icon: ChartBarIcon, color: 'yellow' },
    { name: 'Blog Posts', value: blogPosts.length, icon: DocumentTextIcon, color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-heading">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your FitGear store</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {activeTab === 'dashboard' && (
              <div>
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-md bg-${stat.color}-100`}>
                          <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                          <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p className="text-sm text-gray-600">New product "Olympic Barbell" added</p>
                      <span className="text-xs text-gray-400">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p className="text-sm text-gray-600">New user registered</p>
                      <span className="text-xs text-gray-400">4 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <p className="text-sm text-gray-600">Order #1234 completed</p>
                      <span className="text-xs text-gray-400">6 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <div className="bg-white rounded-lg shadow-md">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Products</h3>
                    <Button>
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Inventory</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id}>
                            <td>
                              <div className="flex items-center space-x-3">
                                <img
                                  src={product.images[0] || 'https://via.placeholder.com/50x50'}
                                  alt={product.name}
                                  className="w-10 h-10 rounded-md object-cover"
                                />
                                <div>
                                  <p className="font-medium text-gray-900">{product.name}</p>
                                  <p className="text-sm text-gray-500">{product.brand}</p>
                                </div>
                              </div>
                            </td>
                            <td>{product.category}</td>
                            <td>${product.price}</td>
                            <td>{product.inventory}</td>
                            <td>
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  product.is_active
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {product.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon">
                                  <PencilIcon className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <TrashIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Users</h3>
                  <div className="text-center py-12">
                    <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">User management</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      User management features coming soon.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div>
                <div className="bg-white rounded-lg shadow-md">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Blog Posts</h3>
                    <Button>
                      <PlusIcon className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Author</th>
                          <th>Created</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogPosts.map((post) => (
                          <tr key={post.id}>
                            <td>
                              <p className="font-medium text-gray-900">{post.title}</p>
                            </td>
                            <td>{post.category}</td>
                            <td>{post.author}</td>
                            <td>{new Date(post.created_at).toLocaleDateString()}</td>
                            <td>
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  post.is_published
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {post.is_published ? 'Published' : 'Draft'}
                              </span>
                            </td>
                            <td>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon">
                                  <PencilIcon className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <TrashIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
