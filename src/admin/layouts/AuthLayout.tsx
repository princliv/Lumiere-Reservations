import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="material-symbols-outlined text-primary text-4xl">auto_awesome</span>
          <h1 className="font-serif text-3xl font-bold text-on-surface mt-2">Restaurant Admin</h1>
        </div>
        <div className="bg-surface rounded-2xl shadow-xl border border-outline-variant/20 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
