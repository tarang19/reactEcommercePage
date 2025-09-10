import { renderHook, act } from '@testing-library/react';
import { useContentStore } from '../useContentStore';
import { ContentItem, PricingOption, SortOption } from '../../types';

describe('useContentStore', () => {
  const mockItems: ContentItem[] = [
    {
      id: '1',
      imagePath: 'image1.jpg',
      creator: 'Adam',
      title: 'Yellow coat',
      pricingOption: PricingOption.PAID,
      price: 50,
    },
    {
      id: '2',
      imagePath: 'image2.jpg',
      creator: 'Benny',
      title: 'Brown Anorak',
      pricingOption: PricingOption.FREE,
    },
    {
      id: '3',
      imagePath: 'image3.jpg',
      creator: 'Catlin',
      title: 'Mini bag',
      pricingOption: PricingOption.VIEW_ONLY,
    },
  ];

  beforeEach(() => {
    useContentStore.getState().resetFilters();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useContentStore());
    
    expect(result.current.items).toEqual([]);
    expect(result.current.filteredItems).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.filters.pricingOptions).toEqual([]);
    expect(result.current.filters.keyword).toBe('');
    expect(result.current.filters.sortBy).toBe(SortOption.ITEM_NAME);
  });

  it('sets items and applies filters', () => {
    const { result } = renderHook(() => useContentStore());
    
    act(() => {
      result.current.setItems(mockItems);
    });
    
    expect(result.current.items).toEqual(mockItems);
    expect(result.current.filteredItems).toEqual(mockItems);
  });

  it('filters by pricing option', () => {
    const { result } = renderHook(() => useContentStore());
    
    act(() => {
      result.current.setItems(mockItems);
      result.current.updateFilters({ pricingOptions: [PricingOption.PAID] });
    });
    
    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].pricingOption).toBe(PricingOption.PAID);
  });

  it('filters by keyword', () => {
    const { result } = renderHook(() => useContentStore());
    
    act(() => {
      result.current.setItems(mockItems);
      result.current.updateFilters({ keyword: 'Adam' });
    });
    
    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].creator).toBe('Adam');
  });

  it('sorts by higher price', () => {
    const { result } = renderHook(() => useContentStore());
    
    const itemsWithPrices = [
      { ...mockItems[0], price: 100 },
      { ...mockItems[1], pricingOption: PricingOption.PAID, price: 50 },
    ];
    
    act(() => {
      result.current.setItems(itemsWithPrices);
      result.current.updateFilters({ sortBy: SortOption.HIGHER_PRICE });
    });
    
    expect(result.current.filteredItems[0].price).toBe(100);
    expect(result.current.filteredItems[1].price).toBe(50);
  });

  it('resets filters to default state', () => {
    const { result } = renderHook(() => useContentStore());
    
    act(() => {
      result.current.setItems(mockItems);
      result.current.updateFilters({ 
        pricingOptions: [PricingOption.PAID], 
        keyword: 'test' 
      });
    });
    
    expect(result.current.filters.pricingOptions).toEqual([PricingOption.PAID]);
    
    act(() => {
      result.current.resetFilters();
    });
    
    expect(result.current.filters.pricingOptions).toEqual([]);
    expect(result.current.filters.keyword).toBe('');
  });
});