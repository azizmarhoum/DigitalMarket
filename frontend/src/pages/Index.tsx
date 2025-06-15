import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { TrendingUp, Star } from 'lucide-react';

const Index = () => {
  // Sample trending products data with diverse categories
  const trendingProducts = [
    {
      id: '1',
      title: 'Modern E-commerce Website Template',
      category: 'Website',
      price: 49,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop',
      author: 'WebStudio Pro'
    },
    {
      id: '2',
      title: 'Complete UI Kit for SaaS Apps',
      category: 'UI Kit',
      price: 89,
      thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=240&fit=crop',
      author: 'DesignCraft Studio'
    },
    {
      id: '3',
      title: 'Social Media Graphics Bundle',
      category: 'Graphics',
      price: 35,
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=240&fit=crop',
      author: 'Creative Masters'
    },
    {
      id: '4',
      title: 'Digital Marketing Automation Scripts',
      category: 'Marketing Tool',
      price: 75,
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=240&fit=crop',
      author: 'CodeAcademy Plus'
    },
    {
      id: '5',
      title: 'Complete Guide to Web Development',
      category: 'eBook',
      price: 29,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop',
      author: 'TechBooks Publishing'
    },
    {
      id: '6',
      title: 'Royalty-Free Music Pack',
      category: 'Audio',
      price: 45,
      thumbnail: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=240&fit=crop',
      author: 'Audio Solutions'
    }
  ];

  // Sample featured stats
  const featuredStats = [
    { label: 'Digital Products', value: '10,000+' },
    { label: 'Happy Customers', value: '25,000+' },
    { label: 'Total Sales', value: '$2.5M+' },
    { label: 'Success Rate', value: '98%' }
  ];

  return (
    <Layout>
      <Hero />
      
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {featuredStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Trending Products</h2>
            </div>
            <a href="/products" className="text-blue-600 hover:text-blue-700 font-medium">
              View All →
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose DigitalMarket?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a secure, user-friendly platform for buying and selling digital products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">
                All products are carefully reviewed to ensure high quality and functionality
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-600 rounded"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Transactions</h3>
              <p className="text-gray-600">
                Your payments and downloads are protected with industry-standard security
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our dedicated support team is here to help you with any questions or issues
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
