import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRestaurant } from '../../../context/RestaurantContext';
import * as mediaService from '../../../services/media';
import type { MediaFolder, MediaType } from '../../../types';

export function useMedia(params: { type?: MediaType; folder?: MediaFolder; search?: string } = {}) {
  const { restaurantId } = useRestaurant();
  return useQuery({
    queryKey: ['admin-media', restaurantId, params],
    queryFn: () => mediaService.getMedia(restaurantId, params),
  });
}

export function useUploadMedia() {
  const { restaurantId } = useRestaurant();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, opts }: { file: File; opts?: { altText?: string; folder?: MediaFolder } }) =>
      mediaService.uploadMedia(restaurantId, file, opts),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-media', restaurantId] }),
  });
}

export function useDeleteMedia() {
  const { restaurantId } = useRestaurant();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (mediaId: string) => mediaService.deleteMedia(restaurantId, mediaId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-media', restaurantId] }),
  });
}
