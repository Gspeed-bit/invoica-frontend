// components/ui/ToastContext.tsx

import { createContext, useContext, ReactNode } from 'react';
import { useToast, Toast } from './use-toast'; // Update the import

// Create ToastContext with a more specific type
const ToastContext = createContext<ReturnType<typeof useToast> | null>(null);

// ToastProvider that provides toast functionality globally
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const toast = useToast(); // Using the custom useToast hook

  return (
    <ToastContext.Provider value={toast}>{children}</ToastContext.Provider>
  );
};

// Custom hook to use the toast context
export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

// Export the Toast type
export type { Toast };
