import type React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface AuthCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export function AuthCard({
  children,
  title,
  description,
  className,
}: AuthCardProps) {
  return (
    <Card className={`w-full max-w-[400px] mx-auto ${className}`}>
      {(title || description) && (
        <CardHeader className='space-y-1'>
          {title && (
            <h2 className='text-2xl font-semibold text-[#55556d]'>{title}</h2>
          )}
          {description && (
            <p className='text-sm text-[#55556d]/70'>{description}</p>
          )}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
