import React from 'react';
import { ChevronDown, RotateCcw } from 'lucide-react';
import { useContentStore } from '../store/useContentStore';
import { PricingOption, SortOption } from '../types';

export const FilterPanel: React.FC = () => {
  const { filters, updateFilters, resetFilters } = useContentStore();

  const handlePricingChange = (option: PricingOption) => {
    const newOptions = filters.pricingOptions.includes(option)
      ? filters.pricingOptions.filter(o => o !== option)
      : [...filters.pricingOptions, option];
    
    updateFilters({ pricingOptions: newOptions });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ sortBy: e.target.value as SortOption });
  };

const handlePriceRangeChange = (index: number, value: number) => {
  let newRange: [number, number] = [...filters.priceRange];
  newRange[index] = value;

  // Prevent min from exceeding max and vice versa
  if (index === 0 && value > newRange[1]) {
    newRange[1] = value;
  }
  if (index === 1 && value < newRange[0]) {
    newRange[0] = value;
  }

  updateFilters({ priceRange: newRange });
};

  const isPaidSelected = filters.pricingOptions.includes(PricingOption.PAID);

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      {/* Contents Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-medium flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Contents Filter
          </h3>
          <button
            onClick={resetFilters}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
        
        <div className="space-y-3">
          <label className="flex items-center text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.pricingOptions.includes(PricingOption.PAID)}
              onChange={() => handlePricingChange(PricingOption.PAID)}
              className="mr-3 w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
            />
            Paid
          </label>
          <label className="flex items-center text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.pricingOptions.includes(PricingOption.FREE)}
              onChange={() => handlePricingChange(PricingOption.FREE)}
              className="mr-3 w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
            />
            Free
          </label>
          <label className="flex items-center text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.pricingOptions.includes(PricingOption.VIEW_ONLY)}
              onChange={() => handlePricingChange(PricingOption.VIEW_ONLY)}
              className="mr-3 w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
            />
            View Only
          </label>
        </div>
      </div>

      {/* Pricing Slider */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-4">Pricing Range</h4>
        <div className={`${!isPaidSelected ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">${filters.priceRange[0]}</span>
            <span className="text-gray-400 text-sm">${filters.priceRange[1]}</span>
          </div>
          <div className="space-y-2">
            <div className="text-xs text-gray-500">Min: ${filters.priceRange[0]}</div>
            <input
              type="range"
              min="0"
              max="999"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              disabled={!isPaidSelected}
            />
            <div className="text-xs text-gray-500">Max: ${filters.priceRange[1]}</div>
            <input
              type="range"
              min="0"
              max="999"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              disabled={!isPaidSelected}
            />
          </div>
        </div>
      </div>

      {/* Sorting */}
      <div>
        <h4 className="text-white font-medium mb-4">Sort By</h4>
        <div className="relative">
          <select
            value={filters.sortBy}
            onChange={handleSortChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
          >
            <option value={SortOption.ITEM_NAME}>Item Name</option>
            <option value={SortOption.HIGHER_PRICE}>Higher Price</option>
            <option value={SortOption.LOWER_PRICE}>Lower Price</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};