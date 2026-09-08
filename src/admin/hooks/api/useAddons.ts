import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRestaurant } from '../../../context/RestaurantContext';
import * as addonService from '../../../services/addons';
import type { Addon } from '../../../types';

export function useAddons() {
  const { restaurantId } = useRestaurant();
  return useQuery({ queryKey: ['admin-addons', restaurantId], queryFn: () => addonService.getAddons(restaurantId) });
}

function useInvalidateAddons() {
  const { restaurantId } = useRestaurant();
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['admin-addons', restaurantId] });
}

export function useCreateAddon() {
  const { restaurantId } = useRestaurant();
  const invalidate = useInvalidateAddons();
  return useMutation({
    mutationFn: (payload: Partial<Addon>) => addonService.createAddon(restaurantId, payload),
    onSuccess: invalidate,
  });
}

export function useUpdateAddon() {
  const { restaurantId } = useRestaurant();
  const invalidate = useInvalidateAddons();
  return useMutation({
    mutationFn: ({ addonId, payload }: { addonId: string; payload: Partial<Addon> }) =>
      addonService.updateAddon(restaurantId, addonId, payload),
    onSuccess: invalidate,
  });
}

export function useDeleteAddon() {
  const { restaurantId } = useRestaurant();
  const invalidate = useInvalidateAddons();
  return useMutation({
    mutationFn: (addonId: string) => addonService.deleteAddon(restaurantId, addonId),
    onSuccess: invalidate,
  });
}
