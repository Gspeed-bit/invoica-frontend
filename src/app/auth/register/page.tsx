'use client';
import { useRouter } from 'next/navigation';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AuthContainer } from '@/components/auth/auth-container';
import { useToastContext } from '@/components/ui/ToastContext';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { RegisterUserData } from '@/types/auth.types';
import { registerUser } from '@/services/auth/auth';

const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: 'First name must be at least 2 characters',
    }),
    lastName: z.string().min(2, {
      message: 'Last name must be at least 2 characters',
    }),
    username: z
      .string()
      .min(3, {
        message: 'Username must be at least 3 characters',
      })
      .max(20, {
        message: 'Username must not exceed 20 characters',
      })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'Username can only contain letters, numbers, and underscores',
      }),
    email: z.string().email({
      message: 'Please enter a valid email address',
    }),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
      message: 'Please enter a valid phone number',
    }),
    businessName: z.string().optional(),
    accountType: z.enum(['individual', 'business']),
    password: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[0-9]/, {
        message: 'Password must contain at least one number',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function RegisterPage() {
  const router = useRouter(); // Initialize router
  const [loading, setLoading] = useState(false);
  const { toast } = useToastContext();
  const form = useForm<RegisterUserData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
      businessName: '',
      accountType: 'individual',
      password: '',
      confirmPassword: '',
    },
  });

  const watchAccountType = form.watch('accountType'); // Watch the accountType
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (fieldName: string) => {
    if (fieldName === 'password') {
      setShowPassword(!showPassword);
    } else if (fieldName === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

 async function onSubmit(values: z.infer<typeof formSchema>) {
   setLoading(true);

   try {
     const successResponse = await registerUser(values);

     if (successResponse.success) {
       toast({
         title: 'Success',
         description:
           'Your account has been created. Please verify your email.',
         duration: 4000,
         type: 'success',
       });

       setTimeout(() => {
         router.push('/auth/login');
       }, 5000);
       return;
     }

     // Handle different failure cases
     let toastMessage = successResponse.message;
     let toastType: 'success' | 'error' | 'warning' = 'error';
     let redirectPath = null;

     if (toastMessage.includes('Account with email already exists.')) {
       toastMessage = 'Account already exists. Redirecting to login...';
       toastType = 'error';
       redirectPath = '/auth/login';
     } else if (toastMessage.includes('not verified')) {
       toastMessage = 'Please verify your email before logging in.';
       toastType = 'warning';
       redirectPath = `/auth/verify?email=${values.email}`;
     }

     // Only trigger one toast
     toast({
       title: toastType === 'warning' ? 'Verify Email' : 'Error',
       description: toastMessage,
       duration: 4000,
       type: toastType,
     });

     if (redirectPath) {
       setTimeout(() => {
         router.push(redirectPath);
       }, 5000);
     }
   } catch (error) {
     console.error('Registration error:', error);
     toast({
       title: 'Error',
       description: 'An unexpected error occurred. Please try again.',
       duration: 3000,
       type: 'error',
     });
   } finally {
     setLoading(false);
   }
 }

  return (
    <AuthContainer
      title='Create an account'
      subtitle='Enter your details below to create your account'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8 space-y-6'>
          <div className='grid gap-6 sm:grid-cols-2'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} className='w-full' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} className='w-full' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} disabled={loading} className='w-full' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    {...field}
                    disabled={loading}
                    className='w-full'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} disabled={loading} className='w-full' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='accountType'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={loading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select account type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='individual'>Individual</SelectItem>
                    <SelectItem value='business'>Business</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchAccountType === 'business' && (
            <FormField
              control={form.control}
              name='businessName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} className='w-full' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      disabled={loading}
                      className='w-full pr-10'
                    />
                    <button
                      type='button'
                      className='absolute inset-y-0 right-0 pr-3 flex items-center'
                      onClick={() => togglePasswordVisibility('password')}
                    >
                      {showPassword ? (
                        <EyeOff className='h-4 w-4 text-gray-400' />
                      ) : (
                        <Eye className='h-4 w-4 text-gray-400' />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...field}
                      disabled={loading}
                      className='w-full pr-10'
                    />
                    <button
                      type='button'
                      className='absolute inset-y-0 right-0 pr-3 flex items-center'
                      onClick={() =>
                        togglePasswordVisibility('confirmPassword')
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className='h-4 w-4 text-gray-400' />
                      ) : (
                        <Eye className='h-4 w-4 text-gray-400' />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='mt-8'>
            <Button type='submit' disabled={loading} className='w-full'>
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </div>
        </form>
      </Form>
      <div className='mt-4 text-center'>
        <p>
          Already have an account?{' '}
          <Link
            href='/auth/login'
            className='text-primary-500 hover:text-primary-600'
          >
            Login here
          </Link>
        </p>
      </div>
    </AuthContainer>
  );
}
