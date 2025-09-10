import React from 'react';
import { ContentItem, PricingOption } from '../types';

interface ContentCardProps {
  item: ContentItem;
}

export const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  const getPricingLabel = () => {
    switch (item.pricingOption) {
      case PricingOption.PAID:
        return <span className="text-blue-400 font-semibold">${item.price}</span>;
      case PricingOption.FREE:
        return <span className="text-green-400 font-semibold">FREE</span>;
      case PricingOption.VIEW_ONLY:
        return <span className="text-gray-400 font-semibold">View Only</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-200 hover:shadow-xl">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={item.imagePath}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="text-white font-medium text-sm truncate">{item.title}</h3>
            <p className="text-gray-400 text-xs">{item.creator}</p>
          </div>
          <div className="ml-2">
            {getPricingLabel()}
          </div>
        </div>
      </div>
    </div>
  );
};