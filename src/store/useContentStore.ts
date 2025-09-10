import { create } from 'zustand';
import { ContentItem, FilterState, PricingOption, SortOption } from '../types';

interface ContentStore {
  items: ContentItem[];
  filteredItems: ContentItem[];
  loading: boolean;
  hasMore: boolean;
  page: number;
  filters: FilterState;
  
  // Actions
  setItems: (items: ContentItem[]) => void;
  setLoading: (loading: boolean) => void;
  setHasMore: (hasMore: boolean) => void;
  setPage: (page: number) => void;
  updateFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  applyFilters: () => void;
  loadMore: () => void;
}

const defaultFilters: FilterState = {
  pricingOptions: [],
  keyword: '',
  sortBy: SortOption.ITEM_NAME,
  priceRange: [0, 999],
};

export const useContentStore = create<ContentStore>((set, get) => ({
  items: [],
  filteredItems: [],
  loading: false,
  hasMore: true,
  page: 1,
  filters: defaultFilters,

  setItems: (items) => {
    set({ items });
    get().applyFilters();
  },

  setLoading: (loading) => set({ loading }),
  setHasMore: (hasMore) => set({ hasMore }),
  setPage: (page) => set({ page }),

  updateFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    }));
    get().applyFilters();
  },

  resetFilters: () => {
    set({ filters: defaultFilters });
    get().applyFilters();
  },

  applyFilters: () => {
    const { items, filters } = get();
    let filtered = [...items];

    // Apply pricing filter
    if (filters.pricingOptions.length > 0) {
      filtered = filtered.filter(item => 
        filters.pricingOptions.includes(item.pricingOption)
      );
    }

    // Apply keyword search
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filtered = filtered.filter(item => 
        item.creator.toLowerCase().includes(keyword) ||
        item.title.toLowerCase().includes(keyword)
      );
    }

    // Apply price range filter (only for paid items)
    filtered = filtered.filter(item => {
      if (item.pricingOption === PricingOption.PAID && item.price !== undefined) {
        const minPrice = Math.min(filters.priceRange[0], filters.priceRange[1]);
        const maxPrice = Math.max(filters.priceRange[0], filters.priceRange[1]);
        return item.price >= minPrice && item.price <= maxPrice;
      }
      return true;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case SortOption.ITEM_NAME:
          return a.title.localeCompare(b.title);
        case SortOption.HIGHER_PRICE:
          const priceA = a.pricingOption === PricingOption.PAID ? (a.price || 0) : 0;
          const priceB = b.pricingOption === PricingOption.PAID ? (b.price || 0) : 0;
          return priceB - priceA;
        case SortOption.LOWER_PRICE:
          const priceA2 = a.pricingOption === PricingOption.PAID ? (a.price || 0) : 0;
          const priceB2 = b.pricingOption === PricingOption.PAID ? (b.price || 0) : 0;
          return priceA2 - priceB2;
        default:
          return 0;
      }
    });

    set({ filteredItems: filtered });
  },

  loadMore: () => {
    const { page } = get();
    set({ page: page + 1 });
  },
}));