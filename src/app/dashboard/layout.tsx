'use client';

import { Sidebar } from '@/components/sidebar';
import { TopBar } from '@/components/top-bar';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import type React from 'react'; // Added import for React

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='flex min-h-screen'>
      {/* Desktop Sidebar */}
      <div className='hidden md:block'>
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTitle className='hidden'></SheetTitle>
        <SheetDescription className='hidden'></SheetDescription>
        <SheetTrigger asChild>
          <Button
            variant='ghost'
            className='fixed left-4 top-4 z-40 md:hidden'
            size='icon'
          >
            <Menu className='h-6 w-6' />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='p-0 w-64'>
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className='flex flex-col flex-1'>
        <TopBar />
        <main className='flex-1 p-8'>{children}</main>
      </div>
    </div>
  );
}
