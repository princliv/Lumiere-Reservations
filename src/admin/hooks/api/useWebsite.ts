import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRestaurant } from '../../../context/RestaurantContext';
import * as homepageService from '../../../services/homepage';
import * as websiteService from '../../../services/website';
import type { BrandSettings, HomepageSectionType } from '../../../types';

export function useHomepageDraft() {
  const { restaurantId } = useRestaurant();
  return useQuery({
    queryKey: ['admin-homepage-draft', restaurantId],
    queryFn: () => homepageService.getHomepage(restaurantId, 'draft'),
  });
}

export function useReorderSections() {
  const { restaurantId } = useRestaurant();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (order: { sectionId: string; order: number }[]) =>
      homepageService.reorderHomepageSections(restaurantId, order),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-homepage-draft', restaurantId] }),
  });
}

export function useUpdateSection() {
  const { restaurantId } = useRestaurant();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ type, payload }: { type: HomepageSectionType; payload: { visible?: boolean; content?: Record<string, unknown> } }) =>
      homepageService.updateHomepageSection(restaurantId, type, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-homepage-draft', restaurantId] }),
  });
}

export function useBrandDraft() {
  const { restaurantId } = useRestaurant();
  return useQuery({
    queryKey: ['admin-brand-draft', restaurantId],
    queryFn: () => websiteService.getBrandSettings(restaurantId, 'draft'),
  });
}

export function useUpdateBrand() {
  const { restaurantId } = useRestaurant();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<BrandSettings>) => websiteService.updateBrandSettings(restaurantId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-brand-draft', restaurantId] }),
  });
}

export function useWebsiteStatus() {
  const { restaurantId } = useRestaurant();
  return useQuery({
    queryKey: ['admin-website-status', restaurantId],
    queryFn: () => websiteService.getWebsiteSettings(restaurantId, 'draft'),
  });
}

export function usePublishWebsite() {
  const { restaurantId } = useRestaurant();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => websiteService.publishWebsite(restaurantId),
    onSuccess: () => queryClient.invalidateQueries(),
  });
}
