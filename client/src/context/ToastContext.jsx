import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback((msg, duration) => addToast(msg, 'success', duration), [addToast]);
  const error = useCallback((msg, duration) => addToast(msg, 'error', duration), [addToast]);
  const info = useCallback((msg, duration) => addToast(msg, 'info', duration), [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, success, error, info }}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map((t) => {
          let Icon = Info;
          let iconColor = 'var(--color-secondary)';
          if (t.type === 'success') {
            Icon = CheckCircle2;
            iconColor = 'var(--color-success)';
          } else if (t.type === 'error') {
            Icon = AlertCircle;
            iconColor = 'var(--color-danger)';
          }

          return (
            <div key={t.id} className={`toast toast-${t.type}`} role="alert">
              <Icon size={18} color={iconColor} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ flex: 1, color: 'var(--text-main)', lineHeight: 1.4 }}>{t.message}</div>
              <button
                onClick={() => removeToast(t.id)}
                style={{ color: 'var(--text-dim)', padding: '2px', cursor: 'pointer' }}
                aria-label="Close notification"
              >
                <X size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
