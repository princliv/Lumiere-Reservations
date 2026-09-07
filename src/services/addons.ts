import { http } from './http';
import type { Addon } from '../types';

export const getAddons = (restaurantId: string) => http.get<Addon[]>(`/restaurants/${restaurantId}/addons`);

export const createAddon = (restaurantId: string, payload: Partial<Addon>) =>
  http.post<Addon>(`/restaurants/${restaurantId}/addons`, payload);

export const updateAddon = (restaurantId: string, addonId: string, payload: Partial<Addon>) =>
  http.put<Addon>(`/restaurants/${restaurantId}/addons/${addonId}`, payload);

export const deleteAddon = (restaurantId: string, addonId: string) =>
  http.delete<{ message: string }>(`/restaurants/${restaurantId}/addons/${addonId}`);
