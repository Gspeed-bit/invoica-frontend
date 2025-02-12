'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { verifyEmail, resendVerificationEmail } from '@/services/auth/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

const VerifyEmail = () => {
  const { token } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [canResend, setCanResend] = useState(false);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);

  useEffect(() => {
    const verify = async () => {
      if (!token) return;

      const response = await verifyEmail(token as string);
      console.log(response); // ✅ Debug: Check what response message is

      setLoading(false);

      // Handle email already verified situation
      if (response.message.toLowerCase().includes('email already verified')) {
        setSuccess(true); // Mark success since the email is already verified
        setTimeout(() => {
          router.push('/auth/login'); // Redirect to login after 2 seconds
        }, 2000);
      } else if (response.status === 'success') {
        setSuccess(true);
        setTimeout(() => router.push('/auth/login'), 2000); // Redirect after success
      } else {
        setError(response.message);
        if (
          response.message.toLowerCase().includes('expired') ||
          response.message.toLowerCase().includes('user not found')
        ) {
          setCanResend(true);
        }
      }
    };

    verify();
  }, [token, router]);

  const handleResend = async () => {
    if (!email) return;
    const response = await resendVerificationEmail(email);
    if (response.status === 'success') {
      setError(null);
      setResendSuccess('New verification email sent. Please check your inbox.');
      setCanResend(true); // Keep it enabled after resend
    } else {
      setError(response.message);
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='flex items-center justify-center min-h-screen '
      >
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex items-center justify-center min-h-screen'
    >
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>
            {success ? 'Email Verified' : 'Email Verification'}
          </CardTitle>
          <CardDescription>
            {success
              ? 'Your email has been successfully verified.'
              : 'Verify your email address to continue.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <Alert variant='default'>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your email has been successfully verified!
              </AlertDescription>
            </Alert>
          ) : error ? (
            <Alert variant='destructive'>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}
          {resendSuccess && (
            <Alert variant='default' className='mt-4'>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{resendSuccess}</AlertDescription>
            </Alert>
          )}
          {canResend && !success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='mt-4'
            >
              <p className='mb-2'>
                Enter your email to receive a new verification link:
              </p>
              <Input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='mb-2'
              />
              <Button onClick={handleResend} className='w-full'>
                Resend Verification Email
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VerifyEmail;
