import { http } from './http';
import type { BrandSettings, WebsiteSettings, PublishStatus } from '../types';

export const getWebsiteSettings = (restaurantId: string, version: PublishStatus = 'published') =>
  http.get<WebsiteSettings>(`/restaurants/${restaurantId}/website?version=${version}`);

export const updateWebsiteSettings = (restaurantId: string, payload: Partial<WebsiteSettings>) =>
  http.put<WebsiteSettings>(`/restaurants/${restaurantId}/website`, payload);

export const getBrandSettings = (restaurantId: string, version: PublishStatus = 'published') =>
  http.get<BrandSettings>(`/restaurants/${restaurantId}/brand?version=${version}`);

export const updateBrandSettings = (restaurantId: string, payload: Partial<BrandSettings>) =>
  http.put<BrandSettings>(`/restaurants/${restaurantId}/brand`, payload);

export const publishWebsite = (restaurantId: string) =>
  http.post<{ publishedAt: string; message: string }>(`/restaurants/${restaurantId}/publish`);
