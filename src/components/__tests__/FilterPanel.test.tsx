import { render, screen, fireEvent } from '@testing-library/react';
import { FilterPanel } from '../FilterPanel';
import { useContentStore } from '../../store/useContentStore';
import { PricingOption, SortOption } from '../../types';

vi.mock('../../store/useContentStore');

describe('FilterPanel', () => {
  const mockUpdateFilters = vi.fn();
  const mockResetFilters = vi.fn();

  beforeEach(() => {
    vi.mocked(useContentStore).mockReturnValue({
      filters: {
        pricingOptions: [],
        keyword: '',
        sortBy: SortOption.ITEM_NAME,
        priceRange: [0, 999] as [number, number],
      },
      updateFilters: mockUpdateFilters,
      resetFilters: mockResetFilters,
    } as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders all pricing option checkboxes', () => {
    render(<FilterPanel />);
    
    expect(screen.getByLabelText('Paid')).toBeInTheDocument();
    expect(screen.getByLabelText('Free')).toBeInTheDocument();
    expect(screen.getByLabelText('View Only')).toBeInTheDocument();
  });

  it('calls updateFilters when pricing option is selected', () => {
    render(<FilterPanel />);
    
    const paidCheckbox = screen.getByLabelText('Paid');
    fireEvent.click(paidCheckbox);
    
    expect(mockUpdateFilters).toHaveBeenCalledWith({
      pricingOptions: [PricingOption.PAID]
    });
  });

  it('calls resetFilters when reset button is clicked', () => {
    render(<FilterPanel />);
    
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    
    expect(mockResetFilters).toHaveBeenCalled();
  });

  it('renders sorting dropdown with correct options', () => {
    render(<FilterPanel />);
    
    const sortSelect = screen.getByDisplayValue('Item Name');
    expect(sortSelect).toBeInTheDocument();
    
    fireEvent.click(sortSelect);
    expect(screen.getByText('Higher Price')).toBeInTheDocument();
    expect(screen.getByText('Lower Price')).toBeInTheDocument();
  });

  it('price slider is disabled when Paid is not selected', () => {
    render(<FilterPanel />);
    
    const sliders = screen.getAllByRole('slider');
    sliders.forEach(slider => {
      expect(slider).toBeDisabled();
    });
  });

  it('price slider is enabled when Paid is selected', () => {
    vi.mocked(useContentStore).mockReturnValue({
      filters: {
        pricingOptions: [PricingOption.PAID],
        keyword: '',
        sortBy: SortOption.ITEM_NAME,
        priceRange: [0, 999] as [number, number],
      },
      updateFilters: mockUpdateFilters,
      resetFilters: mockResetFilters,
    } as any);

    render(<FilterPanel />);
    
    const sliders = screen.getAllByRole('slider');
    sliders.forEach(slider => {
      expect(slider).not.toBeDisabled();
    });
  });
});