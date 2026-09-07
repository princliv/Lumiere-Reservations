import { http } from './http';
import type { User } from '../types';

export const getUsers = (restaurantId: string) => http.get<User[]>(`/restaurants/${restaurantId}/users`);

export const createUser = (restaurantId: string, payload: Partial<User>) =>
  http.post<User>(`/restaurants/${restaurantId}/users`, payload);

export const updateUser = (restaurantId: string, userId: string, payload: Partial<User>) =>
  http.put<User>(`/restaurants/${restaurantId}/users/${userId}`, payload);

export const deleteUser = (restaurantId: string, userId: string) =>
  http.delete<{ message: string }>(`/restaurants/${restaurantId}/users/${userId}`);
