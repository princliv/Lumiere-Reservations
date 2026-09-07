import { http } from './http';
import type { MenuCategory, MenuItem } from '../types';

export const getMenu = (restaurantId: string) =>
  http.get<{ categories: MenuCategory[]; items: MenuItem[] }>(`/restaurants/${restaurantId}/menu`);

export const createCategory = (restaurantId: string, payload: Partial<MenuCategory>) =>
  http.post<MenuCategory>(`/restaurants/${restaurantId}/menu/categories`, payload);

export const updateCategory = (restaurantId: string, categoryId: string, payload: Partial<MenuCategory>) =>
  http.put<MenuCategory>(`/restaurants/${restaurantId}/menu/categories/${categoryId}`, payload);

export const deleteCategory = (restaurantId: string, categoryId: string) =>
  http.delete<{ message: string }>(`/restaurants/${restaurantId}/menu/categories/${categoryId}`);

export const reorderCategories = (restaurantId: string, order: { id: string; displayOrder: number }[]) =>
  http.put<MenuCategory[]>(`/restaurants/${restaurantId}/menu/categories/order`, { order });

export const createMenuItem = (restaurantId: string, payload: Partial<MenuItem>) =>
  http.post<MenuItem>(`/restaurants/${restaurantId}/menu/items`, payload);

export const updateMenuItem = (restaurantId: string, itemId: string, payload: Partial<MenuItem>) =>
  http.put<MenuItem>(`/restaurants/${restaurantId}/menu/items/${itemId}`, payload);

export const setItemAvailability = (restaurantId: string, itemId: string, isAvailable: boolean) =>
  http.patch<MenuItem>(`/restaurants/${restaurantId}/menu/items/${itemId}/availability`, { isAvailable });

export const deleteMenuItem = (restaurantId: string, itemId: string) =>
  http.delete<{ message: string }>(`/restaurants/${restaurantId}/menu/items/${itemId}`);

export const reorderMenuItems = (restaurantId: string, order: { id: string; displayOrder: number }[]) =>
  http.put<MenuItem[]>(`/restaurants/${restaurantId}/menu/items/order`, { order });
