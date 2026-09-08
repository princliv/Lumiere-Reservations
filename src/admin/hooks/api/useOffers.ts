import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRestaurant } from '../../../context/RestaurantContext';
import * as offerService from '../../../services/offers';
import type { Offer } from '../../../types';

export function useOffers() {
  const { restaurantId } = useRestaurant();
  return useQuery({ queryKey: ['admin-offers', restaurantId], queryFn: () => offerService.getOffers(restaurantId) });
}

function useInvalidateOffers() {
  const { restaurantId } = useRestaurant();
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['admin-offers', restaurantId] });
}

export function useCreateOffer() {
  const { restaurantId } = useRestaurant();
  const invalidate = useInvalidateOffers();
  return useMutation({
    mutationFn: (payload: Partial<Offer>) => offerService.createOffer(restaurantId, payload),
    onSuccess: invalidate,
  });
}

export function useUpdateOffer() {
  const { restaurantId } = useRestaurant();
  const invalidate = useInvalidateOffers();
  return useMutation({
    mutationFn: ({ offerId, payload }: { offerId: string; payload: Partial<Offer> }) =>
      offerService.updateOffer(restaurantId, offerId, payload),
    onSuccess: invalidate,
  });
}

export function useDeleteOffer() {
  const { restaurantId } = useRestaurant();
  const invalidate = useInvalidateOffers();
  return useMutation({
    mutationFn: (offerId: string) => offerService.deleteOffer(restaurantId, offerId),
    onSuccess: invalidate,
  });
}
