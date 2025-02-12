import { ArrowLeft, Bell, ChevronDown, Mail } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { InvoiceTable } from './invoice-table';
import { InvoiceSummary } from './invoice-summary';

export function InvoiceDetails() {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='flex flex-col gap-4 border-b border-[#e0e2e7] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
        <div className='flex items-center space-x-4'>
          <Link
            href='/invoices'
            className='text-[#667085] hover:text-[#1a1c21]'
          >
            <ArrowLeft className='h-5 w-5' />
          </Link>
          <h1 className='text-lg font-semibold'>Invoice Details</h1>
        </div>
        <div className='flex items-center space-x-4'>
          <Button variant='ghost' size='icon'>
            <Mail className='h-5 w-5' />
          </Button>
          <Button variant='ghost' size='icon'>
            <div className='relative'>
              <Bell className='h-5 w-5' />
              <span className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1eb386] text-[10px] text-white'>
                15
              </span>
            </div>
          </Button>
          <div className='flex items-center space-x-2'>
            <picture>
              <img
                src='/placeholder.svg?height=32&width=32'
                alt='Avatar'
                className='h-8 w-8 rounded-full'
              />
            </picture>
            <span className='text-sm font-medium'>Mike</span>
            <span className='hidden text-sm text-[#667085] sm:inline'>
              732 829 320 0074
            </span>
            <ChevronDown className='h-4 w-4 text-[#667085]' />
          </div>
        </div>
      </header>

      <div className='flex-1 p-4 sm:p-6'>
        <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-xl sm:text-2xl font-semibold'>
              Invoice #2020-05-0001
            </h2>
            <p className='text-sm text-[#667085]'>Paid on June 27, 2023</p>
          </div>
          <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='w-full sm:w-auto'>
                  More Options
                  <ChevronDown className='ml-2 h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem>Download PDF</DropdownMenuItem>
                <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                <DropdownMenuItem>Share Invoice</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className='w-full sm:w-auto bg-[#1eb386] hover:bg-[#1eb386]/90'>
              Record a Payment
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='md:col-span-2 space-y-6'>
            <div className='rounded-lg border border-[#e0e2e7] bg-white p-4 sm:p-6'>
              <InvoiceTable />
            </div>
          </div>
          <div className='space-y-6'>
            <div className='rounded-lg border border-[#e0e2e7] bg-white p-4 sm:p-6'>
              <div className='mb-4'>
                <Badge
                  variant='destructive'
                  className='bg-[#fff5eb] text-[#fc9736]'
                >
                  Late
                </Badge>
              </div>
              <p className='mb-4 text-sm font-medium'>Invoice not yet sent!</p>
              <Button className='w-full bg-[#1eb386] hover:bg-[#1eb386]/90'>
                Send Invoice
              </Button>
            </div>
            <InvoiceSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
