import { createContext, useContext, useState, type ReactNode } from 'react';
import { Toast } from '../../components/Toast';

interface AdminToastContextValue {
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AdminToastContext = createContext<AdminToastContextValue | undefined>(undefined);

export function AdminToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  return (
    <AdminToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminToastContext.Provider>
  );
}

export function useAdminToast() {
  const ctx = useContext(AdminToastContext);
  if (!ctx) throw new Error('useAdminToast must be used within AdminToastProvider');
  return ctx;
}
