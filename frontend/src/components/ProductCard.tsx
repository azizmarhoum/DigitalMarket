
import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
  author: string;
}

const ProductCard = ({ 
  id, 
  title, 
  category, 
  price, 
  thumbnail, 
  author 
}: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
        {/* Thumbnail */}
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-gray-500 mb-3">by {author}</p>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              ${price}
            </span>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
