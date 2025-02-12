import { useState } from 'react';
import { verifyEmail } from '@/services/auth/auth'; // Import verifyEmail service

export const useEmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleEmailVerification = async (token: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await verifyEmail(token);
      if (response.status === 'success') {
        setMessage('Email verified successfully!');
      } else {
        setError('Failed to verify email. Please try again.');
      }
    } catch {
      setError('Something went wrong during verification.');
    } finally {
      setLoading(false);
    }
  };

  return {
    handleEmailVerification,
    loading,
    error,
    message,
  };
};
