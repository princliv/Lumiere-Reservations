import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-24 right-4 sm:right-6 z-[90] flex items-center gap-3 bg-inverse-surface text-inverse-on-surface px-5 py-3 rounded-xl shadow-2xl border border-white/10 animate-slideInToast">
      <span
        className={`material-symbols-outlined ${
          type === 'success' ? 'text-green-400' : 'text-primary-fixed-dim'
        }`}
      >
        {type === 'success' ? 'check_circle' : 'info'}
      </span>
      <span className="font-body-md font-medium text-sm">{message}</span>
      <button onClick={onClose} className="ml-2 text-white/60 hover:text-white transition-colors">
        <span className="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  );
};
