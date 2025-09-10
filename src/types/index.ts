export enum PricingOption {
  PAID = 0,
  FREE = 1,
  VIEW_ONLY = 2,
}

export interface ContentItem {
  id: string;
  imagePath: string;
  creator: string;
  title: string;
  pricingOption: PricingOption;
  price?: number;
}

export interface FilterState {
  pricingOptions: PricingOption[];
  keyword: string;
  sortBy: SortOption;
  priceRange: [number, number];
}

export enum SortOption {
  ITEM_NAME = 'itemName',
  HIGHER_PRICE = 'higherPrice',
  LOWER_PRICE = 'lowerPrice',
}