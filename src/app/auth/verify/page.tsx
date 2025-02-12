'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AuthContainer } from '@/components/auth/auth-container';
import { useToastContext } from '@/components/ui/ToastContext'; // Use the context hook
import {
  resendVerificationEmail,
  getUserVerificationStatus,
} from '@/services/auth/auth';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export default function VerifyPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToastContext(); // Access the toast function from context
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  // Fetch user's verification status
  useEffect(() => {
    const emailQuery = new URLSearchParams(window.location.search).get('email');
    if (emailQuery) {
      setEmail(emailQuery);
    }

    const checkVerificationStatus = async () => {
      const response = await getUserVerificationStatus(email);
      if (response.status === 'verified') {
        setIsVerified(true);
      }
    };

    if (email) {
      checkVerificationStatus();
    }
  }, [email]);

  async function handleResendVerification() {
    if (!email) return;

    if (isVerified) {
      toast({
        title: 'Already Verified',
        description: 'Your email is already verified. No need to resend.',
        duration: 3000, // Show for 3 seconds
        type: 'error',
      });
      return;
    }

    setLoading(true);

    const response = await resendVerificationEmail(email);
    setLoading(false);

    if (response.status === 'success') {
      console.log('Email sent successfully:', response);

      toast({
        title: 'Verification Email Sent',
        description: 'Please check your inbox to verify your email address.',
        duration: 4000, // Custom duration for success toast
        type: 'success', // Set the type to 'success'
      });

      setTimeout(() => {
        router.push('/auth/login'); // Redirect after 3 seconds
      }, 3000);
    } else {
      toast({
        title: 'Failed to Send Email',
        description:
          'Oops! Something went wrong. Please try again after 2 mins or contact support.',
        duration: 4000, // Custom duration for error toast
        type: 'error', // Set the type to 'error'
      });

      setTimeout(() => {
        router.push('/auth/login'); // Redirect after failure
      }, 3000);
    }
  }

  return (
    <AuthContainer title='Resend Verification Email' subtitle=''>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex justify-center items-center space-x-2'>
          <ExclamationTriangleIcon className='h-6 w-6 text-yellow-500' />
          <h3 className='font-medium text-lg'>Email Verification</h3>
        </div>
        <div className='mt-4'>
          <p>
            First, click the link below, then check your inbox for a
            verification email.
          </p>
        </div>

        <div className='mt-6'>
          <Button
            onClick={handleResendVerification}
            disabled={loading || isVerified}
          >
            {loading ? 'Sending...' : 'Resend Verification Email'}
          </Button>
        </div>
      </div>
    </AuthContainer>
  );
}
