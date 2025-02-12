"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className='relative overflow-hidden bg-gradient-to-b from-white to-gray-50'>
      <div className='absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]' />
      <div className='absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-customGreen/10 to-transparent' />

      <div className='container relative mx-auto px-4 py-24 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mx-auto max-w-4xl text-center'
        >
          <h1 className='bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl'>
            Professional Invoicing for Freelancers
          </h1>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            Create, send, and manage invoices effortlessly. Designed
            specifically for freelancers to streamline their billing process and
            get paid faster.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Button
              size='lg'
              className='bg-customGreen hover:bg-customGreen/90'
            >
              Start Free Trial
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
            <Button variant='outline' size='lg'>
              See How It Works
            </Button>
          </div>

          <div className='mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3'>
            {[
              '14-day free trial',
              'No credit card required',
              'Cancel anytime',
            ].map((benefit) => (
              <div
                key={benefit}
                className='flex items-center justify-center gap-x-2 text-sm text-gray-600'
              >
                <CheckCircle className='h-4 w-4 text-customGreen' />
                {benefit}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

