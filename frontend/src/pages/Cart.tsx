import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '../components/Layout';
import { Download, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ordersAPI } from '../lib/api';
import { useAuth } from '../lib/AuthContext';

const Cart = () => {
  const { user } = useAuth();

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['bought-items'],
    queryFn: () => ordersAPI.getBought(),
    enabled: !!user
  });

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Please log in</h2>
            <p className="text-gray-600 mb-6">You need to be logged in to view your purchases</p>
            <Link
              to="/login"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Log In
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

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
          <div className="text-red-600">Error loading your purchases. Please try again later.</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Purchases</h1>

          {orders && orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center space-x-4">
                      <img
                      src={URL.createObjectURL(new Blob([order.productId.image]))}
                      alt={order.productId.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{order.productId.name}</h3>
                      <p className="text-sm text-gray-500">by {order.sellerId.name}</p>
                      <p className="text-sm text-blue-600">{order.productId.category}</p>
                      <p className="text-sm text-gray-500">
                        Purchased on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      </div>
                      <div className="text-right">
                      <p className="font-semibold text-gray-900">${order.price}</p>
                      <div className="mt-2 space-x-2">
                        {order.status === 'completed' && order.googleDriveLink ? (
                          <a
                            href={order.googleDriveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                          >
                            <Download className="h-4 w-4" />
                            <span>Download</span>
                          </a>
                        ) : (
                          <span className="text-sm text-gray-500">
                            {order.status === 'pending' ? 'Processing...' : 'Cancelled'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L17 18" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">No purchases yet</h2>
              <p className="text-gray-600 mb-6">Start shopping to add items to your collection</p>
              <Link
                to="/products"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
