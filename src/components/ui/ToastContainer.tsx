// components/ui/ToastContainer.tsx

import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useToastContext } from './ToastContext';
import { useEffect, useState } from 'react';

const toastTypeConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-500',
    textColor: 'text-green-500',
  },
  error: {
    icon: AlertTriangle,
    bgColor: 'bg-red-500',
    textColor: 'text-red-500',
  },
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-yellow-500',
    textColor: 'text-yellow-500',
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-500',
  },
};

export const ToastContainer = () => {
  const { toasts, dismiss } = useToastContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className='fixed top-4 right-4 z-50 space-y-2'>
      {toasts.map((toast) => {
        const {
          icon: Icon,
          bgColor,
          textColor,
        } = toastTypeConfig[toast.type || 'info'];

        return (
          <div
            key={toast.id}
            className={`toast w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 ease-in-out animate-slide-in`}
          >
            <div className='p-3 relative'>
              <button
                className='absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200'
                onClick={() => dismiss(toast.id)}
              >
                <X className='h-4 w-4' />
              </button>
              <div className='pr-4 flex items-start'>
                <Icon className={`h-5 w-5 ${textColor} mr-2 flex-shrink-0`} />
                <div>
                  <p className='text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1'>
                    {toast.title}
                  </p>
                  <p className='text-xs text-gray-600 dark:text-gray-400'>
                    {toast.description}
                  </p>
                  {toast.action && <div className='mt-2'>{toast.action}</div>}
                </div>
              </div>
            </div>
            <div className={`h-1 ${bgColor} animate-shrink`} />
          </div>
        );
      })}
    </div>
  );
};
