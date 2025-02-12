'use client';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { ToastProvider } from '@/components/ui/ToastContext';
import { useEffect, useState } from 'react';
import type React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <ToastProvider>
      <ToastContainer />
      <div className='flex flex-col lg:flex-row w-full min-h-screen'>
        {/* Left Section - Background Image & Text */}
        <div className='hidden lg:flex relative w-full lg:w-1/2'>
          {isClient && (
            <picture>
              <img
                src='/image.jpg'
                alt='Authentication background'
                className='object-cover w-full h-full'
              />
            </picture>
          )}

          {/* Dark Overlay */}
          <div className='absolute inset-0 bg-black opacity-40'></div>

          {/* Text Overlay */}
          <div className='absolute inset-0 flex flex-col justify-center items-start px-8 mb-12 text-white'>
            <h1 className='text-2xl md:text-3xl font-bold'>Invoica</h1>
            <p className='mt-4 text-base md:text-lg lg:text-xl leading-relaxed'>
              Invoica is the ultimate platform for freelancers to efficiently
              manage income, generate invoices, and track their earnings
              seamlessly.
            </p>
            <p className='mt-10 text-sm md:text-base font-medium'>
              <strong>Invoica Team</strong>
              <br />
              Empowering Freelancers, One Invoice at a Time.
            </p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className='flex items-center justify-center p-6 md:p-12 w-full lg:w-1/2 min-h-screen lg:min-h-0'>
          <div className='w-full max-w-md'>{children}</div>
        </div>
      </div>
    </ToastProvider>
  );
}
