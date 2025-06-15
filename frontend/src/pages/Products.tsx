import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { Search, Filter, Grid, List } from 'lucide-react';
import { productsAPI } from '../lib/api';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'websites', label: 'Websites' },
    { value: 'mobile-apps', label: 'Mobile Apps' },
    { value: 'games', label: 'Games' },
    { value: 'courses', label: 'Online Courses' },
    { value: 'ui-kits', label: 'UI Kits' },
    { value: 'graphics', label: 'Graphics & Templates' },
    { value: 'ebooks', label: 'eBooks' },
    { value: 'marketing-tools', label: 'Marketing Tools' },
    { value: 'scripts', label: 'Scripts & Snippets' },
    { value: 'audio', label: 'Audio Files' },
    { value: 'video', label: 'Video Assets' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  // Fetch products with filters
  const { data: response, isLoading, error } = useQuery({
    queryKey: ['products', selectedCategory, searchTerm],
    queryFn: () => productsAPI.getAll({
      category: selectedCategory !== 'all' ? selectedCategory : undefined,
      search: searchTerm || undefined,
      status: 'available'
    })
  });

  // Sort products
  const sortedProducts = React.useMemo(() => {
    if (!response?.data) return [];
    
    return [...response.data].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [response?.data, sortBy]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-600">Error loading products. Please try again later.</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">All Products</h1>
            
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              {/* Sort Options */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Results Info */}
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Showing {sortedProducts.length} products
              </p>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found matching your criteria.</p>
            </div>
          ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
              {sortedProducts.map((product) => (
                <ProductCard 
                  key={product._id}
                  id={product._id}
                  title={product.name}
                  category={product.category}
                  price={product.price}
                  thumbnail={`http://localhost:5000/api/products/${product._id}/image`}
                  author={product.sellerId.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
