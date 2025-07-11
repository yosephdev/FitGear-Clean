import React from 'react';

const ProductSkeleton = ({ viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 flex space-x-4 animate-pulse">
        <div className="w-24 h-24 bg-gray-300 rounded-md"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-elevated product-card animate-pulse">
      <div className="w-full h-64 bg-gray-300"></div>
      <div className="p-4 space-y-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
