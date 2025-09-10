import React from 'react';
import { Search } from 'lucide-react';
import { useContentStore } from '../store/useContentStore';

export const SearchBar: React.FC = () => {
  const { filters, updateFilters } = useContentStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ keyword: e.target.value });
  };

  return (
    <div className="relative mb-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Find the items you're looking for"
          value={filters.keyword}
          onChange={handleSearch}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />
      </div>
    </div>
  );
};