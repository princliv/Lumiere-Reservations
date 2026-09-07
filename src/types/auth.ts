import type { Id, ISODateString, Timestamps } from './common';

export type Role = 'super_admin' | 'owner' | 'staff';

export interface Permission {
  menu: boolean;
  branding: boolean;
  homepage: boolean;
  media: boolean;
  offers: boolean;
  addons: boolean;
  settings: boolean;
  users: boolean;
}

export interface User extends Timestamps {
  id: Id;
  email: string;
  name: string;
  role: Role;
  restaurantId: Id | null;
  permissions?: Partial<Permission>;
  avatarUrl?: string | null;
  isActive: boolean;
}

export interface Session {
  user: User;
  token: string;
  expiresAt: ISODateString;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = Session;

export interface ForgotPasswordRequest {
  email: string;
}
