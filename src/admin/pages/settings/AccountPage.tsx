import { useAuth } from '../../../context/AuthContext';

export function AccountPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="font-serif text-3xl font-bold text-on-surface">Account</h1>

      <div className="bg-surface rounded-2xl border border-outline-variant/20 p-6 space-y-4">
        <div>
          <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1">Name</label>
          <p className="text-sm text-on-surface font-medium">{user?.name}</p>
        </div>
        <div>
          <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1">Email</label>
          <p className="text-sm text-on-surface font-medium">{user?.email}</p>
        </div>
        <div>
          <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1">Role</label>
          <p className="text-sm text-on-surface font-medium capitalize">{user?.role.replace('_', ' ')}</p>
        </div>
      </div>

      <p className="text-xs text-secondary">Password changes and two-factor authentication are managed via the "Forgot password" flow on the login screen.</p>
    </div>
  );
}
