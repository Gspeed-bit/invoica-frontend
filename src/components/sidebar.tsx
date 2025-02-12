import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart2, FileText, HelpCircle, Settings, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type React from 'react'; // Added import for React

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className='w-64 h-screen bg-white border-r border-gray-200 flex flex-col'>
      <div className='p-4'>
        <Link href='/' className='flex items-center space-x-2'>
          <picture>
            <img
              src='/logo.png'
              alt='Logo'
              className='h-16 w-10'
            />
          </picture>
          <span className='text-xl font-semibold text-customGreen'>Invoica</span>
        </Link>
      </div>
      <nav className='flex-1 overflow-y-auto'>
        <NavItem
          href='/dashboard'
          icon={BarChart2}
          label='Dashboard'
          isActive={pathname === '/dashboard'}
        />
        <NavGroup label='Billing'>
          <NavItem
            href='/dashboard/invoices'
            icon={FileText}
            label='Quotes & Invoices'
            isActive={pathname === '/dashboard/invoices'}
          />
          <NavItem
            href='/dashboard/products'
            icon={FileText}
            label='Products & Services'
            isActive={pathname === '/dashboard/products'}
          />
          <NavItem
            href='/dashboard/clients'
            icon={Users}
            label='Clients'
            isActive={pathname === '/dashboard/clients'}
          />
        </NavGroup>
        <NavItem
          href='/dashboard/management'
          icon={Settings}
          label='Management'
          isActive={pathname === '/dashboard/management'}
        />
        <NavItem
          href='/dashboard/development'
          icon={FileText}
          label='Development'
          isActive={pathname === '/dashboard/development'}
        />
        <NavItem
          href='/dashboard/advisor'
          icon={HelpCircle}
          label='My Advisor'
          isActive={pathname === '/dashboard/advisor'}
        />
        <NavItem
          href='/dashboard/help'
          icon={HelpCircle}
          label='Help Center'
          isActive={pathname === '/dashboard/help'}
        />
      </nav>
    </div>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
  isActive,
}: {
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link href={href} passHref>
      <Button
        variant='ghost'
        className={cn(
          'w-full justify-start',
          isActive && 'bg-gray-100 text-gray-900'
        )}
      >
        <Icon className='mr-2 h-4 w-4' />
        {label}
      </Button>
    </Link>
  );
}

function NavGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className='space-y-1'>
      <div className='px-3 py-2 text-sm font-semibold text-gray-500'>
        {label}
      </div>
      {children}
    </div>
  );
}
