import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRestaurant } from '../../../context/RestaurantContext';
import * as userService from '../../../services/users';
import type { User } from '../../../types';

export function useUsers() {
  const { restaurantId } = useRestaurant();
  return useQuery({ queryKey: ['admin-users', restaurantId], queryFn: () => userService.getUsers(restaurantId) });
}

function useInvalidateUsers() {
  const { restaurantId } = useRestaurant();
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['admin-users', restaurantId] });
}

export function useCreateUser() {
  const { restaurantId } = useRestaurant();
  const invalidate = useInvalidateUsers();
  return useMutation({
    mutationFn: (payload: Partial<User>) => userService.createUser(restaurantId, payload),
    onSuccess: invalidate,
  });
}

export function useUpdateUser() {
  const { restaurantId } = useRestaurant();
  const invalidate = useInvalidateUsers();
  return useMutation({
    mutationFn: ({ userId, payload }: { userId: string; payload: Partial<User> }) =>
      userService.updateUser(restaurantId, userId, payload),
    onSuccess: invalidate,
  });
}

export function useDeleteUser() {
  const { restaurantId } = useRestaurant();
  const invalidate = useInvalidateUsers();
  return useMutation({
    mutationFn: (userId: string) => userService.deleteUser(restaurantId, userId),
    onSuccess: invalidate,
  });
}
