"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <div className='relative isolate overflow-hidden bg-gray-900'>
      <div className='absolute inset-0 bg-customGreen/10 mix-blend-multiply' />
      <div
        className='absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-customGreen shadow-xl shadow-customGreen/90 ring-1 ring-white/10 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center'
        aria-hidden='true'
      />

      <div className='mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='mx-auto max-w-2xl lg:max-w-none'
        >
          <div className='max-w-xl lg:max-w-lg'>
            <h2 className='text-3xl font-bold tracking-tight text-gray sm:text-4xl'>
              Ready to simplify your freelance invoicing?
            </h2>
            <p className='mt-6 text-lg leading-8 text-white'>
              Join thousands of freelancers who trust Invoica for their
              invoicing needs. Start your 14-day free trial today and experience
              hassle-free billing.
            </p>
            <div className='mt-10 flex items-center gap-x-6'>
              <Button
                size='lg'
                className='bg-white text-customGreen hover:bg-customGreen hover:text-white'
              >
                Start free trial
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
              <Button size='lg' className='text-white hover:text-customGreen'>
                Learn more
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

