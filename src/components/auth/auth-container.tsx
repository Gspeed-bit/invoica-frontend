import type React from 'react';
import { motion } from 'framer-motion';

interface AuthContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthContainer({
  children,
  title,
  subtitle,
}: AuthContainerProps) {
  return (
    <div className='flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <motion.div
          className='text-center'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
            {title}
          </h1>
          {subtitle && (
            <p className='mt-3 text-sm text-muted-foreground sm:text-base'>
              {subtitle}
            </p>
          )}
        </motion.div>
        <div className=''>{children}</div>
      </div>
    </div>
  );
}
