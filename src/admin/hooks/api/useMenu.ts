import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRestaurant } from '../../../context/RestaurantContext';
import * as menuService from '../../../services/menu';
import type { MenuCategory, MenuItem } from '../../../types';

export function useMenu() {
  const { restaurantId } = useRestaurant();
  return useQuery({ queryKey: ['admin-menu', restaurantId], queryFn: () => menuService.getMenu(restaurantId) });
}

function useInvalidateMenu() {
  const { restaurantId } = useRestaurant();
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['admin-menu', restaurantId] });
}

export function useCreateCategory() {
  const { restaurantId } = useRestaurant();
  const invalidate = useInvalidateMenu();
  return useMutation({
    mutationFn: (payload: Partial<MenuCategory>) => menuService.createCategory(restaurantId, payload),
    onSuccess: invalidate,
  });
}

export function useUpdateCategory() {
  const { restaurantId } = useRestaurant();
  const invalidate = useInvalidateMenu();
  return useMutation({
    mutationFn: ({ categoryId, payload }: { categoryId: string; payload: Partial<MenuCategory> }) =>
      menuService.updateCategory(restaurantId, categoryId, payload),
    onSuccess: invalidate,
  });
}

export function useDeleteCategory() {
  const { restaurantId } = useRestaurant();
  const invalidate = useInvalidateMenu();
  return useMutation({
    mutationFn: (categoryId: string) => menuService.deleteCategory(restaurantId, categoryId),
    onSuccess: invalidate,
  });
}

export function useReorderCategories() {
  const { restaurantId } = useRestaurant();
  const invalidate = useInvalidateMenu();
  return useMutation({
    mutationFn: (order: { id: string; displayOrder: number }[]) => menuService.reorderCategories(restaurantId, order),
    onSuccess: invalidate,
  });
}

export function useCreateMenuItem() {
  const { restaurantId } = useRestaurant();
  const invalidate = useInvalidateMenu();
  return useMutation({
    mutationFn: (payload: Partial<MenuItem>) => menuService.createMenuItem(restaurantId, payload),
    onSuccess: invalidate,
  });
}

export function useUpdateMenuItem() {
  const { restaurantId } = useRestaurant();
  const invalidate = useInvalidateMenu();
  return useMutation({
    mutationFn: ({ itemId, payload }: { itemId: string; payload: Partial<MenuItem> }) =>
      menuService.updateMenuItem(restaurantId, itemId, payload),
    onSuccess: invalidate,
  });
}

export function useSetItemAvailability() {
  const { restaurantId } = useRestaurant();
  const invalidate = useInvalidateMenu();
  return useMutation({
    mutationFn: ({ itemId, isAvailable }: { itemId: string; isAvailable: boolean }) =>
      menuService.setItemAvailability(restaurantId, itemId, isAvailable),
    onSuccess: invalidate,
  });
}

export function useDeleteMenuItem() {
  const { restaurantId } = useRestaurant();
  const invalidate = useInvalidateMenu();
  return useMutation({
    mutationFn: (itemId: string) => menuService.deleteMenuItem(restaurantId, itemId),
    onSuccess: invalidate,
  });
}

export function useReorderMenuItems() {
  const { restaurantId } = useRestaurant();
  const invalidate = useInvalidateMenu();
  return useMutation({
    mutationFn: (order: { id: string; displayOrder: number }[]) => menuService.reorderMenuItems(restaurantId, order),
    onSuccess: invalidate,
  });
}
