'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthContainer } from '@/components/auth/auth-container';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
});

export default function ResetPasswordPage() {
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate an error for demonstration
      if (values.email === 'notfound@example.com') {
        throw new Error('Email not found');
      }

      toast({
        title: 'Success',
        description:
          'If an account exists with this email, you will receive a reset link.',
        duration: 5000,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      toast({
        title: 'Error',
        description: 'Failed to send reset link. Please try again.',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContainer
      title='Reset your password'
      subtitle="Enter your email and we'll send you a reset link"
    >
      {error && (
        <Alert variant='destructive'>
          <ExclamationTriangleIcon className='h-4 w-4' />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='m@example.com'
                    {...field}
                    disabled={isLoading}
                    aria-describedby={
                      form.formState.errors.email ? 'email-error' : undefined
                    }
                  />
                </FormControl>
                <FormMessage id='email-error' />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send reset link'}
          </Button>
        </form>
      </Form>
      <p className='text-center text-sm text-muted-foreground'>
        Remember your password?{' '}
        <Link
          href='/auth/login'
          className='font-medium text-primary hover:underline'
        >
          Sign in
        </Link>
      </p>
    </AuthContainer>
  );
}
