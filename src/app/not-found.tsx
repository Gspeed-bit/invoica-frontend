'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileWarning } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [particles, setParticles] = useState<
    { x: number; y: number; opacity: number; scale: number }[]
  >([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Generate random particles only on the client
  useEffect(() => {
    if (windowSize.width > 0) {
      const newParticles = Array.from({ length: 50 }).map(() => ({
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        opacity: Math.random(),
        scale: Math.random() * 0.5 + 0.5,
      }));
      setParticles(newParticles);
    }
  }, [windowSize]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center'
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: 'spring',
            stiffness: 200,
            damping: 10,
          }}
          className='mb-8'
        >
          <FileWarning className='w-24 h-24 text-customGreen mx-auto' />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className='text-6xl font-bold text-gray-900 mb-4'
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className='text-3xl font-semibold text-gray-700 mb-6'
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className='text-xl text-gray-600 mb-8'
        >
          Oops! The invoice you&apos;re looking for seems to have vanished into
          thin air.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Button asChild className='bg-customGreen hover:bg-customGreen/90'>
            <Link href='/'>Return to Dashboard</Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Background Animation */}
      {windowSize.width > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className='absolute inset-0 pointer-events-none'
        >
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                scale: 0,
                x: particle.x,
                y: particle.y,
              }}
              animate={{
                opacity: particle.opacity,
                scale: particle.scale,
                x: particle.x,
                y: particle.y,
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'reverse',
              }}
              className='absolute w-2 h-2 bg-customGreen rounded-full'
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
