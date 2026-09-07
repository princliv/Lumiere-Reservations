import { http } from './http';
import type { LoginRequest, LoginResponse, User, ForgotPasswordRequest } from '../types';

export const login = (payload: LoginRequest) => http.post<LoginResponse>('/auth/login', payload);

export const logout = () => http.post<{ message: string }>('/auth/logout');

export const forgotPassword = (payload: ForgotPasswordRequest) =>
  http.post<{ message: string }>('/auth/forgot-password', payload);

export const getCurrentUser = () => http.get<{ user: User }>('/auth/me');
