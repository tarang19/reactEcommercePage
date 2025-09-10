import { useEffect } from 'react';
import { useContentStore } from '../store/useContentStore';
import { PricingOption, SortOption } from '../types';

export const useUrlState = () => {
  const { filters, updateFilters } = useContentStore();

  // Load state from URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    const pricingOptions = urlParams.get('pricing')?.split(',').map(Number).filter(n => !isNaN(n)) as PricingOption[] || [];
    const keyword = urlParams.get('keyword') || '';
    const sortBy = urlParams.get('sort') as SortOption || SortOption.ITEM_NAME;
    const minPrice = Number(urlParams.get('minPrice')) || 0;
    const maxPrice = Number(urlParams.get('maxPrice')) || 999;

    updateFilters({
      pricingOptions,
      keyword,
      sortBy,
      priceRange: [minPrice, maxPrice],
    });
  }, [updateFilters]);

  // Update URL when filters change
  useEffect(() => {
    const urlParams = new URLSearchParams();
    
    if (filters.pricingOptions.length > 0) {
      urlParams.set('pricing', filters.pricingOptions.join(','));
    }
    if (filters.keyword) {
      urlParams.set('keyword', filters.keyword);
    }
    if (filters.sortBy !== SortOption.ITEM_NAME) {
      urlParams.set('sort', filters.sortBy);
    }
    if (filters.priceRange[0] !== 0) {
      urlParams.set('minPrice', filters.priceRange[0].toString());
    }
    if (filters.priceRange[1] !== 999) {
      urlParams.set('maxPrice', filters.priceRange[1].toString());
    }

    const newUrl = urlParams.toString() 
      ? `${window.location.pathname}?${urlParams.toString()}` 
      : window.location.pathname;
    
    window.history.replaceState({}, '', newUrl);
  }, [filters]);
};