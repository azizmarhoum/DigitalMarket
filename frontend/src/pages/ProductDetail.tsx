import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import Layout from '../components/Layout';
import { Eye, Heart, ShoppingCart, Download, User } from 'lucide-react';
import { productsAPI, ordersAPI } from '../lib/api';
import { useAuth } from '../lib/AuthContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  status: string;
  googleDriveLink: string;
  createdAt: string;
  sellerId: {
    _id: string;
    name: string;
  };
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);

  // Fetch product details
  const { data: response, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsAPI.getOne(id!),
    enabled: !!id
  });

  const product = response?.data as Product;

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: (productId: string) => ordersAPI.create({ productId }),
    onSuccess: () => {
      navigate('/orders/bought');
    }
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-600">Error loading product. Please try again later.</div>
        </div>
      </Layout>
    );
  }

  const handleBuyNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    createOrderMutation.mutate(product._id);
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="space-y-4">
              <div className="aspect-video bg-white rounded-lg overflow-hidden shadow-sm">
                <img
                  src={`http://localhost:5000/api/products/${product._id}/image`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                
                {/* Author */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.sellerId.name}</p>
                    <p className="text-sm text-gray-500">Verified Seller</p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button 
                    onClick={handleBuyNow}
                    disabled={createOrderMutation.isPending}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>{createOrderMutation.isPending ? 'Processing...' : 'Buy Now'}</span>
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                      <Heart className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <a
                      href={product.googleDriveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Preview</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Product Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category:</span>
                    <span className="text-gray-900">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className="text-gray-900 capitalize">{product.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Listed:</span>
                    <span className="text-gray-900">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-12">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
