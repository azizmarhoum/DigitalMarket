
import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const categories = [
    { name: 'Websites', icon: '🌐', count: '2.5k+' },
    { name: 'Mobile Apps', icon: '📱', count: '1.8k+' },
    { name: 'Games', icon: '🎮', count: '950+' },
    { name: 'Online Courses', icon: '📚', count: '1.2k+' },
    { name: 'UI Kits', icon: '🎨', count: '800+' },
    { name: 'Graphics', icon: '🖼️', count: '3.2k+' },
    { name: 'eBooks', icon: '📖', count: '650+' },
    { name: 'Audio Files', icon: '🎵', count: '1.1k+' },
  ];

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Buy & Sell
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Digital Products
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Discover premium digital assets, tools, and resources from talented creators worldwide
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for digital products..."
                className="w-full px-6 py-4 pl-12 text-gray-900 bg-white rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium">
                Search
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/products" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Browse Products
            </Link>
            <Link to="/sell" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Start Selling
            </Link>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/products?category=${category.name.toLowerCase().replace(' ', '-')}`}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-opacity-20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
              <p className="text-blue-200 text-sm">{category.count} products</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
