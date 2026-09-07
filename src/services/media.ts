import { http } from './http';
import type { MediaAsset, MediaType, MediaFolder, Paginated } from '../types';

export const getMedia = (
  restaurantId: string,
  params: { type?: MediaType; folder?: MediaFolder; search?: string; page?: number } = {},
) => {
  const qs = new URLSearchParams();
  if (params.type) qs.set('type', params.type);
  if (params.folder) qs.set('folder', params.folder);
  if (params.search) qs.set('search', params.search);
  if (params.page) qs.set('page', String(params.page));
  return http.get<Paginated<MediaAsset>>(`/restaurants/${restaurantId}/media?${qs.toString()}`);
};

export const uploadMedia = (
  restaurantId: string,
  file: File,
  opts: { altText?: string; folder?: MediaFolder } = {},
) => {
  const form = new FormData();
  form.append('file', file);
  if (opts.altText) form.append('altText', opts.altText);
  if (opts.folder) form.append('folder', opts.folder);
  return http.post<MediaAsset>(`/restaurants/${restaurantId}/media`, form);
};

export const deleteMedia = (restaurantId: string, mediaId: string) =>
  http.delete<{ message: string }>(`/restaurants/${restaurantId}/media/${mediaId}`);
