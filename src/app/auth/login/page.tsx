'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { Checkbox } from '@/components/ui/checkbox';
import { AuthContainer } from '@/components/auth/auth-container';

import { loginUser } from '@/services/auth/auth'; // Import login function
import { useToastContext } from '@/components/ui/ToastContext';

const formSchema = z.object({
  identifier: z.string().min(1, {
    message: 'Please enter your email or username',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
  rememberMe: z.boolean().default(false),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToastContext();
  const router = useRouter(); // Initialize Next.js router

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: '',
      password: '',
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const response = await loginUser({
        email: values.identifier,
        password: values.password,
      });

      if (!response.success) {
        toast({
          title: 'Error',
          description: response.message,
          duration: 5000, // 5 seconds
          type: 'error',
        });
        return; // Stop execution if login fails
      }

      // Show success toast and redirect
      toast({
        title: 'Success',
        description: 'You have successfully logged in.',
        duration: 3000, // 3 seconds
        type: 'success',
      });

      // Save token if needed
      if (values.rememberMe) {
        localStorage.setItem('token', response.token || '');
      }

      // Redirect user after success
      router.push('/dashboard');
    } catch (err) {
      toast({
        title: 'Error',
        description:
          err instanceof Error
            ? err.message
            : 'Failed to sign in. Please try again.',
        duration: 5000, // 5 seconds
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContainer
      title='Sign in to your account'
      subtitle='Welcome back! Please enter your details.'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='identifier'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your email or username'
                    {...field}
                    disabled={isLoading}
                    aria-describedby={
                      form.formState.errors.identifier
                        ? 'identifier-error'
                        : undefined
                    }
                  />
                </FormControl>
                <FormMessage id='identifier-error' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center justify-between'>
                  <FormLabel>Password</FormLabel>
                  <Link
                    href='/auth/reset-password'
                    className='text-sm text-muted-foreground hover:underline'
                    tabIndex={0}
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    type='password'
                    {...field}
                    disabled={isLoading}
                    aria-describedby={
                      form.formState.errors.password
                        ? 'password-error'
                        : undefined
                    }
                  />
                </FormControl>
                <FormMessage id='password-error' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='rememberMe'
            render={({ field }) => (
              <FormItem className='flex items-center space-x-2 space-y-0'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormLabel className='text-sm font-normal'>
                  Remember me for 30 days
                </FormLabel>
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='w-full bg-customGreen'
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </Form>

      <p className='text-center text-sm text-muted-foreground'>
        Don&apos;t have an account?{' '}
        <Link
          href='/auth/register'
          className='font-medium text-primary hover:underline'
        >
          Sign up
        </Link>
      </p>
    </AuthContainer>
  );
}
