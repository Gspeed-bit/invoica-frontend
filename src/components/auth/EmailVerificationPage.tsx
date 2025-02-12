import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEmailVerification } from './useEmailVerification';

const EmailVerificationPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { handleEmailVerification, loading, error, message } =
    useEmailVerification();

  useEffect(() => {
    if (token) {
      handleEmailVerification(token as string); // Verify email with the token
    }
  }, [token, handleEmailVerification]);

  if (loading) return <p>Verifying...</p>;

  return (
    <div>
      {message && <h1>{message}</h1>}
      {error && <h1>{error}</h1>}
      {!loading && !message && !error && <p>Verification in progress...</p>}
    </div>
  );
};

export default EmailVerificationPage;
