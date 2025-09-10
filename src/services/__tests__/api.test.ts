import { fetchContentItems } from '../api';
import { PricingOption } from '../../types';

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches and transforms content items successfully', async () => {
    const mockApiResponse = [
      {
        id: 'content-001',
        creator: 'Adam',
        title: 'Yellow green coat',
        pricingOption: 0,
        imagePath: 'https://example.com/image1.jpg',
        price: 50,
      },
      {
        id: 'content-002',
        creator: 'Benny',
        title: 'Brown Anorak',
        pricingOption: 1,
        imagePath: 'https://example.com/image2.jpg',
        price: 30,
      },
    ];

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    } as Response);

    const result = await fetchContentItems();

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 'content-001',
      creator: 'Adam',
      title: 'Yellow green coat',
      pricingOption: PricingOption.PAID,
      imagePath: 'https://example.com/image1.jpg',
      price: 50,
    });
  });

  it('throws error when fetch fails', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    await expect(fetchContentItems()).rejects.toThrow('Failed to fetch data');
  });

  it('throws error when network request fails', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchContentItems()).rejects.toThrow('Network error');
  });
});