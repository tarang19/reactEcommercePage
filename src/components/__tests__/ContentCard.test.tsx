import { render, screen } from '@testing-library/react';
import { ContentCard } from '../ContentCard';
import { ContentItem, PricingOption } from '../../types';

describe('ContentCard', () => {
  const mockPaidItem: ContentItem = {
    id: 'test-1',
    imagePath: 'https://example.com/image.jpg',
    creator: 'Test Creator',
    title: 'Test Item',
    pricingOption: PricingOption.PAID,
    price: 50,
  };

  const mockFreeItem: ContentItem = {
    id: 'test-2',
    imagePath: 'https://example.com/image2.jpg',
    creator: 'Free Creator',
    title: 'Free Item',
    pricingOption: PricingOption.FREE,
  };

  const mockViewOnlyItem: ContentItem = {
    id: 'test-3',
    imagePath: 'https://example.com/image3.jpg',
    creator: 'View Creator',
    title: 'View Only Item',
    pricingOption: PricingOption.VIEW_ONLY,
  };

  it('renders paid item with price', () => {
    render(<ContentCard item={mockPaidItem} />);
    
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('Test Creator')).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();
  });

  it('renders free item with FREE label', () => {
    render(<ContentCard item={mockFreeItem} />);
    
    expect(screen.getByText('Free Item')).toBeInTheDocument();
    expect(screen.getByText('Free Creator')).toBeInTheDocument();
    expect(screen.getByText('FREE')).toBeInTheDocument();
  });

  it('renders view only item with View Only label', () => {
    render(<ContentCard item={mockViewOnlyItem} />);
    
    expect(screen.getByText('View Only Item')).toBeInTheDocument();
    expect(screen.getByText('View Creator')).toBeInTheDocument();
    expect(screen.getByText('View Only')).toBeInTheDocument();
  });

  it('renders image with correct src and alt', () => {
    render(<ContentCard item={mockPaidItem} />);
    
    const image = screen.getByAltText('Test Item');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });
});