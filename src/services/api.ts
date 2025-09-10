import { ContentItem, PricingOption } from '../types';

const API_URL = 'https://closet-recruiting-api.azurewebsites.net/api/data';

export interface ApiResponse {
  id: string;
  imagePath: string;
  creator: string;
  title: string;
  pricingOption: number;
  price?: number;
}

export const fetchContentItems = async (): Promise<ContentItem[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const data: ApiResponse[] = await response.json();
    
    return data.map((item) => ({
      id: item.id,
      imagePath: item.imagePath,
      creator: item.creator,
      title: item.title,
      pricingOption: item.pricingOption as PricingOption,
      price: item.price,
    }));
  } catch (error) {
    console.error('Error fetching content items:', error);
    throw error;
  }
};