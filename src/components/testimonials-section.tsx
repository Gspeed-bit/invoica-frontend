"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    content:
      "Invoica has revolutionized how I handle my freelance invoicing. It's intuitive, fast, and makes me look more professional to my clients.",
    author: "Alex Chen",
    role: "Graphic Designer",
    rating: 5,
  },
  {
    content:
      "As a freelance writer, keeping track of invoices was always a hassle. Invoica has made it so simple that I can focus more on my writing and less on paperwork.",
    author: "Sarah Johnson",
    role: "Content Writer",
    rating: 5,
  },
  {
    content:
      "The time tracking feature integrated with invoicing is a game-changer. I've reduced my admin time by 70% since switching to Invoica.",
    author: "Michael Rodriguez",
    role: "Web Developer",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <div className='bg-gray-50 py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Loved by freelancers worldwide
          </h2>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            See what fellow freelancers have to say about their experience with
            Invoica
          </p>
        </div>

        <div className='mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200'
            >
              <div>
                <div className='flex gap-1'>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className='h-5 w-5 fill-customGreen text-customGreen'
                    />
                  ))}
                </div>
                <p className='mt-6 text-lg text-gray-900'>
                  &quot;{testimonial.content}&quot;
                </p>
              </div>
              <div className='mt-8 border-t border-gray-200 pt-8'>
                <p className='font-semibold text-gray-900'>
                  {testimonial.author}
                </p>
                <p className='mt-1 text-sm text-gray-600'>{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

