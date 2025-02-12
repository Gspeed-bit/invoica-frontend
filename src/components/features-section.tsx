"use client"

import { motion } from "framer-motion"
import { FileText, Zap, Clock, CreditCard, PieChart, Globe } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Professional Templates",
    description: "Choose from a variety of sleek, customizable invoice templates tailored for freelancers.",
  },
  {
    icon: Zap,
    title: "Quick Invoice Creation",
    description: "Generate polished invoices in seconds with our intuitive, user-friendly interface.",
  },
  {
    icon: Clock,
    title: "Time Tracking Integration",
    description: "Seamlessly track billable hours and automatically generate invoices based on your work.",
  },
  {
    icon: CreditCard,
    title: "Multiple Payment Options",
    description: "Offer clients various payment methods to get paid faster and more conveniently.",
  },
  {
    icon: PieChart,
    title: "Financial Insights",
    description: "Gain valuable insights into your freelance business with detailed financial reports and analytics.",
  },
  {
    icon: Globe,
    title: "Multi-Currency Support",
    description: "Work with clients globally using our multi-currency invoicing feature.",
  },
]

export function FeaturesSection() {
  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-base font-semibold leading-7 text-customGreen'>
            Features
          </h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Everything you need for seamless invoicing
          </p>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            Designed with freelancers in mind, Invoica offers powerful features
            to simplify your billing process.
          </p>
        </div>

        <div className='mx-auto mt-16 max-w-7xl'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className='relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md'
              >
                <div className='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-customGreen/10'>
                  <feature.icon className='h-6 w-6 text-customGreen' />
                </div>
                <h3 className='text-xl font-semibold text-gray-900'>
                  {feature.title}
                </h3>
                <p className='mt-4 text-gray-600'>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

