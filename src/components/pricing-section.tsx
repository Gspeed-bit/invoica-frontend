'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Starter',
    price: '9',
    description: 'Perfect for new freelancers just starting out',
    features: [
      'Up to 5 clients',
      '20 invoices per month',
      'Basic invoice templates',
      'Payment reminders',
      'Accept online payments',
    ],
  },
  {
    name: 'Professional',
    price: '29',
    description: 'Ideal for established freelancers with a growing client base',
    features: [
      'Unlimited clients',
      'Unlimited invoices',
      'Custom invoice templates',
      'Automated payment reminders',
      'Time tracking integration',
      'Expense tracking',
      'Basic financial reports',
    ],
    popular: true,
  },
  {
    name: 'Business',
    price: '49',
    description: 'For freelancers managing multiple projects and teams',
    features: [
      'Everything in Professional',
      'Multi-currency support',
      'Advanced financial reports',
      'Client portal',
      'Team management',
      'API access',
      'Priority support',
    ],
  },
];

export function PricingSection() {
  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Pricing plans for every freelancer
          </h2>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            Choose the perfect plan to support your freelance business
          </p>
        </div>

        <div className='mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 ${
                plan.popular ? 'border-2 border-customGreen' : ''
              }`}
            >
              {plan.popular && (
                <div className='absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-customGreen px-4 py-1 text-sm font-medium text-white'>
                  Most Popular
                </div>
              )}

              <div className='mb-8'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {plan.name}
                </h3>
                <p className='mt-4 text-sm text-gray-600'>{plan.description}</p>
                <div className='mt-6 flex items-baseline'>
                  <span className='text-4xl font-bold tracking-tight text-gray-900'>
                    €{plan.price}
                  </span>
                  <span className='ml-1 text-sm font-semibold text-gray-600'>
                    /month
                  </span>
                </div>
              </div>

              <ul className='mb-8 space-y-4 text-sm text-gray-600'>
                {plan.features.map((feature) => (
                  <li key={feature} className='flex items-center'>
                    <Check className='mr-3 h-5 w-5 text-customGreen' />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`mt-auto ${
                  plan.popular
                    ? 'bg-customGreen hover:bg-customGreen/90'
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                Get started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
