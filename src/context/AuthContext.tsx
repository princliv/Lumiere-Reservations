import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import * as authService from '../services/auth';
import { setAuthToken } from '../services/http';
import type { Permission, Role, User } from '../types';

const TOKEN_STORAGE_KEY = 'lumiere-cms-token';
const DEV_AUTO_LOGIN_EMAIL = 'owner@lumiere.com';
const DEV_AUTO_LOGIN_PASSWORD = 'password123';

const ROLE_DEFAULT_PERMISSIONS: Record<Role, Permission> = {
  super_admin: { menu: true, branding: true, homepage: true, media: true, offers: true, addons: true, settings: true, users: true },
  owner: { menu: true, branding: true, homepage: true, media: true, offers: true, addons: true, settings: true, users: false },
  staff: { menu: true, branding: false, homepage: false, media: false, offers: false, addons: false, settings: false, users: false },
};

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  isOwner: boolean;
  isStaff: boolean;
  can: (permission: keyof Permission) => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const applySession = (token: string, nextUser: User) => {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      setAuthToken(token);
      setUser(nextUser);
    };

    const autoLogin = async () => {
      if (!import.meta.env.DEV) return;
      const session = await authService.login({
        email: DEV_AUTO_LOGIN_EMAIL,
        password: DEV_AUTO_LOGIN_PASSWORD,
      });
      if (!cancelled) applySession(session.token, session.user);
    };

    const restore = async () => {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (token) {
        setAuthToken(token);
        try {
          const { user } = await authService.getCurrentUser();
          if (!cancelled) setUser(user);
          return;
        } catch {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          setAuthToken(null);
        }
      }

      try {
        await autoLogin();
      } catch {
        // Stay logged out if mock/API login is unavailable.
      }
    };

    restore().finally(() => {
      if (!cancelled) setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const session = await authService.login({ email, password });
    localStorage.setItem(TOKEN_STORAGE_KEY, session.token);
    setAuthToken(session.token);
    setUser(session.user);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      setAuthToken(null);
      setUser(null);
    }
  };

  const can = (permission: keyof Permission) => {
    if (!user) return false;
    const base = ROLE_DEFAULT_PERMISSIONS[user.role];
    return user.permissions?.[permission] ?? base[permission];
  };

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    isSuperAdmin: user?.role === 'super_admin',
    isOwner: user?.role === 'owner',
    isStaff: user?.role === 'staff',
    can,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
