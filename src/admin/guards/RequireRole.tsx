import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { Role } from '../../types';

interface RequireRoleProps {
  allow: Role[];
}

/** Client-side gate for UX only - the real authorization boundary must live server-side (plan §33/§45). */
export function RequireRole({ allow }: RequireRoleProps) {
  const { user } = useAuth();
  if (!user || !allow.includes(user.role)) {
    return <Navigate to="/admin" replace />;
  }
  return <Outlet />;
}
