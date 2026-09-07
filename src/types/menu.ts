import type { Id, SoftDeletable, Tenant, Timestamps, ISODateString } from './common';

export interface MenuCategory extends Tenant, Timestamps, SoftDeletable {
  id: Id;
  name: string;
  description?: string;
  imageMediaId?: Id | null;
  displayOrder: number;
  isVisible: boolean;
}

export interface MenuItemVariant {
  id: Id;
  name: string;
  price: number;
  isDefault: boolean;
}

export type FoodType = 'veg' | 'non_veg' | 'vegan' | 'na';

export interface MenuItem extends Tenant, Timestamps, SoftDeletable {
  id: Id;
  categoryId: Id;
  name: string;
  description: string;
  price: number;
  imageMediaId: Id | null;
  imageUrl?: string;
  foodType: FoodType;
  tags: string[];
  prepTimeMinutes?: number;
  rating?: number;
  reviewCount?: number;
  isAvailable: boolean;
  isFeatured: boolean;
  displayOrder: number;
  variants: MenuItemVariant[];
  addonIds: Id[];
  activeOfferId?: Id | null;
}

export interface Addon extends Tenant, Timestamps {
  id: Id;
  name: string;
  price: number;
  description?: string;
  isVeg?: boolean;
  isAvailable: boolean;
  /** Presentational grouping for the customize-dish picker (e.g. "Beverages"); optional, admin-editable. */
  group?: string;
  groupSelection?: 'single' | 'multiple';
}

export type OfferType = 'percentage' | 'fixed' | 'special_price' | 'bogo';

export interface Offer extends Tenant, Timestamps {
  id: Id;
  name: string;
  type: OfferType;
  discountValue?: number;
  specialPrice?: number;
  startDate: ISODateString;
  endDate: ISODateString;
  isActive: boolean;
  appliesToItemIds: Id[];
  appliesToCategoryIds: Id[];
  cta?: string;
  imageMediaId?: Id | null;
}
