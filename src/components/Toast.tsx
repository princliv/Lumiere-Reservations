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
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-inverse-surface text-inverse-on-surface px-5 py-3.5 rounded-xl shadow-2xl border border-white/10 animate-bounce">
      <span className={`material-symbols-outlined ${type === 'success' ? 'text-green-400' : 'text-primary-fixed-dim'}`}>
        {type === 'success' ? 'check_circle' : 'info'}
      </span>
      <span className="font-body-md font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 text-white/60 hover:text-white transition-colors">
        <span className="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  );
};
