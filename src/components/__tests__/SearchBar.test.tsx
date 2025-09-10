import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';
import { useContentStore } from '../../store/useContentStore';

// Mock the store
vi.mock('../../store/useContentStore');

describe('SearchBar', () => {
  const mockUpdateFilters = vi.fn();

  beforeEach(() => {
    vi.mocked(useContentStore).mockReturnValue({
      filters: { keyword: '', pricingOptions: [], sortBy: 'itemName', priceRange: [0, 999] },
      updateFilters: mockUpdateFilters,
    } as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input with placeholder', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText("Find the items you're looking for")).toBeInTheDocument();
  });

  it('calls updateFilters when typing in search input', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Find the items you're looking for");
    
    fireEvent.change(input, { target: { value: 'test search' } });
    
    expect(mockUpdateFilters).toHaveBeenCalledWith({ keyword: 'test search' });
  });

  it('displays current keyword value', () => {
    vi.mocked(useContentStore).mockReturnValue({
      filters: { keyword: 'existing search', pricingOptions: [], sortBy: 'itemName', priceRange: [0, 999] },
      updateFilters: mockUpdateFilters,
    } as any);

    render(<SearchBar />);
    const input = screen.getByDisplayValue('existing search');
    expect(input).toBeInTheDocument();
  });
});