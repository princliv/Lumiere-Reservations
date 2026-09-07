import { http } from './http';
import type { Offer } from '../types';

export const getOffers = (restaurantId: string) => http.get<Offer[]>(`/restaurants/${restaurantId}/offers`);

export const createOffer = (restaurantId: string, payload: Partial<Offer>) =>
  http.post<Offer>(`/restaurants/${restaurantId}/offers`, payload);

export const updateOffer = (restaurantId: string, offerId: string, payload: Partial<Offer>) =>
  http.put<Offer>(`/restaurants/${restaurantId}/offers/${offerId}`, payload);

export const deleteOffer = (restaurantId: string, offerId: string) =>
  http.delete<{ message: string }>(`/restaurants/${restaurantId}/offers/${offerId}`);
