import React, { useState } from 'react';
import Layout from '../components/Layout';
import { User, Download, Upload, Heart, Settings, Star, Edit2, Trash2, LogOut } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useAuth } from '../lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Account = () => {
  const [activeTab, setActiveTab] = useState('purchases');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const tabs = [
    { id: 'purchases', label: 'Purchases', icon: Download },
    { id: 'uploads', label: 'My Products', icon: Upload },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  // Fetch user's purchases
  const { data: purchases, isLoading: isLoadingPurchases, error: purchasesError } = useQuery({
    queryKey: ['purchases'],
    queryFn: () => api.getPurchases(),
    enabled: !!user,
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to load purchases',
        variant: 'destructive',
      });
      console.error('Error loading purchases:', error);
    }
  });

  // Fetch user's products
  const { data: products, isLoading: isLoadingProducts, error: productsError } = useQuery({
    queryKey: ['my-products'],
    queryFn: () => api.getMyProducts(),
    enabled: !!user,
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to load products',
        variant: 'destructive',
      });
      console.error('Error loading products:', error);
    }
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: { firstName: string; lastName: string; email: string; bio?: string }) =>
      api.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
      console.error('Error updating profile:', error);
    }
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: (productId: string) => api.deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-products'] });
      toast({
        title: 'Success',
        description: 'Product deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete product',
        variant: 'destructive',
      });
      console.error('Error deleting product:', error);
    }
  });

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateProfileMutation.mutate({
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      bio: formData.get('bio') as string
    });
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      deleteProductMutation.mutate(productId);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Please log in to view your account</h2>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Log In
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
            <p className="text-gray-600 mt-2">Manage your purchases, products, and account settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
              <div className="flex items-center space-x-3 mb-6 pb-6 border-b">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'purchases' && (
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Purchase History</h2>
                  </div>
                  <div className="divide-y">
                    {isLoadingPurchases ? (
                      <div className="p-6 text-center">Loading...</div>
                    ) : purchasesError ? (
                      <div className="p-6 text-center text-red-500">Failed to load purchases</div>
                    ) : purchases?.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">No purchases yet</div>
                    ) : (
                      purchases?.map((purchase) => (
                        <div key={purchase._id} className="p-6 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={purchase.product.thumbnail}
                              alt={purchase.product.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="font-medium text-gray-900">{purchase.product.title}</h3>
                              <p className="text-sm text-gray-500">by {purchase.product.seller.firstName} {purchase.product.seller.lastName}</p>
                              <p className="text-sm text-gray-500">
                                Purchased on {new Date(purchase.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${purchase.product.price}</p>
                            {purchase.product.downloadUrl && (
                              <a
                                href={purchase.product.downloadUrl}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1 inline-block"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Download
                              </a>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'uploads' && (
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">My Products</h2>
                    <button
                      onClick={() => navigate('/upload-product')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Upload New Product
                    </button>
                  </div>
                  <div className="divide-y">
                    {isLoadingProducts ? (
                      <div className="p-6 text-center">Loading...</div>
                    ) : productsError ? (
                      <div className="p-6 text-center text-red-500">Failed to load products</div>
                    ) : products?.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">No products yet</div>
                    ) : (
                      products?.map((product) => (
                        <div key={product._id} className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-medium text-gray-900">{product.title}</h3>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <span>Price: ${product.price}</span>
                                <span>Category: {product.category}</span>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {product.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(product.rating || 0)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">{product.rating?.toFixed(1) || 'No ratings'}</span>
                            </div>
                            <div className="space-x-2">
                              <button
                                onClick={() => navigate(`/products/edit/${product._id}`)}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                disabled={deleteProductMutation.isPending}
                              >
                                <Edit2 className="h-4 w-4 inline-block" /> Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product._id)}
                                className="text-red-600 hover:text-red-700 text-sm font-medium"
                                disabled={deleteProductMutation.isPending}
                              >
                                <Trash2 className="h-4 w-4 inline-block" /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          defaultValue={user.firstName}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          defaultValue={user.lastName}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        defaultValue={user.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        name="bio"
                        rows={4}
                        placeholder="Tell us about yourself..."
                        defaultValue={user.bio}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={updateProfileMutation.isPending}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {updateProfileMutation.isPending ? 'Updating...' : 'Update Profile'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
