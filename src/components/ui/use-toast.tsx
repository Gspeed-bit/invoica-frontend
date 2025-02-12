// components/ui/use-toast.ts

import { useState, useCallback } from 'react';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  duration?: number;
  type?: 'success' | 'error' | 'warning' | 'info';
}


export interface ToastOptions {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  duration?: number;
  type?: 'success' | 'error' | 'warning' | 'info';
  className?: string;  // Add this line
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, ...options };
    setToasts((prevToasts) => [...prevToasts, newToast]);

    if (options.duration) {
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
      }, options.duration);
    }

    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  }, []);

  return { toasts, toast, dismiss };
}
