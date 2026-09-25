import { useState, type FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { ApiError } from '../../../services/http';

export function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };
  const [email, setEmail] = useState('owner@lumiere.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate(location.state?.from ?? '/admin', { replace: true });
    } catch (err) {
      if (err instanceof ApiError && (err.status === 401 || err.code === 'invalid_credentials')) {
        setError('Incorrect email or password.');
      } else if (err instanceof TypeError || (err instanceof ApiError && err.status >= 500)) {
        setError('Could not reach the login service. Wait a moment and try again.');
      } else {
        setError(err instanceof Error ? err.message : 'Sign in failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return null;
  if (isAuthenticated) {
    return <Navigate to={location.state?.from ?? '/admin'} replace />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-on-surface mb-1.5">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2.5 text-sm rounded-xl border border-outline-variant/40 bg-surface-container-low focus:border-primary outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-on-surface mb-1.5">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="password123"
          className="w-full px-3 py-2.5 text-sm rounded-xl border border-outline-variant/40 bg-surface-container-low focus:border-primary outline-none"
        />
        <p className="text-xs text-secondary mt-1">Demo password: password123</p>
      </div>

      {error && <p className="text-sm text-error font-medium">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-full bg-primary text-on-primary font-bold text-sm hover:bg-primary-container transition-colors disabled:opacity-50 shadow-md shadow-primary/20"
      >
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </button>

      <div className="text-center">
        <Link to="/admin/forgot-password" className="text-sm text-primary font-medium hover:underline">
          Forgot password?
        </Link>
      </div>

      <div className="pt-4 border-t border-outline-variant/20 text-xs text-secondary space-y-1">
        <p className="font-semibold">Demo accounts:</p>
        <p>owner@lumiere.com (Owner) · staff@lumiere.com (Staff) · admin@platform.com (Super Admin)</p>
      </div>
    </form>
  );
}
