import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-700"></div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-2/3"></div>
          </div>
          <div className="w-12 h-4 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};