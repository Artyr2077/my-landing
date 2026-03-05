'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckIcon, AlertIcon } from './ui/Icons';

type ToastType = 'success' | 'error';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);

    // Автоматически удаляем тост через 3 секунды
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Контейнер для тостов */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type} toast-enter flex items-center gap-3 min-w-[300px]`}
          >
            {toast.type === 'success' ? (
              <CheckIcon className="w-5 h-5 text-[var(--toast-success-text)]" />
            ) : (
              <AlertIcon className="w-5 h-5 text-[var(--toast-error-text)]" />
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};