import { http } from './http';
import type { AuditLogEntry, Paginated } from '../types';

export const getAuditLog = (restaurantId: string, params: { page?: number; pageSize?: number } = {}) => {
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  if (params.pageSize) qs.set('pageSize', String(params.pageSize));
  return http.get<Paginated<AuditLogEntry>>(`/restaurants/${restaurantId}/audit-logs?${qs.toString()}`);
};
